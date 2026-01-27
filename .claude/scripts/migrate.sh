#!/bin/bash
set -e

echo "🚀 Migrating .agent/ to .claude/ plugin format..."
echo ""

# 1. Create .claude/ structure
echo "📁 Creating .claude/ directory structure..."
mkdir -p .claude/{agents,skills,commands,hooks,scripts,.shared,.claude-plugin}

# 2. Copy agents (flatten structure - no subdirectories)
echo "📦 Copying agents..."
cp .agent/agents/*.md .claude/agents/ 2>/dev/null || echo "⚠️  No agents found"

# 3. Copy skills (keep folder structure)
echo "📦 Copying skills..."
cp -r .agent/skills/* .claude/skills/ 2>/dev/null || echo "⚠️  No skills found"

# 4. Copy workflows to commands (Claude Code uses commands/, not workflows/)
echo "📦 Copying workflows to commands/..."
cp .agent/workflows/*.md .claude/commands/ 2>/dev/null || echo "⚠️  No workflows found"

# 5. Copy shared resources
echo "📦 Copying shared resources..."
if [ -d ".agent/.shared" ]; then
    cp -r .agent/.shared/* .claude/.shared/
else
    echo "⚠️  No shared resources found"
fi

# 6. Copy utility scripts
echo "📦 Copying utility scripts..."
if [ -f ".agent/scripts/session_manager.py" ]; then
    cp .agent/scripts/session_manager.py .claude/scripts/
fi
if [ -f ".agent/scripts/auto_preview.py" ]; then
    cp .agent/scripts/auto_preview.py .claude/scripts/
fi

# 7. Plugin manifest and hooks already created, skip

# 8. Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x .claude/scripts/validate_dispatcher.py 2>/dev/null || true
chmod +x .claude/scripts/migrate.sh 2>/dev/null || true

echo ""
echo "✅ Migration complete!"
echo ""
echo "📊 Summary:"
echo "   - Agents: $(ls .claude/agents/*.md 2>/dev/null | wc -l | xargs)"
echo "   - Skills: $(find .claude/skills -name "SKILL.md" 2>/dev/null | wc -l | xargs)"
echo "   - Commands: $(ls .claude/commands/*.md 2>/dev/null | wc -l | xargs)"
echo ""
echo "🎯 Next steps:"
echo "   1. ✅ Plugin manifest created at .claude/.claude-plugin/plugin.json"
echo "   2. ✅ Hooks configuration created at .claude/hooks/hooks.json"
echo "   3. ✅ Validation dispatcher created at .claude/scripts/validate_dispatcher.py"
echo "   4. Test agent discovery in Claude Code"
echo "   5. Test skill loading: mention @nextjs-react-expert"
echo "   6. Test commands: /spec-init, /brainstorm, etc."
echo ""
echo "📖 Documentation: See .claude/README.md for usage examples"
