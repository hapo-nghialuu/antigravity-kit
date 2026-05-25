#!/usr/bin/env node
/**
 * CafeKit skill catalog scanner.
 *
 * This mirrors the Research/.claude approach: expose the installed skill set as
 * a readable catalog so the model can choose skills from rules, not from an
 * automatic prompt-scoring hook.
 */

const fs = require('fs');
const path = require('path');

function usage() {
  console.log(`Usage:
  node .claude/scripts/generate-skill-catalog.cjs [--skills] [--json] [--root <skills-dir>]

Examples:
  node .claude/scripts/generate-skill-catalog.cjs --skills
  node .claude/scripts/generate-skill-catalog.cjs --json --root .claude/skills`);
}

function parseArgs(argv) {
  const args = { json: false, help: false, root: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') args.help = true;
    else if (arg === '--json') args.json = true;
    else if (arg === '--skills') continue;
    else if (arg === '--root') {
      args.root = argv[i + 1] || null;
      i += 1;
    } else {
      args.root = args.root || arg;
    }
  }
  return args;
}

function defaultSkillsRoot() {
  const installed = path.resolve(process.cwd(), '.claude', 'skills');
  if (fs.existsSync(installed)) return installed;
  return path.resolve(__dirname, '..', 'skills');
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return {};
  const frontmatter = {};
  const lines = match[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    if (value === '>' || value === '>-' || value === '|' || value === '|-') {
      const block = [];
      i += 1;
      while (i < lines.length && /^\s+/.test(lines[i])) {
        block.push(lines[i].trim());
        i += 1;
      }
      i -= 1;
      value = block.join(' ');
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }
  return frontmatter;
}

function firstParagraph(content) {
  const body = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  const paragraph = [];
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      if (paragraph.length > 0) break;
      continue;
    }
    paragraph.push(line);
    if (paragraph.join(' ').length > 160) break;
  }
  return paragraph.join(' ').slice(0, 360);
}

function categorize(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  if (/spec|brainstorm|develop|sync/.test(text)) return 'workflow';
  if (/debug|hotfix|inspect|impact|review|test|agent-browser|chrome/.test(text)) return 'quality';
  if (/frontend|react|ui|ux|mobile/.test(text)) return 'frontend-mobile';
  if (/pdf|docx|pptx|xlsx|multimodal/.test(text)) return 'artifacts-tools';
  if (/backend|devops|api|database|deploy/.test(text)) return 'backend-infra';
  if (/docs|research|graph/.test(text)) return 'knowledge';
  if (/git/.test(text)) return 'git';
  return 'other';
}

function scanSkills(root) {
  if (!fs.existsSync(root)) {
    throw new Error(`skills root not found: ${root}`);
  }
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const skills = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    const skillPath = path.join(root, entry.name, 'SKILL.md');
    if (!fs.existsSync(skillPath)) continue;
    const content = readText(skillPath);
    const frontmatter = extractFrontmatter(content);
    const name = frontmatter.name || entry.name;
    const description = frontmatter.description || firstParagraph(content);
    skills.push({
      name,
      directory: entry.name,
      description,
      category: categorize(name, description),
      has_references: fs.existsSync(path.join(root, entry.name, 'references')),
      has_scripts: fs.existsSync(path.join(root, entry.name, 'scripts')),
    });
  }
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function renderMarkdown(skills, root) {
  const lines = [
    '# CafeKit Skills Catalog',
    '',
    `Skills root: \`${root}\``,
    `Total skills: ${skills.length}`,
    '',
  ];
  const categories = [...new Set(skills.map((skill) => skill.category))].sort();
  for (const category of categories) {
    lines.push(`## ${category}`, '');
    for (const skill of skills.filter((item) => item.category === category)) {
      const badges = [
        skill.has_references ? 'refs' : null,
        skill.has_scripts ? 'scripts' : null,
      ].filter(Boolean);
      lines.push(
        `- \`${skill.name}\` (${skill.directory})${badges.length ? ` [${badges.join(', ')}]` : ''}: ${skill.description}`
      );
    }
    lines.push('');
  }
  return lines.join('\n').trim() + '\n';
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  const root = path.resolve(process.cwd(), args.root || defaultSkillsRoot());
  const skills = scanSkills(root);
  if (args.json) {
    console.log(JSON.stringify({ root, total: skills.length, skills }, null, 2));
    return;
  }
  console.log(renderMarkdown(skills, root));
}

try {
  main();
} catch (error) {
  console.error(`[skill-catalog] ${error.message}`);
  process.exit(1);
}
