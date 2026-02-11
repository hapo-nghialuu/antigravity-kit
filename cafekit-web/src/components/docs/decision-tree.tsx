'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Command {
  id: string;
  label: string;
  href: string;
  color: string;
}

const commands: Command[] = [
  { id: 'spec-init', label: '/spec-init', href: '/docs/spec/init', color: 'bg-blue-600' },
  { id: 'spec-requirements', label: '/spec-requirements', href: '/docs/spec/requirements', color: 'bg-blue-500' },
  { id: 'spec-design', label: '/spec-design', href: '/docs/spec/design', color: 'bg-blue-400' },
  { id: 'spec-tasks', label: '/spec-tasks', href: '/docs/spec/tasks', color: 'bg-indigo-500' },
  { id: 'spec-impl', label: '/spec-impl', href: '/docs/spec/impl', color: 'bg-indigo-600' },
  { id: 'spec-status', label: '/spec-status', href: '/docs/spec/status', color: 'bg-purple-500' },
  { id: 'docs-init', label: '/docs init', href: '/docs/docs-workflow/init', color: 'bg-emerald-500' },
  { id: 'docs-update', label: '/docs update', href: '/docs/docs-workflow/update', color: 'bg-emerald-600' },
];

export function DecisionTree() {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  return (
    <div className="my-8 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-emerald-400">☰</span>
        <h3 className="text-lg font-semibold text-white">Interactive Command Selector</h3>
      </div>

      <p className="text-zinc-400 text-sm mb-6">
        Click any command to see its purpose, or follow the decision tree below to find the right command for your task.
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
              ${cmd.color} text-white hover:opacity-80 hover:scale-105
              ${activeCommand === cmd.id ? 'ring-2 ring-white/50' : ''}
            `}
          >
            {cmd.label}
          </Link>
        ))}
      </div>

      {/* Simple flowchart */}
      <div className="bg-zinc-950 rounded-lg p-6 overflow-x-auto">
        <svg viewBox="0 0 800 300" className="w-full min-w-[600px]">
          {/* Starting point */}
          <rect x="350" y="10" width="100" height="30" rx="15" fill="#3b82f6" />
          <text x="400" y="30" textAnchor="middle" fill="white" fontSize="12">What do you need?</text>

          {/* Lines from start */}
          <path d="M 400 40 L 400 60" stroke="#52525b" strokeWidth="2" />
          <path d="M 400 60 L 150 60" stroke="#52525b" strokeWidth="2" />
          <path d="M 400 60 L 650 60" stroke="#52525b" strokeWidth="2" />
          <path d="M 150 60 L 150 80" stroke="#52525b" strokeWidth="2" />
          <path d="M 400 60 L 400 80" stroke="#52525b" strokeWidth="2" />
          <path d="M 650 60 L 650 80" stroke="#52525b" strokeWidth="2" />

          {/* First level options */}
          <rect x="100" y="80" width="100" height="25" rx="5" fill="#6366f1" />
          <text x="150" y="97" textAnchor="middle" fill="white" fontSize="11">New feature?</text>

          <rect x="350" y="80" width="100" height="25" rx="5" fill="#6366f1" />
          <text x="400" y="97" textAnchor="middle" fill="white" fontSize="11">Update docs?</text>

          <rect x="600" y="80" width="100" height="25" rx="5" fill="#6366f1" />
          <text x="650" y="97" textAnchor="middle" fill="white" fontSize="11">Check progress?</text>

          {/* Second level - Feature flow */}
          <path d="M 150 105 L 150 130" stroke="#52525b" strokeWidth="2" />
          <path d="M 150 130 L 80 130" stroke="#52525b" strokeWidth="2" />
          <path d="M 150 130 L 220 130" stroke="#52525b" strokeWidth="2" />
          <path d="M 80 130 L 80 150" stroke="#52525b" strokeWidth="2" />
          <path d="M 220 130 L 220 150" stroke="#52525b" strokeWidth="2" />

          {/* Commands */}
          <rect x="30" y="150" width="100" height="25" rx="5" fill="#1e40af" />
          <text x="80" y="167" textAnchor="middle" fill="white" fontSize="11">/spec-init</text>

          <rect x="170" y="150" width="100" height="25" rx="5" fill="#1e40af" />
          <text x="220" y="167" textAnchor="middle" fill="white" fontSize="11">/spec-requirements</text>

          {/* Docs flow */}
          <path d="M 400 105 L 400 130" stroke="#52525b" strokeWidth="2" />
          <path d="M 400 130 L 350 130" stroke="#52525b" strokeWidth="2" />
          <path d="M 400 130 L 450 130" stroke="#52525b" strokeWidth="2" />
          <path d="M 350 130 L 350 150" stroke="#52525b" strokeWidth="2" />
          <path d="M 450 130 L 450 150" stroke="#52525b" strokeWidth="2" />

          <rect x="300" y="150" width="100" height="25" rx="5" fill="#059669" />
          <text x="350" y="167" textAnchor="middle" fill="white" fontSize="11">/docs init</text>

          <rect x="400" y="150" width="100" height="25" rx="5" fill="#059669" />
          <text x="450" y="167" textAnchor="middle" fill="white" fontSize="11">/docs update</text>

          {/* Status flow */}
          <path d="M 650 105 L 650 150" stroke="#52525b" strokeWidth="2" />

          <rect x="600" y="150" width="100" height="25" rx="5" fill="#7c3aed" />
          <text x="650" y="167" textAnchor="middle" fill="white" fontSize="11">/spec-status</text>

          {/* Legend */}
          <text x="400" y="220" textAnchor="middle" fill="#71717a" fontSize="10">
            Click any command above to view documentation
          </text>
        </svg>
      </div>
    </div>
  );
}
