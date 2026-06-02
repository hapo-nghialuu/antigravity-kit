#!/usr/bin/env node

/**
 * Risk Calculation Script
 * Đánh giá mức độ risk của code changes
 * 
 * Usage:
 *   node calculate-risk.js
 *   node calculate-risk.js --files "file1.ts,file2.ts"
 *   node calculate-risk.js --json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Risk scoring configuration
const RISK_CONFIG = {
  // File type weights
  fileTypes: {
    database: 5,      // Schema, migrations
    api: 3,           // API endpoints
    auth: 5,          // Authentication
    payment: 5,       // Payment processing
    security: 5,      // Security-related
    config: 2,        // Configuration
    frontend: 1,      // UI components
    test: 0           // Test files
  },
  
  // Change size weights
  changeSize: {
    huge: { threshold: 500, weight: 3 },
    large: { threshold: 200, weight: 2 },
    medium: { threshold: 50, weight: 1 },
    small: { threshold: 0, weight: 0 }
  },
  
  // Dependency weights
  dependencies: {
    many: { threshold: 20, weight: 3 },
    some: { threshold: 10, weight: 2 },
    few: { threshold: 5, weight: 1 },
    none: { threshold: 0, weight: 0 }
  },
  
  // Risk levels
  levels: {
    critical: { threshold: 15, label: 'CRITICAL', emoji: '⚠️⚠️⚠️' },
    high: { threshold: 10, label: 'HIGH', emoji: '⚠️⚠️' },
    medium: { threshold: 5, label: 'MEDIUM', emoji: '⚠️' },
    low: { threshold: 0, label: 'LOW', emoji: '✅' }
  }
};

function getChangedFiles(fileList) {
  if (fileList) {
    return fileList.split(',').map(f => f.trim());
  }
  
  try {
    const output = execSync('git diff HEAD --name-only', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(f => f);
  } catch (e) {
    console.error('❌ Error getting changed files:', e.message);
    return [];
  }
}

function getChangeStats(files) {
  const stats = {
    filesChanged: files.length,
    linesAdded: 0,
    linesRemoved: 0,
    totalLines: 0
  };
  
  try {
    const output = execSync('git diff HEAD --numstat', { encoding: 'utf-8' });
    const lines = output.trim().split('\n');
    
    lines.forEach(line => {
      const [added, removed] = line.split('\t').map(n => parseInt(n) || 0);
      stats.linesAdded += added;
      stats.linesRemoved += removed;
    });
    
    stats.totalLines = stats.linesAdded + stats.linesRemoved;
  } catch (e) {
    // Ignore errors
  }
  
  return stats;
}

function classifyFiles(files) {
  const classified = {
    database: [],
    api: [],
    auth: [],
    payment: [],
    security: [],
    config: [],
    frontend: [],
    test: [],
    other: []
  };
  
  files.forEach(file => {
    const lower = file.toLowerCase();
    
    if (lower.includes('test.') || lower.includes('spec.')) {
      classified.test.push(file);
    } else if (lower.includes('schema') || lower.includes('migration') || lower.includes('.sql')) {
      classified.database.push(file);
    } else if (lower.includes('/api/') || lower.includes('route') || lower.includes('endpoint')) {
      classified.api.push(file);
    } else if (lower.includes('auth') || lower.includes('login') || lower.includes('session')) {
      classified.auth.push(file);
    } else if (lower.includes('payment') || lower.includes('checkout') || lower.includes('stripe')) {
      classified.payment.push(file);
    } else if (lower.includes('security') || lower.includes('crypto') || lower.includes('encrypt')) {
      classified.security.push(file);
    } else if (lower.includes('config') || lower.includes('.env') || lower.includes('package.json')) {
      classified.config.push(file);
    } else if (lower.includes('component') || lower.includes('screen') || lower.includes('page')) {
      classified.frontend.push(file);
    } else {
      classified.other.push(file);
    }
  });
  
  return classified;
}

function countDependencies(files) {
  let totalDeps = 0;
  
  files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    try {
      const basename = path.basename(file, path.extname(file));
      const srcDir = 'src';
      
      if (!fs.existsSync(srcDir)) return;
      
      // Count imports of this file
      const grepCmd = `grep -r "from.*${basename}" ${srcDir} --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | wc -l`;
      const count = parseInt(execSync(grepCmd, { encoding: 'utf-8' }).trim()) || 0;
      totalDeps += count;
    } catch (e) {
      // Ignore errors
    }
  });
  
  return totalDeps;
}

function detectBreakingChanges(files) {
  const breaking = [];
  
  files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    try {
      // Check git diff for breaking patterns
      const diffCmd = `git diff HEAD -- "${file}"`;
      const diff = execSync(diffCmd, { encoding: 'utf-8' });
      
      // Detect function signature changes
      if (diff.match(/^-.*function.*\(/m) && diff.match(/^\+.*function.*\(/m)) {
        breaking.push({
          file,
          type: 'function_signature',
          description: 'Function signature may have changed'
        });
      }
      
      // Detect interface changes
      if (diff.match(/^-.*interface/m) || diff.match(/^\+.*interface/m)) {
        breaking.push({
          file,
          type: 'interface_change',
          description: 'Interface definition changed'
        });
      }
      
      // Detect API endpoint changes
      if (diff.match(/^-.*\.(get|post|put|delete|patch)\(/m)) {
        breaking.push({
          file,
          type: 'api_endpoint',
          description: 'API endpoint may have changed'
        });
      }
    } catch (e) {
      // Ignore errors
    }
  });
  
  return breaking;
}

function calculateRiskScore(data) {
  let score = 0;
  const breakdown = [];
  
  // File type risk
  Object.entries(data.classified).forEach(([type, files]) => {
    if (files.length > 0 && RISK_CONFIG.fileTypes[type]) {
      const weight = RISK_CONFIG.fileTypes[type];
      const points = weight * Math.min(files.length, 3); // Cap at 3x
      score += points;
      breakdown.push({
        factor: `${type} files`,
        weight,
        count: files.length,
        points,
        description: `${files.length} ${type} file(s) changed`
      });
    }
  });
  
  // Change size risk
  const totalLines = data.stats.totalLines;
  for (const [size, config] of Object.entries(RISK_CONFIG.changeSize)) {
    if (totalLines >= config.threshold) {
      score += config.weight;
      breakdown.push({
        factor: 'change size',
        weight: config.weight,
        count: totalLines,
        points: config.weight,
        description: `${totalLines} lines changed (${size})`
      });
      break;
    }
  }
  
  // Dependency risk
  const depCount = data.dependencies;
  for (const [level, config] of Object.entries(RISK_CONFIG.dependencies)) {
    if (depCount >= config.threshold) {
      score += config.weight;
      breakdown.push({
        factor: 'dependencies',
        weight: config.weight,
        count: depCount,
        points: config.weight,
        description: `${depCount} files depend on changes (${level})`
      });
      break;
    }
  }
  
  // Breaking changes risk
  if (data.breakingChanges.length > 0) {
    const points = Math.min(data.breakingChanges.length * 2, 5);
    score += points;
    breakdown.push({
      factor: 'breaking changes',
      weight: 2,
      count: data.breakingChanges.length,
      points,
      description: `${data.breakingChanges.length} potential breaking change(s)`
    });
  }
  
  // Determine risk level
  let level = RISK_CONFIG.levels.low;
  for (const [name, config] of Object.entries(RISK_CONFIG.levels)) {
    if (score >= config.threshold) {
      level = config;
    }
  }
  
  return {
    score,
    maxScore: 25,
    level: level.label,
    emoji: level.emoji,
    breakdown
  };
}

function generateRecommendations(data, risk) {
  const recommendations = [];
  
  // High risk recommendations
  if (risk.level === 'CRITICAL' || risk.level === 'HIGH') {
    recommendations.push({
      priority: 'CRITICAL',
      action: 'Extensive testing required',
      description: 'Run full test suite including integration and E2E tests'
    });
    
    recommendations.push({
      priority: 'CRITICAL',
      action: 'Code review required',
      description: 'Get at least 2 senior developers to review changes'
    });
  }
  
  // Database changes
  if (data.classified.database.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Database migration plan',
      description: 'Create rollback script and test migration on staging'
    });
  }
  
  // API changes
  if (data.classified.api.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'API documentation update',
      description: 'Update API docs and notify frontend team'
    });
  }
  
  // Auth changes
  if (data.classified.auth.length > 0) {
    recommendations.push({
      priority: 'CRITICAL',
      action: 'Security review',
      description: 'Review authentication flow and test all auth scenarios'
    });
  }
  
  // Payment changes
  if (data.classified.payment.length > 0) {
    recommendations.push({
      priority: 'CRITICAL',
      action: 'Payment testing',
      description: 'Test payment flow in sandbox environment'
    });
  }
  
  // Breaking changes
  if (data.breakingChanges.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Update all consumers',
      description: `Update ${data.dependencies} files that depend on changed code`
    });
  }
  
  // Many dependencies
  if (data.dependencies > 10) {
    recommendations.push({
      priority: 'MEDIUM',
      action: 'Regression testing',
      description: 'Test all affected features to prevent regression'
    });
  }
  
  return recommendations;
}

function printReport(data, risk, recommendations) {
  console.log('\n🎯 Risk Assessment Report\n');
  console.log('═'.repeat(60));
  
  // Risk score
  console.log(`\n📊 Risk Score: ${risk.score}/${risk.maxScore}`);
  console.log(`🎚️  Risk Level: ${risk.emoji} ${risk.level}`);
  
  // Summary
  console.log(`\n📋 Summary:`);
  console.log(`  Files changed: ${data.stats.filesChanged}`);
  console.log(`  Lines changed: ${data.stats.totalLines} (+${data.stats.linesAdded}, -${data.stats.linesRemoved})`);
  console.log(`  Dependencies: ${data.dependencies} files affected`);
  console.log(`  Breaking changes: ${data.breakingChanges.length}`);
  
  // File classification
  console.log(`\n📁 File Classification:`);
  Object.entries(data.classified).forEach(([type, files]) => {
    if (files.length > 0) {
      const weight = RISK_CONFIG.fileTypes[type] || 0;
      const emoji = weight >= 5 ? '🔴' : weight >= 3 ? '🟡' : '🟢';
      console.log(`  ${emoji} ${type}: ${files.length} file(s)`);
      files.slice(0, 3).forEach(file => {
        console.log(`     - ${file}`);
      });
      if (files.length > 3) {
        console.log(`     ... and ${files.length - 3} more`);
      }
    }
  });
  
  // Risk breakdown
  console.log(`\n⚖️  Risk Breakdown:`);
  risk.breakdown.forEach(item => {
    console.log(`  • ${item.description}`);
    console.log(`    Points: ${item.points} (weight: ${item.weight})`);
  });
  
  // Breaking changes
  if (data.breakingChanges.length > 0) {
    console.log(`\n⚠️  Potential Breaking Changes:`);
    data.breakingChanges.forEach((change, i) => {
      console.log(`  ${i + 1}. ${change.file}`);
      console.log(`     Type: ${change.type}`);
      console.log(`     ${change.description}`);
    });
  }
  
  // Recommendations
  console.log(`\n💡 Recommendations:`);
  recommendations.forEach((rec, i) => {
    const emoji = rec.priority === 'CRITICAL' ? '🔴' : rec.priority === 'HIGH' ? '🟡' : '🟢';
    console.log(`  ${emoji} [${rec.priority}] ${rec.action}`);
    console.log(`     ${rec.description}`);
  });
  
  console.log('\n' + '═'.repeat(60));
  console.log('');
}

function printJSON(data, risk, recommendations) {
  const output = {
    risk,
    data,
    recommendations,
    timestamp: new Date().toISOString()
  };
  console.log(JSON.stringify(output, null, 2));
}

// Main
const args = process.argv.slice(2);
const fileList = args.includes('--files') ? args[args.indexOf('--files') + 1] : null;
const jsonOutput = args.includes('--json');

const files = getChangedFiles(fileList);

if (files.length === 0) {
  console.error('❌ No changed files found');
  console.error('Usage: node calculate-risk.js [--files "file1.ts,file2.ts"] [--json]');
  process.exit(1);
}

const stats = getChangeStats(files);
const classified = classifyFiles(files);
const dependencies = countDependencies(files);
const breakingChanges = detectBreakingChanges(files);

const data = {
  files,
  stats,
  classified,
  dependencies,
  breakingChanges
};

const risk = calculateRiskScore(data);
const recommendations = generateRecommendations(data, risk);

if (jsonOutput) {
  printJSON(data, risk, recommendations);
} else {
  printReport(data, risk, recommendations);
}

// Export for programmatic use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateRiskScore,
    generateRecommendations,
    classifyFiles,
    getChangeStats
  };
}
