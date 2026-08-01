# Implementation Plan: Obsidian Adapter

**Branch**: `002-obsidian-adapter` | **Date**: 2026-08-01 | **Spec**: [problem.md](problem.md)

## Summary

Add an Obsidian adapter to the NextRead monorepo so Obsidian-style note payloads can be mapped into the shared note contract and participate in the existing recommendation flows.

## Technical Context

**Language/Version**: TypeScript 5.x with Node.js 20 LTS

**Primary Dependencies**: Zod, Vitest, tsx, typescript

**Scope**: adapter mapping, metadata preservation, indexing integration, and basic end-to-end tests

**Constraints**: local-first, testable, no full Obsidian plugin UI in this phase

## Project Structure

```text
packages/
├── adapters/
│   └── src/
│       └── obsidian/
└── core/
    └── tests/
```

## Implementation Approach

1. Add an Obsidian adapter package module under the adapters workspace.
2. Implement mapping from Obsidian note shape to the shared Note contract.
3. Preserve tags, links, file path, and frontmatter-derived metadata where possible.
4. Wire the adapter into the core indexing flow via the existing note indexer.
5. Add tests for mapping and integration with the core services.
