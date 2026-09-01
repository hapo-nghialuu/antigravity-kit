# Task taxonomy

Classify by the final deliverable the user expects, not by the first verb, file
type, or tool mentioned. Choose exactly one class; use domains as modifiers.

| Class | Final deliverable |
|---|---|
| `answer` | Evidence-backed explanation or factual response |
| `discover` | Located files, call path, inventory, or blast-radius map |
| `decide` | Chosen product, architecture, or technical direction |
| `specify` | Approved bounded plan and executable task packet |
| `change` | Working implementation or content change |
| `diagnose` | Root cause and verification-ready repair plan |
| `repair` | Cause-aligned fix plus regression proof |
| `verify` | Test or review verdict with owned evidence |
| `deliver` | Authorized commit, push, deploy, publish, or release result |

When a request contains several verbs, classify by its terminal observable
result. For example, “research options and implement the winner” is `change`,
while research is a decision link. “Inspect this failure and tell me why” is
`diagnose`, not `repair`.

## Size

- `trivial`: one clear reversible outcome, normally one owner and one link.
- `standard`: multiple dependent links or a bounded cross-file/domain change.
- `epic`: three or more independently deliverable subsystems; split them into
  bounded routes instead of creating one oversized chain.

## Risk

Risk is the maximum risk of any retained link, never an average:

- `low`: local, reversible, no material compatibility or data boundary.
- `elevated`: shared contract, integration, migration, sensitive data, or a
  meaningful regression surface.
- `high`: security boundary, irreversible data/action, production delivery,
  public compatibility, or large blast radius.

## Domains and ambiguity

Count only material domains that need distinct evidence or ownership. A file
extension alone is not a domain. Ambiguity adds an understand or decide link
only when unresolved information can change the final deliverable, authority,
or verification; otherwise choose the shortest valid direct path.

Modifiers constrain a route. They never grant mutation, external-action,
commit, push, deploy, publish, or release authority.
