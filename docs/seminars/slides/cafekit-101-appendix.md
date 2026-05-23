---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  :root {
    --ck-ink: #101820;
    --ck-green: #006242;
    --ck-sky: #A7C5EE;
    --ck-yellow: #F2EA9D;
    --ck-slate: #0f172a;
  }
  section {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background:
      url("../../../cafekit-web/public/cafekit_cup_logo.svg") right 34px top 24px / 58px auto no-repeat,
      linear-gradient(135deg, transparent 0 64%, rgba(242, 234, 157, 0.42) 64% 78%, transparent 78%),
      linear-gradient(90deg, #f8fafc 0 70%, #e0f2fe 70% 100%);
    color: var(--ck-slate);
    letter-spacing: 0;
    padding: 52px 70px 48px;
    overflow: hidden;
  }
  section::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(0, 98, 66, 0.18) 0 8px, transparent 8px),
      repeating-linear-gradient(135deg, transparent 0 28px, rgba(167, 197, 238, 0.13) 28px 29px);
    pointer-events: none;
  }
  section::after {
    color: rgba(16, 24, 32, 0.46);
    font-size: 13px;
    right: 32px;
    bottom: 20px;
  }
  section > * {
    position: relative;
    z-index: 1;
  }
  h1 {
    color: var(--ck-green);
    font-size: 54px;
  }
  h2 {
    color: #0369a1;
    font-size: 38px;
  }
  strong {
    color: var(--ck-green);
  }
  code {
    background: #e2e8f0;
    color: var(--ck-slate);
    border-radius: 4px;
    padding: 2px 5px;
  }
  pre {
    background: var(--ck-ink);
    color: #e2e8f0;
    border-radius: 8px;
    padding: 18px;
    box-shadow: 0 18px 42px rgba(16, 24, 32, 0.18);
  }
  table {
    font-size: 24px;
  }
---

# Phụ Lục

Tài liệu tham chiếu nhanh cho workshop CafeKit 101

---

## Phụ Lục A: Claude Code Primitives

| Thành phần | Vai trò trong CafeKit |
|---|---|
| `CLAUDE.md` | Memory và quy tắc cấp project |
| Skills | Workflow tái sử dụng |
| Agents | Specialist context theo vai trò |
| Hooks | Guardrails quanh lifecycle/tool calls |
| Settings | Nối hooks, statusline, automation |
| Scripts | Kiểm tra deterministic và runtime support |

---

## Phụ Lục B: CafeKit Command Cheat Sheet

```text
/hapo:brainstorm <idea>
/hapo:specs <feature description>
/hapo:specs <feature-name> --validate
/hapo:develop <feature-name>
/hapo:test <feature-name>
/hapo:code-review --pending
/hapo:git
```

Dùng theo thứ tự từ spec tới evidence, rồi mới commit/push.

---

## Phụ Lục C: Spec Readiness Checklist

- `spec.json` có `scope_lock`, `task_files`, `task_registry`
- `requirements.md` testable và trace được
- `research.md` ghi rõ quyết định và tradeoff
- `design.md` đủ để implement không đoán mò
- Mỗi task có `Context`, `Constraints`, `Steps`, `Evidence`
- Validation completed
- `ready_for_implementation = true`

---

## Phụ Lục D: Task Evidence Checklist

Mỗi task nên trả lời được:

- Command nào chứng minh build/typecheck?
- Test nào chứng minh logic?
- UI flow nào chứng minh người dùng dùng được?
- Entrypoint runtime ở đâu?
- File đã được import/mount/invoke ở đâu?
- Negative path nào đã kiểm?
- Bằng chứng nào đủ để reviewer tin?

---

## Phụ Lục E: Demo Backup Commands

```bash
cat .claude/cafekit.json
find .claude -maxdepth 2 -type f | sort
node .claude/scripts/validate-spec-output.cjs specs/<feature>
git status --short
```

Khi demo live bị chậm, dùng các command này để chuyển sang review artifact.

---

## Phụ Lục F: Cách Đọc Kết Quả Validate

| Tín hiệu | Ý nghĩa |
|---|---|
| `PASS` từ validator | Artifact đúng shape |
| Red Team findings | Rủi ro về judgment/scope |
| `validation.status=completed` | Validate workflow đã kết thúc |
| `ready_for_implementation=true` | Có thể bắt đầu `/hapo:develop` |

Không bắt đầu develop chỉ vì file đã được tạo.
