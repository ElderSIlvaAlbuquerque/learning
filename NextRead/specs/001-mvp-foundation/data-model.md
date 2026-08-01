# Data Model

## Entity: Note

| Field | Type | Notes |
| --- | --- | --- |
| id | string | Stable identifier used for indexing and retrieval |
| title | string | Required human-readable title |
| content | string | Required note body used for embedding generation |
| tags | string[] | Optional normalized tags |
| links | string[] | Optional references to other notes |
| source | enum | `zenelf`, `obsidian`, or `other` |
| updatedAt | string | ISO-8601 timestamp |

**Validation rules**:

- `id`, `title`, and `content` are required.
- `source` must be one of the allowed values.
- Empty tags and links are permitted.

## Entity: Book

| Field | Type | Notes |
| --- | --- | --- |
| id | string | Stable identifier |
| title | string | Required title |
| authors | string[] | Optional list of authors |
| description | string | Optional description used for embedding |
| categories | string[] | Optional categories |
| rating | number | Optional rating value |

**Validation rules**:

- `id` and `title` are required.
- `rating` must be numeric when present.

## Entity: RecommendationResult

| Field | Type | Notes |
| --- | --- | --- |
| id | string | Matching note or book id |
| score | number | Similarity or ranking score |
| title | string | Display title |

## Relationships

- A Note is indexed into the vector store with its embedding and metadata.
- A Book is indexed into a separate collection with metadata and embedding.
- A next-step recommendation is derived from the top similar note that is not the current note.
