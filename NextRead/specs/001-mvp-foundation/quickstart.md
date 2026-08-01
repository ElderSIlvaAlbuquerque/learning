# Quickstart

## Prerequisites

- Node.js 20+
- Docker
- npm or pnpm

## Setup

1. Start a local Qdrant instance:

   ```bash
   docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
   ```

2. Install the monorepo dependencies:

   ```bash
   npm install
   ```

3. Run the test suite:

   ```bash
   npm test
   ```

## Validation

- Index a sample note through the CLI or an integration test.
- Verify that similar-note queries return ranked results.
- Verify that next-step recommendations choose a different note when available.
- Verify that book recommendations include title, authors, and score metadata.
