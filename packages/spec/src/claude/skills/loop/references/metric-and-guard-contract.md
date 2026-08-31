# Metric and Guard contract

Freeze this contract before mutation. If any field changes, stop for drift; do
not silently recompute the baseline under new rules.

## Required Metric fields

- `argv`: nonempty trusted argv vector; no shell string.
- `cwd`: canonical detached worktree root, fixed by Loop.
- `unit`: one nonempty unit label.
- `direction`: exactly `higher` or `lower`.
- `sample_count`: integer at least 3, identical for baseline and candidates.
- `timeout_ms`: positive integer per sample.
- `minimum_delta`: finite nonnegative number in the declared unit.
- `numeric_format`: exactly IEEE-754 binary64, roundTiesToEven after every
  operation, with negative zero normalized to positive zero.
- `environment`: fixed allowlisted names and redacted non-secret values; no
  inherited credential or mutable random/time seed unless explicitly frozen.

Each successful sample must emit exactly one trimmed UTF-8 line matching
`^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$`. Reject empty,
multi-line, multi-value, `NaN`, `Infinity`, unit-suffixed, nonzero exit, signaled,
or timed-out output. Parse to a finite number without locale-dependent separators.
Reject a decimal with a nonzero significand when binary64 parsing underflows it
to zero.

## Fixed calculation

For each sample set:

1. Sort binary64 values and calculate the median. For an even count with central
   values `lower <= upper`, use `lower + (upper - lower) / 2` when both have the
   same sign (zero may join either sign); otherwise use
   `lower / 2 + upper / 2`. Apply binary64 roundTiesToEven after every operation
   and normalize negative zero to positive zero.
2. Calculate noise as the maximum absolute distance from that median.
3. For `higher`, improvement is `candidate_median - best_median`; for `lower`,
   improvement is `best_median - candidate_median`.
4. Calculate `required_delta = max(minimum_delta, best_noise + candidate_noise)`.
5. Accept only when `improvement > required_delta` and Guard passes on the exact
   candidate bytes. Equality is not an improvement.

After every operation, require median, noise, improvement, and required delta to
remain finite. A parsed nonzero value that became zero, an overflow, or a
non-finite derived value blocks the baseline or rejects the candidate; never
store it as current best. A rounded zero produced by subtraction is handled
conservatively as no improvement, never as a win.

The initial current best is the pinned baseline. Keep the accepted candidate's
median and noise as the next current best. Never compare a candidate against an
older, more favorable baseline or select one sample from a noisy set.

## Guard independence

For code mutation, Guard is mandatory, fixed before baseline, and distinct from
Metric. It must validate correctness beyond the optimized outcome—for example a
relevant real test command, typecheck, or invariant checker. A second invocation
of Metric, a threshold over the same output, or an oracle the loop may edit is
not an independent Guard.

Run Guard after Metric on the identical candidate fingerprint. Guard passes only
with its predeclared literal exit/oracle and zero required skips; `NO_TESTS`,
warning-only, partial, flaky-history waiver, or changed Guard bytes do not pass.
Metric and Guard may create disposable caches only at exact predeclared paths.
Snapshot the complete detached-worktree tracked/untracked state around each
oracle, subtract only that fixed cache allowlist, and treat every other byte,
mode, type, or path mutation—including outside Scope—as drift.

## Reproducibility and drift

Record tool versions, immutable Metric/Guard/test/benchmark/dataset digests,
fixed inputs/data digest, relevant configuration digest,
base OID, scoped byte manifest digest, and environment fingerprint. Stop when any
of them changes. Report variance and raw sample values; do not hide outliers or
retry only bad samples. A failed sample rejects the candidate rather than being
dropped from aggregation.
