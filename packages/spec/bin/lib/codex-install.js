'use strict';

const path = require('path');
const { normalizeSourcePaths } = require('./copy-utils');
const { splitFrontmatter } = require('./codex-frontmatter');
const { preserveAddressingSection } = require('./instruction-blocks');

const CODEX_BLOCK_START = '<!-- CAFEKIT CODEX START -->';
const CODEX_BLOCK_END = '<!-- CAFEKIT CODEX END -->';
const INSTRUCTION_EXTENSIONS = new Set(['.md', '.mdx', '.txt']);

const AGENT_NAMES = [
  'brainstormer',
  'code-auditor',
  'debugger',
  'deployer',
  'docs-keeper',
  'git-ops',
  'implementer',
  'inspector',
  'project-manager',
  'researcher',
  'spec-maker',
  'test-runner',
  'ui-ux-designer'
];
const INSTRUCTION_REPLACEMENTS = [
  [/`?\bAskUserQuestion\b`?/g, 'a structured user-input request'],
  [/`?\bTodoWrite\b`?/g, 'task-state tracking'],
  [/`?\bTaskCreate\b`?/g, 'task creation'],
  [/`?\bTaskUpdate\b`?/g, 'task-state updates'],
  [/`?\bTaskList\b`?/g, 'task-state inspection'],
  [/`?\bTaskGet\b`?/g, 'task detail inspection'],
  [/`Bash`/g, '`exec_command`'],
  [/`Glob`/g, '`rg --files`'],
  [/`Grep`/g, '`rg`'],
  [/`Read`/g, 'targeted file reads'],
  [/`Write`|`Edit`|`NotebookEdit`/g, '`apply_patch`'],
  [/`WebSearch`/g, 'native web search'],
  [/`WebFetch`/g, 'native page retrieval'],
  [/`?Agent`?\s+\(legacy\s+`?Task`?\)/g, 'subagent delegation']
];

function codexAgentName(value) {
  const raw = path.basename(String(value || ''), path.extname(String(value || '')));
  return raw
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function normalizeAgentRole(name) {
  return String(name || '').toLowerCase() === 'explore'
    ? 'explorer'
    : codexAgentName(name);
}

function applyReplacements(content, replacements) {
  let next = content;
  for (const [pattern, replacement] of replacements) {
    next = next.replace(pattern, replacement);
  }
  return next;
}

function normalizeRuntimePaths(content) {
  return normalizeSourcePaths(content, {
    runtimeRoot: '.codex',
    skillsRoot: '.agents/skills'
  })
    .replace(/(?<!~\/)\.claude\/skills\b/g, '.agents/skills')
    .replace(/(?<!~\\)\.claude\\skills\b/g, '.agents\\skills')
    .replace(/(?<!~\/)\.claude(?=[/\\])/g, '.codex')
    .replace(/(['"])\.claude\1/g, '$1.codex$1')
    .replace(/`\.claude`/g, '`.codex`');
}

function normalizeSkillNames(content) {
  return content
    .replace(/\/hapo:([a-z0-9-]+)/gi, (_match, name) => `$hapo-${name}`)
    .replace(/\bhapo:([a-z0-9-]+)/gi, (_match, name) => `hapo-${name}`)
    .replace(
      /(^|[\s("'`→])\/(brainstorm|code-review|debug|develop|docs|frontend-design|git|hotfix|inspect|question|research|specs|test)(?=$|[\s<`),.:])/gim,
      (_match, prefix, name) => `${prefix}$hapo-${name}`
    );
}

function normalizeAgentNames(content) {
  let next = content;
  for (const name of AGENT_NAMES) {
    const snake = codexAgentName(name);
    next = next.replace(new RegExp(`\\b${name}\\b`, 'g'), snake);
  }
  return next;
}

function normalizeAgentInvocations(content) {
  return content
    .replace(/\bAgent\s*\(/g, 'spawn_agent(')
    .replace(/\bsubagent_type\s*=\s*"([^"]+)"/g, (_match, name) => (
      `agent_type="${normalizeAgentRole(name)}", fork_turns="none"`
    ))
    .replace(/\bsubagent_type\s*:\s*"([^"]+)"/g, (_match, name) => (
      `agent_type: "${normalizeAgentRole(name)}"\nfork_turns: "none"`
    ))
    .replace(/\bprompt\s*=/g, 'message=')
    .replace(/\bdescription\s*=\s*"([^"]+)"/g, (_match, label) => (
      `task_name="${codexAgentName(label) || 'cafekit_task'}"`
    ))
    .replace(/`Agent`/g, '`spawn_agent`')
    .replace(/\bAgent tool\b/g, 'spawn_agent tool')
    .replace(/\bExplore subagents?\b/g, (match) => match.replace('Explore', 'explorer'))
    .replace(/`SendMessage`/g, '`send_message`')
    .replace(/\bSendMessage\s*\(/g, 'send_message(');
}

function isInstructionAsset(sourcePath) {
  if (!sourcePath) return true;
  return INSTRUCTION_EXTENSIONS.has(path.extname(sourcePath).toLowerCase());
}

function normalizeCodexBody(content, sourcePath = '') {
  let next = normalizeRuntimePaths(String(content));
  next = next
    .replace(/\bCLAUDE\.md\b/g, 'AGENTS.md')
    .replace(/\bClaude Code\b/g, 'Codex CLI');

  if (!isInstructionAsset(sourcePath)) return next;

  next = normalizeAgentInvocations(normalizeAgentNames(normalizeSkillNames(next)));
  return applyReplacements(next, INSTRUCTION_REPLACEMENTS);
}

function getCodexCopyOptions(baseOptions = {}) {
  return {
    ...baseOptions,
    transform: (content, sourcePath) => normalizeCodexBody(content, sourcePath)
  };
}

function convertCodexAgentContent(content, fileName = '') {
  const { frontmatter, body } = splitFrontmatter(content);
  const name = codexAgentName(frontmatter.name || fileName);
  const description = normalizeCodexBody(
    frontmatter.description || `CafeKit Codex agent: ${name}`
  );
  const instructions = normalizeCodexBody(body).trim();

  return [
    `name = ${JSON.stringify(name)}`,
    `description = ${JSON.stringify(description)}`,
    `developer_instructions = ${JSON.stringify(instructions)}`,
    ''
  ].join('\n');
}

function managedRange(content) {
  const start = content.indexOf(CODEX_BLOCK_START);
  const end = content.indexOf(CODEX_BLOCK_END);
  if (start < 0 && end < 0) return null;
  const duplicateStart = content.indexOf(CODEX_BLOCK_START, start + CODEX_BLOCK_START.length);
  const duplicateEnd = content.indexOf(CODEX_BLOCK_END, end + CODEX_BLOCK_END.length);
  return start >= 0 && end > start && duplicateStart < 0 && duplicateEnd < 0
    ? { start, end }
    : false;
}

function upsertManagedCodexBlock(existingContent, blockContent) {
  const existing = String(existingContent || '');
  let body = String(blockContent).trim();
  // Reinstall replaces the managed block in place. If the new template dropped
  // its Addressing section, carry the exact section over from the existing
  // managed block so the saved address survives for setupAddressing. Only reads
  // the managed body — never user-owned sections outside the block.
  const range = managedRange(existing);
  if (range) {
    const existingBody = existing.slice(range.start + CODEX_BLOCK_START.length, range.end);
    body = preserveAddressingSection(body, existingBody);
  }
  const block = `${CODEX_BLOCK_START}\n${body}\n${CODEX_BLOCK_END}`;
  if (range === false) return existing;
  if (range) {
    return `${existing.slice(0, range.start)}${block}${existing.slice(range.end + CODEX_BLOCK_END.length)}`;
  }
  if (!existing) return `${block}\n`;
  const separator = existing.endsWith('\n') ? '\n' : '\n\n';
  return `${existing}${separator}${block}\n`;
}

/** Transform only the CafeKit-owned body, preserving all surrounding bytes. */
function transformManagedCodexContent(content, transform) {
  const existing = String(content || '');
  const range = managedRange(existing);
  if (!range || typeof transform !== 'function') return existing;
  const bodyStart = range.start + CODEX_BLOCK_START.length;
  const bodyEnd = range.end;
  const body = existing.slice(bodyStart, bodyEnd);
  return `${existing.slice(0, bodyStart)}${transform(body)}${existing.slice(bodyEnd)}`;
}

module.exports = {
  normalizeCodexBody,
  getCodexCopyOptions,
  codexAgentName,
  convertCodexAgentContent,
  managedRange,
  upsertManagedCodexBlock,
  transformManagedCodexContent
};
