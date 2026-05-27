import { CheckCircle2, ClipboardList, Code2, FileCheck2, FileText, GitBranch, SearchCheck, ShieldCheck } from 'lucide-react';

const lifecycleStages = [
  {
    icon: SearchCheck,
    label: '01',
    title: 'Evidence',
    command: '/hapo:specs',
    detail: 'Gather codebase and external evidence before requirements or design are finalized.',
  },
  {
    icon: FileText,
    label: '02',
    title: 'Contract',
    command: 'requirements + design',
    detail: 'Lock behavior, constraints, canonical contracts, traceability, and out-of-scope boundaries.',
  },
  {
    icon: ClipboardList,
    label: '03',
    title: 'Task packets',
    command: 'tasks/task-R*.md',
    detail: 'Split work into self-contained packets with related files, criteria, dependencies, and evidence.',
  },
  {
    icon: FileCheck2,
    label: '04',
    title: 'Readiness',
    command: 'validate-spec-output.cjs',
    detail: 'Deterministic validation must pass before ready_for_implementation can be true.',
  },
  {
    icon: Code2,
    label: '05',
    title: 'Develop',
    command: '/hapo:develop',
    detail: 'Implement one unblocked task after task-aware inspection of real entrypoints and blast radius.',
  },
  {
    icon: ShieldCheck,
    label: '06',
    title: 'Proof',
    command: '/hapo:test + /hapo:code-review',
    detail: 'Run exact evidence commands, prove reachability, and reject scope drift or hidden placeholders.',
  },
  {
    icon: GitBranch,
    label: '07',
    title: 'Sync',
    command: '/hapo:sync',
    detail: 'Update task_registry and task markdown only after proof, or audit drift before continuing.',
  },
];

const artifacts = [
  ['spec.json', 'Machine state', 'status, current_phase, scope_lock, approvals, task_files, task_registry, readiness flags'],
  ['requirements.md', 'Behavior contract', 'numeric requirement IDs, EARS-style acceptance criteria, constraints, NFRs'],
  ['research.md', 'Evidence record', 'codebase scout, external research or skip rationale, decision, rejected alternatives'],
  ['design.md', 'Implementation contract', 'architecture, canonical contracts, invariants, traceability, risk, test strategy'],
  ['tasks/task-R*.md', 'Execution packets', 'context, constraints, related files, dependencies, steps, completion criteria, evidence'],
  ['reports/', 'Review trail', 'optional research, validation, red-team, and review reports for high-risk specs'],
];

const readiness = [
  ['Scope is locked', 'scope_lock is an object and scope expansion requires explicit approval.'],
  ['Evidence exists', 'research.md has an Evidence Summary or a justified skip rationale.'],
  ['Tasks are real files', 'spec.json task_files exactly matches the tasks/ directory.'],
  ['Registry is synced', 'task_registry has one complete entry for every task file.'],
  ['Every task proves done', 'Completion Criteria and Evidence are specific enough to execute.'],
  ['Validator passes', 'node .claude/scripts/validate-spec-output.cjs specs/<feature> exits cleanly.'],
];

export function SpecLifecycleMap() {
  return (
    <section className="not-prose my-8 overflow-hidden rounded-[28px] border border-[#101820]/10 bg-[#101820] shadow-[0_30px_90px_-58px_rgba(16,24,32,0.9)]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#F2EA9D]">Spec-driven development loop</div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/64">
          CafeKit keeps the assistant moving through persistent contracts instead of relying on chat memory.
        </p>
      </div>
      <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
        {lifecycleStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="bg-[#101820] p-5 text-white">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-5 w-5 text-[#F2EA9D]" />
                </div>
                <span className="font-mono text-xs text-white/42">{stage.label}</span>
              </div>
              <div className="font-mono text-[12px] text-[#A7C5EE]">{stage.command}</div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{stage.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/68">{stage.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SpecArtifactGrid() {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-[24px] border border-border bg-card">
      <div className="grid border-b border-border bg-[#101820] px-4 py-3 font-mono text-xs text-white sm:grid-cols-[1fr_1fr_2fr]">
        <div>Artifact</div>
        <div>Owns</div>
        <div>Must contain</div>
      </div>
      {artifacts.map(([artifact, owns, contains]) => (
        <div key={artifact} className="grid gap-2 border-b border-border px-4 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_2fr]">
          <div className="font-mono text-sm font-semibold text-[#006242] dark:text-[#A7C5EE]">{artifact}</div>
          <div className="text-sm font-medium text-foreground">{owns}</div>
          <div className="text-sm leading-6 text-muted-foreground">{contains}</div>
        </div>
      ))}
    </div>
  );
}

export function SpecReadinessGrid() {
  return (
    <div className="not-prose my-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {readiness.map(([title, detail]) => (
        <div key={title} className="rounded-2xl border border-[#006242]/15 bg-[#EEF5F1] p-5 dark:bg-[#14252A]">
          <CheckCircle2 className="mb-4 h-5 w-5 text-[#006242] dark:text-[#A7C5EE]" />
          <div className="font-semibold text-foreground">{title}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
        </div>
      ))}
    </div>
  );
}
