# Brainstorm: Next Directions

## 1) Tensor-Based Book Ranking

Possible approaches:

- Option A: Build a lightweight embedding vector from note text, tags, and links using TensorFlow.js, then compare it to book embeddings.
- Option B: Use a hybrid score that combines tensor similarity with metadata signals such as shared categories, tags, and recency.
- Option C: Cluster notes into topical groups first, then rank books within the most relevant group rather than across the whole corpus.

Recommended direction for MVP: use a hybrid ranking model where tensor similarity is blended with deterministic metadata boosts.

## 2) Grouping Similar Notes and Books

Possible approaches:

- Cluster notes by topic using a simple embedding similarity threshold.
- Group books by shared categories and topical embedding similarity.
- Expose groups as “themes” or “concept clusters” in the UI and API response.

Recommended direction: expose topic clusters as optional metadata rather than requiring a full clustering engine in the first iteration.

## 3) How to Show Suggestions

Possible UI/API patterns:

- List view: ranked cards with title, score, and short explanation.
- Context panel: show “Why this was suggested?” with shared tags and overlap.
- Topic groups: show a primary suggestion plus related alternatives.

Recommended direction: keep the initial experience simple with a ranked list and a tiny explanation string.

## 4) API Shape for Other Apps

Possible API ideas:

- GET /notes/:id/similar
- GET /notes/:id/next-step
- GET /notes/:id/books
- POST /index/notes for bulk ingestion

Recommended direction: start with simple REST endpoints that return JSON and are easy to consume by desktop apps, plugins, and future web clients.
