# Implementation Plan: API Layer

**Branch**: `004-api-layer` | **Date**: 2026-08-01 | **Spec**: [problem.md](problem.md)

## Summary

Expose the core recommendation engine through a lightweight HTTP API so other applications can consume it locally.

## Technical Context

**Language/Version**: TypeScript 5.x with Node.js 20 LTS

**Primary Dependencies**: Node.js HTTP server, Zod, Vitest

**Scope**: REST endpoints for similar notes, next-step, and books

## Implementation Approach

1. Add a lightweight API package or server module.
2. Expose endpoints for similar notes, next-step, and books.
3. Reuse the existing core services and shared contracts.
4. Add integration tests around the HTTP layer.
