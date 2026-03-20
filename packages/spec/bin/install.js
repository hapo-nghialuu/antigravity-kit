#!/usr/bin/env node

/**
 * CafeKit Spec Installer
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
const readline = require('readline');

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
  console.log('║      CafeKit Spec - Platform Selection                 ║');
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

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyPlatformFiles(platformKey, results) {
  const platform = PLATFORMS[platformKey];

  // Source directories - support different subfolder names per platform
  const sourceSubdir = platform.sourceSubdir || 'commands';
  const commandsSourceDir = path.join(__dirname, `../src/${platform.sourceDir}/${sourceSubdir}`);
  const skillsSourceDir = path.join(__dirname, '../src/common/skills');

  // Create directories
  if (!fs.existsSync(platform.commandsDir)) {
    fs.mkdirSync(platform.commandsDir, { recursive: true });
  }
  if (!fs.existsSync(platform.skillsDir)) {
    fs.mkdirSync(platform.skillsDir, { recursive: true });
  }

  // Copy skills (shared across all platforms)
  if (fs.existsSync(skillsSourceDir)) {
    const specSkillSource = path.join(skillsSourceDir, 'spec-driven-development');
    const specSkillDest = path.join(platform.skillsDir, 'spec-driven-development');

    if (fs.existsSync(specSkillSource)) {
      copyRecursive(specSkillSource, specSkillDest);
      results.installedSkills++;
      console.log(`  ✓ Skill installed: spec-driven-development`);
    }
  }

  // Copy commands/workflows
  const specFiles = [
    'spec-init.md',
    'spec-requirements.md',
    'spec-design.md',
    'spec-tasks.md',
    'spec-impl.md',
    'spec-status.md',
    'impact-analysis.md',
    'docs_init.md',
    'docs_update.md'
  ];

  specFiles.forEach(file => {
    const source = path.join(commandsSourceDir, file);
    const dest = path.join(platform.commandsDir, file);

    if (!fs.existsSync(source)) {
      console.error(`  ✗ Error: Source file not found: ${file}`);
      results.errors++;
      return;
    }

    if (fs.existsSync(dest)) {
      console.log(`  → Skipped: ${file} (already exists)`);
      results.skipped++;
    } else {
      let content = fs.readFileSync(source, 'utf8');
      content = content.replace(/\{\{SKILLS_DIR\}\}/g, platform.skillsRef);
      fs.writeFileSync(dest, content);
      console.log(`  ✓ Copied: ${file}`);
      results.copied++;
    }
  });
}

// Copy ROUTING.md to .claude/
function copyRoutingFile(platformKey, results) {
  const platform = PLATFORMS[platformKey];
  const source = path.join(__dirname, `../src/${platform.sourceDir}/ROUTING.md`);
  const dest = path.join(platform.folder, 'ROUTING.md');

  if (fs.existsSync(source)) {
    if (fs.existsSync(dest)) {
      console.log(`  → Skipped: ROUTING.md (already exists)`);
      results.skipped++;
    } else {
      fs.copyFileSync(source, dest);
      console.log(`  ✓ Copied: ROUTING.md`);
      results.copied++;
    }
  }
}

// Copy GEMINI.md rule file to .agent/rules/ for Antigravity
function copyGeminiFile(platformKey, results) {
  const platform = PLATFORMS[platformKey];
  const rulesDir = path.join(platform.folder, 'rules');
  const source = path.join(__dirname, `../src/${platform.sourceDir}/GEMINI.md`);
  const dest = path.join(rulesDir, 'GEMINI.md');

  if (fs.existsSync(source)) {
    // Create rules directory if not exists
    if (!fs.existsSync(rulesDir)) {
      fs.mkdirSync(rulesDir, { recursive: true });
    }

    if (fs.existsSync(dest)) {
      console.log(`  → Skipped: rules/GEMINI.md (already exists)`);
      results.skipped++;
    } else {
      fs.copyFileSync(source, dest);
      console.log(`  ✓ Copied: rules/GEMINI.md`);
      results.copied++;
    }
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════

async function main() {
  console.log();
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║         CafeKit Spec Installer v0.1.6                  ║');
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
  console.log(`\nInstalling for: ${platformNames}\n`);

  const results = {
    copied: 0,
    skipped: 0,
    installedSkills: 0,
    errors: 0,
    targets: []
  };

  try {
    for (const platformKey of platforms) {
      const platform = PLATFORMS[platformKey];
      console.log(`${platform.name} (${platform.folder}/)`);
      console.log('-'.repeat(40));

      copyPlatformFiles(platformKey, results);

      // Copy ROUTING.md for Claude Code platform
      if (platformKey === 'claude') {
        copyRoutingFile(platformKey, results);
      }

      // Copy GEMINI.md for Antigravity platform
      if (platformKey === 'antigravity') {
        copyGeminiFile(platformKey, results);
      }

      results.targets.push(platform.commandsDir);
      console.log();
    }

    // Note: CLAUDE.md and docs/ are generated via /docs init command

    // Summary
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║         Installation Complete!                         ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log();
    console.log(`  Copied Commands:    ${results.copied}`);
    console.log(`  Skipped Commands:   ${results.skipped}`);
    console.log(`  Installed Skills:   ${results.installedSkills > 0 ? 'Yes ✓' : 'No'}`);
    console.log(`  Target Directories: ${results.targets.join(', ')}`);
    if (results.errors > 0) {
      console.log(`  Errors:             ${results.errors} ⚠`);
    }
    console.log();
    console.log('Next steps:');
    console.log('  1. Start your AI editor');

    // Show platform-specific commands
    for (const platformKey of platforms) {
      const platform = PLATFORMS[platformKey];
      console.log(`\n  For ${platform.name}:`);
      console.log(`     Run: ${platform.commandPrefix}spec-init <feature-name>`);
    }

    console.log('\n  2. Follow the workflow: requirements → design → tasks → impl');
    console.log();
    console.log('Documentation: https://github.com/hapo-nghialuu/hapo-cafekit');
    console.log();

    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error(`\n✗ Installation failed: ${error.message}`);
    process.exit(1);
  }
}

main();
