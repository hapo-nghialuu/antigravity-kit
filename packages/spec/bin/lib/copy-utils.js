'use strict';

const fs = require('fs');
const path = require('path');

const TEXT_REWRITE_EXTENSIONS = new Set([
  '.md', '.mdx', '.txt', '.json', '.cjs', '.js', '.mjs', '.ts', '.py', '.sh', '.toml', '.yml', '.yaml'
]);

function isTextAsset(filePath) {
  return TEXT_REWRITE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

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

module.exports = {
  TEXT_REWRITE_EXTENSIONS,
  isTextAsset,
  copyRecursive,
  readJsonFile
};
