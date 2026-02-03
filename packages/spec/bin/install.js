#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Detect platforms
function detectPlatforms() {
  const platforms = [];
  if (fs.existsSync('.claude')) platforms.push('claude');
  if (fs.existsSync('.agent')) platforms.push('antigravity');
  return platforms;
}

// Prompt user for confirmation
async function promptPlatformSelection() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('No existing configuration detected.');
  console.log('Which platform do you want to install for?');
  console.log('1) Claude Code (.claude/commands)');
  console.log('2) Antigravity (.agent/commands)');
  console.log('3) Both');

  return new Promise((resolve) => {
    rl.question('Select (1-3): ', (answer) => {
      rl.close();
      const choice = answer.trim();
      if (choice === '1') resolve(['claude']);
      else if (choice === '2') resolve(['antigravity']);
      else if (choice === '3') resolve(['claude', 'antigravity']);
      else resolve([]); // Cancel
    });
  });
}

// Copy recursive
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

// Copy files
function copyFiles(platforms) {
  const commandsSourceDir = path.join(__dirname, '../src/claude/commands');
  const skillsSourceDir = path.join(__dirname, '../src/common/skills');

  // Define targets
  const targets = [];
  if (platforms.includes('claude')) {
    targets.push({
      commandsDir: '.claude/commands',
      skillsDir: '.claude/skills',
      skillsRef: '.claude/skills'
    });
  }
  if (platforms.includes('antigravity')) {
    targets.push({
      commandsDir: '.agent/commands',
      skillsDir: '.agent/skills',
      skillsRef: '.agent/skills'
    });
  }

  let copiedFiles = 0;
  let skippedFiles = 0;
  let copiedSkills = 0;

  // Process each target platform
  targets.forEach(target => {
    // 1. Copy Skills
    if (fs.existsSync(skillsSourceDir)) {
      if (!fs.existsSync(target.skillsDir)) {
        fs.mkdirSync(target.skillsDir, { recursive: true });
      }

      // Copy spec-driven-development skill folder
      const specSkillSource = path.join(skillsSourceDir, 'spec-driven-development');
      const specSkillDest = path.join(target.skillsDir, 'spec-driven-development');

      if (fs.existsSync(specSkillSource)) {
        // We overwrite skills to ensure they match the package version
        copyRecursive(specSkillSource, specSkillDest);
        copiedSkills++;
        console.log(`[${target.skillsDir}] Installed skill: spec-driven-development`);
      } else {
        console.warn(`Warning: Skills source not found at ${specSkillSource}`);
      }
    }

    // 2. Copy Commands
    if (!fs.existsSync(target.commandsDir)) {
      fs.mkdirSync(target.commandsDir, { recursive: true });
    }

    const specFiles = [
      'spec-init.md',
      'spec-requirements.md',
      'spec-design.md',
      'spec-tasks.md',
      'spec-impl.md',
      'spec-status.md'
    ];

    specFiles.forEach(file => {
      const source = path.join(commandsSourceDir, file);
      const dest = path.join(target.commandsDir, file);

      if (!fs.existsSync(source)) {
        console.error(`Error: Source file not found: ${file}`);
        process.exit(1);
      }

      if (fs.existsSync(dest)) {
        console.log(`[${target.commandsDir}] Skipped: ${file} (already exists)`);
        skippedFiles++;
      } else {
        // Read content and replace placeholders
        let content = fs.readFileSync(source, 'utf8');
        content = content.replace(/{{SKILLS_DIR}}/g, target.skillsRef);

        fs.writeFileSync(dest, content);
        console.log(`[${target.commandsDir}] Copied: ${file}`);
        copiedFiles++;
      }
    });
  });

  return { copied: copiedFiles, skipped: skippedFiles, copiedSkills, targets: targets.map(t => t.commandsDir) };
}

// Main
async function main() {
  console.log('CafeKit Spec Installer\n');

  let platforms = detectPlatforms();

  if (platforms.length === 0) {
    platforms = await promptPlatformSelection();

    if (platforms.length === 0) {
      console.log('Installation cancelled.');
      process.exit(0);
    }
  } else {
    console.log(`Detected platforms: ${platforms.join(', ')}`);
  }

  try {
    const result = copyFiles(platforms);

    console.log(`\nInstallation complete!`);
    console.log(`   Copied Commands: ${result.copied}`);
    console.log(`   Skipped Commands: ${result.skipped}`);
    console.log(`   Installed Skills: ${result.copiedSkills > 0 ? 'Yes' : 'No'}`);
    console.log(`   Targets: ${result.targets.join(', ')}`);
    console.log(`\nNext steps:`);
    console.log(`   1. Run /spec-init <feature-name>`);
    console.log(`   2. Follow the spec workflow: requirements -> design -> tasks -> impl`);
    console.log(`\nDocumentation: https://github.com/hapo-nghialuu/hapo-cafekit`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: Installation failed: ${error.message}`);
    process.exit(1);
  }
}

main();
