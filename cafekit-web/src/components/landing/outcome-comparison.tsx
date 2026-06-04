"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const copy = {
  en: {
    heading: "Differentiators",
    subheading:
      "CafeKit does not try to make agents smarter with longer prompts. It puts them inside a runtime with state, artifacts, and gates so progress cannot fake green.",
    before: "Without CafeKit",
    after: "With CafeKit",
    beforeItems: [
      "Every session needs the same context, scope, and approach explained again",
      "Specs can drift away from implementation after the first coding pass",
      "Tasks can be marked done while build, test, or runtime proof is still missing",
      "Docs are often pushed to the end, partially updated, or skipped",
    ],
    afterItems: [
      "Specs become artifacts with validation, task registry, and readiness gates",
      "Implementation moves through task packets with completion criteria and Evidence",
      "Quality gates block fake progress before state is synced to done",
      "Docs checkpoints run after verified tasks instead of piling up at release time",
    ],
  },
  vi: {
    heading: "Điểm khác biệt",
    subheading:
      "CafeKit không cố làm agent thông minh hơn bằng prompt dài. Nó đặt agent vào một runtime có state, artifacts và gates để tiến độ không bị giả xanh.",
    before: "Không có CafeKit",
    after: "Có CafeKit",
    beforeItems: [
      "Mỗi session phải giải thích lại context, scope và cách làm",
      "Spec dễ lệch khỏi implementation sau lượt code đầu tiên",
      "Task có thể bị mark done dù build, test hoặc runtime proof vẫn thiếu",
      "Docs thường bị dồn cuối, cập nhật thiếu hoặc bỏ qua",
    ],
    afterItems: [
      "Spec trở thành artifact có validation, task registry và readiness gate",
      "Implementation đi theo từng task packet đã có completion criteria và Evidence",
      "Quality gate chặn fake progress trước khi sync state sang done",
      "Docs checkpoint chạy theo task đã verify thay vì dồn vào cuối release",
    ],
  },
  ja: {
    heading: "差別化ポイント",
    subheading:
      "CafeKit は長い prompt で agent を賢く見せるのではなく、state、artifacts、gates を持つ runtime に agent を置き、見せかけの進捗を防ぎます。",
    before: "CafeKit なし",
    after: "CafeKit あり",
    beforeItems: [
      "毎回の session で context、scope、進め方を説明し直す必要がある",
      "最初の coding pass 後に spec と implementation がずれやすい",
      "build、test、runtime proof が不足していても task が done に見える",
      "docs が最後に回され、部分更新または未更新になりやすい",
    ],
    afterItems: [
      "spec が validation、task registry、readiness gate を持つ artifact になる",
      "completion criteria と Evidence を持つ task packet 単位で実装が進む",
      "quality gate が fake progress を止めてから state を done に sync する",
      "docs checkpoint は release 直前ではなく verified task ごとに実行される",
    ],
  },
} as const;

export function OutcomeComparison() {
  const locale = useLocale();
  const t = copy[locale] ?? copy.en;

  return (
    <section
      id="comparison"
      className="bg-[linear-gradient(180deg,_rgba(167,197,238,0.08),_rgba(255,255,255,0.96))] py-20 dark:bg-[linear-gradient(180deg,_#101820,_#13262A)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-[#101820] dark:text-[#F6FAF7] sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-[#496158] dark:text-[#CFE1D9]">
          {t.subheading}
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#101820]/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(242,234,157,0.08))] p-7 shadow-[0_20px_60px_-36px_rgba(16,24,32,0.34)] dark:border-[#A7C5EE]/10 dark:bg-[linear-gradient(180deg,_rgba(22,30,37,0.98),_rgba(16,24,32,0.78))]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#101820]/6 p-2 dark:bg-white/6">
                <XCircle className="h-5 w-5 text-[#101820] dark:text-[#DDE9F9]" />
              </div>
              <h3 className="text-xl font-semibold text-[#101820] dark:text-[#F6FAF7]">
                {t.before}
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              {t.beforeItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#101820]/8 bg-white/78 p-4 dark:border-[#A7C5EE]/10 dark:bg-[#101820]/52"
                >
                  <p className="text-sm leading-7 text-[#425A51] dark:text-[#D7E7E0]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#006242]/14 bg-[linear-gradient(180deg,_rgba(242,234,157,0.14),_rgba(0,98,66,0.08))] p-7 shadow-[0_20px_60px_-36px_rgba(0,98,66,0.28)] dark:border-[#6FD4A2]/16 dark:bg-[linear-gradient(180deg,_rgba(17,71,52,0.56),_rgba(16,24,32,0.72))]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#006242]/12 p-2 dark:bg-[#6FD4A2]/10">
                <CheckCircle2 className="h-5 w-5 text-[#006242] dark:text-[#6FD4A2]" />
              </div>
              <h3 className="text-xl font-semibold text-[#101820] dark:text-[#F6FAF7]">
                {t.after}
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              {t.afterItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#006242]/10 bg-white/84 p-4 dark:border-[#6FD4A2]/10 dark:bg-[#13262A]/60"
                >
                  <p className="text-sm leading-7 text-[#274038] dark:text-[#E7F2EC]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
