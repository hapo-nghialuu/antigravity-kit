"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const copy = {
  en: {
    heading: "Why this feels different",
    subheading:
      "CafeKit is most compelling when people can see the difference between ad-hoc prompting and a runtime with state.",
    before: "Without CafeKit",
    after: "With CafeKit",
    beforeItems: [
      "Long prompts that need to be re-explained every session",
      "Specs drift away from implementation after the first coding pass",
      "Tasks look done in markdown even when builds or tests are still red",
      "Docs updates happen late, inconsistently, or never",
    ],
    afterItems: [
      "Specs become runtime artifacts with validation and task boundaries",
      "Implementation moves through one verified task packet at a time",
      "Quality gates block fake progress before state is synced",
      "Docs checkpoints happen incrementally instead of as a last-minute scramble",
    ],
  },
  vi: {
    heading: "Điểm khác biệt thật sự",
    subheading:
      "CafeKit thuyết phục nhất khi người dùng nhìn ra sự khác nhau giữa prompt rời rạc và một runtime có state.",
    before: "Không có CafeKit",
    after: "Có CafeKit",
    beforeItems: [
      "Prompt dài và phải giải thích lại mỗi session",
      "Spec lệch khỏi implementation sau lượt code đầu tiên",
      "Task nhìn như xong trong markdown dù build hoặc test vẫn đỏ",
      "Docs bị dồn cuối, cập nhật thiếu hoặc không có",
    ],
    afterItems: [
      "Spec trở thành runtime artifact có validate và task boundary",
      "Implementation đi theo từng verified task packet",
      "Quality gate chặn fake progress trước khi sync state",
      "Docs checkpoint chạy tăng dần thay vì dồn cuối",
    ],
  },
  ja: {
    heading: "何が本当に違うのか",
    subheading:
      "CafeKit の魅力は、ad-hoc prompt と stateful runtime の差が一目で分かることです。",
    before: "CafeKit なし",
    after: "CafeKit あり",
    beforeItems: [
      "毎回説明し直す長い prompt に頼る",
      "最初の実装後に spec と code がずれていく",
      "markdown では done に見えても build や test は赤いまま",
      "docs 更新が後回しになりがち",
    ],
    afterItems: [
      "spec が validation と task boundary を持つ runtime artifact になる",
      "verified task packet 単位で実装が進む",
      "quality gate が fake progress を止めてから state を sync する",
      "docs checkpoint が段階的に実行される",
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
