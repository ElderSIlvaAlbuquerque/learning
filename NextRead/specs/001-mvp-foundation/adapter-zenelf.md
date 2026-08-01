# ZenElf Adapter

## Required Methods

- listNotes()
- getNoteById(id)
- upsertNote(note)

## Mapping Rules

- Map the ZenElf note schema to the NextRead Note contract.
- Preserve the original external id for traceability.
- Normalize tags and links to the shared contract format.

## Error Cases

- Missing content should be rejected with a validation error.
- Malformed tags should be normalized or rejected clearly.
- Duplicate ids should be handled deterministically.
- Unknown source values should raise a clear adapter error.
