"""
AI Code Reviewer Script
=======================
Automatically reviews Pull Requests using OpenRouter AI (Mistral) and posts comments.
Includes auto-resolve functionality for outdated bot comments using GitHub GraphQL API.

Model: mistralai/devstral-2512:free
Note: This is a free-tier model. For production use, consider a paid model for better reliability.
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
IGNORED_DIRS = ['dist', 'build', 'node_modules', '.github']
# Free tier model from OpenRouter - may have rate limits or availability issues
MODEL_NAME = "mistralai/devstral-2512:free"
GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"


def should_review(filename):
    """Check if file should be reviewed based on extension and path."""
    if any(filename.endswith(ext) for ext in IGNORED_EXTENSIONS):
        return False
    if any(part in filename.split('/') for part in IGNORED_DIRS):
        return False
    return True


def get_pr_diff(repo, pr_number):
    """Fetch PR diff using PyGithub."""
    pr = repo.get_pull(pr_number)
    files_data = []

    for file in pr.get_files():
        if not should_review(file.filename):
            continue

        # Only review added or modified files (not deleted)
        if file.status == 'removed':
            continue

        files_data.append({
            "filename": file.filename,
            "patch": file.patch
        })
    return pr, files_data


def resolve_thread(thread_id, token):
    """Resolve a specific review thread using GraphQL."""
    mutation = """
    mutation ResolveThread($threadId: ID!) {
      resolveReviewThread(input: {threadId: $threadId}) {
        thread {
          isResolved
        }
      }
    }
    """
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "query": mutation,
        "variables": {"threadId": thread_id}
    }

    try:
        response = requests.post(GITHUB_GRAPHQL_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        if 'errors' in data:
            logging.error(f"GraphQL Error resolving thread {thread_id}: {data['errors']}")
        else:
            logging.info(f"Resolved thread {thread_id}")
    except requests.exceptions.RequestException as e:
        logging.error(f"Network error resolving thread {thread_id}: {e}")
    except Exception as e:
        logging.error(f"Failed to resolve thread {thread_id}: {e}")


def resolve_existing_comments(repo_owner, repo_name, pr_number, token):
    """
    Fetch all unresolved review threads on the PR and resolve them if they were created by the bot.
    Uses safe navigation to handle unexpected API response structures.
    """
    query = """
    query($owner: String!, $repo: String!, $prNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
          id
          reviewThreads(last: 50) {
            nodes {
              id
              isResolved
              comments(first: 1) {
                nodes {
                  author {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
    """
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "query": query,
        "variables": {
            "owner": repo_owner,
            "repo": repo_name,
            "prNumber": pr_number
        }
    }

    try:
        response = requests.post(GITHUB_GRAPHQL_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        if 'errors' in data:
            logging.error(f"GraphQL Error fetching threads: {data['errors']}")
            return

        # Safe navigation to handle unexpected response structures
        pr_data = data.get('data', {}).get('repository', {}).get('pullRequest')
        if not pr_data:
            logging.warning("Could not find PR data in GraphQL response. Skipping auto-resolve.")
            return

        threads = pr_data.get('reviewThreads', {}).get('nodes', [])
        if not threads:
            logging.info("No review threads found.")
            return

        bot_threads = []

        for thread in threads:
            if thread.get('isResolved'):
                continue

            # Check author of the first comment in thread
            comments = thread.get('comments', {}).get('nodes', [])
            if not comments:
                continue

            author = comments[0].get('author')
            # Author can be None if user is deleted
            if author and author.get('login') == 'github-actions[bot]':
                bot_threads.append(thread.get('id'))

        if not bot_threads:
            logging.info("No unresolved bot threads found.")
            return

        logging.info(f"Found {len(bot_threads)} unresolved bot threads. Resolving...")
        for thread_id in bot_threads:
            resolve_thread(thread_id, token)

    except requests.exceptions.RequestException as e:
        logging.error(f"Network error fetching threads: {e}")
    except Exception as e:
        logging.error(f"Failed to fetch/resolve threads: {e}")


def analyze_code_with_openrouter(files_data):
    """Send code diff to OpenRouter for review."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        logging.error("OPENROUTER_API_KEY not found in environment variables.")
        return []

    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
            default_headers={
                "HTTP-Referer": "https://github.com/hapo-nghialuu/antigravity-kit",
                "X-Title": "Antigravity AI Reviewer"
            }
        )
    except Exception as e:
        logging.error(f"Failed to initialize OpenAI client: {e}")
        return []

    # Construct Prompt - Strict version to reduce false positives
    prompt = """
    Bạn là một Senior Code Reviewer RẤT NGHIÊM KHẮC. Chỉ báo lỗi khi BẠN CHẮC CHẮN 100% đó là bug thực sự.

    CHỈ BÁO LỖI KHI:
    1. Lỗi Logic NGHIÊM TRỌNG sẽ gây crash hoặc sai kết quả (VÀ chưa có try-catch xử lý).
    2. Lỗ hổng Bảo mật THỰC SỰ (SQL Injection, XSS, hardcoded secrets, v.v.).

    KHÔNG BÁO (BỎ QUA HOÀN TOÀN):
    - Code đã có try-except bọc -> Đừng báo "thiếu xử lý lỗi".
    - Các edge case hiếm khi xảy ra (ví dụ: API key expired) nếu đã có log/return.
    - Style/format (đã có linter).
    - Gợi ý cải thiện (improvements) - chỉ báo BUG thực sự.
    - Các comment về "nên thêm validation" nếu code đã validate.

    QUY TẮC VÀNG: Nếu bạn không chắc 100%, KHÔNG báo. Trả về [] (rỗng).

    Dữ liệu input là JSON list các file kèm patch.
    Hãy trả về kết quả là một JSON list thuần túy (không markdown block, không giải thích thêm):
    [
        {
            "filename": "tên_file",
            "line_number": số_dòng_trong_patch_để_comment,
            "comment": "Mô tả BUG thực sự, ngắn gọn."
        }
    ]

    Nếu code tốt hoặc bạn không chắc chắn, trả về [].

    CODE DIFF TO REVIEW:
    """ + json.dumps(files_data)

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful code reviewer. Always respond with valid JSON code only. No markdown formatting."},
                {"role": "user", "content": prompt}
            ],
        )

        # Safely access response content
        if not response.choices:
            logging.warning("OpenRouter returned no choices.")
            return []

        content = response.choices[0].message.content
        if not content:
            logging.warning("OpenRouter response has empty content.")
            return []

        content = content.strip()

        # Strip markdown code blocks if present (common issue with LLMs)
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]

        content = content.strip()

        if not content:
            logging.warning("Received empty response from OpenRouter after cleanup.")
            return []

        logging.info("OpenRouter response received.")
        return json.loads(content)
    except AuthenticationError:
        logging.error("OpenRouter API Key authentication failed. Check your API key.")
        return []
    except RateLimitError:
        logging.error("OpenRouter API Rate limit exceeded.")
        return []
    except json.JSONDecodeError as e:
        logging.error(f"Failed to parse JSON response: {e}")
        return []
    except Exception as e:
        logging.error(f"Error calling OpenRouter: {e}")
        return []


def post_comments(pr, comments):
    """Post comments to the PR."""
    try:
        commit = pr.get_commits().reversed[0]  # Get latest commit
    except Exception as e:
        logging.error(f"Failed to get latest commit: {e}")
        return

    if not comments:
        logging.info("No issues found. LGTM!")
        return

    logging.info(f"Posting {len(comments)} comments...")

    for note in comments:
        filename = note.get('filename')
        line = note.get('line_number')
        comment_text = note.get('comment')

        if not comment_text:
            continue

        body = f"🤖 **AI Review**: {comment_text}"

        try:
            # Validate line number - must be a positive integer
            if not line:
                pr.create_issue_comment(f"File `{filename}`: {body}")
                continue

            # Handle both int and string types for line number
            try:
                line_int = int(line)
                if line_int <= 0:
                    raise ValueError("Line number must be positive")
            except (ValueError, TypeError):
                logging.warning(f"Invalid line number '{line}' for {filename}. Posting as issue comment.")
                pr.create_issue_comment(f"File `{filename}`: {body}")
                continue

            pr.create_review_comment(body, commit, filename, line=line_int, side="RIGHT")
        except GithubException as e:
            logging.warning(f"GitHub API error posting comment on {filename}:{line}. Error: {e}")
            try:
                pr.create_issue_comment(f"Could not comment on line {line} of {filename}.\n\n{body}")
            except Exception as fallback_error:
                logging.error(f"Failed to post fallback comment: {fallback_error}")
        except Exception as e:
            logging.warning(f"Failed to post comment on {filename}:{line}. Error: {e}")


def main():
    github_token = os.getenv("GITHUB_TOKEN")
    event_path = os.getenv("GITHUB_EVENT_PATH")

    if not github_token or not event_path:
        logging.error("Missing GITHUB_TOKEN or GITHUB_EVENT_PATH.")
        return

    try:
        with open(event_path, 'r') as f:
            event_data = json.load(f)
    except (IOError, json.JSONDecodeError) as e:
        logging.error(f"Failed to read event file: {e}")
        return

    # Handle pull_request event
    if 'pull_request' not in event_data:
        logging.info("Not a pull_request event. Exiting.")
        return

    # Safely extract required fields from event_data
    try:
        pr_number = event_data['pull_request']['number']
        repo_name = event_data['repository']['full_name']
    except KeyError as e:
        logging.error(f"Missing required field in event data: {e}")
        return

    # Extract owner and repo name properly
    if '/' not in repo_name:
        logging.error(f"Invalid repo name format: {repo_name} (Slash missing)")
        return

    try:
        # Split only on the first slash to handle potential edge cases safely
        owner_name, repository_name = repo_name.split('/', 1)
    except ValueError:
        logging.error(f"Invalid repo name format: {repo_name}")
        return

    logging.info(f"Starting review for PR #{pr_number} in {repo_name}")

    # 1. Initialize PyGithub with permission check
    g = Github(github_token)
    try:
        repo = g.get_repo(repo_name)
    except GithubException as e:
        logging.error(f"Failed to access repo {repo_name}. Check token permissions. Error: {e}")
        return
    except Exception as e:
        logging.error(f"Unexpected error accessing repo: {e}")
        return

    # 2. AUTO-RESOLVE OLD THREADS
    logging.info("Checking for unresolved bot threads...")
    resolve_existing_comments(owner_name, repository_name, pr_number, github_token)

    # 3. Analyze new code
    pr, files_data = get_pr_diff(repo, pr_number)

    if not files_data:
        logging.info("No reviewable files found.")
        return

    logging.info(f"Analyzing {len(files_data)} files...")
    comments = analyze_code_with_openrouter(files_data)
    post_comments(pr, comments)
    logging.info("Review complete.")


if __name__ == "__main__":
    main()
