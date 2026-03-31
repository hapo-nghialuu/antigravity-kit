# Containment and Hardening

Once the cause is understood, separate immediate safety from long-term resilience.

## Distinction

- **Containment** limits current damage or confusion.
- **Correction** removes the identified cause.
- **Hardening** adds safeguards so the same class of issue is harder to repeat.

## Containment Questions

- What should stop spreading right now?
- Which surface should be isolated first?
- What temporary guard reduces harm without hiding evidence?

## Hardening Questions

- What assumption failed silently?
- Which boundary lacked a clear contract?
- Where should the next validation live?
- What invariant should be made explicit?

## Hardening Layers

Consider adding protection at multiple points:
- entry/input layer
- transition layer
- state layer
- output/reporting layer

## Anti-Pattern

Do not treat containment as a final fix.
A quiet system is not the same as a corrected system.

## Exit Condition

You can leave this module when you can state:
- what contained the problem
- what corrected the cause
- what new safeguard lowers recurrence risk
