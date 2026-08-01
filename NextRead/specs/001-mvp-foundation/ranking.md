# Ranking

## Similar Notes Score

The similarity score for two notes is computed as:

```text
score = 0.8 * cosine(note_embedding, candidate_embedding) + 0.2 * structural_signal
```

Where structural_signal may include:

- shared tags
- link proximity
- recency boost

## Next Step Rule

The next-step recommendation must select the highest-ranked similar note that is not the current note.

If no strong match is available, the system must fall back to the most recently updated note in the index that is not the current note.

## Book Recommendation Rule

Book recommendations are ranked by the similarity between the source note embedding and the book embedding, with metadata preserved in the response.
