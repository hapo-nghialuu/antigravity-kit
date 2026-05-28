import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, GitBranch, ShieldAlert } from 'lucide-react';
import { type Locale, localizeHref } from '@/lib/locale-utils';
import { getSkillDetail, mainSkillSlugs, type MainSkillSlug } from './skill-detail-content';

const labels = {
  en: {
    when: 'Use When',
    flow: 'Flow',
    output: 'Output',
    avoid: 'Avoid',
    next: 'Next Handoff',
    back: 'Back to skills',
    previous: 'Previous',
    nextSkill: 'Next',
  },
  vi: {
    when: 'Khi Nên Dùng',
    flow: 'Flow',
    output: 'Output',
    avoid: 'Tránh',
    next: 'Handoff Tiếp Theo',
    back: 'Về trang skills',
    previous: 'Trước',
    nextSkill: 'Tiếp',
  },
  ja: {
    when: 'Use When',
    flow: 'Flow',
    output: 'Output',
    avoid: 'Avoid',
    next: 'Next Handoff',
    back: 'Skills に戻る',
    previous: 'Previous',
    nextSkill: 'Next',
  },
};

function normalizeLocale(locale: string): Locale {
  return locale === 'vi' || locale === 'ja' ? locale : 'en';
}

export function SkillDetailPage({ locale, skill }: { locale: string; skill: MainSkillSlug }) {
  const normalized = normalizeLocale(locale);
  const t = labels[normalized];
  const detail = getSkillDetail(normalized, skill);
  const index = mainSkillSlugs.indexOf(skill);
  const previous = index > 0 ? mainSkillSlugs[index - 1] : null;
  const next = index < mainSkillSlugs.length - 1 ? mainSkillSlugs[index + 1] : null;

  return (
    <section className="not-prose my-8 space-y-8">
      <div className="overflow-hidden rounded-[28px] border border-[#101820]/10 bg-[#101820] p-6 text-white shadow-[0_30px_90px_-58px_rgba(16,24,32,0.9)] sm:p-8">
        <Link href={localizeHref(normalized, '/docs/skills')} className="mb-6 inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>
        <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2EA9D]">
          {detail.category}
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{detail.title}</h1>
        <div className="mt-4 font-mono text-sm text-[#A7C5EE]">{detail.command}</div>
        <p className="mt-5 max-w-3xl text-pretty text-base leading-8 text-white/74 sm:text-lg">{detail.summary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[24px] border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-[#006242] dark:text-[#A7C5EE]" />
            {t.when}
          </h2>
          <ul className="space-y-3">
            {detail.when.map((item) => (
              <li key={item} className="rounded-2xl bg-muted/45 px-4 py-3 text-sm leading-6 text-muted-foreground">{item}</li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-border bg-card">
          <div className="border-b border-border bg-muted/45 px-5 py-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <GitBranch className="h-5 w-5 text-[#006242] dark:text-[#A7C5EE]" />
              {t.flow}
            </h2>
          </div>
          <div className="divide-y divide-border">
            {detail.flow.map(([step, description], stepIndex) => (
              <div key={step} className="grid gap-3 p-5 sm:grid-cols-[110px_1fr]">
                <div className="font-mono text-xs text-muted-foreground">0{stepIndex + 1} / {step}</div>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard title={t.output} value={detail.output} tone="success" />
        <InfoCard title={t.avoid} value={detail.avoid} tone="warning" />
        <InfoCard title={t.next} value={detail.next} tone="default" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {previous ? <SkillNavCard label={t.previous} locale={normalized} skill={previous} /> : <div />}
        {next ? <SkillNavCard label={t.nextSkill} locale={normalized} skill={next} align="right" /> : <div />}
      </div>
    </section>
  );
}

function InfoCard({ title, value, tone }: { title: string; value: string; tone: 'success' | 'warning' | 'default' }) {
  const toneClass = tone === 'success' ? 'border-[#006242]/20 bg-[#EEF5F1] dark:bg-[#14252A]' : tone === 'warning' ? 'border-[#F2EA9D] bg-[#FFFBE2] dark:bg-[#2A2A18]' : 'border-border bg-card';
  return (
    <div className={`rounded-[22px] border p-5 ${toneClass}`}>
      <ShieldAlert className="mb-4 h-5 w-5 text-[#006242] dark:text-[#A7C5EE]" />
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function SkillNavCard({ label, locale, skill, align = 'left' }: { label: string; locale: Locale; skill: MainSkillSlug; align?: 'left' | 'right' }) {
  const detail = getSkillDetail(locale, skill);
  return (
    <Link href={localizeHref(locale, `/docs/skills/${skill}`)} className={`group rounded-[22px] border border-border bg-card p-5 no-underline transition hover:border-[#006242]/30 ${align === 'right' ? 'text-right' : ''}`}>
      <div className={`mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground ${align === 'right' ? 'justify-end' : ''}`}>
        {align === 'left' ? <ArrowLeft className="h-4 w-4" /> : null}
        {label}
        {align === 'right' ? <ArrowRight className="h-4 w-4" /> : null}
      </div>
      <div className="font-mono text-sm font-semibold text-foreground">{detail.command}</div>
    </Link>
  );
}
