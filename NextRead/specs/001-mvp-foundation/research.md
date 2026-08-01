# Research

## Decision: TypeScript monorepo with package boundaries

**Decision**: Use a small TypeScript monorepo with separate packages for core, adapters, and CLI.

**Rationale**: This keeps the recommendation engine independent from adapter implementations while making it easy to test and evolve the MVP without a large UI layer.

**Alternatives considered**: A single-package prototype and a Python-based implementation. The single-package approach was rejected because it would blur adapter boundaries, while Python was rejected for consistency with the suggested TypeScript-based workflow.

## Decision: Qdrant as the vector store

**Decision**: Use Qdrant running locally in Docker for note and book indexing.

**Rationale**: Qdrant supports cosine similarity and metadata filtering, which lines up directly with the MVP requirements.

**Alternatives considered**: A simple in-memory index and SQLite full-text search. In-memory storage was rejected because it would not reflect the intended production-like path, and SQLite was rejected because it would not provide the vector similarity behavior needed for the MVP.

## Decision: Zod for contract validation and Vitest for testing

**Decision**: Use Zod for runtime validation of the shared note and book contracts and Vitest for unit and integration tests.

**Rationale**: Both work well in a TypeScript workflow and help keep the contract-to-implementation path explicit.

**Alternatives considered**: JSON Schema only and Jest. JSON Schema alone was rejected because runtime validation is more direct with Zod, and Jest was rejected because Vitest is simpler for a modern TypeScript toolchain.
