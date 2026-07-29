'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { copyRecursive, isTextAsset } = require('./copy-utils');

const SPEC_ROOT = path.resolve(__dirname, '..', '..');
const OPENCODE_FOLDER = '.opencode';
const OPENCODE_PLUGIN_PACKAGE = '@opencode-ai/plugin';
const OPENCODE_PLUGIN_VERSION = '^1.15.11';

const OPENCODE_TOOL_MAP = {
  Read: 'read',
  Glob: 'glob',
  Grep: 'grep',
  Edit: 'edit',
  Write: 'edit',
  MultiEdit: 'edit',
  Bash: 'bash',
  WebFetch: 'webfetch',
  WebSearch: 'websearch',
  NotebookEdit: 'edit'
};

const OPENCODE_COMMAND_TEMPLATES = [
  {
    fileName: 'brainstorm.md',
    skillName: 'brainstorm',
    agent: 'brainstormer',
    subtask: true,
    description: 'Explore and narrow an idea before writing a CafeKit spec.'
  },
  {
    fileName: 'question.md',
    skillName: 'question',
    agent: 'inspector',
    subtask: true,
    description: 'Answer questions using repo evidence first, then external sources when needed.'
  },
  {
    fileName: 'specs.md',
    skillName: 'specs',
    agent: 'spec-maker',
    subtask: true,
    description: 'Create, update, validate, or approve a CafeKit specification.'
  },
  {
    fileName: 'develop.md',
    skillName: 'develop',
    agent: 'god-developer',
    subtask: true,
    description: 'Implement approved CafeKit spec tasks with scope fidelity.'
  },
  {
    fileName: 'test.md',
    skillName: 'test',
    agent: 'test-runner',
    subtask: true,
    description: 'Run CafeKit verification, QA, and evidence collection.'
  },
  {
    fileName: 'code-review.md',
    skillName: 'code-review',
    agent: 'code-auditor',
    subtask: true,
    description: 'Review implementation against code quality and spec compliance.'
  },
  {
    fileName: 'debug.md',
    skillName: 'debug',
    agent: 'debugger',
    subtask: true,
    description: 'Diagnose a bug or failure with evidence before fixing.'
  },
  {
    fileName: 'hotfix.md',
    skillName: 'hotfix',
    agent: 'god-developer',
    subtask: true,
    description: 'Apply a scout-first, narrow production hotfix.'
  },
  {
    fileName: 'docs.md',
    skillName: 'docs',
    agent: 'docs-keeper',
    subtask: true,
    description: 'Create, update, or reconstruct source-backed project documentation.'
  },
  {
    fileName: 'inspect.md',
    skillName: 'inspect',
    agent: 'inspector',
    subtask: true,
    description: 'Inspect a codebase, artifact, or external context before planning.'
  },
  // Domain skills — wrappers so users can invoke them directly via slash
  // commands. Each delegates to the matching skill under .opencode/skills/.
  {
    fileName: 'agent-browser.md',
    skillName: 'agent-browser',
    agent: 'researcher',
    subtask: true,
    description: 'Drive a browser session for research, snapshots, or scripted flows.'
  },
  {
    fileName: 'ai-multimodal.md',
    skillName: 'ai-multimodal',
    agent: 'researcher',
    subtask: true,
    description: 'Analyze images, audio, video, or mixed-media artifacts.'
  },
  {
    fileName: 'backend-development.md',
    skillName: 'backend-development',
    agent: 'god-developer',
    subtask: true,
    description: 'Implement backend services, APIs, data layers, and integrations.'
  },
  {
    fileName: 'chrome-devtools.md',
    skillName: 'chrome-devtools',
    agent: 'debugger',
    subtask: true,
    description: 'Collect Chrome DevTools or Puppeteer evidence for web debugging.'
  },
  {
    fileName: 'devops.md',
    skillName: 'devops',
    agent: 'deployer',
    subtask: true,
    description: 'Plan or execute deployment, CI/CD, container, and infrastructure work.'
  },
  {
    fileName: 'docx.md',
    skillName: 'docx',
    agent: 'researcher',
    subtask: true,
    description: 'Create, edit, or analyze Word (.docx) documents.'
  },
  {
    fileName: 'frontend-design.md',
    skillName: 'frontend-design',
    agent: 'ui-ux-designer',
    subtask: true,
    description: 'Define UI style, layout, design system, and UX direction.'
  },
  {
    fileName: 'frontend-development.md',
    skillName: 'frontend-development',
    agent: 'god-developer',
    subtask: true,
    description: 'Build React/TypeScript UI components and frontend features.'
  },
  {
    fileName: 'git.md',
    skillName: 'git',
    agent: 'git-ops',
    subtask: true,
    description: 'Run git workflows: branch, commit, tag, push, or release prep.'
  },
  {
    fileName: 'mobile-development.md',
    skillName: 'mobile-development',
    agent: 'god-developer',
    subtask: true,
    description: 'Implement iOS, Android, React Native, or Flutter mobile features.'
  },
  {
    fileName: 'pdf.md',
    skillName: 'pdf',
    agent: 'researcher',
    subtask: true,
    description: 'Read, edit, extract from, or generate PDF documents.'
  },
  {
    fileName: 'pptx.md',
    skillName: 'pptx',
    agent: 'researcher',
    subtask: true,
    description: 'Create or edit PowerPoint (.pptx) slide decks.'
  },
  {
    fileName: 'react-best-practices.md',
    skillName: 'react-best-practices',
    agent: 'code-auditor',
    subtask: true,
    description: 'Apply React/Next.js performance and rerender best practices.'
  },
  {
    fileName: 'research.md',
    skillName: 'research',
    agent: 'researcher',
    subtask: true,
    description: 'Investigate external tools, docs, or best practices.'
  },
  {
    fileName: 'sync.md',
    skillName: 'sync',
    agent: 'docs-keeper',
    subtask: true,
    description: 'Reconcile spec, docs, and code state after task completion.'
  },
  {
    fileName: 'ui-ux-pro-max.md',
    skillName: 'ui-ux-pro-max',
    agent: 'ui-ux-designer',
    subtask: true,
    description: 'Apply advanced UI/UX intelligence and visual polish guidance.'
  },
  {
    fileName: 'web-testing.md',
    skillName: 'web-testing',
    agent: 'test-runner',
    subtask: true,
    description: 'Plan or run E2E, integration, accessibility, or load testing.'
  },
  {
    fileName: 'xlsx.md',
    skillName: 'xlsx',
    agent: 'researcher',
    subtask: true,
    description: 'Read, edit, or generate Excel (.xlsx) and CSV spreadsheets.'
  }
];

function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return {
      frontmatter: {},
      body: content
    };
  }

  const frontmatter = {};
  match[1].split(/\r?\n/).forEach(line => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key) {
      frontmatter[key] = value;
    }
  });

  return {
    frontmatter,
    body: content.slice(match[0].length)
  };
}

function formatOpenCodeValue(value) {
  return JSON.stringify(String(value || ''));
}

// Rewrite Claude-runtime path references to OpenCode equivalents.
// Applied to every text asset copied into .opencode/ so the installed
// content points at the self-contained OpenCode runtime layout.
function normalizeOpenCodeBody(content) {
  return content
    .replace(/\.claude\/(agents|commands|skills|rules|scripts|references|hooks)\b/g, '.opencode/$1')
    .replace(/\.claude\\(agents|commands|skills|rules|scripts|references|hooks)\b/g, '.opencode\\$1')
    .replace(/\.claude\/runtime\.json/g, '.opencode/runtime.json')
    .replace(/\.claude\/ROUTING\.md/g, '.opencode/ROUTING.md')
    .replace(/\.claude\/\.env/g, '.opencode/.env')
    .replace(/(['"])\.claude\1/g, '$1.opencode$1')
    .replace(/`\.claude`/g, '`.opencode`')
    .replace(/\bCLAUDE\.md\b/g, 'AGENTS.md')
    // Runtime artifact paths inside .opencode/.gitignore that originate from
    // the Claude template (hooks/.logs/ → plugins/.logs/).
    .replace(/\bhooks\/\.logs\b/g, 'plugins/.logs')
    // OpenCode skill name regex strips the Claude-only `hapo:` prefix.
    .replace(/^(\s*name:\s*)hapo:([a-z0-9-]+)\s*$/gm, '$1$2');
}

function getOpenCodeCopyOptions(baseOptions = {}) {
  return { ...baseOptions, transform: normalizeOpenCodeBody };
}

function getOpenCodeToolEntries(toolsValue) {
  const toolNames = String(toolsValue || '')
    .split(',')
    .map(tool => tool.trim())
    .filter(Boolean);

  const mappedTools = new Set();

  toolNames.forEach(toolName => {
    const mapped = OPENCODE_TOOL_MAP[toolName];
    if (mapped) {
      mappedTools.add(mapped);
    }
  });

  return Array.from(mappedTools).sort();
}

function convertOpenCodeAgentContent(content, fileName) {
  const { frontmatter, body } = splitFrontmatter(content);
  const agentName = frontmatter.name || path.basename(fileName, '.md');
  const description = frontmatter.description || `CafeKit agent: ${agentName}`;
  const mode = agentName === 'brainstormer' ? 'primary' : 'subagent';
  const permissionEntries = new Set(getOpenCodeToolEntries(frontmatter.tools));
  permissionEntries.add('skill');
  permissionEntries.add('task');
  const lines = [
    '---',
    `description: ${formatOpenCodeValue(description)}`,
    `mode: ${mode}`
  ];

  if (permissionEntries.size > 0) {
    lines.push('permission:');
    Array.from(permissionEntries).sort().forEach(permissionName => {
      lines.push(`  ${permissionName}: allow`);
    });
  }

  lines.push('---', '');

  return `${lines.join('\n')}${normalizeOpenCodeBody(body).trimStart()}`;
}

function convertOpenCodeCommandContent(content, fileName) {
  const { frontmatter, body } = splitFrontmatter(content);
  const commandName = path.basename(fileName, '.md');
  const description = frontmatter.description || `CafeKit command: ${commandName}`;
  const lines = [
    '---',
    `description: ${formatOpenCodeValue(description)}`
  ];

  if (frontmatter.agent) {
    lines.push(`agent: ${formatOpenCodeValue(frontmatter.agent)}`);
  }

  lines.push('---', '');

  return `${lines.join('\n')}${normalizeOpenCodeBody(body).trimStart()}`;
}

function createOpenCodeSkillCommandContent(command) {
  const lines = [
    '---',
    `description: ${formatOpenCodeValue(command.description)}`
  ];

  if (command.agent) {
    lines.push(`agent: ${formatOpenCodeValue(command.agent)}`);
  }

  if (typeof command.subtask === 'boolean') {
    lines.push(`subtask: ${command.subtask ? 'true' : 'false'}`);
  }

  if (command.model) {
    lines.push(`model: ${formatOpenCodeValue(command.model)}`);
  }

  lines.push(
    '---',
    '',
    `Use the CafeKit skill at \`.opencode/skills/${command.skillName}/SKILL.md\`.`,
    '',
    'Read that skill first, then execute its workflow with these arguments:',
    '',
    '$ARGUMENTS',
    '',
    'If the skill references supporting files, resolve them relative to the skill directory.',
    'Keep the response aligned with the skill instructions and the current project context.',
    ''
  );

  return lines.join('\n');
}

function createOpenCodeAgentsContent(sourceContent) {
  const adaptedContent = normalizeOpenCodeBody(sourceContent)
    .replace(/^# CLAUDE\.md/m, '# AGENTS.md')
    .replace(
      'Primary operating instructions for Claude Code or any AI agent using this CafeKit runtime.',
      'Primary operating instructions for OpenCode or any AI agent using this CafeKit runtime.'
    )
    .replace(/Claude Code/g, 'OpenCode');

  const openCodeRuntimeBlock = [
    '## OpenCode Runtime Mapping',
    '',
    '- OpenCode project instructions live in `AGENTS.md`.',
    '- CafeKit commands live in `.opencode/commands/` and can be run as OpenCode slash commands.',
    '- CafeKit subagents live in `.opencode/agents/` using OpenCode frontmatter.',
    '- CafeKit skills live in `.opencode/skills/` and are read natively by OpenCode.',
    '- CafeKit support files live in `.opencode/rules/`, `.opencode/scripts/`, `.opencode/references/`, and `.opencode/runtime.json`.',
    '- OpenCode config is merged into `opencode.json`; keep project-specific model/provider choices there.',
    ''
  ].join('\n');

  return adaptedContent.replace('## Core Objective', `${openCodeRuntimeBlock}\n## Core Objective`);
}

function upsertCafeKitAgentsBlock(existingContent, blockContent) {
  const start = '<!-- CAFEKIT OPENCODE START -->';
  const end = '<!-- CAFEKIT OPENCODE END -->';
  const managedBlock = `${start}\n${blockContent.trim()}\n${end}`;
  const blockPattern = new RegExp(`${start}[\\s\\S]*?${end}`);

  if (blockPattern.test(existingContent)) {
    return existingContent.replace(blockPattern, managedBlock);
  }

  // Pre-managed-block releases wrote the shipped template as the whole file.
  // Wrap only an exact shipped prefix and preserve any user/Codex suffix.
  if (existingContent.startsWith(blockContent)) {
    return `${managedBlock}${existingContent.slice(blockContent.length)}`;
  }
  const trimmedLegacy = blockContent.trimEnd();
  if (
    existingContent.startsWith(trimmedLegacy)
    && ['', '\n', '\r'].includes(existingContent.charAt(trimmedLegacy.length))
  ) {
    return `${managedBlock}${existingContent.slice(trimmedLegacy.length)}`;
  }
  if (!existingContent) return `${managedBlock}\n`;

  const separator = existingContent.endsWith('\n') ? '\n' : '\n\n';
  return `${existingContent}${separator}${managedBlock}\n`;
}

function getOpenCodeAgentsTemplateContent() {
  const openCodeTemplate = path.join(SPEC_ROOT, 'src/opencode/AGENTS.md');

  if (fs.existsSync(openCodeTemplate)) {
    return normalizeOpenCodeBody(fs.readFileSync(openCodeTemplate, 'utf8'));
  }

  const claudeTemplate = path.join(SPEC_ROOT, 'src/claude/CLAUDE.md');
  if (!fs.existsSync(claudeTemplate)) {
    return null;
  }

  return createOpenCodeAgentsContent(fs.readFileSync(claudeTemplate, 'utf8'));
}

// Copy OpenCode project instructions to AGENTS.md at the project root.
function copyOpenCodeAgentsMdFile(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const dest = 'AGENTS.md';
  const content = getOpenCodeAgentsTemplateContent();

  if (content) {
    const destinationExists = fs.existsSync(dest);
    const existingContent = destinationExists ? fs.readFileSync(dest, 'utf8') : '';
    const nextContent = upsertCafeKitAgentsBlock(existingContent, content);

    if (nextContent === existingContent) {
      console.log(`  → Skipped: AGENTS.md (already up to date)`);
      results.skipped++;
    } else if (destinationExists) {
      fs.writeFileSync(dest, nextContent, 'utf8');
      console.log(`  ↻ AGENTS.md merged`);
      results.updated++;
    } else {
      fs.writeFileSync(dest, nextContent, 'utf8');
      console.log(`  ✓ AGENTS.md installed`);
      results.copied++;
    }
  } else {
    console.log(`  ⚠ AGENTS.md template source not found`);
    results.missingDependencies++;
  }
}

function copyOpenCodeSharedRuntimeFiles(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const srcBase = path.join(SPEC_ROOT, 'src/claude');
  const runtimeFiles = ['gitignore', 'runtime.json'];

  runtimeFiles.forEach(relPath => {
    const srcPath = path.join(srcBase, relPath);
    const targetRelPath = relPath === 'gitignore' ? '.gitignore' : relPath;
    const targetPath = path.join(OPENCODE_FOLDER, targetRelPath);

    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠ Runtime file not found: ${relPath}`);
      results.missingDependencies++;
      return;
    }

    const targetExists = fs.existsSync(targetPath);
    const shouldCopy = shouldOverwriteManagedFiles || !targetExists;

    if (shouldCopy) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      const sourceContent = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(targetPath, normalizeOpenCodeBody(sourceContent), 'utf8');

      if (targetExists) {
        console.log(`  ↻ Shared runtime updated: ${targetRelPath}`);
        results.updated++;
      } else {
        console.log(`  ✓ Shared runtime installed: ${targetRelPath}`);
        results.copied++;
      }
    } else {
      results.skipped++;
    }
  });
}

function copyOpenCodePlugins(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const sourceDir = path.join(SPEC_ROOT, 'src/opencode/plugins');
  const targetDir = path.join(OPENCODE_FOLDER, 'plugins');

  if (!fs.existsSync(sourceDir)) {
    console.log('  ⚠ OpenCode plugin source not found, skipping');
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  entries.forEach(entry => {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(sourcePath, destPath, getOpenCodeCopyOptions(options));
      console.log(`  ✓ Plugin lib installed: ${entry.name}/`);
      return;
    }

    if (!entry.isFile()) return;

    const destExists = fs.existsSync(destPath);
    if (destExists && !shouldOverwriteManagedFiles) {
      console.log(`  → Plugin exists: ${entry.name}`);
      results.skipped++;
      return;
    }

    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(destPath, sourceContent, 'utf8');

    if (destExists) {
      console.log(`  ↻ Plugin updated: ${entry.name}`);
      results.updated++;
    } else {
      console.log(`  ✓ Plugin installed: ${entry.name}`);
      results.copied++;
    }
  });

  ensureOpenCodePluginPackageJson(results, shouldOverwriteManagedFiles);
}

function ensureOpenCodePluginPackageJson(results, shouldOverwriteManagedFiles) {
  const pkgPath = path.join(OPENCODE_FOLDER, 'package.json');
  const pkgExists = fs.existsSync(pkgPath);

  let pkg = {};
  if (pkgExists) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch {
      pkg = {};
    }
  }

  const currentDep = pkg.dependencies?.[OPENCODE_PLUGIN_PACKAGE];
  const needsUpdate = !pkgExists
    || !currentDep
    || (shouldOverwriteManagedFiles && currentDep !== OPENCODE_PLUGIN_VERSION);

  if (!needsUpdate) {
    return;
  }

  const nextPkg = {
    name: pkg.name || 'cafekit-opencode-plugins',
    private: pkg.private !== undefined ? pkg.private : true,
    type: pkg.type || 'module',
    ...pkg,
    dependencies: {
      ...(pkg.dependencies || {}),
      [OPENCODE_PLUGIN_PACKAGE]: OPENCODE_PLUGIN_VERSION,
    },
  };

  fs.writeFileSync(pkgPath, JSON.stringify(nextPkg, null, 2) + '\n', 'utf8');

  if (pkgExists) {
    console.log(`  ↻ Plugin package.json updated (${OPENCODE_PLUGIN_PACKAGE} ${OPENCODE_PLUGIN_VERSION})`);
    results.updated++;
  } else {
    console.log(`  ✓ Plugin package.json installed (${OPENCODE_PLUGIN_PACKAGE} ${OPENCODE_PLUGIN_VERSION})`);
    console.log('    OpenCode will run "bun install" automatically on startup.');
    results.copied++;
  }
}

function copyOpenCodeCommandTemplates(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const commandsDir = path.join(OPENCODE_FOLDER, 'commands');

  OPENCODE_COMMAND_TEMPLATES.forEach(command => {
    const targetPath = path.join(commandsDir, command.fileName);
    const targetExists = fs.existsSync(targetPath);

    if (targetExists && !shouldOverwriteManagedFiles) {
      console.log(`  → OpenCode command exists: ${command.fileName}`);
      results.skipped++;
      return;
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, createOpenCodeSkillCommandContent(command), 'utf8');

    if (targetExists) {
      console.log(`  ↻ OpenCode command updated: ${command.fileName}`);
      results.updated++;
    } else {
      console.log(`  ✓ OpenCode command installed: ${command.fileName}`);
      results.copied++;
    }
  });
}

function readJsonWithComments(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const rawContent = fs.readFileSync(filePath, 'utf8');
  const withoutBlockComments = rawContent.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLineComments = withoutBlockComments.replace(/(^|[^:])\/\/.*$/gm, '$1');

  // Empty opencode.json is a valid project marker; treat as empty object.
  if (withoutLineComments.trim() === '') {
    return {};
  }

  return JSON.parse(withoutLineComments);
}

function getOpenCodeConfigPath() {
  const jsonPath = 'opencode.json';
  const jsoncPath = 'opencode.jsonc';

  if (fs.existsSync(jsonPath)) {
    return jsonPath;
  }

  if (fs.existsSync(jsoncPath)) {
    return jsoncPath;
  }

  return jsonPath;
}

function mergeOpenCodeConfig(platformKey, results) {
  if (platformKey !== 'opencode') return;

  const targetPath = getOpenCodeConfigPath();
  const targetExists = fs.existsSync(targetPath);
  let config = {};

  try {
    config = readJsonWithComments(targetPath);
  } catch (error) {
    console.log(`  ⚠ OpenCode config not merged: ${error.message}`);
    results.errors++;
    return;
  }

  const before = JSON.stringify(config);

  if (!config.$schema) {
    config.$schema = 'https://opencode.ai/config.json';
  }

  if (!Array.isArray(config.instructions)) {
    config.instructions = [];
  }

  if (!config.instructions.includes('AGENTS.md')) {
    config.instructions.push('AGENTS.md');
  }

  if (typeof config.permission === 'string') {
    if (config.permission === 'allow') {
      const afterStringPermission = JSON.stringify(config);
      if (before === afterStringPermission && targetExists) {
        console.log(`  → OpenCode config already up to date: ${targetPath}`);
        results.skipped++;
        return;
      }

      fs.writeFileSync(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
      console.log(`  ↻ OpenCode config merged: ${targetPath}`);
      results.updated++;
      return;
    }

    console.log(`  ⚠ OpenCode config permission is "${config.permission}"; preserving user setting`);
  } else if (!config.permission || typeof config.permission !== 'object' || Array.isArray(config.permission)) {
    config.permission = {};
  }

  if (typeof config.permission === 'object' && !Array.isArray(config.permission)) {
    if (!config.permission.skill || typeof config.permission.skill !== 'object' || Array.isArray(config.permission.skill)) {
      config.permission.skill = {};
    }

    if (!config.permission.skill['*']) {
      config.permission.skill['*'] = 'allow';
    }

    if (!config.permission.task || typeof config.permission.task !== 'object' || Array.isArray(config.permission.task)) {
      config.permission.task = {};
    }

    if (!config.permission.task['*']) {
      config.permission.task['*'] = 'allow';
    }
  }

  const after = JSON.stringify(config);
  if (before === after && targetExists) {
    console.log(`  → OpenCode config already up to date: ${targetPath}`);
    results.skipped++;
    return;
  }

  fs.writeFileSync(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');

  if (targetExists) {
    console.log(`  ↻ OpenCode config merged: ${targetPath}`);
    results.updated++;
  } else {
    console.log(`  ✓ OpenCode config created: ${targetPath}`);
    results.copied++;
  }
}

function isValidOpenCodeModel(model) {
  return typeof model === 'string' && /^[^/\s]+\/[^/\s]+$/.test(model.trim());
}

function writeOpenCodeModel(model, results, sourceLabel = 'user input') {
  const targetPath = getOpenCodeConfigPath();
  let config = {};

  try {
    config = readJsonWithComments(targetPath);
  } catch (error) {
    console.log(`  ⚠ OpenCode model not configured: ${error.message}`);
    results.errors++;
    return false;
  }

  if (typeof config.model === 'string' && config.model.trim()) {
    console.log(`  → OpenCode model already configured: ${config.model}`);
    results.skipped++;
    return false;
  }

  config.model = model.trim();
  fs.writeFileSync(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  console.log(`  ✓ OpenCode model configured from ${sourceLabel}: ${config.model}`);
  results.updated++;
  return true;
}

async function promptOpenCodeModel() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n📝 OpenCode Model Configuration');
  console.log('  Optional but recommended for subagents.');
  console.log('  Format: provider/model-id (example: anthropic/claude-sonnet-4-20250514)');
  console.log();

  return new Promise((resolve) => {
    rl.question('Enter OpenCode model (or press Enter to skip): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function setupOpenCodeModel(platforms, results) {
  if (!platforms.includes('opencode')) return;

  const envModel = process.env.OPENCODE_MODEL || process.env.OPENCODE_DEFAULT_MODEL;
  if (envModel) {
    if (isValidOpenCodeModel(envModel)) {
      writeOpenCodeModel(envModel, results, 'environment');
      return;
    }

    console.log(`  ⚠ Ignoring invalid OpenCode model from environment: ${envModel}`);
  }

  const model = await promptOpenCodeModel();

  if (!model) {
    console.log('  ℹ Skipped OpenCode model configuration');
    console.log('  Set later in opencode.json as: "model": "provider/model-id"');
    return;
  }

  if (!isValidOpenCodeModel(model)) {
    console.log('  ⚠ Invalid OpenCode model format. Expected provider/model-id. Skipped.');
    return;
  }

  writeOpenCodeModel(model, results);
}

module.exports = {
  OPENCODE_PLUGIN_PACKAGE,
  OPENCODE_PLUGIN_VERSION,
  normalizeOpenCodeBody,
  getOpenCodeCopyOptions,
  convertOpenCodeAgentContent,
  convertOpenCodeCommandContent,
  copyOpenCodeAgentsMdFile,
  copyOpenCodeSharedRuntimeFiles,
  copyOpenCodePlugins,
  copyOpenCodeCommandTemplates,
  mergeOpenCodeConfig,
  setupOpenCodeModel
};
