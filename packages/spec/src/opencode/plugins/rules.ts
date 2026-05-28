/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — rules.ts
 *
 * Port of .claude/hooks/rules.cjs adapted to OpenCode.
 *
 * Claude's version injects a per-prompt rules reminder via stdout into
 * the UserPromptSubmit hook. OpenCode has no equivalent per-prompt
 * injection channel, so this plugin renders the same dynamic rules
 * (paths, docs.maxLoc, locale) on every session.created and upserts a
 * managed block inside the project AGENTS.md. OpenCode auto-loads
 * AGENTS.md as instructions on each session, so the rules reach the
 * model context at session start instead of per prompt.
 *
 * Static rules content already lives in AGENTS.md base template — this
 * plugin only refreshes the dynamic block so paths/locale stay in sync
 * with runtime.json.
 */

import type { Plugin } from "@opencode-ai/plugin";
import {
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const RULES_BLOCK_START = "<!-- CAFEKIT DYNAMIC RULES START -->";
const RULES_BLOCK_END = "<!-- CAFEKIT DYNAMIC RULES END -->";

function resolveProjectDir(directory?: string): string {
  if (directory && existsSync(directory)) return directory;
  return dirname(dirname(PLUGIN_DIR));
}

function readRuntime(cwd: string): Record<string, any> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    if (existsSync(file)) {
      return JSON.parse(readFileSync(file, "utf8"));
    }
  } catch {
    /* fail-open */
  }
  return {};
}

function renderDynamicRules(cwd: string): string {
  const runtime = readRuntime(cwd);
  const thinkLang: string = runtime?.locale?.thinkingLanguage || "";
  const respondLang: string = runtime?.locale?.responseLanguage || "";
  const effectThink = thinkLang || (respondLang ? "en" : "");
  const plansPath = join(cwd, runtime?.paths?.plans || "plans");
  const docsPath = join(cwd, runtime?.paths?.docs || "docs");
  const maxLoc: number = runtime?.docs?.maxLoc || 800;

  const lines: string[] = [];
  lines.push(RULES_BLOCK_START);
  lines.push("");
  lines.push("## CafeKit Session Rules (auto-refreshed)");
  lines.push("");

  const hasThink = effectThink && effectThink !== respondLang;
  if (hasThink || respondLang) {
    lines.push("### Language");
    if (hasThink) lines.push(`- Thinking: Use ${effectThink} for reasoning.`);
    if (respondLang) lines.push(`- Response: Respond in ${respondLang}.`);
    lines.push("");
  }

  lines.push("### Rules");
  lines.push(`- Markdown files: Plans → "${plansPath}/" | Docs → "${docsPath}/"`);
  lines.push(
    "- **DO NOT** create markdown files outside of those directories unless explicitly asked.",
  );
  lines.push(`- docs.maxLoc: ${maxLoc} lines max per doc file`);
  lines.push("- Follow **YAGNI · KISS · DRY** principles");
  lines.push(
    "- Sacrifice grammar for concision in reports. List unresolved Qs at end.",
  );
  lines.push("- Ensure token efficiency while maintaining high quality.");
  lines.push("");

  lines.push("### Skill Routing");
  lines.push(
    "- Choose skills from intent using `.opencode/rules/skill-workflow-routing.md` and `.opencode/rules/skill-domain-routing.md`.",
  );
  lines.push(
    "- Use the OpenCode slash commands installed under `.opencode/commands/` (no `hapo:` prefix).",
  );
  lines.push(
    "- Explicit user commands and direct-answer requests override routing suggestions.",
  );
  lines.push("");

  lines.push("### Modularization");
  lines.push("- If a file exceeds 200 lines, consider splitting it");
  lines.push("- Check existing modules before creating new ones");
  lines.push(
    "- Prefer kebab-case (JS/TS/Python/shell); PascalCase (C#/Java); snake_case (Go/Rust)",
  );
  lines.push(
    "- Skip modularization for: markdown, plain text, bash scripts, config files, .env files",
  );
  lines.push("");
  lines.push(RULES_BLOCK_END);

  return lines.join("\n");
}

function upsertBlock(filePath: string, block: string): boolean {
  if (!existsSync(filePath)) return false;
  let content: string;
  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    return false;
  }

  const startIdx = content.indexOf(RULES_BLOCK_START);
  const endIdx = content.indexOf(RULES_BLOCK_END);

  let next: string;
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = content.slice(0, startIdx);
    const after = content.slice(endIdx + RULES_BLOCK_END.length);
    next = `${before}${block}${after}`;
  } else {
    const sep = content.endsWith("\n") ? "" : "\n";
    next = `${content}${sep}\n${block}\n`;
  }

  if (next === content) return false;
  try {
    writeFileSync(filePath, next);
    return true;
  } catch {
    return false;
  }
}

export const RulesPlugin: Plugin = async ({ directory }) => {
  const cwd = resolveProjectDir(directory);

  const refresh = () => {
    const agentsFile = join(cwd, "AGENTS.md");
    const block = renderDynamicRules(cwd);
    upsertBlock(agentsFile, block);
  };

  return {
    event: async ({ event }) => {
      if (event.type === "session.created") {
        refresh();
      }
    },
  };
};

export default RulesPlugin;
