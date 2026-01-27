#!/usr/bin/env python3
"""
Bootstrap/Indexing System for Antigravity Kit
==============================================

Scans agents, skills, workflows and generates:
- index.json (master registry)
- routing.json (keyword mappings)
- metadata.json (per agent/skill)

Usage:
    python .claude/scripts/bootstrap.py --source .agent/ --target .claude/
    python .claude/scripts/bootstrap.py --rebuild  # Rebuild from .claude/
    python .claude/scripts/bootstrap.py --extract-agent path/to/agent.md
    python .claude/scripts/bootstrap.py --extract-skill path/to/SKILL.md
    python .claude/scripts/bootstrap.py --build-index
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

try:
    import yaml
except ImportError:
    print("Error: pyyaml not installed. Run: pip install pyyaml")
    sys.exit(1)

# ANSI colors for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'


# Stopwords for keyword extraction (filter common words)
STOPWORDS = {
    'a', 'an', 'the', 'and', 'or', 'but', 'for', 'with', 'on', 'in', 'at',
    'to', 'from', 'of', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'can', 'could', 'may', 'might', 'must', 'use', 'used', 'using', 'this',
    'that', 'these', 'those', 'when', 'where', 'why', 'how', 'all', 'any'
}


def print_header(text: str):
    """Print styled header"""
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(60)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}\n")


def print_success(text: str):
    """Print success message"""
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")


def print_warning(text: str):
    """Print warning message"""
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")


def print_error(text: str):
    """Print error message"""
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")


def extract_yaml_frontmatter(file_path: Path) -> Optional[Dict]:
    """
    Extract YAML frontmatter from markdown file.

    Format:
        ---
        key: value
        ---

    Returns:
        dict or None if no frontmatter found
    """
    try:
        content = file_path.read_text(encoding='utf-8')

        # Match YAML frontmatter: ^---\n(.*?)\n---
        pattern = r'^---\n(.*?)\n---'
        match = re.search(pattern, content, re.DOTALL | re.MULTILINE)

        if not match:
            return None

        yaml_content = match.group(1)
        frontmatter = yaml.safe_load(yaml_content)

        return frontmatter

    except Exception as e:
        print_error(f"Failed to extract frontmatter from {file_path}: {e}")
        return None


def extract_keywords_from_description(description: str) -> List[str]:
    """
    Extract relevant keywords from description text.

    Algorithm:
    1. Lowercase and tokenize
    2. Filter stopwords
    3. Remove special characters
    4. Return unique keywords
    """
    # Lowercase
    text = description.lower()

    # Tokenize (split by whitespace and common separators)
    tokens = re.findall(r'\b\w+\b', text)

    # Filter stopwords and short tokens
    keywords = [
        token for token in tokens
        if token not in STOPWORDS and len(token) > 2
    ]

    # Return unique keywords (preserve order)
    seen = set()
    unique_keywords = []
    for kw in keywords:
        if kw not in seen:
            seen.add(kw)
            unique_keywords.append(kw)

    return unique_keywords


def build_agent_metadata(agent_file: Path, target_dir: Path) -> Dict:
    """
    Build metadata.json for an agent.

    Args:
        agent_file: Path to agent .md file
        target_dir: Target directory for metadata.json

    Returns:
        metadata dict
    """
    frontmatter = extract_yaml_frontmatter(agent_file)

    if not frontmatter:
        print_warning(f"No frontmatter in {agent_file.name}, skipping")
        return None

    # Extract routing keywords from description
    description = frontmatter.get('description', '')
    routing_keywords = extract_keywords_from_description(description)

    # Build metadata
    metadata = {
        'name': frontmatter.get('name', agent_file.stem),
        'description': description,
        'tools': frontmatter.get('tools', []),
        'model': frontmatter.get('model', 'inherit'),
        'skills': frontmatter.get('skills', []),
        'routing_keywords': routing_keywords,
        'priority': frontmatter.get('priority', 5),
        'category': frontmatter.get('category', 'general'),
        'activation_trigger': 'keyword_match',
        'file_ownership': frontmatter.get('file_ownership', [])
    }

    # Create agent folder in target
    agent_folder = target_dir / 'agents' / metadata['name']
    agent_folder.mkdir(parents=True, exist_ok=True)

    # Copy original .md file
    target_md = agent_folder / 'agent.md'
    target_md.write_text(agent_file.read_text(encoding='utf-8'), encoding='utf-8')

    # Write metadata.json
    metadata_file = agent_folder / 'metadata.json'
    metadata_file.write_text(json.dumps(metadata, indent=2), encoding='utf-8')

    print_success(f"Generated metadata for agent: {metadata['name']}")

    return metadata


def build_skill_metadata(skill_file: Path, target_dir: Path) -> Dict:
    """
    Build metadata.json for a skill.

    Args:
        skill_file: Path to SKILL.md file
        target_dir: Target directory for metadata.json

    Returns:
        metadata dict
    """
    frontmatter = extract_yaml_frontmatter(skill_file)

    if not frontmatter:
        print_warning(f"No frontmatter in {skill_file.name}, skipping")
        return None

    # Extract routing keywords
    description = frontmatter.get('description', '')
    routing_keywords = extract_keywords_from_description(description)

    # Find skill folder (parent of SKILL.md)
    skill_folder_src = skill_file.parent
    skill_name = frontmatter.get('name', skill_folder_src.name)

    # Build metadata
    metadata = {
        'name': skill_name,
        'description': description,
        'allowed_tools': frontmatter.get('allowed-tools', frontmatter.get('allowed_tools', [])),
        'impact_priority': frontmatter.get('priority', 'MEDIUM'),
        'routing_keywords': routing_keywords,
        'validation_script': None,
        'progressive_loading': {
            'entry_point': 'SKILL.md',
            'on_demand_sections': []
        }
    }

    # Check for validation script
    scripts_dir = skill_folder_src / 'scripts'
    if scripts_dir.exists():
        py_scripts = list(scripts_dir.glob('*.py'))
        if py_scripts:
            # Use first .py script found
            metadata['validation_script'] = f"scripts/{py_scripts[0].name}"

    # Check for references
    references_dir = skill_folder_src / 'references'
    if references_dir.exists():
        ref_files = list(references_dir.glob('*.md'))
        metadata['progressive_loading']['on_demand_sections'] = [
            f"references/{f.name}" for f in ref_files
        ]

    # Create skill folder in target
    skill_folder_target = target_dir / 'skills' / skill_name
    skill_folder_target.mkdir(parents=True, exist_ok=True)

    # Copy SKILL.md
    target_md = skill_folder_target / 'SKILL.md'
    target_md.write_text(skill_file.read_text(encoding='utf-8'), encoding='utf-8')

    # Copy scripts/ if exists
    if scripts_dir.exists():
        target_scripts = skill_folder_target / 'scripts'
        target_scripts.mkdir(exist_ok=True)
        for script in scripts_dir.glob('*.py'):
            (target_scripts / script.name).write_text(script.read_text(encoding='utf-8'), encoding='utf-8')

    # Copy references/ if exists
    if references_dir.exists():
        target_refs = skill_folder_target / 'references'
        target_refs.mkdir(exist_ok=True)
        for ref in references_dir.glob('*.md'):
            (target_refs / ref.name).write_text(ref.read_text(encoding='utf-8'), encoding='utf-8')

    # Write metadata.json
    metadata_file = skill_folder_target / 'metadata.json'
    metadata_file.write_text(json.dumps(metadata, indent=2), encoding='utf-8')

    print_success(f"Generated metadata for skill: {skill_name}")

    return metadata


def generate_master_index(agents: List[Dict], skills: List[Dict], workflows: List[Dict], target_dir: Path) -> Dict:
    """
    Generate master index.json file.

    Args:
        agents: List of agent metadata dicts
        skills: List of skill metadata dicts
        workflows: List of workflow metadata dicts
        target_dir: Target directory for index.json

    Returns:
        index dict
    """
    index = {
        'version': '1.0.0',
        'last_indexed': datetime.now().isoformat(),
        'statistics': {
            'total_agents': len(agents),
            'total_skills': len(skills),
            'total_workflows': len(workflows)
        },
        'agents': {},
        'skills': {},
        'workflows': {}
    }

    # Add agents
    for agent in agents:
        if agent:
            index['agents'][agent['name']] = {
                'path': f"agents/{agent['name']}",
                'priority': agent.get('priority', 5)
            }

    # Add skills
    for skill in skills:
        if skill:
            index['skills'][skill['name']] = {
                'path': f"skills/{skill['name']}",
                'impact': skill.get('impact_priority', 'MEDIUM')
            }

    # Add workflows (if any)
    for workflow in workflows:
        if workflow:
            index['workflows'][workflow['name']] = {
                'path': f"workflows/{workflow['name']}.md",
                'type': workflow.get('type', 'general')
            }

    # Write index.json
    index_file = target_dir / 'index.json'
    index_file.write_text(json.dumps(index, indent=2), encoding='utf-8')

    print_success(f"Generated master index: {index_file}")

    return index


def generate_routing_map(agents: List[Dict], skills: List[Dict], target_dir: Path) -> Dict:
    """
    Generate routing.json file with keyword mappings.

    Args:
        agents: List of agent metadata dicts
        skills: List of skill metadata dicts
        target_dir: Target directory for routing.json

    Returns:
        routing dict
    """
    keyword_map = {}

    # Aggregate keywords from agents
    for agent in agents:
        if not agent:
            continue

        for keyword in agent.get('routing_keywords', []):
            if keyword not in keyword_map:
                keyword_map[keyword] = {
                    'agents': [],
                    'skills': [],
                    'score': 5  # Default score
                }

            if agent['name'] not in keyword_map[keyword]['agents']:
                keyword_map[keyword]['agents'].append(agent['name'])

    # Aggregate keywords from skills
    for skill in skills:
        if not skill:
            continue

        for keyword in skill.get('routing_keywords', []):
            if keyword not in keyword_map:
                keyword_map[keyword] = {
                    'agents': [],
                    'skills': [],
                    'score': 5
                }

            if skill['name'] not in keyword_map[keyword]['skills']:
                keyword_map[keyword]['skills'].append(skill['name'])

    routing = {
        'version': '1.0.0',
        'routing_strategy': 'keyword_scoring',
        'keyword_map': keyword_map,
        'fallback_agent': 'orchestrator',
        'multi_match_threshold': 3
    }

    # Write routing.json
    routing_file = target_dir / 'routing.json'
    routing_file.write_text(json.dumps(routing, indent=2), encoding='utf-8')

    print_success(f"Generated routing map: {routing_file}")

    return routing


def main():
    parser = argparse.ArgumentParser(
        description="Bootstrap Antigravity Kit - Generate indexes and metadata",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    parser.add_argument('--source', type=Path, help="Source directory (.agent/)")
    parser.add_argument('--target', type=Path, help="Target directory (.claude/)")
    parser.add_argument('--rebuild', action='store_true', help="Rebuild from .claude/")
    parser.add_argument('--extract-agent', type=Path, help="Extract metadata from single agent file")
    parser.add_argument('--extract-skill', type=Path, help="Extract metadata from single skill file")
    parser.add_argument('--build-index', action='store_true', help="Build master index from .claude/")

    args = parser.parse_args()

    print_header("🚀 ANTIGRAVITY KIT - BOOTSTRAP")

    # Mode 1: Extract single agent
    if args.extract_agent:
        if not args.target:
            print_error("--target required when using --extract-agent")
            sys.exit(1)

        build_agent_metadata(args.extract_agent, args.target)
        return

    # Mode 2: Extract single skill
    if args.extract_skill:
        if not args.target:
            print_error("--target required when using --extract-skill")
            sys.exit(1)

        build_skill_metadata(args.extract_skill, args.target)
        return

    # Mode 3: Build index from existing .claude/
    if args.build_index:
        target = Path('.claude')
        print(f"Building index from: {target}")

        agents = []
        skills = []

        # Load agent metadata
        agents_dir = target / 'agents'
        if agents_dir.exists():
            for agent_folder in agents_dir.iterdir():
                if agent_folder.is_dir():
                    metadata_file = agent_folder / 'metadata.json'
                    if metadata_file.exists():
                        metadata = json.loads(metadata_file.read_text())
                        agents.append(metadata)

        # Load skill metadata
        skills_dir = target / 'skills'
        if skills_dir.exists():
            for skill_folder in skills_dir.iterdir():
                if skill_folder.is_dir():
                    metadata_file = skill_folder / 'metadata.json'
                    if metadata_file.exists():
                        metadata = json.loads(metadata_file.read_text())
                        skills.append(metadata)

        generate_master_index(agents, skills, [], target)
        generate_routing_map(agents, skills, target)
        return

    # Mode 4: Full migration (--source and --target)
    if args.source and args.target:
        source = args.source
        target = args.target

        print(f"Source: {source}")
        print(f"Target: {target}")

        # Process all agents
        agents = []
        agents_dir = source / 'agents'
        if agents_dir.exists():
            print(f"\nProcessing agents from: {agents_dir}")
            for agent_file in agents_dir.glob('*.md'):
                metadata = build_agent_metadata(agent_file, target)
                if metadata:
                    agents.append(metadata)

        # Process all skills
        skills = []
        skills_dir = source / 'skills'
        if skills_dir.exists():
            print(f"\nProcessing skills from: {skills_dir}")
            for skill_folder in skills_dir.iterdir():
                if skill_folder.is_dir():
                    skill_file = skill_folder / 'SKILL.md'
                    if skill_file.exists():
                        metadata = build_skill_metadata(skill_file, target)
                        if metadata:
                            skills.append(metadata)

        # Generate master index and routing
        print("\n")
        generate_master_index(agents, skills, [], target)
        generate_routing_map(agents, skills, target)

        print_header("📊 SUMMARY")
        print(f"Agents processed: {len(agents)}")
        print(f"Skills processed: {len(skills)}")
        print(f"\n✨ Bootstrap complete! Check {target}/index.json")

        return

    # No valid mode
    parser.print_help()


if __name__ == '__main__':
    main()
