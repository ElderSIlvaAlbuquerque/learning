# Data Contracts

## Note

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "links": ["string"],
  "source": "zenelf|obsidian|other",
  "updatedAt": "ISO-8601"
}
```

## Book

```json
{
  "id": "string",
  "title": "string",
  "authors": ["string"],
  "description": "string",
  "categories": ["string"],
  "rating": 0
}
```

## Recommendation Response

```json
{
  "noteId": "string",
  "results": [
    {
      "id": "string",
      "score": 0,
      "title": "string"
    }
  ]
}
```
