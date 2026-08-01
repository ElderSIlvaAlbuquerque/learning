# Problem

## Context

NextRead needs a simple recommendation engine for personal notes that can help a user discover related notes, choose a sensible next note to study, and find supporting books on the same topic.

## Goals

- G1: Given a note, return the top-k most similar notes.
- G2: Given a note, suggest one next note to continue learning.
- G3: Given a note, return top-k book recommendations with metadata.

## Non-Goals

- NG1: Full UI polish.
- NG2: Multi-tenant authentication.
- NG3: Advanced reranking or transformer-based ranking models in the MVP.

## Constraints

- C1: The system must work with explicit adapter contracts.
- C2: The MVP must use deterministic heuristics before machine-learned ranking.
- C3: The initial implementation must support a local vector store and a small book dataset.

## Acceptance Criteria

- AC1: A note can be indexed and later retrieved as a similar note candidate.
- AC2: The next-step recommendation is a different note from the current one.
- AC3: Book recommendations return ranked results with title, authors, and score metadata.
- AC4: Unknown adapter sources fail with a clear error.
