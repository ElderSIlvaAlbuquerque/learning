# Problem

## Context

The MVP foundation supports note similarity, next-step selection, and book recommendations, but the ranking experience is still relatively simple. The next step is to improve recommendation quality and explainability without overcomplicating the initial implementation.

## Goals

- G1: Improve book recommendation quality using a hybrid ranking approach.
- G2: Group related items into simple topical clusters for better exploration.
- G3: Provide lightweight explanation metadata for each recommendation.

## Non-Goals

- NG1: Full online learning or feedback loops.
- NG2: Advanced transformer-based reranking.
- NG3: A full UI experience.

## Constraints

- C1: Recommendations must remain deterministic and explainable.
- C2: The ranking pipeline should work with the existing core services.
- C3: The implementation should remain local-first and testable.

## Acceptance Criteria

- AC1: Book recommendations are ranked using a hybrid score combining embedding similarity and metadata heuristics.
- AC2: Recommendations include simple explanation metadata.
- AC3: Related items can be grouped into lightweight topic clusters.
- AC4: The ranking remains deterministic across repeated runs.
