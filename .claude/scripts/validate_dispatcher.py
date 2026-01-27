#!/usr/bin/env python3
"""
Validation Dispatcher for Antigravity Kit
==========================================

Routes validation scripts based on file type and context.
Called by hooks after Edit/Write operations.

Usage:
    python3 validate_dispatcher.py --file <path> --tool <edit|write>
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Optional

# ANSI colors for terminal output
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'


# Mapping of file patterns to validator scripts
VALIDATOR_MAP = {
    # React/Next.js
    '.tsx': {
        'validators': ['react_performance_checker.py'],
        'skill': 'nextjs-react-expert',
        'description': 'React performance validation'
    },
    '.jsx': {
        'validators': ['react_performance_checker.py'],
        'skill': 'nextjs-react-expert',
        'description': 'React performance validation'
    },

    # TypeScript
    '.ts': {
        'validators': ['type_coverage.py'],
        'skill': 'lint-and-validate',
        'description': 'TypeScript type coverage'
    },

    # Python
    '.py': {
        'validators': ['lint_runner.py'],
        'skill': 'lint-and-validate',
        'description': 'Python linting'
    },

    # Database
    'schema.prisma': {
        'validators': ['schema_validator.py'],
        'skill': 'database-design',
        'description': 'Prisma schema validation'
    },

    # API routes
    'api/': {
        'validators': ['api_validator.py'],
        'skill': 'api-patterns',
        'description': 'API design validation'
    },
    'routes/': {
        'validators': ['api_validator.py'],
        'skill': 'api-patterns',
        'description': 'API design validation'
    },

    # Security
    '.env': {
        'validators': ['security_scan.py'],
        'skill': 'vulnerability-scanner',
        'description': 'Security scan for secrets'
    },

    # Accessibility
    '.html': {
        'validators': ['accessibility_checker.py'],
        'skill': 'frontend-design',
        'description': 'Accessibility audit'
    },

    # SEO
    'metadata': {
        'validators': ['seo_checker.py'],
        'skill': 'seo-fundamentals',
        'description': 'SEO validation'
    },

    # Mobile
    'App.tsx': {
        'validators': ['mobile_audit.py'],
        'skill': 'mobile-design',
        'description': 'Mobile design audit'
    },

    # i18n
    'i18n': {
        'validators': ['i18n_checker.py'],
        'skill': 'i18n-localization',
        'description': 'Internationalization check'
    },

    # Geo
    'geo': {
        'validators': ['geo_checker.py'],
        'skill': 'geo-fundamentals',
        'description': 'Geolocation validation'
    },

    # UX audit
    '.css': {
        'validators': ['ux_audit.py'],
        'skill': 'frontend-design',
        'description': 'UX design audit'
    },
}


def detect_validators(file_path: str) -> List[dict]:
    """
    Detect which validators should run based on file path.

    Returns:
        List of validator configs: [{'script': str, 'skill': str, 'description': str}, ...]
    """
    path = Path(file_path)
    validators = []

    # Check file extension
    ext = path.suffix
    if ext in VALIDATOR_MAP:
        config = VALIDATOR_MAP[ext]
        for script in config['validators']:
            validators.append({
                'script': script,
                'skill': config['skill'],
                'description': config['description']
            })

    # Check file name
    filename = path.name
    for pattern, config in VALIDATOR_MAP.items():
        if pattern in filename:
            for script in config['validators']:
                validators.append({
                    'script': script,
                    'skill': config['skill'],
                    'description': config['description']
                })

    # Check path patterns
    file_path_str = str(path)
    for pattern, config in VALIDATOR_MAP.items():
        if '/' in pattern and pattern in file_path_str:
            for script in config['validators']:
                validators.append({
                    'script': script,
                    'skill': config['skill'],
                    'description': config['description']
                })

    # Remove duplicates
    seen = set()
    unique_validators = []
    for v in validators:
        key = (v['script'], v['skill'])
        if key not in seen:
            seen.add(key)
            unique_validators.append(v)

    return unique_validators


def find_validator_path(script_name: str, skill_name: str) -> Optional[Path]:
    """
    Find the full path to a validator script.

    Args:
        script_name: Name of the script (e.g., 'react_performance_checker.py')
        skill_name: Name of the skill (e.g., 'nextjs-react-expert')

    Returns:
        Path to the script, or None if not found
    """
    # Try .claude/ first
    claude_path = Path('.claude/skills') / skill_name / 'scripts' / script_name
    if claude_path.exists():
        return claude_path

    # Fallback to .agent/
    agent_path = Path('.agent/skills') / skill_name / 'scripts' / script_name
    if agent_path.exists():
        return agent_path

    return None


def run_validator(script_path: Path, file_path: str, description: str) -> bool:
    """
    Execute a validator script.

    Args:
        script_path: Path to the validator script
        file_path: Path to the file being validated
        description: Description of what this validator does

    Returns:
        True if validation passed, False if issues found
    """
    print(f"\n{Colors.BLUE}▶{Colors.ENDC} Running {description}...")
    print(f"  {Colors.BOLD}Script:{Colors.ENDC} {script_path}")
    print(f"  {Colors.BOLD}Target:{Colors.ENDC} {file_path}")

    try:
        result = subprocess.run(
            ['python3', str(script_path), file_path],
            capture_output=True,
            text=True,
            timeout=30
        )

        if result.returncode == 0:
            print(f"{Colors.GREEN}✅ Validation passed{Colors.ENDC}")
            if result.stdout:
                print(result.stdout)
            return True
        else:
            print(f"{Colors.YELLOW}⚠️  Issues found{Colors.ENDC}")
            if result.stdout:
                print(result.stdout)
            if result.stderr:
                print(f"{Colors.RED}{result.stderr}{Colors.ENDC}")
            return False

    except subprocess.TimeoutExpired:
        print(f"{Colors.RED}❌ Validation timed out (30s limit){Colors.ENDC}")
        return False
    except Exception as e:
        print(f"{Colors.RED}❌ Error running validator: {e}{Colors.ENDC}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Validation dispatcher for Antigravity Kit"
    )
    parser.add_argument('--file', required=True, help="File path to validate")
    parser.add_argument('--tool', required=True, choices=['edit', 'write'],
                       help="Tool that triggered validation")
    parser.add_argument('--quiet', action='store_true',
                       help="Suppress output (only show issues)")

    args = parser.parse_args()

    file_path = args.file

    # Skip validation for certain files
    skip_patterns = ['.md', '.json', '.txt', '.gitignore', 'README']
    if any(pattern in file_path for pattern in skip_patterns):
        if not args.quiet:
            print(f"{Colors.BLUE}ℹ️  Skipping validation for {file_path}{Colors.ENDC}")
        return

    if not args.quiet:
        print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        print(f"{Colors.BOLD}Antigravity Kit - Validation Dispatcher{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        print(f"\n{Colors.BOLD}File:{Colors.ENDC} {file_path}")
        print(f"{Colors.BOLD}Tool:{Colors.ENDC} {args.tool}")

    # Detect relevant validators
    validators = detect_validators(file_path)

    if not validators:
        if not args.quiet:
            print(f"\n{Colors.BLUE}ℹ️  No validators configured for this file type{Colors.ENDC}")
        return

    if not args.quiet:
        print(f"\n{Colors.BOLD}Validators to run:{Colors.ENDC} {len(validators)}")

    # Run each validator
    all_passed = True
    for validator in validators:
        script_path = find_validator_path(validator['script'], validator['skill'])

        if not script_path:
            print(f"{Colors.YELLOW}⚠️  Validator not found: {validator['script']} (skill: {validator['skill']}){Colors.ENDC}")
            continue

        passed = run_validator(script_path, file_path, validator['description'])
        if not passed:
            all_passed = False

    # Summary
    if not args.quiet:
        print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        if all_passed:
            print(f"{Colors.GREEN}{Colors.BOLD}✅ All validations passed{Colors.ENDC}")
        else:
            print(f"{Colors.YELLOW}{Colors.BOLD}⚠️  Some validations found issues{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}\n")


if __name__ == '__main__':
    main()
