# Problem

## Context

The core recommendation engine is useful, but it is currently difficult to reuse from other apps and integrations. The next step is to expose a simple API layer so desktop apps, plugins, and other tools can call the recommendation engine over HTTP.

## Goals

- G1: Expose simple REST endpoints for similar notes, next-step recommendations, and books.
- G2: Support basic JSON-based integration for external consumers.
- G3: Keep the API lightweight and easy to run locally.

## Non-Goals

- NG1: Authentication or multi-tenant access control.
- NG2: Full GraphQL support.
- NG3: Advanced API versioning beyond the initial MVP.

## Constraints

- C1: The API must work on top of the existing core services.
- C2: The API should remain simple enough for local development.
- C3: Responses should be deterministic and easy to consume.

## Acceptance Criteria

- AC1: A client can request similar notes for a note id over HTTP.
- AC2: A client can request a next-step recommendation over HTTP.
- AC3: A client can request book recommendations over HTTP.
- AC4: The API returns JSON payloads with a predictable shape.
