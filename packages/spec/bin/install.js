#!/usr/bin/env node

/**
 * CafeKit Installer
 * Multi-platform installer for AI coding assistants
 *
 * Supported platforms:
 * - claude: Claude Code (.claude/)
 * - antigravity: Antigravity (.agent/)
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
    antigravity: {
      'code.md': `---
description: Implement approved work from specification tasks and then hand off to test and hapo:code-review.
allowed-tools: Read, Glob, Grep, Edit, Write, Bash
argument-hint: <feature-name>
---

# /code

Use this workflow after /spec-tasks.

1. Read .specs/$ARGUMENTS/tasks.md and identify the next pending task.
2. Implement only that task following project standards.
3. Run /test.
4. Run /hapo:code-review.

Preferred flow: /spec-init -> /spec-requirements -> /spec-design -> /spec-tasks -> /code -> /test -> /hapo:code-review
`,
      'test.md': `---
description: Run project tests and report failures concisely.
allowed-tools: Bash, Read, Grep
argument-hint: [scope]
---

# /test

Run the project's test command and report:
- total passed/failed
- failing test names
- root cause hints
- next fix action
`,
    }
  },
  agents: {
    claude: {},
    antigravity: {
      'frontend-specialist.md': `---
name: frontend-specialist
description: Implement approved UI and interaction tasks from specifications.
---

Implement UI tasks from approved specs with accessibility and responsive behavior.
`,
      'test-engineer.md': `---
name: test-engineer
description: Execute tests and report reliability issues.
---

Run test suites, highlight failures, and propose precise fixes.
`,
      'code-archaeologist.md': `---
name: code-archaeologist
description: Review recent changes for regressions and hidden impacts.
---

Inspect changed code paths, dependencies, and potential regressions.
`
    }
  }
};

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
  antigravity: {
    id: 'antigravity',
    name: 'Antigravity',
    description: 'Google\'s Antigravity Kit',
    folder: '.agent',
    commandsDir: '.agent/workflows',  // Antigravity uses workflows/ not commands/
    skillsDir: '.agent/skills',
    agentsDir: '.agent/agents',
    skillsRef: '.agent/skills',
    commandPrefix: '/',
    sourceDir: 'antigravity',  // Maps to src/antigravity/
    sourceSubdir: 'workflows'  // Source subfolder within src/antigravity/
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
    if (fs.existsSync(config.folder)) {
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
    fs.copyFileSync(src, dest);
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

  if (platformKey === 'antigravity') {
    return [
      'spec-init.md',
      'spec-requirements.md',
      'spec-design.md',
      'spec-validate.md',
      'spec-tasks.md',
      'spec-status.md',
      'impact-analysis.md',
      'docs-init.md',
      'docs-update.md'
    ];
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
      copyRecursive(specSkillSource, specSkillDest, options);
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
      const specTemplates = [
        'init.json',
        'requirements-init.md',
        'requirements.md',
        'design.md',
        'research.md',
        'tasks.md'
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
    if (platformKey === 'claude') {
      requiredSkills = CLAUDE_MIGRATION_MANIFEST?.skills?.required || [];
    } else if (platformKey === 'antigravity') {
      // Antigravity also needs shared investigation and impact-analysis skills
      requiredSkills = ['impact-analysis', 'debug', 'ai-multimodal'];
    }

    requiredSkills
      .filter((skillName) => skillName !== 'specs')
      .forEach((skillName) => {
        const skillSource = path.join(skillsSourceDir, skillName);
        const skillDest = path.join(platform.skillsDir, skillName);

        if (fs.existsSync(skillSource)) {
          const skillExisted = fs.existsSync(skillDest);
          copyRecursive(skillSource, skillDest, options);
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
  if (platformKey === 'claude') {
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
        fs.copyFileSync(source, dest);
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
        const refsDest = path.join(platform.folder, 'references');
        const refsExisted = fs.existsSync(refsDest);
        copyRecursive(refsSource, refsDest, options);

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
      const scriptsDest = path.join(platform.folder, 'scripts');
      const scriptsExisted = fs.existsSync(scriptsDest);
      copyRecursive(scriptsSourceDir, scriptsDest, options);

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

// Copy GEMINI.md rule file to .agent/rules/ for Antigravity
function copyGeminiFile(platformKey, results, options = {}) {
  const platform = PLATFORMS[platformKey];
  const shouldOverwriteManagedFiles = Boolean(options.upgrade);
  const rulesDir = path.join(platform.folder, 'rules');
  const source = path.join(__dirname, `../src/${platform.sourceDir}/GEMINI.md`);
  const dest = path.join(rulesDir, 'GEMINI.md');

  if (fs.existsSync(source)) {
    // Create rules directory if not exists
    if (!fs.existsSync(rulesDir)) {
      fs.mkdirSync(rulesDir, { recursive: true });
    }

    const destinationExists = fs.existsSync(dest);

    if (destinationExists && !shouldOverwriteManagedFiles) {
      console.log(`  → Skipped: rules/GEMINI.md (already exists)`);
      results.skipped++;
      return;
    }

    fs.copyFileSync(source, dest);

    if (destinationExists && shouldOverwriteManagedFiles) {
      console.log(`  ↻ Updated: rules/GEMINI.md`);
      results.updated++;
    } else {
      console.log(`  ✓ Copied: rules/GEMINI.md`);
      results.copied++;
    }
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
    const targetPath = path.join(targetBase, relPath);

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
        console.log(`  ↻ Runtime updated: ${relPath}`);
        results.updated++;
      } else {
        console.log(`  ✓ Runtime installed: ${relPath}`);
        results.copied++;
      }
    } else {
      results.skipped++;
    }
  });
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

  const mergedSettings = { ...existingSettings };

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
  if (platformKey !== 'claude') return;

  const source = path.join(__dirname, '../src/claude/rules');
  const dest = path.join(PLATFORMS.claude.folder, 'rules');

  if (fs.existsSync(source)) {
    copyRecursive(source, dest, { upgrade: true });
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

function configureGeminiKey(apiKey) {
  try {
    const targetDir = path.join(process.cwd(), '.claude');
    const localEnvFile = path.join(targetDir, '.env');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Luôn ghi trực tiếp key vào rốn của não bộ AI
    fs.writeFileSync(localEnvFile, `GEMINI_API_KEY=${apiKey}\nVISUAL_MODEL=gemma-4-31b-it\nSEARCH_MODEL=gemini-2.5-pro\n`, { mode: 0o600 });
    console.log('  ✓ Gemini API key configured securely in project (.claude/.env)');

    return true;
  } catch (error) {
    console.log('  ✗ Failed to configure Gemini API key');
    console.log(`  Error: ${error.message}`);
    console.log('  You can manually set: export GEMINI_API_KEY="your-key"');
    return false;
  }
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
    configureGeminiKey(apiKey);
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
        mergeClaudeSettings(platformKey, results, installerOptions);
        copyClaudeMdFile(platformKey, results, installerOptions);
        copyRulesDirectory(platformKey, results, installerOptions);
      }

      // Copy GEMINI.md for Antigravity platform
      if (platformKey === 'antigravity') {
        copyGeminiFile(platformKey, results, installerOptions);
      }

      results.targets.push(platform.commandsDir);
      console.log();
    }

    // Ensure root .gitignore is configured correctly
    console.log('Root Configuration');
    console.log('-'.repeat(40));
    ensureGitignore(results, installerOptions);
    console.log();

    // Setup Gemini CLI and API Key config
    await setupGeminiCLI(platforms);

    // Summary
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║         Installation Complete!                         ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log();
    console.log(`  Copied Files:       ${results.copied}`);
    console.log(`  Updated Files:      ${results.updated}`);
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
    console.log('  1. Start your AI editor (Claude Code or Antigravity)');

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

    console.log('\n  2. The AI will automatically sync docs/ (Continuous Documentation)');
    console.log('  3. Project API Keys are now securely isolated in .claude/.env');
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
