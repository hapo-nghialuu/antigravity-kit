# CafeKit Spec - Decision Framework

**Context:** 3-week fast iteration  
**Goal:** Decide what goes into v0.2.0  

---

## Feature Inclusion Criteria

### MUST Include (P0)
- Solves pain point for >30% users (3+ out of 15)
- Effort <2 hours
- Risk: Low
- Can be tested in 1 day

### SHOULD Include (P1)
- Requested by >20% users (2+ out of 15)
- Effort 2-4 hours
- Risk: Low-Medium
- Can be tested in 2 days

### DEFER (P2)
- Requested by <20% users
- Effort >4 hours
- Risk: High
- Can't be tested in 3 weeks

---

## Decision Matrix

| Feature | User Requests | Effort | Risk | Include? |
|---------|---------------|--------|------|----------|
| --platform flag | 5/15 (33%) | 2h | Low | ✅ P0 |
| --verbose | 3/15 (20%) | 1.5h | Low | ✅ P0 |
| --dry-run | 3/15 (20%) | 1h | Low | ✅ P0 |
| update command | 4/15 (27%) | 3h | Med | ✅ P1 |
| uninstall | 2/15 (13%) | 1h | Low | ✅ P1 |
| config file | 3/15 (20%) | 2.5h | Low | ✅ P1 |
| Analytics | 1/15 (7%) | 4h | High | ❌ Defer |
| Interactive | 2/15 (13%) | 3h | Med | ❌ Defer |
| i18n | 1/15 (7%) | 6h | Med | ❌ Defer |

---

## Fast Iteration Rules

1. **Stick to P0+P1** - No P2 in 3-week cycle
2. **Cut if overrun** - If dev >12h, cut lowest P1
3. **Quality over quantity** - 3 solid features > 6 buggy
4. **Backward compatible** - Never break v0.1.0
5. **User feedback wins** - If 50%+ want it, prioritize

---

## When to Pivot

If by Day 10:
- <5 users used tool → Focus on adoption, not features
- Critical bugs found → Focus on stability
- Users love as-is → Do v0.1.x patches instead
- Users want different → Re-prioritize

---

**Owner:** Nghia Luu  
**Last Updated:** 2026-02-02  
