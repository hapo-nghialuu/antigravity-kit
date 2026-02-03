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

// Copy files
function copyFiles(platforms) {
  const sourceDir = path.join(__dirname, '../src/claude/commands');

  // Define targets based on platforms
  const targets = [];
  if (platforms.includes('claude')) targets.push('.claude/commands');
  if (platforms.includes('antigravity')) targets.push('.agent/commands');

  // Create directories
  targets.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Copy each spec file
  const specFiles = [
    'spec-init.md',
    'spec-requirements.md',
    'spec-design.md',
    'spec-tasks.md',
    'spec-impl.md',
    'spec-status.md'
  ];

  let copied = 0;
  let skipped = 0;

  specFiles.forEach(file => {
    const source = path.join(sourceDir, file);

    if (!fs.existsSync(source)) {
      console.error(`Error: Source file not found: ${file}`);
      process.exit(1);
    }

    targets.forEach(targetDir => {
      const target = path.join(targetDir, file);

      if (fs.existsSync(target)) {
        console.log(`[${targetDir}] Skipped: ${file} (already exists)`);
        skipped++;
      } else {
        fs.copyFileSync(source, target);
        console.log(`[${targetDir}] Copied: ${file}`);
        copied++;
      }
    });
  });

  return { copied, skipped, targets };
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
    const { copied, skipped, targets } = copyFiles(platforms);

    console.log(`\nInstallation complete!`);
    console.log(`   Copied: ${copied} files`);
    console.log(`   Skipped: ${skipped} files`);
    console.log(`   Targets: ${targets.join(', ')}`);
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
