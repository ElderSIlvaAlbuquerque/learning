# Data Contracts

## Obsidian Note Input

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "path": "string",
  "tags": ["string"],
  "links": ["string"],
  "frontmatter": {
    "type": "string"
  },
  "updatedAt": "ISO-8601"
}
```

## Normalized Note Output

The adapter should emit the shared NextRead note contract:

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "links": ["string"],
  "source": "obsidian",
  "updatedAt": "ISO-8601"
}
```
