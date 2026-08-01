# Implementation Plan: MVP Foundation

**Branch**: `001-mvp-foundation` | **Date**: 2026-07-30 | **Spec**: [problem.md](problem.md)

## Summary

Build a small TypeScript monorepo for NextRead that supports note indexing, similar-note retrieval, next-step selection, and book recommendations using deterministic heuristics and a local Qdrant instance. The implementation will keep core ranking logic independent from adapters and enforce shared contracts through Zod schemas.

## Technical Context

**Language/Version**: TypeScript 5.x with Node.js 20 LTS

**Primary Dependencies**: Zod, Vitest, @qdrant/js-client-rest, tsx, typescript

**Storage**: Qdrant running locally via Docker; local JSON fixtures for initial book dataset

**Testing**: Vitest with unit and integration coverage

**Target Platform**: Linux development workstation with Docker support

**Project Type**: library + CLI

**Performance Goals**: support roughly 1,000 notes and 2,000 books locally with sub-second retrieval on a dev machine

**Constraints**: offline/local-first, deterministic heuristics only, no external ML service in MVP

**Scale/Scope**: single-user MVP with one adapter and one vector store

## Constitution Check

- Pass: The feature is rooted in a documented problem statement and acceptance criteria.
- Pass: Explicit note and book contracts are defined and will be validated with Zod.
- Pass: The architecture preserves adapter independence by keeping ranking logic in core packages.
- Pass: The initial implementation uses deterministic ranking and a simple local vector store rather than a complex model.
- Pass: The plan keeps scope to the MVP outcomes defined in the README and the spec.

## Project Structure

```text
packages/
├── core/
│   ├── src/
│   │   ├── models/
│   │   ├── services/
│   │   ├── ranking/
│   │   └── vector/
│   └── tests/
├── adapters/
│   └── src/
│       └── zenelf/
├── cli/
│   └── src/
└── shared/
    └── src/
```

**Structure Decision**: Use a small TypeScript monorepo with a dedicated core package for domain logic, an adapters package for source-specific translation, and a lightweight CLI package for local validation.

## Complexity Tracking

No constitution violations require special justification.
