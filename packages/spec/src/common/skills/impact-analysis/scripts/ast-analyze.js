#!/usr/bin/env node

/**
 * AST-Based Analysis Script
 * Phân tích function signatures, type changes, và breaking changes
 * 
 * Usage:
 *   node ast-analyze.js <file-path>
 *   node ast-analyze.js src/services/authService.ts
 */

const fs = require('fs');
const path = require('path');

// Try to use @babel/parser if available, otherwise provide instructions
let parser, traverse;
try {
  parser = require('@babel/parser');
  traverse = require('@babel/traverse').default;
} catch (e) {
  console.error('❌ Dependencies not installed');
  console.error('Run: npm install --save-dev @babel/parser @babel/traverse');
  process.exit(1);
}

function analyzeFunctionSignatures(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const code = fs.readFileSync(filePath, 'utf-8');
  
  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'decorators-legacy']
    });
  } catch (e) {
    console.error(`❌ Parse error: ${e.message}`);
    process.exit(1);
  }
  
  const functions = [];
  const classes = [];
  const interfaces = [];
  const types = [];
  
  traverse(ast, {
    // Function declarations
    FunctionDeclaration(path) {
      functions.push({
        type: 'function',
        name: path.node.id?.name || 'anonymous',
        params: path.node.params.map(p => getParamName(p)),
        paramCount: path.node.params.length,
        async: path.node.async,
        generator: path.node.generator,
        line: path.node.loc.start.line,
        exported: isExported(path)
      });
    },
    
    // Arrow functions
    ArrowFunctionExpression(path) {
      if (path.parent.type === 'VariableDeclarator') {
        functions.push({
          type: 'arrow',
          name: path.parent.id.name,
          params: path.node.params.map(p => getParamName(p)),
          paramCount: path.node.params.length,
          async: path.node.async,
          line: path.node.loc.start.line,
          exported: isExported(path.parentPath.parentPath)
        });
      }
    },
    
    // Class declarations
    ClassDeclaration(path) {
      const methods = [];
      path.node.body.body.forEach(member => {
        if (member.type === 'ClassMethod') {
          methods.push({
            name: member.key.name,
            kind: member.kind, // constructor, method, get, set
            params: member.params.map(p => getParamName(p)),
            paramCount: member.params.length,
            async: member.async,
            static: member.static,
            line: member.loc.start.line
          });
        }
      });
      
      classes.push({
        name: path.node.id.name,
        methods,
        line: path.node.loc.start.line,
        exported: isExported(path)
      });
    },
    
    // TypeScript interfaces
    TSInterfaceDeclaration(path) {
      const properties = path.node.body.body.map(prop => ({
        name: prop.key?.name || 'unknown',
        optional: prop.optional,
        type: getTypeAnnotation(prop.typeAnnotation)
      }));
      
      interfaces.push({
        name: path.node.id.name,
        properties,
        line: path.node.loc.start.line,
        exported: isExported(path)
      });
    },
    
    // TypeScript type aliases
    TSTypeAliasDeclaration(path) {
      types.push({
        name: path.node.id.name,
        line: path.node.loc.start.line,
        exported: isExported(path)
      });
    }
  });
  
  return {
    file: filePath,
    functions,
    classes,
    interfaces,
    types,
    summary: {
      totalFunctions: functions.length,
      totalClasses: classes.length,
      totalInterfaces: interfaces.length,
      totalTypes: types.length,
      exportedFunctions: functions.filter(f => f.exported).length,
      asyncFunctions: functions.filter(f => f.async).length
    }
  };
}

function getParamName(param) {
  if (param.type === 'Identifier') {
    return param.name;
  } else if (param.type === 'AssignmentPattern') {
    return `${getParamName(param.left)} = ${param.right.value || '...'}`;
  } else if (param.type === 'RestElement') {
    return `...${param.argument.name}`;
  } else if (param.type === 'ObjectPattern') {
    return `{ ${param.properties.map(p => p.key?.name || '?').join(', ')} }`;
  }
  return 'unknown';
}

function getTypeAnnotation(typeAnnotation) {
  if (!typeAnnotation) return 'any';
  const type = typeAnnotation.typeAnnotation;
  if (!type) return 'any';
  
  if (type.type === 'TSStringKeyword') return 'string';
  if (type.type === 'TSNumberKeyword') return 'number';
  if (type.type === 'TSBooleanKeyword') return 'boolean';
  if (type.type === 'TSAnyKeyword') return 'any';
  if (type.type === 'TSTypeReference') return type.typeName.name;
  
  return 'unknown';
}

function isExported(path) {
  let current = path;
  while (current) {
    if (current.node.type === 'ExportNamedDeclaration' || 
        current.node.type === 'ExportDefaultDeclaration') {
      return true;
    }
    current = current.parentPath;
  }
  return false;
}

function compareAnalysis(before, after) {
  const changes = {
    functionsAdded: [],
    functionsRemoved: [],
    functionsModified: [],
    interfacesAdded: [],
    interfacesRemoved: [],
    interfacesModified: []
  };
  
  // Compare functions
  const beforeFuncs = new Map(before.functions.map(f => [f.name, f]));
  const afterFuncs = new Map(after.functions.map(f => [f.name, f]));
  
  // Find added functions
  afterFuncs.forEach((func, name) => {
    if (!beforeFuncs.has(name)) {
      changes.functionsAdded.push(func);
    }
  });
  
  // Find removed functions
  beforeFuncs.forEach((func, name) => {
    if (!afterFuncs.has(name)) {
      changes.functionsRemoved.push(func);
    }
  });
  
  // Find modified functions
  beforeFuncs.forEach((beforeFunc, name) => {
    const afterFunc = afterFuncs.get(name);
    if (afterFunc && beforeFunc.paramCount !== afterFunc.paramCount) {
      changes.functionsModified.push({
        name,
        before: beforeFunc,
        after: afterFunc,
        breaking: true,
        reason: `Parameter count changed: ${beforeFunc.paramCount} → ${afterFunc.paramCount}`
      });
    }
  });
  
  // Compare interfaces
  const beforeInterfaces = new Map(before.interfaces.map(i => [i.name, i]));
  const afterInterfaces = new Map(after.interfaces.map(i => [i.name, i]));
  
  afterInterfaces.forEach((iface, name) => {
    if (!beforeInterfaces.has(name)) {
      changes.interfacesAdded.push(iface);
    } else {
      const beforeIface = beforeInterfaces.get(name);
      const beforeProps = new Set(beforeIface.properties.map(p => p.name));
      const afterProps = new Set(iface.properties.map(p => p.name));
      
      const added = [...afterProps].filter(p => !beforeProps.has(p));
      const removed = [...beforeProps].filter(p => !afterProps.has(p));
      
      if (added.length > 0 || removed.length > 0) {
        changes.interfacesModified.push({
          name,
          propertiesAdded: added,
          propertiesRemoved: removed,
          breaking: removed.length > 0
        });
      }
    }
  });
  
  beforeInterfaces.forEach((iface, name) => {
    if (!afterInterfaces.has(name)) {
      changes.interfacesRemoved.push(iface);
    }
  });
  
  return changes;
}

function printAnalysis(analysis) {
  console.log('\n📊 AST Analysis Results\n');
  console.log(`File: ${analysis.file}`);
  console.log(`\n📈 Summary:`);
  console.log(`  Functions: ${analysis.summary.totalFunctions} (${analysis.summary.exportedFunctions} exported, ${analysis.summary.asyncFunctions} async)`);
  console.log(`  Classes: ${analysis.summary.totalClasses}`);
  console.log(`  Interfaces: ${analysis.summary.totalInterfaces}`);
  console.log(`  Types: ${analysis.summary.totalTypes}`);
  
  if (analysis.functions.length > 0) {
    console.log(`\n🔧 Functions:`);
    analysis.functions.forEach(func => {
      const badge = func.exported ? '📤' : '  ';
      const asyncBadge = func.async ? 'async ' : '';
      console.log(`  ${badge} ${asyncBadge}${func.name}(${func.params.join(', ')}) - line ${func.line}`);
    });
  }
  
  if (analysis.classes.length > 0) {
    console.log(`\n🏗️  Classes:`);
    analysis.classes.forEach(cls => {
      console.log(`  ${cls.exported ? '📤' : '  '} ${cls.name} - line ${cls.line}`);
      cls.methods.forEach(method => {
        const badge = method.static ? 'static ' : '';
        const asyncBadge = method.async ? 'async ' : '';
        console.log(`      ${badge}${asyncBadge}${method.name}(${method.params.join(', ')})`);
      });
    });
  }
  
  if (analysis.interfaces.length > 0) {
    console.log(`\n📋 Interfaces:`);
    analysis.interfaces.forEach(iface => {
      console.log(`  ${iface.exported ? '📤' : '  '} ${iface.name} - line ${iface.line}`);
      iface.properties.forEach(prop => {
        const optional = prop.optional ? '?' : '';
        console.log(`      ${prop.name}${optional}: ${prop.type}`);
      });
    });
  }
}

function printComparison(changes) {
  console.log('\n🔍 Changes Detected\n');
  
  let hasChanges = false;
  
  if (changes.functionsAdded.length > 0) {
    hasChanges = true;
    console.log('✅ Functions Added:');
    changes.functionsAdded.forEach(func => {
      console.log(`  + ${func.name}(${func.params.join(', ')})`);
    });
  }
  
  if (changes.functionsRemoved.length > 0) {
    hasChanges = true;
    console.log('\n❌ Functions Removed:');
    changes.functionsRemoved.forEach(func => {
      console.log(`  - ${func.name}(${func.params.join(', ')})`);
    });
  }
  
  if (changes.functionsModified.length > 0) {
    hasChanges = true;
    console.log('\n⚠️  Functions Modified (BREAKING):');
    changes.functionsModified.forEach(change => {
      console.log(`  ~ ${change.name}`);
      console.log(`    Before: ${change.before.params.join(', ')}`);
      console.log(`    After:  ${change.after.params.join(', ')}`);
      console.log(`    Reason: ${change.reason}`);
    });
  }
  
  if (changes.interfacesAdded.length > 0) {
    hasChanges = true;
    console.log('\n✅ Interfaces Added:');
    changes.interfacesAdded.forEach(iface => {
      console.log(`  + ${iface.name}`);
    });
  }
  
  if (changes.interfacesRemoved.length > 0) {
    hasChanges = true;
    console.log('\n❌ Interfaces Removed:');
    changes.interfacesRemoved.forEach(iface => {
      console.log(`  - ${iface.name}`);
    });
  }
  
  if (changes.interfacesModified.length > 0) {
    hasChanges = true;
    console.log('\n⚠️  Interfaces Modified:');
    changes.interfacesModified.forEach(change => {
      console.log(`  ~ ${change.name} ${change.breaking ? '(BREAKING)' : ''}`);
      if (change.propertiesAdded.length > 0) {
        console.log(`    Added: ${change.propertiesAdded.join(', ')}`);
      }
      if (change.propertiesRemoved.length > 0) {
        console.log(`    Removed: ${change.propertiesRemoved.join(', ')}`);
      }
    });
  }
  
  if (!hasChanges) {
    console.log('✅ No semantic changes detected');
  }
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node ast-analyze.js <file-path> [--compare <before-file>]');
  console.error('Example: node ast-analyze.js src/services/authService.ts');
  console.error('Example: node ast-analyze.js src/services/authService.ts --compare /tmp/before.ts');
  process.exit(1);
}

const filePath = args[0];
const compareMode = args.includes('--compare');
const beforeFile = compareMode ? args[args.indexOf('--compare') + 1] : null;

if (compareMode && beforeFile) {
  const before = analyzeFunctionSignatures(beforeFile);
  const after = analyzeFunctionSignatures(filePath);
  const changes = compareAnalysis(before, after);
  printComparison(changes);
} else {
  const analysis = analyzeFunctionSignatures(filePath);
  printAnalysis(analysis);
}

// Export for programmatic use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    analyzeFunctionSignatures,
    compareAnalysis
  };
}
