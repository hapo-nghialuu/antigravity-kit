#!/bin/bash

# Find Dependencies Script
# Tìm tất cả files bị ảnh hưởng bởi code changes
#
# Usage:
#   ./find-dependencies.sh <file-path>
#   ./find-dependencies.sh src/services/authService.ts

set -e

if [ $# -eq 0 ]; then
  echo "Usage: $0 <file-path>"
  echo "Example: $0 src/services/authService.ts"
  exit 1
fi

FILE_PATH="$1"
FILE_NAME=$(basename "$FILE_PATH")
FILE_BASE="${FILE_NAME%.*}"
SRC_DIR="${SRC_DIR:-src}"

echo "🔍 Finding dependencies for: $FILE_PATH"
echo ""

# 1. Find direct imports
echo "📦 Direct Imports:"
echo "Files that import this module:"
echo ""

# TypeScript/JavaScript imports
grep -r "from ['\"].*$FILE_BASE['\"]" "$SRC_DIR" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | \
  grep -v "node_modules" | \
  grep -v ".test." | \
  grep -v ".spec." | \
  cut -d: -f1 | \
  sort -u | \
  while read -r file; do
    echo "  - $file"
  done

# Alternative import syntax
grep -r "import.*from ['\"].*$FILE_BASE['\"]" "$SRC_DIR" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | \
  grep -v "node_modules" | \
  grep -v ".test." | \
  grep -v ".spec." | \
  cut -d: -f1 | \
  sort -u | \
  while read -r file; do
    echo "  - $file"
  done

echo ""

# 2. Find function/class usage
echo "🔧 Function/Class Usage:"
echo "Searching for common exports..."
echo ""

# Extract exported names from the file
if [ -f "$FILE_PATH" ]; then
  # Find exported functions
  EXPORTS=$(grep -E "export (function|const|class|interface|type)" "$FILE_PATH" 2>/dev/null | \
    sed -E 's/export (function|const|class|interface|type) ([a-zA-Z0-9_]+).*/\2/' | \
    head -10)
  
  if [ -n "$EXPORTS" ]; then
    for export_name in $EXPORTS; do
      echo "  Searching for: $export_name"
      
      # Find usage (excluding the source file itself)
      grep -r "\b$export_name\b" "$SRC_DIR" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | \
        grep -v "node_modules" | \
        grep -v "$FILE_PATH" | \
        grep -v ".test." | \
        grep -v ".spec." | \
        cut -d: -f1 | \
        sort -u | \
        head -5 | \
        while read -r file; do
          echo "    - $file"
        done
    done
  fi
fi

echo ""

# 3. Find API endpoint usage (if this is an API file)
if [[ "$FILE_PATH" == *"/api/"* ]] || [[ "$FILE_PATH" == *"routes"* ]]; then
  echo "🌐 API Endpoint Usage:"
  echo "Searching for API calls..."
  echo ""
  
  # Extract API endpoints from the file
  ENDPOINTS=$(grep -E "(get|post|put|delete|patch)\(['\"]" "$FILE_PATH" 2>/dev/null | \
    sed -E "s/.*['\"]([^'\"]+)['\"].*/\1/" | \
    head -5)
  
  if [ -n "$ENDPOINTS" ]; then
    for endpoint in $ENDPOINTS; do
      echo "  Endpoint: $endpoint"
      
      # Find frontend calls to this endpoint
      grep -r "$endpoint" "$SRC_DIR" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | \
        grep -v "node_modules" | \
        grep -v "$FILE_PATH" | \
        cut -d: -f1 | \
        sort -u | \
        head -5 | \
        while read -r file; do
          echo "    - $file"
        done
    done
  fi
  
  echo ""
fi

# 4. Find component usage (if this is a React component)
if [[ "$FILE_PATH" == *"components"* ]] || [[ "$FILE_PATH" == *".tsx" ]]; then
  echo "⚛️  Component Usage:"
  echo "Searching for component references..."
  echo ""
  
  COMPONENT_NAME=$(basename "$FILE_PATH" .tsx)
  COMPONENT_NAME=$(basename "$COMPONENT_NAME" .jsx)
  
  # Find JSX usage
  grep -r "<$COMPONENT_NAME" "$SRC_DIR" --include="*.tsx" --include="*.jsx" 2>/dev/null | \
    grep -v "node_modules" | \
    grep -v "$FILE_PATH" | \
    cut -d: -f1 | \
    sort -u | \
    while read -r file; do
      echo "  - $file"
    done
  
  echo ""
fi

# 5. Find test files
echo "🧪 Related Tests:"
echo "Test files for this module:"
echo ""

# Find test files with similar names
find "$SRC_DIR" -type f \( -name "*$FILE_BASE*.test.*" -o -name "*$FILE_BASE*.spec.*" \) 2>/dev/null | \
  while read -r file; do
    echo "  - $file"
  done

# Find test files that import this module
grep -r "from ['\"].*$FILE_BASE['\"]" "$SRC_DIR" --include="*.test.*" --include="*.spec.*" 2>/dev/null | \
  cut -d: -f1 | \
  sort -u | \
  while read -r file; do
    echo "  - $file"
  done

echo ""

# 6. Summary
echo "📊 Summary:"
echo ""

IMPORT_COUNT=$(grep -r "from ['\"].*$FILE_BASE['\"]" "$SRC_DIR" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | \
  grep -v "node_modules" | \
  grep -v ".test." | \
  grep -v ".spec." | \
  wc -l | tr -d ' ')

TEST_COUNT=$(find "$SRC_DIR" -type f \( -name "*$FILE_BASE*.test.*" -o -name "*$FILE_BASE*.spec.*" \) 2>/dev/null | wc -l | tr -d ' ')

echo "  Direct imports: $IMPORT_COUNT"
echo "  Related tests: $TEST_COUNT"
echo ""

# 7. Recommendations
echo "💡 Recommendations:"
echo ""

if [ "$IMPORT_COUNT" -gt 10 ]; then
  echo "  ⚠️  HIGH IMPACT: This file is imported by many files ($IMPORT_COUNT)"
  echo "     → Test thoroughly before deploying"
  echo "     → Consider backward compatibility"
fi

if [ "$TEST_COUNT" -eq 0 ]; then
  echo "  ⚠️  NO TESTS: No test files found for this module"
  echo "     → Add unit tests before deploying"
fi

if [[ "$FILE_PATH" == *"/api/"* ]]; then
  echo "  ⚠️  API CHANGE: This is an API file"
  echo "     → Check for breaking changes"
  echo "     → Update API documentation"
  echo "     → Test all API consumers"
fi

echo ""
echo "✅ Dependency analysis complete"
