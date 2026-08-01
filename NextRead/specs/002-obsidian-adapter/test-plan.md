# Test Plan

## Acceptance Tests

- T1: An Obsidian note payload maps to the shared Note contract.
- T2: A mapped Obsidian note can be indexed and returned as a similar note candidate.
- T3: A note with tags and links preserves those fields after mapping.

## Regression Tests

- R1: A note with missing content fails with a clear adapter error.
- R2: A malformed tag list does not crash the adapter.
- R3: Duplicate note ids do not create conflicting index entries.
