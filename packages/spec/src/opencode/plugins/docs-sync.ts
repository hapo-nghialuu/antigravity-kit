/**
 * Copyright (c) 2026 Haposoft. MIT License.
 *
 * OpenCode Plugin — docs-sync.ts
 *
 * Port of .claude/hooks/docs-sync.cjs.
 *
 * Behavior:
 * - On session.created: detect if project has source code but no docs/, or if
 *   docs/.sync_hash is stale relative to current source-only git hash.
 * - Write banner to `.opencode/session-banner.md` so AGENTS.md / skills can
 *   surface it (OpenCode event console.log does not flow into assistant
 *   context, only the server log).
 * - Also print to stderr so the OpenCode server log records it.
 *
 * Disable via `.opencode/runtime.json` { "docsSync": false }.
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
const BANNER_SECTION_START = "<!-- CAFEKIT DOCS SYNC START -->";
const BANNER_SECTION_END = "<!-- CAFEKIT DOCS SYNC END -->";

function readRuntime(cwd: string): Record<string, any> {
  try {
    const file = join(cwd, ".opencode", "runtime.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  } catch {
    return {};
  }
}

function resolveDocsDir(cwd: string, runtime: Record<string, any>): string {
  const configured = runtime.paths?.docs;
  return join(cwd, typeof configured === "string" && configured ? configured : "docs");
}

function hasSourceCode(cwd: string): boolean {
  return (
    existsSync(join(cwd, "src")) ||
    existsSync(join(cwd, "app")) ||
    existsSync(join(cwd, "lib")) ||
    existsSync(join(cwd, "package.json")) ||
    existsSync(join(cwd, "index.js")) ||
    existsSync(join(cwd, "main.py"))
  );
}

function currentSourceHash(cwd: string): string {
  try {
    return execSync('git log -1 --format="%H" -- . ":(exclude)docs"', {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function buildMissingDocsBanner(): string {
  return [
    "### 🔴 URGENT SYSTEM ACTION: MISSING DOCUMENTATION 🔴",
    "> BẮT BUỘC (MANDATORY): Hệ thống phát hiện dự án đã có Source Code nhưng thư mục `docs/` chưa tồn tại.",
    "> Nhiệm vụ ĐẦU TIÊN của bạn trong session này là đọc hiểu mã nguồn hiện tại và tạo ra các tài liệu tiêu chuẩn:",
    "> 1. `docs/system-architecture.md` (Kiến trúc hệ thống, phân tích flow)",
    "> 2. `docs/project-overview-pdr.md` (Tổng quan, mục tiêu, tính năng)",
    "> 3. Khởi tạo file hidden `docs/.sync_hash` để theo dõi cập nhật.",
    "> ",
    '> LƯU Ý BẮT BUỘC: Bạn phải chạy lệnh Git này trong Terminal để lấy Hash Code mới nhất: `git log -1 --format="%H" -- . ":(exclude)docs"`',
    "> Sau đó ghi chuẩn giá trị Hash đó vào file `docs/.sync_hash`.",
  ].join("\n");
}

function buildStaleDocsBanner(currentHash: string, lastSyncHash: string): string {
  return [
    "### 🔄 CONTINUOUS DOCS SYNC REQUIRED 🔄",
    `> Source Code vừa có sự thay đổi mới (Git Hash: \`${currentHash}\`) kể từ lần đồng bộ Docs cuối cùng (\`${lastSyncHash || "Chưa gán"}\`).`,
    "> YÊU CẦU TRƯỚC KHI LÀM THÊM TÍNH NĂNG:",
    `> 1. Rà soát file bị thay đổi gần đây (dùng \`git diff ${lastSyncHash} ${currentHash}\` hoặc \`git log\`).`,
    "> 2. Cập nhật lại `docs/system-architecture.md` hoặc các chuẩn code nếu cần thiết.",
    "> 3. Cập nhật Changelog (nhật ký thay đổi).",
    `> 4. KHI HOÀN TẤT, BẠN PHẢI GHI ĐÈ GIÁ TRỊ SAU: \`${currentHash}\` VÀO FILE \`docs/.sync_hash\` ĐỂ CHỐT TRẠNG THÁI HIỆN TẠI.`,
  ].join("\n");
}

function writeBanner(cwd: string, banner: string | null): void {
  const target = join(cwd, ".opencode", "session-banner.md");
  const dir = dirname(target);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const existing = existsSync(target) ? readFileSync(target, "utf8") : "";
  const pattern = new RegExp(`${BANNER_SECTION_START}[\\s\\S]*?${BANNER_SECTION_END}\\n?`);
  const cleaned = existing.replace(pattern, "").trimEnd();

  if (!banner) {
    if (cleaned !== existing.trimEnd()) {
      writeFileSync(target, cleaned ? `${cleaned}\n` : "");
    }
    return;
  }

  const block = [BANNER_SECTION_START, banner, BANNER_SECTION_END].join("\n");
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
        hook: "docs-sync",
        status: "crash",
        error: error instanceof Error ? error.message : String(error),
      }) + "\n",
    );
  } catch {
    // fail-open
  }
}

export const DocsSync: Plugin = async ({ directory }) => ({
  event: async ({ event }) => {
    try {
      if (event.type !== "session.created") return;

      const cwd = directory;
      const runtime = readRuntime(cwd);
      if (runtime.docsSync === false) return;

      if (!hasSourceCode(cwd)) {
        writeBanner(cwd, null);
        return;
      }

      const docsDir = resolveDocsDir(cwd, runtime);

      if (!existsSync(docsDir)) {
        const banner = buildMissingDocsBanner();
        writeBanner(cwd, banner);
        console.error(banner);
        return;
      }

      const currentHash = currentSourceHash(cwd);
      if (!currentHash) {
        writeBanner(cwd, null);
        return;
      }

      const syncFile = join(docsDir, ".sync_hash");
      const lastSyncHash = existsSync(syncFile) ? readFileSync(syncFile, "utf8").trim() : "";

      if (lastSyncHash === currentHash) {
        writeBanner(cwd, null);
        return;
      }

      const banner = buildStaleDocsBanner(currentHash, lastSyncHash);
      writeBanner(cwd, banner);
      console.error(banner);
    } catch (error) {
      logCrash(error);
    }
  },
});
