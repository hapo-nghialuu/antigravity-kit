#!/usr/bin/env node

/**
 * CafeKit Installer
 * Multi-platform installer for AI coding assistants
 *
 * Supported platforms (each install is fully self-contained):
 * - claude: Claude Code → .claude/ (skills, rules, scripts, references, runtime.json)
 * - opencode: OpenCode → .opencode/ (same layout, content rewritten on copy)
 *
 * Selecting both creates both folders independently. There is no shared
 * runtime directory between platforms.
 *
 * To add a new platform:
 * 1. Add to PLATFORMS registry below
 * 2. Add platform-specific commands in src/[platform]/commands/
 * 3. Update detectPlatforms() if using different folder names
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const { execSync } = require('child_process');
const packageJson = require('../package.json');
const INSTALL_COMMAND = `npx ${packageJson.name}@${packageJson.version}`;

function validateManifestV2(manifest) {
  if (!manifest || manifest.version !== 2) return false;
  if (!manifest.runtime?.files || !Array.isArray(manifest.runtime.files)) return false;
  if (!manifest.settings?.template) return false;
  return true;
}

function loadClaudeMigrationManifest() {
  const manifestPath = path.join(__dirname, '../src/claude/migration-manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    if (!validateManifestV2(manifest)) {
      console.error('✗ Invalid manifest v2 schema - missing required fields');
      console.error('  Expected: version=2, runtime.files[], settings.template');
      process.exit(1);
    }

    return manifest;
  } catch (error) {
    console.warn(`⚠ Failed to parse Claude migration manifest: ${error.message}`);
    return null;
  }
}

const CLAUDE_MIGRATION_MANIFEST = loadClaudeMigrationManifest();

const DEPENDENCY_TEMPLATES = {
  commands: {
    claude: {},
    opencode: {}
  },
  agents: {
    claude: {},
    opencode: {}
  }
};

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
  {
    fileName: 'generate-graph.md',
    skillName: 'generate-graph',
    agent: 'god-developer',
    subtask: true,
    description: 'Generate technical diagrams from project context.'
  }
];

// ═══════════════════════════════════════════════════════════
// PLATFORM REGISTRY - Add new platforms here
// ═══════════════════════════════════════════════════════════
const PLATFORMS = {
  claude: {
    id: 'claude',
    name: 'Claude Code',
    description: 'Anthropic\'s Claude Code CLI',
    folder: '.claude',
    commandsDir: '.claude/commands',
    skillsDir: '.claude/skills',
    agentsDir: '.claude/agents',
    skillsRef: '.claude/skills',
    commandPrefix: '/',
    sourceDir: 'claude',       // Maps to src/claude/
    sourceSubdir: 'commands'   // Source subfolder within src/claude/
  },
  opencode: {
    id: 'opencode',
    name: 'OpenCode',
    description: 'OpenCode terminal AI coding agent',
    folder: '.opencode',
    detectFiles: ['.opencode', 'opencode.json', 'opencode.jsonc'],
    commandsDir: '.opencode/commands',
    skillsDir: '.opencode/skills',
    agentsDir: '.opencode/agents',
    skillsRef: '.opencode/skills',
    commandPrefix: '/',
    sourceDir: 'claude',
    sourceSubdir: 'archive-command'
  }
  // Add new platforms here:
  // cursor: {
  //   id: 'cursor',
  //   name: 'Cursor',
  //   description: 'Cursor IDE',
  //   folder: '.cursor',
  //   commandsDir: '.cursor/commands',
  //   sourceDir: 'cursor',
  //   sourceSubdir: 'commands'
  // }
};

// ═══════════════════════════════════════════════════════════
// DETECTION
// ═══════════════════════════════════════════════════════════

function detectPlatforms() {
  const detected = [];

  for (const [key, config] of Object.entries(PLATFORMS)) {
    const markers = Array.isArray(config.detectFiles) ? config.detectFiles : [config.folder];
    if (markers.some(marker => fs.existsSync(marker))) {
      detected.push(key);
    }
  }

  return detected;
}

function formatPlatformList() {
  return Object.entries(PLATFORMS)
    .map(([key, config], index) => {
      return `${index + 1}) ${config.name} (${config.folder}/)\n   ${config.description}`;
    })
    .join('\n');
}

function getPlatformKeys() {
  return Object.keys(PLATFORMS);
}

// Warn opencode-only installs when a legacy .claude/ folder remains from
// pre-0.9.0 installs (when OpenCode shared the .claude/ runtime). We do not
// delete anything; user must remove it explicitly to opt in.
function warnLegacyClaudeFolder(platforms) {
  if (!platforms.includes('opencode')) return;
  if (platforms.includes('claude')) return;
  if (!fs.existsSync('.claude')) return;

  console.log('');
  console.log('⚠ Legacy .claude/ folder detected.');
  console.log('  As of CafeKit 0.9.0, OpenCode installs are self-contained under .opencode/.');
  console.log('  The .claude/ folder from older installs is no longer used by OpenCode.');
  console.log('  After this install finishes you can remove it: rm -rf .claude');
  console.log('');
}

function isClaudeCompatibleRuntime(platformKey) {
  return platformKey === 'claude' || platformKey === 'opencode';
}

function getRuntimeSupportTargetDir(platformKey, subdir) {
  return path.join(PLATFORMS[platformKey].folder, subdir);
}

function parseInstallerArgs(argv) {
  const args = {
    upgrade: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--upgrade' || arg === '-u' || arg === '--force' || arg === '-f') {
      args.upgrade = true;
    }
  }

  return args;
}

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
    // Subdirectory references with or without trailing slash, e.g. `.claude/skills/foo` and `.claude/skills`
    .replace(/\.claude\/(agents|commands|skills|rules|scripts|references|hooks)\b/g, '.opencode/$1')
    // Windows-style backslash variant
    .replace(/\.claude\\(agents|commands|skills|rules|scripts|references|hooks)\b/g, '.opencode\\$1')
    // Concrete runtime files
    .replace(/\.claude\/runtime\.json/g, '.opencode/runtime.json')
    .replace(/\.claude\/ROUTING\.md/g, '.opencode/ROUTING.md')
    .replace(/\.claude\/\.env/g, '.opencode/.env')
    // Quoted literal `.claude` used in script path-builders (e.g. `path.join(cwd, '.claude', 'skills')`).
    .replace(/(['"])\.claude\1/g, '$1.opencode$1')
    // Backtick-quoted bare `.claude` in prose
    .replace(/`\.claude`/g, '`.opencode`')
    // CLAUDE.md filename references
    .replace(/\bCLAUDE\.md\b/g, 'AGENTS.md')
    // OpenCode skill name regex is ^[a-z0-9]+(-[a-z0-9]+)*$ — strip the
    // Claude-only `hapo:` prefix so SKILL.md frontmatter passes validation
    // and matches the containing directory name.
    .replace(/^(\s*name:\s*)hapo:([a-z0-9-]+)\s*$/gm, '$1$2');
}

const TEXT_REWRITE_EXTENSIONS = new Set([
  '.md', '.mdx', '.txt', '.json', '.cjs', '.js', '.mjs', '.ts', '.sh', '.yml', '.yaml'
]);

function isTextAsset(filePath) {
  return TEXT_REWRITE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function getCopyOptions(platformKey, baseOptions = {}) {
  if (platformKey === 'opencode') {
    return { ...baseOptions, transform: normalizeOpenCodeBody };
  }
  return baseOptions;
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

// ═══════════════════════════════════════════════════════════
// USER INTERACTION
// ═══════════════════════════════════════════════════════════

async function promptPlatformSelection() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const maxChoice = Object.keys(PLATFORMS).length + 1;

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║      CafeKit - Platform Selection                      ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log();
  console.log('No existing AI editor configuration detected.\n');
  console.log('Select which platform(s) to install for:\n');
  console.log(formatPlatformList());
  console.log(`${maxChoice}) All platforms`);
  console.log('0) Cancel');
  console.log();

  return new Promise((resolve) => {
    rl.question(`Select (0-${maxChoice}): `, (answer) => {
      rl.close();
      const choice = parseInt(answer.trim(), 10);

      if (choice === 0 || isNaN(choice)) {
        resolve([]);
      } else if (choice === maxChoice) {
        resolve(getPlatformKeys());
      } else if (choice >= 1 && choice <= Object.keys(PLATFORMS).length) {
        resolve([getPlatformKeys()[choice - 1]]);
      } else {
        console.log('Invalid selection. Please run the installer again.');
        resolve([]);
      }
    });
  });
}

async function promptMultiPlatformConfirm(detected) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const platformNames = detected.map(key => PLATFORMS[key].name).join(', ');

  console.log(`\nDetected existing configurations: ${platformNames}`);
  console.log();

  return new Promise((resolve) => {
    rl.question('Install for all detected platforms? (Y/n): ', (answer) => {
      rl.close();
      const response = answer.trim().toLowerCase();
      resolve(response === '' || response === 'y' || response === 'yes');
    });
  });
}

// ═══════════════════════════════════════════════════════════
// FILE OPERATIONS
// ═══════════════════════════════════════════════════════════

function copyRecursive(src, dest, options = {}) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  const shouldOverwriteManagedFiles = Boolean(options.upgrade);

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      const destItemName = childItemName === 'gitignore' ? '.gitignore' : childItemName;
      copyRecursive(path.join(src, childItemName), path.join(dest, destItemName), options);
    });
  } else {
    if (fs.existsSync(dest) && !shouldOverwriteManagedFiles) {
      return;
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });

    if (typeof options.transform === 'function' && isTextAsset(src)) {
      const original = fs.readFileSync(src, 'utf8');
      fs.writeFileSync(dest, options.transform(original, src), 'utf8');
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function ensureDependencyFile(targetPath, content, results, label, options = {}) {
  const destinationExists = fs.existsSync(targetPath);
  const shouldOverwriteManagedFiles = Boolean(options.upgrade);

  if (destinationExists && !shouldOverwriteManagedFiles) {
    console.log(`  → Dependency exists: ${label}`);
    results.dependencyChecks++;
    return;
  }

  if (!content) {
    console.log(`  ⚠ Missing dependency template: ${label}`);
    results.dependencyChecks++;
    results.missingDependencies++;
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');

  if (destinationExists && shouldOverwriteManagedFiles) {
    console.log(`  ↻ Dependency updated: ${label}`);
    results.updated++;
  } else {
    console.log(`  ✓ Dependency installed: ${label}`);
  }

  results.dependencyChecks++;
  results.installedDependencies++;
}

function ensureWorkflowDependencies(platformKey, platform, results, options = {}) {
  const commandTemplates = DEPENDENCY_TEMPLATES.commands[platformKey] || {};
  Object.entries(commandTemplates).forEach(([fileName, content]) => {
    const targetPath = path.join(platform.commandsDir, fileName);
    ensureDependencyFile(targetPath, content, results, path.join(platform.commandsDir, fileName), options);
  });

  const agentTemplates = DEPENDENCY_TEMPLATES.agents[platformKey] || {};
  Object.entries(agentTemplates).forEach(([fileName, content]) => {
    const targetPath = path.join(platform.agentsDir, fileName);
    ensureDependencyFile(targetPath, content, results, path.join(platform.agentsDir, fileName), options);
  });
}

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

function writePlatformVersionMetadata(platformKey, results) {
  const platform = PLATFORMS[platformKey];
  const targetPath = path.join(platform.folder, 'cafekit.json');
  const targetExists = fs.existsSync(targetPath);
  const existingMetadata = readJsonFile(targetPath);
  const now = new Date().toISOString();
  const previousVersion = typeof existingMetadata.version === 'string'
    ? existingMetadata.version
    : null;

  const metadata = {
    schemaVersion: 1,
    packageName: packageJson.name,
    version: packageJson.version,
    platform: platform.id,
    platformName: platform.name,
    installedAt: existingMetadata.installedAt || now,
    lastInstalledAt: now,
    installCommand: INSTALL_COMMAND
  };

  if (previousVersion && previousVersion !== packageJson.version) {
    metadata.previousVersion = previousVersion;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');

  if (targetExists) {
    console.log(`  ↻ Version metadata updated: ${targetPath}`);
    results.updated++;
  } else {
    console.log(`  ✓ Version metadata installed: ${targetPath}`);
    results.copied++;
  }
}

function getPlatformSpecFiles(platformKey) {
  if (platformKey === 'claude') {
    const manifestCommands = CLAUDE_MIGRATION_MANIFEST?.commands?.core;
    if (Array.isArray(manifestCommands)) {
      return manifestCommands;
    }

    return [
      'spec-init.md',
      'spec-requirements.md',
      'spec-design.md',
      'spec-validate.md',
      'spec-tasks.md',
      'spec-status.md',
      'code.md',
      'test.md',
      'docs.md'
    ];
  }

  if (platformKey === 'opencode') {
    return [];
  }

  return [];
}

function copyPlatformFiles(platformKey, results, options = {}) {
  const platform = PLATFORMS[platformKey];
  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const recordWriteResult = (didOverwrite) => {
    if (didOverwrite) {
      results.updated++;
    } else {
      results.copied++;
    }
  };

  // Source directories - support different subfolder names per platform
  const sourceSubdir = platform.sourceSubdir || 'commands';
  const commandsSourceDir = path.join(__dirname, `../src/${platform.sourceDir}/${sourceSubdir}`);
  const skillsSourceDir = path.join(__dirname, '../src/claude/skills');
  const agentsSourceDir = path.join(__dirname, `../src/${platform.sourceDir}/agents`);

  // Create directories
  if (!fs.existsSync(platform.commandsDir)) {
    fs.mkdirSync(platform.commandsDir, { recursive: true });
  }
  if (!fs.existsSync(platform.skillsDir)) {
    fs.mkdirSync(platform.skillsDir, { recursive: true });
  }
  if (!fs.existsSync(platform.agentsDir)) {
    fs.mkdirSync(platform.agentsDir, { recursive: true });
  }

  // Copy skills (shared across all platforms)
  if (fs.existsSync(skillsSourceDir)) {
    const specSkillSource = path.join(skillsSourceDir, 'specs');
    const specSkillDest = path.join(platform.skillsDir, 'specs');

    if (fs.existsSync(specSkillSource)) {
      const skillExisted = fs.existsSync(specSkillDest);
      copyRecursive(specSkillSource, specSkillDest, getCopyOptions(platformKey, options));
      results.installedSkills++;

      if (shouldOverwriteManagedFiles && skillExisted) {
        console.log(`  ↻ Skill updated: specs`);
        results.updated++;
      } else {
        console.log(`  ✓ Skill installed: specs`);
      }
    }

    // Keep templates in sync for claude command runtime copies under .claude/skills/specs
    if (platformKey === 'claude') {
      const legacyInitTemplate = path.join(platform.skillsDir, 'specs', 'templates', 'init.json');
      if (fs.existsSync(legacyInitTemplate)) {
        fs.rmSync(legacyInitTemplate, { force: true });
        console.log(`  ↻ Removed legacy template: ${legacyInitTemplate}`);
        results.updated++;
      }

      const specTemplates = [
        'spec-state.json',
        'requirements-init.md',
        'requirements.md',
        'design.md',
        'research.md',
        'task.md'
      ];

      specTemplates.forEach((fileName) => {
        const source = path.join(specSkillSource, 'templates', fileName);
        const dest = path.join(platform.skillsDir, 'specs', 'templates', fileName);

        if (!fs.existsSync(source)) {
          console.log(`  ⚠ Missing dependency template: ${path.join(platform.skillsDir, 'specs', 'templates', fileName)}`);
          results.missingDependencies++;
          results.dependencyChecks++;
          return;
        }

        const destinationExists = fs.existsSync(dest);

        if (destinationExists && !shouldOverwriteManagedFiles) {
          console.log(`  → Dependency exists: ${path.join(platform.skillsDir, 'specs', 'templates', fileName)}`);
          results.dependencyChecks++;
          return;
        }

        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(source, dest);
        results.dependencyChecks++;
        results.installedDependencies++;

        if (destinationExists && shouldOverwriteManagedFiles) {
          console.log(`  ↻ Dependency updated: ${path.join(platform.skillsDir, 'specs', 'templates', fileName)}`);
          results.updated++;
        } else {
          console.log(`  ✓ Dependency installed: ${path.join(platform.skillsDir, 'specs', 'templates', fileName)}`);
        }
      });
    }

    // Copy additional required skills based on platform
    let requiredSkills = [];
    if (isClaudeCompatibleRuntime(platformKey)) {
      requiredSkills = CLAUDE_MIGRATION_MANIFEST?.skills?.required || [];
    }

    requiredSkills
      .filter((skillName) => skillName !== 'specs')
      .forEach((skillName) => {
        const skillSource = path.join(skillsSourceDir, skillName);
        const skillDest = path.join(platform.skillsDir, skillName);

        if (fs.existsSync(skillSource)) {
          const skillExisted = fs.existsSync(skillDest);
          copyRecursive(skillSource, skillDest, getCopyOptions(platformKey, options));
          results.installedSkills++;

          if (shouldOverwriteManagedFiles && skillExisted) {
            console.log(`  ↻ Skill updated: ${skillName}`);
            results.updated++;
          } else {
            console.log(`  ✓ Skill installed: ${skillName}`);
          }
        } else {
          results.missingDependencies++;
          console.log(`  ⚠ Missing dependency template: ${path.join(platform.skillsDir, skillName)}`);
        }
      });
  }

  // Copy agents
  if (isClaudeCompatibleRuntime(platformKey)) {
    if (fs.existsSync(agentsSourceDir)) {
      const requiredAgents = CLAUDE_MIGRATION_MANIFEST?.agents?.required || [
        'tester.md',
        'code-reviewer.md',
        'fullstack-developer.md',
        'debugger.md'
      ];

      requiredAgents.forEach((fileName) => {
        const source = path.join(agentsSourceDir, fileName);
        const dest = path.join(platform.agentsDir, fileName);

        if (!fs.existsSync(source)) {
          console.log(`  ⚠ Missing dependency template: ${path.join(platform.agentsDir, fileName)}`);
          results.missingDependencies++;
          results.dependencyChecks++;
          return;
        }

        const destinationExists = fs.existsSync(dest);

        if (destinationExists && !shouldOverwriteManagedFiles) {
          console.log(`  → Dependency exists: ${path.join(platform.agentsDir, fileName)}`);
          results.dependencyChecks++;
          return;
        }

        fs.mkdirSync(path.dirname(dest), { recursive: true });
        if (platformKey === 'opencode') {
          const content = fs.readFileSync(source, 'utf8');
          fs.writeFileSync(dest, convertOpenCodeAgentContent(content, fileName), 'utf8');
        } else {
          fs.copyFileSync(source, dest);
        }
        results.dependencyChecks++;
        results.installedDependencies++;

        if (destinationExists && shouldOverwriteManagedFiles) {
          console.log(`  ↻ Dependency updated: ${path.join(platform.agentsDir, fileName)}`);
          results.updated++;
        } else {
          console.log(`  ✓ Dependency installed: ${path.join(platform.agentsDir, fileName)}`);
        }
      });

      // Copy agent reference manuals (debugger manuals, etc.) recursively
      const refsSource = path.join(__dirname, '../src', platform.sourceDir, 'references');
      if (fs.existsSync(refsSource)) {
        const refsDest = getRuntimeSupportTargetDir(platformKey, 'references');
        const refsExisted = fs.existsSync(refsDest);
        copyRecursive(refsSource, refsDest, getCopyOptions(platformKey, options));

        if (shouldOverwriteManagedFiles && refsExisted) {
          console.log(`  ↻ Agent reference manuals updated`);
          results.updated++;
        } else {
          console.log(`  ✓ Agent reference manuals installed`);
          results.copied++;
        }
      }

    } else {
      results.missingDependencies++;
      console.log(`  ⚠ Missing dependency template: ${platform.agentsDir}`);
    }

    // Copy native scripts (browser-tool, docs-fetch, validate-docs)
    const scriptsSourceDir = path.join(__dirname, '../src/claude/scripts');
    if (fs.existsSync(scriptsSourceDir)) {
      const scriptsDest = getRuntimeSupportTargetDir(platformKey, 'scripts');
      const scriptsExisted = fs.existsSync(scriptsDest);
      copyRecursive(scriptsSourceDir, scriptsDest, getCopyOptions(platformKey, options));

      if (shouldOverwriteManagedFiles && scriptsExisted) {
        console.log(`  ↻ Native scripts updated`);
        results.updated++;
      } else {
        console.log(`  ✓ Native scripts installed`);
        results.copied++;
      }
    }

  }

  ensureWorkflowDependencies(platformKey, platform, results, options);

  // Copy commands/workflows
  const specFiles = getPlatformSpecFiles(platformKey);

  specFiles.forEach(file => {
    const source = path.join(commandsSourceDir, file);
    const dest = path.join(platform.commandsDir, file);
    const destinationExists = fs.existsSync(dest);

    if (!fs.existsSync(source)) {
      console.error(`  ✗ Error: Source file not found: ${file}`);
      results.errors++;
      return;
    }

    if (destinationExists && !shouldOverwriteManagedFiles) {
      console.log(`  → Skipped: ${file} (already exists)`);
      results.skipped++;
      return;
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let content = fs.readFileSync(source, 'utf8');
    content = content.replace(/\{\{SKILLS_DIR\}\}/g, platform.skillsRef);
    if (platformKey === 'opencode') {
      content = convertOpenCodeCommandContent(content, file);
    }
    fs.writeFileSync(dest, content);

    if (destinationExists && shouldOverwriteManagedFiles) {
      console.log(`  ↻ Updated: ${file}`);
      recordWriteResult(true);
    } else {
      console.log(`  ✓ Copied: ${file}`);
      recordWriteResult(false);
    }
  });
}

// Copy ROUTING.md to .claude/
function copyRoutingFile(platformKey, results, options = {}) {
  const platform = PLATFORMS[platformKey];
  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const source = path.join(__dirname, `../src/${platform.sourceDir}/ROUTING.md`);
  const dest = path.join(platform.folder, 'ROUTING.md');

  if (fs.existsSync(source)) {
    const destinationExists = fs.existsSync(dest);

    if (destinationExists && !shouldOverwriteManagedFiles) {
      console.log(`  → Skipped: ROUTING.md (already exists)`);
      results.skipped++;
      return;
    }

    let content = fs.readFileSync(source, 'utf8');
    content = content.replace(/\{\{SKILLS_DIR\}\}/g, platform.skillsRef);
    if (platformKey === 'opencode') {
      content = normalizeOpenCodeBody(content);
    }
    fs.writeFileSync(dest, content);

    if (destinationExists && shouldOverwriteManagedFiles) {
      console.log(`  ↻ Updated: ROUTING.md`);
      results.updated++;
    } else {
      console.log(`  ✓ Copied: ROUTING.md`);
      results.copied++;
    }
  }
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

  const separator = existingContent.endsWith('\n') ? '\n' : '\n\n';
  return `${existingContent}${separator}${managedBlock}\n`;
}

function getOpenCodeAgentsTemplateContent() {
  const openCodeTemplate = path.join(__dirname, '../src/opencode/AGENTS.md');

  if (fs.existsSync(openCodeTemplate)) {
    return normalizeOpenCodeBody(fs.readFileSync(openCodeTemplate, 'utf8'));
  }

  const claudeTemplate = path.join(__dirname, '../src/claude/CLAUDE.md');
  if (!fs.existsSync(claudeTemplate)) {
    return null;
  }

  return createOpenCodeAgentsContent(fs.readFileSync(claudeTemplate, 'utf8'));
}

// Copy OpenCode project instructions to AGENTS.md at the project root.
function copyOpenCodeAgentsMdFile(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const dest = 'AGENTS.md';
  const content = getOpenCodeAgentsTemplateContent();

  if (content) {
    const destinationExists = fs.existsSync(dest);

    if (destinationExists && !shouldOverwriteManagedFiles) {
      const existingContent = fs.readFileSync(dest, 'utf8');
      const nextContent = upsertCafeKitAgentsBlock(existingContent, content);

      if (nextContent === existingContent) {
        console.log(`  → Skipped: AGENTS.md (already up to date)`);
        results.skipped++;
        return;
      }

      fs.writeFileSync(dest, nextContent, 'utf8');
      console.log(`  ↻ AGENTS.md merged`);
      results.updated++;
      return;
    }

    fs.writeFileSync(dest, content, 'utf8');

    if (destinationExists && shouldOverwriteManagedFiles) {
      console.log(`  ↻ AGENTS.md overwritten`);
      results.updated++;
    } else {
      console.log(`  ✓ AGENTS.md installed`);
      results.copied++;
    }
  } else {
    console.log(`  ⚠ AGENTS.md template source not found`);
    results.missingDependencies++;
  }
}

// Copy Claude runtime files (statusline bundle)
function copyClaudeRuntimeFiles(platformKey, results, options = {}) {
  if (platformKey !== 'claude') return;

  const manifest = CLAUDE_MIGRATION_MANIFEST;
  if (!manifest?.runtime?.files) return;

  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const srcBase = path.join(__dirname, '../src/claude');
  const targetBase = path.join(PLATFORMS.claude.folder);

  manifest.runtime.files.forEach(relPath => {
    const srcPath = path.join(srcBase, relPath);
    const targetRelPath = relPath === 'gitignore' ? '.gitignore' : relPath;
    const targetPath = path.join(targetBase, targetRelPath);

    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠ Runtime file not found: ${relPath}`);
      results.missingDependencies++;
      return;
    }

    const targetExists = fs.existsSync(targetPath);
    const shouldCopy = shouldOverwriteManagedFiles || !targetExists;

    if (shouldCopy) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(srcPath, targetPath);

      if (targetExists) {
        console.log(`  ↻ Runtime updated: ${targetRelPath}`);
        results.updated++;
      } else {
        console.log(`  ✓ Runtime installed: ${targetRelPath}`);
        results.copied++;
      }
    } else {
      results.skipped++;
    }
  });
}

function removeObsoleteClaudeRuntimeFiles(platformKey, results) {
  if (platformKey !== 'claude') return;

  const obsoleteFiles = CLAUDE_MIGRATION_MANIFEST?.obsolete?.runtimeFiles || [];
  const targetBase = path.join(PLATFORMS.claude.folder);

  obsoleteFiles.forEach(relPath => {
    const targetPath = path.join(targetBase, relPath);

    if (!fs.existsSync(targetPath)) {
      return;
    }

    fs.rmSync(targetPath, { force: true });
    console.log(`  ↻ Removed obsolete runtime: ${relPath}`);
    results.updated++;
  });
}

function copyOpenCodeSharedRuntimeFiles(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const srcBase = path.join(__dirname, '../src/claude');
  const runtimeFiles = ['gitignore', 'runtime.json'];

  runtimeFiles.forEach(relPath => {
    const srcPath = path.join(srcBase, relPath);
    const targetRelPath = relPath === 'gitignore' ? '.gitignore' : relPath;
    const targetPath = path.join('.opencode', targetRelPath);

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

function copyOpenCodeCommandTemplates(platformKey, results, options = {}) {
  if (platformKey !== 'opencode') return;

  const platform = PLATFORMS[platformKey];
  const shouldOverwriteManagedFiles = Boolean(options.upgrade);

  OPENCODE_COMMAND_TEMPLATES.forEach(command => {
    const targetPath = path.join(platform.commandsDir, command.fileName);
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

function pruneObsoleteSettingsHooks(settings, results) {
  const obsoleteSubstrings = CLAUDE_MIGRATION_MANIFEST?.obsolete?.settingsHookCommandSubstrings || [];

  if (!settings.hooks || obsoleteSubstrings.length === 0) {
    return settings;
  }

  let removedCount = 0;
  const prunedHooks = {};

  Object.entries(settings.hooks).forEach(([eventName, matcherEntries]) => {
    if (!Array.isArray(matcherEntries)) {
      prunedHooks[eventName] = matcherEntries;
      return;
    }

    const prunedEntries = [];

    matcherEntries.forEach(entry => {
      if (!Array.isArray(entry?.hooks)) {
        prunedEntries.push(entry);
        return;
      }

      const remainingHooks = entry.hooks.filter(hook => {
        const command = hook?.command || '';
        const isObsolete = obsoleteSubstrings.some(substring => command.includes(substring));

        if (isObsolete) {
          removedCount++;
        }

        return !isObsolete;
      });

      if (remainingHooks.length > 0) {
        prunedEntries.push({ ...entry, hooks: remainingHooks });
      }
    });

    if (prunedEntries.length > 0) {
      prunedHooks[eventName] = prunedEntries;
    }
  });

  if (removedCount > 0) {
    console.log(`  ↻ Settings: removed ${removedCount} obsolete hook(s)`);
    results.updated++;
    return { ...settings, hooks: prunedHooks };
  }

  return settings;
}

// Merge Claude settings.json
function mergeClaudeSettings(platformKey, results, options = {}) {
  if (platformKey !== 'claude') return;

  const manifest = CLAUDE_MIGRATION_MANIFEST;
  if (!manifest?.settings?.template) return;

  const templatePath = path.join(__dirname, '../src/claude', manifest.settings.template);
  const targetPath = path.join(PLATFORMS.claude.folder, 'settings.json');

  if (!fs.existsSync(templatePath)) {
    console.log(`  ⚠ Settings template not found: ${manifest.settings.template}`);
    return;
  }

  const managedSettings = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
  let existingSettings = {};

  if (fs.existsSync(targetPath)) {
    existingSettings = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  }

  const mergedSettings = pruneObsoleteSettingsHooks({ ...existingSettings }, results);

  // Merge statusLine
  if (managedSettings.statusLine) {
    const existingCommand = existingSettings.statusLine?.command || '';
    const isCafeKitOwned = existingCommand.includes('status.cjs') || existingCommand.includes('statusline.cjs');

    if (options.upgrade || !existingSettings.statusLine || isCafeKitOwned) {
      mergedSettings.statusLine = managedSettings.statusLine;
      console.log(`  ✓ Settings: statusLine merged`);
    }
  }

  // Merge hooks
  if (managedSettings.hooks) {
    mergedSettings.hooks = mergedSettings.hooks || {};

    Object.keys(managedSettings.hooks).forEach(eventName => {
      const managedHooks = managedSettings.hooks[eventName];
      const existingHooks = mergedSettings.hooks[eventName] || [];
      const mergedHooks = [...existingHooks];

      managedHooks.forEach(managedHook => {
        const managedCommand = managedHook.hooks?.[0]?.command || '';
        const isDuplicate = mergedHooks.some(existingHook => {
          return existingHook.hooks?.some(h => h.command === managedCommand);
        });

        if (!isDuplicate) {
          mergedHooks.push(managedHook);
          console.log(`  ✓ Settings: hook ${eventName} merged`);
        }
      });

      mergedSettings.hooks[eventName] = mergedHooks;
    });
  }

  fs.writeFileSync(targetPath, JSON.stringify(mergedSettings, null, 2), 'utf8');
}

// Copy CLAUDE.md template (always overwrite at Project Root)
function copyClaudeMdFile(platformKey, results, options = {}) {
  if (platformKey !== 'claude') return;

  const source = path.join(__dirname, '../src/claude/CLAUDE.md');
  const dest = 'CLAUDE.md'; // Xuất thẳng ra thư mục ROOT thay vì nhét vào trong .claude/

  if (fs.existsSync(source)) {
    const destinationExists = fs.existsSync(dest);

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(source, dest);

    if (destinationExists) {
      console.log(`  ↻ CLAUDE.md overwritten`);
      results.updated++;
    } else {
      console.log(`  ✓ CLAUDE.md installed`);
      results.copied++;
    }
  } else {
    console.log(`  ⚠ CLAUDE.md template not found`);
    results.missingDependencies++;
  }
}

// Copy rules directory (always overwrite)
function copyRulesDirectory(platformKey, results, options = {}) {
  if (!isClaudeCompatibleRuntime(platformKey)) return;

  const source = path.join(__dirname, '../src/claude/rules');
  const dest = getRuntimeSupportTargetDir(platformKey, 'rules');

  if (fs.existsSync(source)) {
    copyRecursive(source, dest, getCopyOptions(platformKey, { upgrade: true }));
    console.log(`  ↻ rules/ directory overwritten`);
    results.updated++;
  } else {
    console.log(`  ⚠ rules/ directory not found`);
    results.missingDependencies++;
  }
}

// Ensure .gitignore configured at root
function ensureGitignore(results, options = {}) {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  const header = '# CafeKit / Ecosystem';
  const patterns = [
    'specs/_shared/',
    'plans/',
    '!plans/templates/'
  ];

  if (!fs.existsSync(gitignorePath)) {
    const content = ['# Git Ignore', '', header, ...patterns, ''].join('\n');
    fs.writeFileSync(gitignorePath, content, 'utf8');
    console.log('  ✓ .gitignore created at root');
    results.copied++;
    return;
  }

  const content = fs.readFileSync(gitignorePath, 'utf8');
  const lines = content.split('\n').map(l => l.trim());
  const missing = patterns.filter(p => !lines.includes(p));

  if (missing.length > 0) {
    let newContent = content;
    if (!newContent.endsWith('\n')) newContent += '\n';
    if (!content.includes(header)) newContent += `\n${header}\n`;

    newContent += missing.join('\n') + '\n';
    fs.writeFileSync(gitignorePath, newContent, 'utf8');
    console.log(`  ↻ .gitignore updated: added ${missing.join(', ')}`);
    results.updated++;
  } else {
    console.log('  → .gitignore already up to date');
    results.skipped++;
  }
}

// ═══════════════════════════════════════════════════════════
// GEMINI CLI SETUP
// ═══════════════════════════════════════════════════════════

function checkGeminiCLI() {
  try {
    execSync('which gemini', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function installGeminiCLI() {
  console.log('\n⚙ Installing gemini-cli...');
  try {
    execSync('npm install -g @google/gemini-cli', { stdio: 'inherit' });
    console.log('  ✓ gemini-cli installed successfully');
    return true;
  } catch (error) {
    console.log('  ✗ Failed to install gemini-cli automatically');
    console.log('  Please run manually: npm install -g @google/gemini-cli');
    return false;
  }
}

async function promptInstallGemini() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n📦 Optional: Gemini CLI Installation');
  console.log('  hapo:inspect with ext mode requires gemini-cli');
  console.log('  • Install now: Auto-install and configure API key');
  console.log('  • Skip: You can still use hapo:inspect in internal mode');
  console.log();

  return new Promise((resolve) => {
    rl.question('Install gemini-cli? (Y/n): ', (answer) => {
      rl.close();
      const response = answer.trim().toLowerCase();
      resolve(response === '' || response === 'y' || response === 'yes');
    });
  });
}

async function promptGeminiAPIKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n📝 Gemini API Key Configuration');
  console.log('  Get your API key: https://aistudio.google.com/apikey');
  console.log();

  return new Promise((resolve) => {
    rl.question('Enter your Gemini API key (or press Enter to skip): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function configureGeminiKey(apiKey, platforms = ['claude']) {
  const envBody = `GEMINI_API_KEY=${apiKey}\nVISUAL_MODEL=gemma-4-31b-it\nSEARCH_MODEL=gemini-2.5-pro\n`;
  const targets = platforms
    .filter(key => PLATFORMS[key])
    .map(key => PLATFORMS[key].folder);

  if (targets.length === 0) {
    targets.push('.claude');
  }

  let success = true;
  for (const folder of targets) {
    try {
      const targetDir = path.join(process.cwd(), folder);
      const localEnvFile = path.join(targetDir, '.env');

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(localEnvFile, envBody, { mode: 0o600 });
      console.log(`  ✓ Gemini API key configured securely in project (${folder}/.env)`);
    } catch (error) {
      success = false;
      console.log('  ✗ Failed to configure Gemini API key');
      console.log(`  Error: ${error.message}`);
      console.log('  You can manually set: export GEMINI_API_KEY="your-key"');
    }
  }

  return success;
}

async function setupGeminiCLI(platforms) {
  const hasGemini = checkGeminiCLI();

  if (hasGemini) {
    console.log('  ✓ gemini-cli already installed');
  } else {
    const shouldInstall = await promptInstallGemini();
    if (shouldInstall) {
      installGeminiCLI();
    } else {
      console.log('\n  ℹ Skipped gemini-cli installation');
      console.log('  • hapo:inspect will work in internal mode (default)');
      console.log('  • To install later: npm install -g @google/gemini-cli');
    }
  }

  // Always prompt for API config since we need it for hapo:test Multimodal
  const apiKey = await promptGeminiAPIKey();
  if (apiKey) {
    configureGeminiKey(apiKey, platforms);
  } else {
    console.log('\n  ℹ Skipped API key configuration');
    console.log('  Set later: export GEMINI_API_KEY="your-key"');
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════

async function main() {
  const installerOptions = parseInstallerArgs(process.argv);

  console.log();
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log(`║         CafeKit Installer v${String(packageJson.version).padEnd(5, ' ')}                    ║`);
  console.log('║         Multi-platform SDD Workflow                    ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log();

  let platforms = detectPlatforms();

  if (platforms.length === 0) {
    // No platforms detected - prompt user
    platforms = await promptPlatformSelection();

    if (platforms.length === 0) {
      console.log('\nInstallation cancelled.');
      process.exit(0);
    }
  } else if (platforms.length > 1) {
    // Multiple platforms detected - confirm with user
    const proceed = await promptMultiPlatformConfirm(platforms);
    if (!proceed) {
      platforms = await promptPlatformSelection();
      if (platforms.length === 0) {
        console.log('\nInstallation cancelled.');
        process.exit(0);
      }
    }
  }

  // Show detected/selected platforms
  const platformNames = platforms.map(key => PLATFORMS[key].name).join(', ');
  console.log(`\nInstalling for: ${platformNames}`);

  warnLegacyClaudeFolder(platforms);

  if (installerOptions.upgrade) {
    console.log('Mode: upgrade (overwrite managed files)\n');
  } else {
    console.log('Mode: install (skip existing files)\n');
  }

  const results = {
    copied: 0,
    updated: 0,
    skipped: 0,
    installedSkills: 0,
    dependencyChecks: 0,
    installedDependencies: 0,
    missingDependencies: 0,
    errors: 0,
    targets: []
  };

  try {
    for (const platformKey of platforms) {
      const platform = PLATFORMS[platformKey];
      console.log(`${platform.name} (${platform.folder}/)`);
      console.log('-'.repeat(40));

      copyPlatformFiles(platformKey, results, installerOptions);

      // Copy ROUTING.md for Claude Code platform
      if (platformKey === 'claude') {
        copyRoutingFile(platformKey, results, installerOptions);
        copyClaudeRuntimeFiles(platformKey, results, installerOptions);
        removeObsoleteClaudeRuntimeFiles(platformKey, results);
        mergeClaudeSettings(platformKey, results, installerOptions);
        copyClaudeMdFile(platformKey, results, installerOptions);
        copyRulesDirectory(platformKey, results, installerOptions);
      }

      if (platformKey === 'opencode') {
        copyOpenCodeSharedRuntimeFiles(platformKey, results, installerOptions);
        copyOpenCodeCommandTemplates(platformKey, results, installerOptions);
        copyOpenCodeAgentsMdFile(platformKey, results, installerOptions);
        copyRulesDirectory(platformKey, results, installerOptions);
        mergeOpenCodeConfig(platformKey, results);
      }

      writePlatformVersionMetadata(platformKey, results);

      results.targets.push(platform.commandsDir);
      console.log();
    }

    // Ensure root .gitignore is configured correctly
    console.log('Root Configuration');
    console.log('-'.repeat(40));
    ensureGitignore(results, installerOptions);
    console.log();

    // Setup runtime-specific optional model/API configuration
    await setupOpenCodeModel(platforms, results);
    await setupGeminiCLI(platforms);

    // Summary
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║         Installation Complete!                         ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log();
    console.log(`  Copied Files:       ${results.copied}`);
    console.log(`  Updated Files:      ${results.updated}`);
    console.log(`  CafeKit Version:    ${packageJson.version}`);
    console.log(`  Skipped Files:      ${results.skipped}`);
    console.log(`  Installed Skills:   ${results.installedSkills > 0 ? 'Yes ✓' : 'No'}`);
    console.log(`  Dependency Checks:  ${results.dependencyChecks}`);
    console.log(`  Installed Deps:     ${results.installedDependencies}`);
    console.log(`  Missing Deps:       ${results.missingDependencies}`);
    console.log(`  Target Directories: ${results.targets.join(', ')}`);
    if (results.errors > 0) {
      console.log(`  Errors:             ${results.errors} ⚠`);
    }
    console.log();
    console.log('Next steps:');
    const nextEditorLabel = platforms.length === 1 ? PLATFORMS[platforms[0]].name : 'your AI editor';
    console.log(`  1. Start ${nextEditorLabel}`);

    // Show platform-specific hints
    for (const platformKey of platforms) {
      const platform = PLATFORMS[platformKey];
      console.log(`\n  For ${platform.name}:`);
      if (platformKey === 'claude') {
        console.log('     Use skill: /hapo:specs <feature-description>');
      } else {
        console.log(`     Instruct the agent to start a new feature or brainstorm`);
      }
    }

    if (platforms.includes('claude')) {
      console.log('\n  2. Claude Code will automatically sync docs/ (Continuous Documentation)');
    } else {
      console.log('\n  2. CafeKit skills and AGENTS.md are installed for the selected runtime');
    }
    const envHosts = platforms.map(key => `${PLATFORMS[key].folder}/.env`).join(' and ');
    console.log(`  3. Project API Keys are now securely isolated in ${envHosts}`);
    if (!installerOptions.upgrade) {
      console.log('  4. To refresh managed templates later, run installer with --upgrade');
    }
    console.log();
    console.log('Documentation: https://github.com/haposoft/cafekit');
    if (results.missingDependencies > 0) {
      console.log('Note: some dependency templates could not be installed. Please check command/agent directories.');
    }
    console.log();

    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error(`\n✗ Installation failed: ${error.message}`);
    process.exit(1);
  }
}

main();
