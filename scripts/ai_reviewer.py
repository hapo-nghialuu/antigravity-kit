import os
import json
import logging
from github import Github
from openai import OpenAI

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants
IGNORED_EXTENSIONS = ['.json', '.md', '.txt', '.yml', '.yaml', '.lock', '.png', '.jpg', '.jpeg', '.gif', '.svg']
IGNORED_DIRS = ['dist', 'build', 'node_modules', '.github']
MODEL_NAME = "mistralai/devstral-2512:free"

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

def analyze_code_with_openrouter(files_data):
    """Send code diff to OpenRouter for review."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        logging.error("OPENROUTER_API_KEY not found in environment variables.")
        return []

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
        default_headers={
            "HTTP-Referer": "https://github.com/hapo-nghialuu/antigravity-kit",
            "X-Title": "Antigravity AI Reviewer"
        }
    )

    # Construct Prompt
    # We ask for a strict JSON response.
    prompt = """
    Bạn là một Senior Code Reviewer. Nhiệm vụ của bạn là review các đoạn code thay đổi trong Pull Request này.

    Hãy chỉ ra các vấn đề nghiêm trọng:
    1. Lỗi Logic (Logic Errors) - Rất quan trọng.
    2. Vấn đề Bảo mật (Security Vulnerabilities) - Rất quan trọng.
    3. Hiệu năng (Performance Issues).
    4. Code xấu, khó bảo trì (Bad Practices).

    Bỏ qua:
    - Các lỗi format/style (đã có linter).
    - Các thay đổi không quan trọng.

    Dữ liệu input là JSON list các file kèm patch.
    Hãy trả về kết quả là một JSON list thuần túy (không markdown block, không giải thích thêm), mỗi item có format sau:
    [
        {
            "filename": "tên_file",
            "line_number": số_dòng_trong_patch_để_comment,
            "comment": "Nội dung review bằng tiếng Việt, ngắn gọn, súc tích."
        }
    ]

    Nếu code tốt hoàn toàn, hãy trả về danh sách rỗng [].

    CODE DIFF TO REVIEW:
    """ + json.dumps(files_data)

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful code reviewer. Always respond with valid JSON code only. No markdown formatting."},
                {"role": "user", "content": prompt}
            ],
            # Note: response_format={"type": "json_object"} sometimes requires 'json' in prompt or specific model support.
            # We trust the prompt instruction for now.
        )

        content = response.choices[0].message.content.strip()

        # Strip markdown code blocks if present (common issue with LLMs)
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]

        content = content.strip()

        if not content:
            logging.warning("Received empty response from OpenRouter.")
            return []

        logging.info("OpenRouter response received.")
        return json.loads(content)
    except json.JSONDecodeError:
        logging.error(f"Failed to parse JSON response: {content}")
        return []
    except Exception as e:
        logging.error(f"Error calling OpenRouter: {e}")
        return []

def post_comments(pr, comments):
    """Post comments to the PR."""
    commit = pr.get_commits().reversed[0] # Get latest commit

    if not comments:
        logging.info("No issues found. LGTM!")
        return

    logging.info(f"Posting {len(comments)} comments...")

    for note in comments:
        filename = note.get('filename')
        line = note.get('line_number') # AI guess of the line
        comment_text = note.get('comment')

        if not comment_text:
            continue

        body = f"🤖 **AI Review**: {comment_text}"

        try:
            # Validate line number
            if not line or not str(line).isdigit():
                pr.create_issue_comment(f"File `{filename}`: {body}")
                continue

            pr.create_review_comment(body, commit, filename, line=int(line), side="RIGHT")
        except Exception as e:
            logging.warning(f"Failed to post comment on {filename}:{line}. Error: {e}")
            pr.create_issue_comment(f"Could not comment on line {line} of {filename}. \n\n{body}")

def main():
    github_token = os.getenv("GITHUB_TOKEN")
    event_path = os.getenv("GITHUB_EVENT_PATH")

    if not github_token or not event_path:
        logging.error("Missing GITHUB_TOKEN or GITHUB_EVENT_PATH.")
        return

    with open(event_path, 'r') as f:
        event_data = json.load(f)

    if 'pull_request' not in event_data:
        logging.info("Not a pull_request event. Exiting.")
        return

    pr_number = event_data['pull_request']['number']
    repo_name = event_data['repository']['full_name']

    logging.info(f"Starting review for PR #{pr_number} in {repo_name}")

    g = Github(github_token)
    repo = g.get_repo(repo_name)
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
