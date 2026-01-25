"""
AI Code Reviewer v2
====================
Automatically reviews Pull Requests using OpenRouter AI and posts reviews with severity-based actions.

Features:
- Severity classification: critical, high, medium, low
- Smart action: Request Changes for critical/high, Comment for medium/low
- Project context injection for better understanding
- Auto-resolve outdated bot comments

Model: mistralai/devstral-2512:free (configurable via MODEL_NAME)
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
                # Limit context size per file
                if len(text) > 2000:
                    text = text[:2000] + "\n...[truncated]..."
                context.append(f"### {filepath}\n{text}")
        except Exception:
            # File doesn't exist, skip silently
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
            # Limit to 100 files for context
            if len(files) >= 100:
                break
        return files
    except Exception as e:
        logging.warning(f"Could not fetch file list: {e}")
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

        # Try to get full file content for better context
        try:
            content = repo.get_contents(file.filename, ref=pr.head.sha)
            if content and hasattr(content, 'decoded_content'):
                full_content = content.decoded_content.decode('utf-8')
                # Limit full content size
                if len(full_content) <= 5000:
                    file_info["full_content"] = full_content
        except Exception:
            pass

        files_data.append(file_info)

    return pr, files_data


def resolve_thread(thread_id, token):
    """Resolve a specific review thread using GraphQL."""
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
        response = requests.post(GITHUB_GRAPHQL_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        if 'errors' in data:
            logging.error(f"GraphQL Error resolving thread: {data['errors']}")
        else:
            logging.info(f"Resolved thread {thread_id}")
    except Exception as e:
        logging.error(f"Failed to resolve thread {thread_id}: {e}")


def resolve_existing_comments(repo_owner, repo_name, pr_number, token):
    """Resolve all unresolved bot review threads on the PR."""
    query = """
    query($owner: String!, $repo: String!, $prNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
          reviewThreads(last: 100) {
            nodes {
              id
              isResolved
              comments(first: 1) {
                nodes { author { login } }
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
            return

        pr_data = data.get('data', {}).get('repository', {}).get('pullRequest')
        if not pr_data:
            return

        threads = pr_data.get('reviewThreads', {}).get('nodes', [])
        bot_threads = []

        for thread in threads:
            if thread.get('isResolved'):
                continue
            comments = thread.get('comments', {}).get('nodes', [])
            if comments:
                author = comments[0].get('author')
                if author and author.get('login') == 'github-actions[bot]':
                    bot_threads.append(thread.get('id'))

        if bot_threads:
            logging.info(f"Resolving {len(bot_threads)} old bot threads...")
            for tid in bot_threads:
                resolve_thread(tid, token)

    except Exception as e:
        logging.error(f"Failed to resolve threads: {e}")


def analyze_code_with_openrouter(files_data, project_context, file_list):
    """Send code to OpenRouter AI for review with severity classification."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        logging.error("OPENROUTER_API_KEY not found.")
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
    except Exception as e:
        logging.error(f"Failed to init OpenAI client: {e}")
        return []

    # Build comprehensive prompt with project context
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

        if not response.choices:
            return []

        content = response.choices[0].message.content or ""
        content = content.strip()

        # Clean markdown formatting
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
        content = content.strip()

        if not content:
            return []

        logging.info("AI response received.")
        return json.loads(content)

    except AuthenticationError:
        logging.error("OpenRouter authentication failed.")
        return []
    except RateLimitError:
        logging.error("OpenRouter rate limit exceeded.")
        return []
    except json.JSONDecodeError as e:
        logging.error(f"JSON parse error: {e}")
        return []
    except Exception as e:
        logging.error(f"OpenRouter error: {e}")
        return []


def submit_review(pr, comments):
    """Submit a PR review with appropriate action based on severity."""
    if not comments:
        logging.info("No issues found. LGTM! ✅")
        return

    try:
        commit = pr.get_commits().reversed[0]
    except Exception as e:
        logging.error(f"Failed to get commit: {e}")
        return

    # Classify comments by severity
    has_blocking = any(c.get('severity', '').lower() in BLOCKING_SEVERITIES for c in comments)

    # Build review body
    summary_parts = []
    if has_blocking:
        summary_parts.append("🚨 **Phát hiện vấn đề nghiêm trọng cần xử lý trước khi merge.**")
    else:
        summary_parts.append("📝 **Một số góp ý để cải thiện code.**")

    summary_parts.append("\n_Đây là AI review tự động. Vui lòng verify trước khi áp dụng._")

    # Determine review event
    event = "REQUEST_CHANGES" if has_blocking else "COMMENT"
    logging.info(f"Submitting review with {len(comments)} comments. Event: {event}")

    # Build review comments
    review_comments = []
    for note in comments:
        filename = note.get('filename')
        line = note.get('line_number')
        severity = note.get('severity', 'medium')
        comment_text = note.get('comment', '')

        if not comment_text or not filename:
            continue

        # Add severity badge
        severity_badge = {
            'critical': '🔴 CRITICAL',
            'high': '🟠 HIGH',
            'medium': '🟡 MEDIUM',
            'low': '🟢 LOW'
        }.get(severity.lower(), '⚪')

        body = f"**{severity_badge}**\n\n{comment_text}"

        # Validate line number
        try:
            line_int = int(line) if line else None
            if line_int and line_int > 0:
                review_comments.append({
                    "path": filename,
                    "line": line_int,
                    "body": body,
                    "side": "RIGHT"
                })
        except (ValueError, TypeError):
            logging.warning(f"Invalid line for {filename}: {line}")

    # Submit review
    try:
        if review_comments:
            pr.create_review(
                commit=commit,
                body="\n".join(summary_parts),
                event=event,
                comments=review_comments
            )
            logging.info(f"Review submitted successfully: {event}")
        else:
            # No valid line comments, post as issue comment
            for note in comments:
                body = f"🤖 **AI Review** ({note.get('severity', 'info').upper()}): {note.get('comment', '')}"
                pr.create_issue_comment(body)

    except GithubException as e:
        logging.error(f"GitHub API error: {e}")
        # Fallback to issue comments
        for note in comments:
            try:
                body = f"🤖 **AI Review**: {note.get('comment', '')}"
                pr.create_issue_comment(body)
            except Exception:
                pass
    except Exception as e:
        logging.error(f"Failed to submit review: {e}")


def main():
    github_token = os.getenv("GITHUB_TOKEN")
    event_path = os.getenv("GITHUB_EVENT_PATH")

    if not github_token or not event_path:
        logging.error("Missing GITHUB_TOKEN or GITHUB_EVENT_PATH.")
        return

    try:
        with open(event_path, 'r') as f:
            event_data = json.load(f)
    except Exception as e:
        logging.error(f"Failed to read event: {e}")
        return

    if 'pull_request' not in event_data:
        logging.info("Not a pull_request event.")
        return

    try:
        pr_number = event_data['pull_request']['number']
        repo_name = event_data['repository']['full_name']
    except KeyError as e:
        logging.error(f"Missing field: {e}")
        return

    if '/' not in repo_name:
        logging.error(f"Invalid repo format: {repo_name}")
        return

    owner_name, repository_name = repo_name.split('/', 1)
    logging.info(f"🔍 Starting AI review for PR #{pr_number} in {repo_name}")

    # Initialize GitHub client
    g = Github(github_token)
    try:
        repo = g.get_repo(repo_name)
    except GithubException as e:
        logging.error(f"Repo access failed: {e}")
        return

    # Step 1: Resolve old bot threads
    logging.info("Resolving old bot comments...")
    resolve_existing_comments(owner_name, repository_name, pr_number, github_token)

    # Step 2: Get project context
    logging.info("Fetching project context...")
    project_context = get_project_context(repo)
    file_list = get_file_list(repo)

    # Step 3: Get PR diff
    pr, files_data = get_pr_diff(repo, pr_number)

    if not files_data:
        logging.info("No reviewable files.")
        return

    logging.info(f"Analyzing {len(files_data)} files...")

    # Step 4: AI Analysis
    comments = analyze_code_with_openrouter(files_data, project_context, file_list)

    # Step 5: Submit review
    submit_review(pr, comments)
    logging.info("🎉 Review complete!")


if __name__ == "__main__":
    main()
