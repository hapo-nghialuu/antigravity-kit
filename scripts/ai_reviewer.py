"""
AI Code Reviewer v2 (Smart Auto-Resolve)
========================================
Automatically reviews Pull Requests using OpenRouter AI and posts reviews with severity-based actions.

Features:
- Severity classification: critical, high, medium, low
- Smart action: Request Changes for critical/high, Comment for medium/low
- Project context injection for better understanding
- Smart Auto-resolve: Only resolves threads if the issue is no longer detected by AI

Usage:
    Run this script in a GitHub Action triggered by `pull_request` events.
    Ensure GITHUB_TOKEN and OPENROUTER_API_KEY, GITHUB_EVENT_PATH are set.

Environment Variables:
    GITHUB_TOKEN: GitHub Action token
    OPENROUTER_API_KEY: API key for OpenRouter
    GITHUB_EVENT_PATH: Path to the GitHub event JSON file
    AI_MODEL: Model to use (default: mistralai/devstral-2512:free)
"""

import os
import json
import requests
import logging
from github import Github, GithubException
from openai import OpenAI, AuthenticationError, RateLimitError

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants
IGNORED_EXTENSIONS = ['.json', '.md', '.txt', '.yml', '.yaml', '.lock', '.png', '.jpg', '.jpeg', '.gif', '.svg']
IGNORED_DIRS = ['dist', 'build', 'node_modules', '.github', '.git', '__pycache__']
MODEL_NAME = os.getenv("AI_MODEL", "mistralai/devstral-2512:free")
GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"

# Severity levels that trigger Request Changes
BLOCKING_SEVERITIES = ['critical', 'high']


def should_review(filename):
    """Check if file should be reviewed based on extension and path."""
    if any(filename.endswith(ext) for ext in IGNORED_EXTENSIONS):
        return False
    if any(part in filename.split('/') for part in IGNORED_DIRS):
        return False
    return True


def get_project_context(repo):
    """Fetch project context files (README, ARCHITECTURE) for better AI understanding."""
    context_files = ['README.md', 'ARCHITECTURE.md', 'docs/ARCHITECTURE.md']
    context = []

    for filepath in context_files:
        try:
            content = repo.get_contents(filepath)
            if content and hasattr(content, 'decoded_content'):
                text = content.decoded_content.decode('utf-8')
                if len(text) > 2000:
                    text = text[:2000] + "\n...[truncated]..."
                context.append(f"### {filepath}\n{text}")
        except Exception:
            pass

    return "\n\n".join(context) if context else "No project documentation found."


def get_file_list(repo):
    """Get a list of all files in the repository for context."""
    try:
        contents = repo.get_contents("")
        files = []
        while contents:
            item = contents.pop(0)
            if item.type == "dir" and item.name not in IGNORED_DIRS:
                try:
                    contents.extend(repo.get_contents(item.path))
                except Exception:
                    pass
            elif item.type == "file":
                files.append(item.path)
            if len(files) >= 100:
                break
        return files
    except Exception:
        return []


def get_pr_diff(repo, pr_number):
    """Fetch PR diff and full file content for context."""
    pr = repo.get_pull(pr_number)
    files_data = []

    for file in pr.get_files():
        if not should_review(file.filename):
            continue
        if file.status == 'removed':
            continue

        file_info = {
            "filename": file.filename,
            "status": file.status,
            "patch": file.patch
        }
        try:
            content = repo.get_contents(file.filename, ref=pr.head.sha)
            if content and hasattr(content, 'decoded_content'):
                full_content = content.decoded_content.decode('utf-8')
                if len(full_content) <= 5000:
                    file_info["full_content"] = full_content
        except Exception:
            pass
        files_data.append(file_info)

    return pr, files_data


def get_existing_bot_threads(repo_owner, repo_name, pr_number, token):
    """
    Fetch all unresolved review threads created by the bot.
    Returns a list of dicts: {'id': ..., 'filename': ..., 'line': ..., 'body': ...}
    """
    query = """
    query($owner: String!, $repo: String!, $prNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
          reviewThreads(last: 100) {
            nodes {
              id
              isResolved
              line  # The current line in the file
              comments(first: 1) {
                nodes {
                  path
                  body
                  author { login }
                }
              }
            }
          }
        }
      }
    }
    """
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {"query": query, "variables": {"owner": repo_owner, "repo": repo_name, "prNumber": pr_number}}

    try:
        response = requests.post(GITHUB_GRAPHQL_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        if 'errors' in data:
            logging.error(f"GraphQL Error: {data['errors']}")
            return []

        pr_data = data.get('data', {}).get('repository', {}).get('pullRequest')
        if not pr_data:
            return []

        threads_raw = pr_data.get('reviewThreads', {}).get('nodes', [])
        bot_threads = []

        for thread in threads_raw:
            if thread.get('isResolved'):
                continue

            comments = thread.get('comments', {}).get('nodes', [])
            if not comments:
                continue

            first_comment = comments[0]
            author = first_comment.get('author')
            
            # Check if this thread belongs to github-actions[bot]
            if author and author.get('login') == 'github-actions[bot]':
                bot_threads.append({
                    'id': thread.get('id'),
                    'line': thread.get('line'), # Current line in PR head
                    'filename': first_comment.get('path'),
                    'body': first_comment.get('body')
                })

        return bot_threads

    except Exception as e:
        logging.error(f"Failed to fetch existing threads: {e}")
        return []


def resolve_thread(thread_id, token):
    """Resolve a specific thread via GraphQL."""
    mutation = """
    mutation ResolveThread($threadId: ID!) {
      resolveReviewThread(input: {threadId: $threadId}) {
        thread { isResolved }
      }
    }
    """
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {"query": mutation, "variables": {"threadId": thread_id}}
    try:
        requests.post(GITHUB_GRAPHQL_URL, json=payload, headers=headers, timeout=30)
        logging.info(f"Resolved thread {thread_id}")
    except Exception as e:
        logging.error(f"Failed to resolve thread {thread_id}: {e}")


def manage_review_threads(repo_owner, repo_name, pr_number, new_comments, token):
    """
    Smart Auto-Resolve Logic:
    1. Fetch existing unresolved bot threads.
    2. Match new comments to existing threads (by filename + approx line).
    3. If matched: Keep thread open (do NOT post new comment).
    4. If old thread has no match in new comments: Resolve it (Fixed).
    5. Return list of TRULY NEW comments to post.
    """
    logging.info("Syncing comments (Smart Auto-Resolve)...")
    
    old_threads = get_existing_bot_threads(repo_owner, repo_name, pr_number, token)
    matched_thread_ids = set()
    comments_to_post = []

    # Map new comments to finding signature
    # Since line numbers can shift, we use a relaxed match: +/- 3 lines
    
    for new_cmt in new_comments:
        new_file = new_cmt.get('filename')
        new_line = int(new_cmt.get('line_number', 0))
        
        found_match = False
        
        for old_th in old_threads:
            if old_th['id'] in matched_thread_ids:
                continue # Already matched
            
            old_file = old_th['filename']
            old_line = old_th['line']
            
            # If thread has no line (outdated), we can't match by line reliably.
            # But let's assume valid threads have lines.
            if old_line is None: 
                continue

            if new_file == old_file and abs(new_line - old_line) <= 3:
                # MATCH FOUND!
                matched_thread_ids.add(old_th['id'])
                found_match = True
                logging.info(f"Matched existing thread {old_th['id']} for {new_file}:{new_line}. Keeping open.")
                break
        
        if not found_match:
            comments_to_post.append(new_cmt)

    # Resolve unmatched old threads
    for old_th in old_threads:
        if old_th['id'] not in matched_thread_ids:
            logging.info(f"Issue at {old_th['filename']}:{old_th['line']} no longer detected. Resolving...")
            resolve_thread(old_th['id'], token)

    return comments_to_post


def analyze_code_with_openrouter(files_data, project_context, file_list):
    """Send code review request to AI."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        return []

    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
            default_headers={
                "HTTP-Referer": "https://github.com/hapo-nghialuu/antigravity-kit",
                "X-Title": "AI Code Reviewer v2"
            }
        )
    except Exception:
        return []

    prompt = f"""
Bạn là một Senior Code Reviewer chuyên nghiệp. Review code trong Pull Request này.

## PROJECT CONTEXT
{project_context}

## PROJECT FILES
{', '.join(file_list[:50])}

## SEVERITY LEVELS (QUAN TRỌNG - PHẢI TRẢ VỀ)
- **critical**: Security vulnerabilities (hardcoded secrets, SQL injection, XSS), data loss bugs
- **high**: Logic bugs gây crash, infinite loops, memory leaks
- **medium**: Performance issues, bad practices, potential bugs
- **low**: Minor suggestions, style (chỉ khi rất cần thiết)

## RULES
1. Chỉ báo lỗi BẠN CHẮC CHẮN 100% là bug thực sự.
2. Code đã có try-except? -> KHÔNG báo "thiếu xử lý lỗi".
3. Nếu không chắc chắn -> Trả về [] (rỗng).
4. PHẢI trả về `severity` cho mỗi issue.

## OUTPUT FORMAT (JSON only, no markdown)
[
  {{
    "filename": "path/to/file.py",
    "line_number": 42,
    "severity": "critical|high|medium|low",
    "comment": "Mô tả vấn đề ngắn gọn bằng tiếng Việt"
  }}
]

## CODE TO REVIEW
{json.dumps(files_data, ensure_ascii=False)}
"""

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a strict code reviewer. Respond with valid JSON only."},
                {"role": "user", "content": prompt}
            ],
        )

        content = response.choices[0].message.content or ""
        content = content.replace("```json", "").replace("```", "").strip()
        if not content: return []
        
        logging.info("AI response received.")
        return json.loads(content)

    except Exception as e:
        logging.error(f"AI Error: {e}")
        return []


def submit_review(pr, comments):
    """Submit review comments."""
    if not comments:
        logging.info("No new issues found.")
        return

    # Check for blocking issues
    has_blocking = any(c.get('severity', '').lower() in BLOCKING_SEVERITIES for c in comments)
    summary = "🚨 **Phát hiện vấn đề nghiêm trọng.**" if has_blocking else "📝 **Góp ý cải thiện code.**"
    event = "REQUEST_CHANGES" if has_blocking else "COMMENT"
    
    review_comments = []
    for note in comments:
        filename = note.get('filename')
        line = int(note.get('line_number', 0))
        if not line or not filename: continue

        severity = note.get('severity', 'medium').lower()
        badge = {'critical': '🔴', 'high': '🟠', 'medium': '🟡', 'low': '🟢'}.get(severity, '⚪')
        body = f"**{badge} {severity.upper()}**\n\n{note.get('comment')}"
        
        review_comments.append({"path": filename, "line": line, "body": body, "side": "RIGHT"})

    try:
        if review_comments:
            pr.create_review(commit=pr.get_commits().reversed[0], body=summary, event=event, comments=review_comments)
            logging.info(f"Submitted review: {event} with {len(review_comments)} comments.")
    except Exception as e:
        logging.error(f"Failed to submit review: {e}")


def main():
    github_token = os.getenv("GITHUB_TOKEN")
    event_path = os.getenv("GITHUB_EVENT_PATH")
    if not github_token or not event_path: return

    try:
        with open(event_path, 'r') as f:
            event_data = json.load(f)
    except Exception: return

    if 'pull_request' not in event_data: return

    pr_number = event_data['pull_request']['number']
    repo_name = event_data['repository']['full_name']
    owner, repo_name_only = repo_name.split('/', 1)

    logging.info(f"🔍 AI Review (Smart Mode) for PR #{pr_number}")
    
    g = Github(github_token)
    repo = g.get_repo(repo_name)

    # 1. Fetch Context & Analyze
    project_context = get_project_context(repo)
    file_list = get_file_list(repo)
    pr, files_data = get_pr_diff(repo, pr_number)
    
    if not files_data:
        logging.info("No files to review.")
        return

    ai_comments = analyze_code_with_openrouter(files_data, project_context, file_list)

    # 2. Smart Auto-Resolve & Sync
    final_comments = manage_review_threads(owner, repo_name_only, pr_number, ai_comments, github_token)

    # 3. Post (only new) comments
    submit_review(pr, final_comments)
    logging.info("Done.")


if __name__ == "__main__":
    main()
