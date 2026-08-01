# Obsidian Adapter

## Required Methods

- listNotes()
- getNoteById(id)
- upsertNote(note)

## Mapping Rules

- Convert Obsidian note title and content into the shared Note contract.
- Preserve file path as a traceable metadata field if available.
- Infer tags from frontmatter and inline tag syntax when present.
- Convert Obsidian wikilinks into the shared links array.

## Error Cases

- Missing content or title.
- Malformed frontmatter.
- Duplicate note ids.
- Notes that cannot be parsed into a valid shared contract.
