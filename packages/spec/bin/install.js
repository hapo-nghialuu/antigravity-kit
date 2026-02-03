#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Detect platform
function detectPlatform() {
  if (fs.existsSync('.claude/commands')) return 'claude';
  if (fs.existsSync('.claude')) return 'claude';
  return null;
}

// Prompt user for confirmation
async function promptConfirmation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Create .claude/commands/ directory? (yes/no): ', (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'yes' || answer.trim().toLowerCase() === 'y');
    });
  });
}

// Copy files
function copyFiles() {
  const platform = 'claude';
  const sourceDir = path.join(__dirname, '../src/claude/commands');
  const targetDir = '.claude/commands';

  // Create target directory if not exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

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
    const target = path.join(targetDir, file);

    if (!fs.existsSync(source)) {
      console.error(`Error: Source file not found: ${file}`);
      process.exit(1);
    }

    if (fs.existsSync(target)) {
      console.log(`Skipped: ${file} (already exists)`);
      skipped++;
    } else {
      fs.copyFileSync(source, target);
      console.log(`Copied: ${file}`);
      copied++;
    }
  });

  return { copied, skipped };
}

// Main
async function main() {
  console.log('CafeKit Spec Installer\n');

  let platform = detectPlatform();

  if (!platform) {
    console.log('No .claude/ folder detected in current directory.');
    const shouldCreate = await promptConfirmation();

    if (!shouldCreate) {
      console.log('Installation cancelled.');
      process.exit(0);
    }
  } else {
    console.log('Detected .claude/ folder');
  }

  try {
    const { copied, skipped } = copyFiles();

    console.log(`\nInstallation complete!`);
    console.log(`   Copied: ${copied} files`);
    console.log(`   Skipped: ${skipped} files`);
    console.log(`\nNext steps:`);
    console.log(`   1. Run /spec-init <feature-name>`);
    console.log(`   2. Follow the spec workflow: requirements -> design -> tasks -> impl`);
    console.log(`\nDocumentation: https://github.com/vudovn/cafekit`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: Installation failed: ${error.message}`);
    process.exit(1);
  }
}

main();
