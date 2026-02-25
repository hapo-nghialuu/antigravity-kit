'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Command {
  id: string;
  label: string;
  href: string;
  category: 'docs-init' | 'docs-update' | 'spec' | 'status';
}

interface DecisionTreeProps {
  locale?: 'en' | 'vi';
}

const commands: Command[] = [
  { id: 'docs-init', label: '/docs init', href: '/docs/docs-workflow/init', category: 'docs-init' },
  { id: 'docs-update', label: '/docs update', href: '/docs/docs-workflow/update', category: 'docs-update' },
  { id: 'spec-init', label: '/spec-init', href: '/docs/spec/init', category: 'spec' },
  { id: 'spec-requirements', label: '/spec-requirements', href: '/docs/spec/requirements', category: 'spec' },
  { id: 'spec-design', label: '/spec-design', href: '/docs/spec/design', category: 'spec' },
  { id: 'spec-tasks', label: '/spec-tasks', href: '/docs/spec/tasks', category: 'spec' },
  { id: 'code', label: '/code', href: '/docs/spec/code', category: 'spec' },
  { id: 'test', label: '/test', href: '/docs/spec/test', category: 'spec' },
  { id: 'review', label: '/review', href: '/docs/spec/review', category: 'spec' },
  { id: 'spec-status', label: '/spec-status', href: '/docs/spec/status', category: 'status' },
];

const categoryStyles = {
  'docs-init': 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
  'docs-update': 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
  spec: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
  status: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
};

const translations = {
  en: {
    title: 'Interactive Command Selector',
    description: 'Click any command to see its purpose, or follow the decision tree below to find the right command for your task.',
    startNode: 'What do you need?',
    col1Condition1: 'No AI docs',
    col1Condition2: 'yet?',
    col2Condition1: 'Need to update',
    col2Condition2: 'AI docs?',
    col3Condition1: 'New',
    col3Condition2: 'feature?',
    col4Condition1: 'Check',
    col4Condition2: 'progress?',
    col1Label: 'Claude Code / Antigravity',
    col2Label: 'Claude Code / Antigravity',
    col3Label: 'Full Spec Workflow (sequential)',
    col4Label: 'Claude Code / Antigravity',
  },
  vi: {
    title: 'Chọn Command',
    description: 'Click vào bất kỳ command nào để xem mô tả, hoặc theo sơ đồ quyết định bên dưới để tìm command phù hợp.',
    startNode: 'Bạn cần làm gì?',
    col1Condition1: 'Chưa có',
    col1Condition2: 'docs AI?',
    col2Condition1: 'Cần update',
    col2Condition2: 'docs AI?',
    col3Condition1: 'Tính năng',
    col3Condition2: 'mới?',
    col4Condition1: 'Kiểm tra',
    col4Condition2: 'tiến độ?',
    col1Label: 'Claude Code / Antigravity',
    col2Label: 'Claude Code / Antigravity',
    col3Label: 'Full Spec Workflow (tuần tự)',
    col4Label: 'Claude Code / Antigravity',
  },
};

export function DecisionTree({ locale = 'vi' }: DecisionTreeProps) {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const t = translations[locale];

  return (
    <div className="my-8 p-6 rounded-xl border bg-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary">☰</span>
        <h3 className="text-lg font-semibold">{t.title}</h3>
      </div>

      <p className="text-muted-foreground text-sm mb-6">
        {t.description}
      </p>

      {/* Command pills */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {commands.map((cmd) => (
          <Link
            key={cmd.id}
            href={cmd.href}
            onMouseEnter={() => setActiveCommand(cmd.id)}
            onMouseLeave={() => setActiveCommand(null)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-mono transition-all
              ${categoryStyles[cmd.category]}
              ${activeCommand === cmd.id ? 'ring-2 ring-primary/50' : ''}
            `}
          >
            {cmd.label}
          </Link>
        ))}
      </div>

      {/* Decision Tree Flowchart - Sequential Spec Workflow */}
      <div className="bg-muted/50 rounded-lg p-8 overflow-x-auto">
        <svg viewBox="0 0 1000 820" className="w-full min-w-[800px]">
          {/* Color definitions */}
          <defs>
            <linearGradient id="conditionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
            <linearGradient id="actionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
          </defs>

          {/* Start Node */}
          <ellipse cx="500" cy="35" rx="100" ry="22" fill="url(#conditionGrad)" stroke="#71717a" strokeWidth="2" />
          <text x="500" y="42" textAnchor="middle" fill="#e4e4e7" fontSize="14" fontWeight="500">{t.startNode}</text>

          {/* Branch Lines from Start */}
          <path d="M 500 57 L 500 70" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 500 70 L 160 70" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 500 70 L 357 70" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 500 70 L 643 70" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 500 70 L 840 70" stroke="#71717a" strokeWidth="3" fill="none" />

          {/* Vertical drops to diamond top points */}
          <path d="M 160 70 L 160 85" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 357 70 L 357 85" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 70 L 643 85" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 840 70 L 840 85" stroke="#71717a" strokeWidth="3" fill="none" />

          {/* COLUMN 1: Docs Init - Diamond */}
          <polygon points="160,85 205,110 160,135 115,110" fill="url(#conditionGrad)" stroke="#71717a" strokeWidth="2" />
          <text x="160" y="105" textAnchor="middle" fill="#e4e4e7" fontSize="11" fontWeight="500">{t.col1Condition1}</text>
          <text x="160" y="118" textAnchor="middle" fill="#e4e4e7" fontSize="11" fontWeight="500">{t.col1Condition2}</text>

          {/* COLUMN 2: Docs Update - Diamond */}
          <polygon points="357,85 402,110 357,135 312,110" fill="url(#conditionGrad)" stroke="#71717a" strokeWidth="2" />
          <text x="357" y="105" textAnchor="middle" fill="#e4e4e7" fontSize="11" fontWeight="500">{t.col2Condition1}</text>
          <text x="357" y="118" textAnchor="middle" fill="#e4e4e7" fontSize="11" fontWeight="500">{t.col2Condition2}</text>

          {/* COLUMN 3: New Feature - Diamond */}
          <polygon points="643,85 698,115 643,145 588,115" fill="url(#conditionGrad)" stroke="#71717a" strokeWidth="2" />
          <text x="643" y="112" textAnchor="middle" fill="#e4e4e7" fontSize="12" fontWeight="500">{t.col3Condition1}</text>
          <text x="643" y="128" textAnchor="middle" fill="#e4e4e7" fontSize="12" fontWeight="500">{t.col3Condition2}</text>

          {/* COLUMN 4: Check Status - Diamond */}
          <polygon points="840,85 885,110 840,135 795,110" fill="url(#conditionGrad)" stroke="#71717a" strokeWidth="2" />
          <text x="840" y="105" textAnchor="middle" fill="#e4e4e7" fontSize="11" fontWeight="500">{t.col4Condition1}</text>
          <text x="840" y="118" textAnchor="middle" fill="#e4e4e7" fontSize="11" fontWeight="500">{t.col4Condition2}</text>

          {/* Action Lines from diamonds */}
          {/* Col 1 - Docs Init */}
          <path d="M 160 135 L 160 160" stroke="#71717a" strokeWidth="3" fill="none" />

          {/* Col 2 - Docs Update */}
          <path d="M 357 135 L 357 160" stroke="#71717a" strokeWidth="3" fill="none" />

          {/* Col 3 - Spec (SEQUENTIAL vertical flow) */}
          <path d="M 643 145 L 643 170" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 205 L 643 230" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 275 L 643 300" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 345 L 643 370" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 415 L 643 440" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 475 L 643 500" stroke="#71717a" strokeWidth="3" fill="none" />
          <path d="M 643 535 L 643 560" stroke="#71717a" strokeWidth="3" fill="none" />

          {/* Col 4 - Status */}
          <path d="M 840 135 L 840 160" stroke="#71717a" strokeWidth="3" fill="none" />

          {/* Action Nodes - COLUMN 1: Docs Init */}
          <g className="cursor-pointer">
            <Link href="/docs/docs-workflow/init">
              <rect x="100" y="160" width="120" height="40" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="160" y="185" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="monospace">/docs init</text>
            </Link>
          </g>

          {/* Action Nodes - COLUMN 2: Docs Update */}
          <g className="cursor-pointer">
            <Link href="/docs/docs-workflow/update">
              <rect x="297" y="160" width="120" height="40" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="357" y="185" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="monospace">/docs update</text>
            </Link>
          </g>

          {/* Action Nodes - COLUMN 3: Spec Workflow (SEQUENTIAL) */}
          {/* spec-init */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/init">
              <rect x="583" y="170" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="193" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/spec-init</text>
            </Link>
          </g>

          {/* spec-requirements */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/requirements">
              <rect x="583" y="230" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="253" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/spec-requirements</text>
            </Link>
          </g>

          {/* spec-design */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/design">
              <rect x="583" y="300" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="323" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/spec-design</text>
            </Link>
          </g>

          {/* spec-tasks */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/tasks">
              <rect x="583" y="370" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="393" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/spec-tasks</text>
            </Link>
          </g>

          {/* code */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/code">
              <rect x="583" y="440" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="463" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/code</text>
            </Link>
          </g>

          {/* test */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/test">
              <rect x="583" y="500" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="523" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/test</text>
            </Link>
          </g>

          {/* review */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/review">
              <rect x="583" y="560" width="120" height="35" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="643" y="583" textAnchor="middle" fill="#fafafa" fontSize="12" fontFamily="monospace">/review</text>
            </Link>
          </g>

          {/* Action Nodes - COLUMN 4: Status */}
          <g className="cursor-pointer">
            <Link href="/docs/spec/status">
              <rect x="780" y="160" width="120" height="40" rx="6" fill="url(#actionGrad)" stroke="#a1a1aa" strokeWidth="2" />
              <text x="840" y="185" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="monospace">/spec-status</text>
            </Link>
          </g>

          {/* Platform Labels */}
          <text x="160" y="225" textAnchor="middle" fill="#71717a" fontSize="11">{t.col1Label}</text>
          <text x="357" y="225" textAnchor="middle" fill="#71717a" fontSize="11">{t.col2Label}</text>
          <text x="643" y="620" textAnchor="middle" fill="#71717a" fontSize="11">{t.col3Label}</text>
          <text x="840" y="225" textAnchor="middle" fill="#71717a" fontSize="11">{t.col4Label}</text>

        </svg>
      </div>
    </div>
  );
}
