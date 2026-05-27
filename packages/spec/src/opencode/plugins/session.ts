/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — session.ts
 *
 * Port of .claude/hooks/session.cjs (banner half only).
 *
 * Behavior:
 * - On session.created: detect project type, package manager, framework, git
 *   branch and write a one-line banner to .opencode/session-banner.md
 *   alongside docs-sync's section. Also emit to stderr (server log).
 * - On session.compacted: append compaction warning to the banner so the
 *   next assistant turn is reminded to re-verify pending approvals.
 *
 * Note: Claude's CLAUDE_ENV_FILE writes are dropped — OpenCode does not
 * expose an equivalent env-injection channel.
 */

import type { Plugin } from "@opencode-ai/plugin";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  appendFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
const SESSION_SECTION_START = "<!-- CAFEKIT SESSION START -->";
const SESSION_SECTION_END = "<!-- CAFEKIT SESSION END -->";

function run(cmd: string, cwd: string, fallback = ""): string {
  try {
    return execSync(cmd, {
      cwd,
      encoding: "utf8",
      timeout: 3000,
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return fallback;
  }
}

function readRuntime(cwd: string): Record<string, any> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function detectProjectType(cwd: string): string {
  if (existsSync(join(cwd, "pnpm-workspace.yaml")) || existsSync(join(cwd, "lerna.json"))) {
    return "monorepo";
  }
  try {
    const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
    if (pkg.workspaces) return "monorepo";
    if (pkg.main || pkg.exports || pkg.module) return "library";
  } catch {
    // ignore
  }
  return "app";
}

function detectPackageManager(cwd: string): string {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb"))) return "bun";
  if (existsSync(join(cwd, "package-lock.json"))) return "npm";
  return "";
}

function detectFramework(cwd: string): string {
  try {
    const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (deps["next"]) return "next";
    if (deps["nuxt"]) return "nuxt";
    if (deps["@sveltejs/kit"]) return "sveltekit";
    if (deps["react"]) return "react";
    if (deps["vue"]) return "vue";
    if (deps["svelte"]) return "svelte";
    if (deps["express"]) return "express";
    if (deps["fastify"]) return "fastify";
    if (deps["hono"]) return "hono";
  } catch {
    // ignore
  }
  return "";
}

function resolveSetting(cwd: string, runtimeValue: unknown, detector: (c: string) => string): string {
  if (runtimeValue === "auto" || runtimeValue == null) return detector(cwd);
  return typeof runtimeValue === "string" ? runtimeValue : detector(cwd);
}

function writeBannerSection(cwd: string, content: string): void {
  const target = join(cwd, ".opencode", "session-banner.md");
  const dir = dirname(target);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const existing = existsSync(target) ? readFileSync(target, "utf8") : "";
  const pattern = new RegExp(`${SESSION_SECTION_START}[\\s\\S]*?${SESSION_SECTION_END}\\n?`);
  const cleaned = existing.replace(pattern, "").trimEnd();
  const block = [SESSION_SECTION_START, content, SESSION_SECTION_END].join("\n");
  const next = cleaned ? `${cleaned}\n\n${block}\n` : `${block}\n`;
  writeFileSync(target, next);
}

function logCrash(error: unknown): void {
  try {
    const logDir = join(PLUGIN_DIR, ".logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(
      join(logDir, "hook-log.jsonl"),
      JSON.stringify({
        ts: new Date().toISOString(),
        hook: "session",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

function handleSessionCreated(cwd: string): void {
  const runtime = readRuntime(cwd);

  const projectType = resolveSetting(cwd, runtime.project?.type, detectProjectType);
  const packageManager = resolveSetting(cwd, runtime.project?.packageManager, detectPackageManager);
  const framework = resolveSetting(cwd, runtime.project?.framework, detectFramework);
  const gitBranch = run("git branch --show-current", cwd);

  const parts: string[] = [];
  if (projectType) parts.push(`Type: ${projectType}`);
  if (packageManager) parts.push(`PM: ${packageManager}`);
  if (framework) parts.push(`Framework: ${framework}`);
  if (gitBranch) parts.push(`Branch: ${gitBranch}`);

  const summary = `Session started. ${parts.length ? parts.join(" | ") : "No project info detected."}`;
  writeBannerSection(cwd, summary);
  console.error(summary);
}

function handleSessionCompacted(cwd: string): void {
  const lines = [
    "🚨 SESSION COMPRESSED — VERIFY PENDING AUTHORIZATIONS:",
    "Any pending confirmations requested via AskUserQuestion might have been lost.",
    "Do not proceed without explicitly asking the user again to ensure safety.",
    'Use AskUserQuestion: "The chat context was compressed. Do I still have permission to proceed?"',
  ];
  writeBannerSection(cwd, lines.join("\n"));
  console.error(lines.join("\n"));
}

export const Session: Plugin = async ({ directory }) => ({
  event: async ({ event }) => {
    try {
      if (event.type === "session.created") {
        handleSessionCreated(directory);
        return;
      }
      if (event.type === "session.compacted") {
        handleSessionCompacted(directory);
        return;
      }
    } catch (error) {
      logCrash(error);
    }
  },
});
