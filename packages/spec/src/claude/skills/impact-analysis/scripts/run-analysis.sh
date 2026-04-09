#!/bin/bash

# Master Impact Analysis Script
# Chạy tất cả analysis techniques và tạo comprehensive report
#
# Usage:
#   ./run-analysis.sh
#   ./run-analysis.sh --files "file1.ts,file2.ts"
#   ./run-analysis.sh --output report.md

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FILE="${OUTPUT_FILE:-impact-analysis-report.md}"
SRC_DIR="${SRC_DIR:-src}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
FILES=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --files)
      FILES="$2"
      shift 2
      ;;
    --output)
      OUTPUT_FILE="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--files \"file1.ts,file2.ts\"] [--output report.md]"
      exit 1
      ;;
  esac
done

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         🔍 Impact Analysis - Comprehensive Report          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get changed files
if [ -n "$FILES" ]; then
  CHANGED_FILES=$(echo "$FILES" | tr ',' '\n')
  echo -e "${GREEN}📝 Analyzing specified files:${NC}"
else
  CHANGED_FILES=$(git diff HEAD --name-only 2>/dev/null || echo "")
  if [ -z "$CHANGED_FILES" ]; then
    echo -e "${RED}❌ No changed files found${NC}"
    echo "Usage: $0 [--files \"file1.ts,file2.ts\"]"
    exit 1
  fi
  echo -e "${GREEN}📝 Analyzing uncommitted changes:${NC}"
fi

echo "$CHANGED_FILES" | while read -r file; do
  echo "  - $file"
done
echo ""

# Initialize report
cat > "$OUTPUT_FILE" << 'EOF'
# Impact Analysis Report

**Generated**: $(date '+%Y-%m-%d %H:%M:%S')
**Branch**: $(git branch --show-current 2>/dev/null || echo "unknown")

---

EOF

# Step 1: Change Detection
echo -e "${YELLOW}[1/6]${NC} 📊 Detecting changes..."
{
  echo "## 📊 Change Detection"
  echo ""
  echo "### Files Changed"
  echo ""
  echo "$CHANGED_FILES" | while read -r file; do
    echo "- \`$file\`"
  done
  echo ""
  
  # Git stats
  if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "### Change Statistics"
    echo ""
    echo '```'
    git diff HEAD --stat 2>/dev/null || echo "No git stats available"
    echo '```'
    echo ""
  fi
} >> "$OUTPUT_FILE"

# Step 2: Risk Assessment
echo -e "${YELLOW}[2/6]${NC} ⚠️  Calculating risk..."
{
  echo "## ⚠️ Risk Assessment"
  echo ""
  
  if [ -f "$SCRIPT_DIR/calculate-risk.js" ]; then
    if [ -n "$FILES" ]; then
      node "$SCRIPT_DIR/calculate-risk.js" --files "$FILES" 2>/dev/null || echo "Risk calculation failed"
    else
      node "$SCRIPT_DIR/calculate-risk.js" 2>/dev/null || echo "Risk calculation failed"
    fi
  else
    echo "⚠️ Risk calculation script not found"
  fi
  echo ""
} >> "$OUTPUT_FILE"

# Step 3: Dependency Analysis
echo -e "${YELLOW}[3/6]${NC} 🔗 Finding dependencies..."
{
  echo "## 🔗 Dependency Analysis"
  echo ""
  
  if [ -f "$SCRIPT_DIR/find-dependencies.sh" ]; then
    echo "$CHANGED_FILES" | while read -r file; do
      if [ -f "$file" ]; then
        echo "### Dependencies for \`$file\`"
        echo ""
        echo '```'
        bash "$SCRIPT_DIR/find-dependencies.sh" "$file" 2>/dev/null || echo "Dependency analysis failed for $file"
        echo '```'
        echo ""
      fi
    done
  else
    echo "⚠️ Dependency analysis script not found"
  fi
} >> "$OUTPUT_FILE"

# Step 4: AST Analysis (for TypeScript/JavaScript files)
echo -e "${YELLOW}[4/6]${NC} 🌳 Running AST analysis..."
{
  echo "## 🌳 AST Analysis (Semantic Changes)"
  echo ""
  
  TS_FILES=$(echo "$CHANGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || echo "")
  
  if [ -n "$TS_FILES" ] && [ -f "$SCRIPT_DIR/ast-analyze.js" ]; then
    # Check if dependencies are installed
    if node -e "require('@babel/parser')" 2>/dev/null; then
      echo "$TS_FILES" | while read -r file; do
        if [ -f "$file" ]; then
          echo "### AST Analysis for \`$file\`"
          echo ""
          echo '```'
          node "$SCRIPT_DIR/ast-analyze.js" "$file" 2>/dev/null || echo "AST analysis failed for $file"
          echo '```'
          echo ""
        fi
      done
    else
      echo "⚠️ AST analysis dependencies not installed"
      echo ""
      echo "To enable AST analysis, run:"
      echo '```bash'
      echo "npm install --save-dev @babel/parser @babel/traverse"
      echo '```'
      echo ""
    fi
  else
    echo "ℹ️ No TypeScript/JavaScript files to analyze"
    echo ""
  fi
} >> "$OUTPUT_FILE"

# Step 5: Test Coverage
echo -e "${YELLOW}[5/6]${NC} 🧪 Analyzing test coverage..."
{
  echo "## 🧪 Test Coverage Analysis"
  echo ""
  
  # Check if Jest is available
  if command -v jest &> /dev/null; then
    echo "### Related Tests"
    echo ""
    echo '```'
    
    TS_FILES=$(echo "$CHANGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || echo "")
    if [ -n "$TS_FILES" ]; then
      jest --listTests --findRelatedTests $TS_FILES 2>/dev/null || echo "No related tests found"
    else
      echo "No testable files changed"
    fi
    
    echo '```'
    echo ""
  else
    echo "ℹ️ Jest not available - skipping test coverage analysis"
    echo ""
  fi
} >> "$OUTPUT_FILE"

# Step 6: Feature Mapping
echo -e "${YELLOW}[6/6]${NC} 🎯 Mapping features..."
{
  echo "## 🎯 Feature Impact Map"
  echo ""
  
  # Simple pattern-based feature detection
  echo "### Affected Features"
  echo ""
  
  declare -A features
  
  echo "$CHANGED_FILES" | while read -r file; do
    lower=$(echo "$file" | tr '[:upper:]' '[:lower:]')
    
    if [[ "$lower" == *"auth"* ]] || [[ "$lower" == *"login"* ]]; then
      echo "- **Authentication & Login**: \`$file\`"
    elif [[ "$lower" == *"user"* ]] || [[ "$lower" == *"profile"* ]]; then
      echo "- **User Profile Management**: \`$file\`"
    elif [[ "$lower" == *"post"* ]] || [[ "$lower" == *"article"* ]]; then
      echo "- **Post Management**: \`$file\`"
    elif [[ "$lower" == *"comment"* ]] || [[ "$lower" == *"reply"* ]]; then
      echo "- **Comment System**: \`$file\`"
    elif [[ "$lower" == *"payment"* ]] || [[ "$lower" == *"checkout"* ]]; then
      echo "- **Payment Processing**: \`$file\`"
    elif [[ "$lower" == *"notification"* ]]; then
      echo "- **Notification System**: \`$file\`"
    elif [[ "$lower" == *"search"* ]] || [[ "$lower" == *"filter"* ]]; then
      echo "- **Search & Filter**: \`$file\`"
    elif [[ "$lower" == *"upload"* ]] || [[ "$lower" == *"file"* ]]; then
      echo "- **File Upload**: \`$file\`"
    elif [[ "$lower" == *"api"* ]]; then
      echo "- **API Layer**: \`$file\`"
    elif [[ "$lower" == *"database"* ]] || [[ "$lower" == *"schema"* ]] || [[ "$lower" == *"migration"* ]]; then
      echo "- **Database**: \`$file\`"
    else
      echo "- **Other**: \`$file\`"
    fi
  done
  
  echo ""
} >> "$OUTPUT_FILE"

# Step 7: Recommendations
{
  echo "## 💡 Recommendations"
  echo ""
  echo "### Before Testing"
  echo ""
  echo "- [ ] Review all changed files"
  echo "- [ ] Check for breaking changes"
  echo "- [ ] Update documentation"
  echo "- [ ] Review dependencies"
  echo ""
  echo "### Testing Checklist"
  echo ""
  echo "- [ ] Run unit tests"
  echo "- [ ] Run integration tests"
  echo "- [ ] Test affected features manually"
  echo "- [ ] Test edge cases"
  echo "- [ ] Test on multiple environments"
  echo ""
  echo "### Before Deployment"
  echo ""
  echo "- [ ] Code review approved"
  echo "- [ ] All tests passing"
  echo "- [ ] Documentation updated"
  echo "- [ ] Stakeholders notified"
  echo "- [ ] Rollback plan ready"
  echo ""
} >> "$OUTPUT_FILE"

# Step 8: Summary
{
  echo "## 📋 Summary"
  echo ""
  
  FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')
  
  echo "- **Files Changed**: $FILE_COUNT"
  echo "- **Report Generated**: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "- **Analysis Complete**: ✅"
  echo ""
  echo "---"
  echo ""
  echo "**Next Steps**:"
  echo ""
  echo "1. Review this report thoroughly"
  echo "2. Address all critical issues"
  echo "3. Run test scenarios"
  echo "4. Proceed with code review"
  echo ""
} >> "$OUTPUT_FILE"

echo ""
echo -e "${GREEN}✅ Analysis complete!${NC}"
echo ""
echo -e "${BLUE}📄 Report saved to: ${OUTPUT_FILE}${NC}"
echo ""
echo -e "${YELLOW}📖 View report:${NC}"
echo "   cat $OUTPUT_FILE"
echo ""
echo -e "${YELLOW}🚀 Next steps:${NC}"
echo "   1. Review the report"
echo "   2. Fix critical issues"
echo "   3. Run tests"
echo "   4. Create PR"
echo ""
