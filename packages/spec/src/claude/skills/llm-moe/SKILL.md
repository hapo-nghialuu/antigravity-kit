# `hapo:llm-moe` Skill

The **LLM Mixture-of-Experts (MoE) Hub** serves as a centralized gateway for executing advanced contextual tasks (Visual Analysis, Document Understanding, Data Extraction) across various models (Gemini, Gemma) using API scripts.

By decoupling LLM functionality into this standalone skill, `hapo:test` or any other workflow can simply offload complex multimodal tasks to `hapo:llm-moe` scripts rather than bundling their own integration.

## Core Capabilities (Hiện tại & Mở rộng)

Được thiết kế theo chuẩn MoE (Mixture of Experts), Skill này không chỉ giới hạn ở một Model duy nhất mà tự động định tuyến (route) các tác vụ chuyên biệt tới các model phù hợp (như *gemma-4-31b-it* cho logic, *gemini-2.5-flash* cho đa phương tiện siêu tốc, hoặc *gemini-2.5-pro* cho suy luận y tế/toán học).

### 1. Visual Understanding (Đã triển khai)
- **UI/UX Regression Analysis:** Phân tích ảnh chụp màn hình tự động, dò tìm CSS layout vỡ, button đè text, responsive rác.
- **Visual Q&A / Object Detection:** Truy vấn vị trí phần tử HTML, đếm số lượng form inputs trong màn hình.
- *(Sử dụng script: `scripts/visual-analyze.js`)*

### 2. Optical Character Recognition - OCR (Sắp triển khai)
- **Data Extraction:** Trích xuất mảng JSON từ ảnh chụp Hóa đơn (Invoices), Căn cước (ID Cards), hay Bảng biểu (Tables).
- **Handwriting Parsing:** Dịch chữ viết tay trên biểu mẫu thành text markdown.

### 3. Document AI & Parsing (Sắp triển khai)
- **PDF Comprehension:** Đọc và phân mảnh (chunking) file tài liệu PDF (>1000 trang) trả về các luồng tài liệu trích xuất nội dung liên quan (RAG base).
- **Codebase Indexing:** Hỗ trợ nhai các file log, file báo cáo (.csv, .xlsx) để báo cáo phân tích rủi ro hệ thống.

### 4. Generative Engineering (Sắp triển khai)
- **Code & Scaffold Generation:** Sinh cấu trúc thư mục, Boilerplate code dựa trên bản vẽ Design UI (Image-to-Code).
- **Audio/Video Transcribing:** Cắt âm thanh từ luồng test tích hợp (nếu có WebRTC/Media tests) và phân tích lỗi thoại.

## Usage Guide for Agents

Other agents (like `test-runner` or `reviewer`) should call `hapo:llm-moe`'s tools by launching its scripts securely via `bash`.

### 1. Visual Analysis (`visual-analyze.js`)

Used to interpret screenshot logic, UI regressions, or visual QA.

**Caller requirements:**
- Requires Node.js.
- Execution directory must be relative to the caller or via `{{SKILLS_DIR}}/llm-moe/scripts/...`

**Command format:**
```bash
node <path-to-skills>/llm-moe/scripts/visual-analyze.js \
  --image "path/to/screenshot.png" \
  --prompt "Check if the button overlaps the text."
```

**JSON Output:**
```json
{
  "success": true,
  "file": "path/to/screenshot.png",
  "analysis": "The red submit button overlaps the footer text by 15px. Layout is broken."
}
```

## Model Configuration

The API Key is globally seeded during the `cafekit` setup into `~/.gemini/.env` and the local `.env` of your workspace.

Fallback override environment variables:
- `GEMINI_API_KEY`: The authentication key.
- `VISUAL_MODEL` (Optional): Specify the underlying Google/Gemma model (default: `gemma-4-31b-it`).
