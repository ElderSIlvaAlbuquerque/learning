# Test Plan

## Acceptance Tests

- T1: Similar notes returns k items sorted by score.
- T2: The next-step recommendation is not the current note.
- T3: Book recommendations return k items with metadata.
- T4: A note with empty tags can still be indexed.

## Regression Tests

- R1: A note with no links still ranks without crashing.
- R2: An unknown source adapter fails with a clear error.
- R3: Duplicate note ids do not create conflicting index entries.
