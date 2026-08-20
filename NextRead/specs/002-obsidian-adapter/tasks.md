# Tasks: Obsidian Adapter

**Input**: Design documents from `/specs/002-obsidian-adapter/`

**Prerequisites**: plan.md, problem.md, contracts.md, adapter-obsidian.md, test-plan.md

## Phase 1: Adapter Foundation

- [x] T001 Create the Obsidian adapter module under packages/adapters/src/obsidian/
- [x] T002 Add shared adapter types and parsing helpers for Obsidian payloads
- [x] T003 Implement mapping from Obsidian note payloads into the shared Note contract

## Phase 2: Integration

- [x] T004 Add adapter methods for listing, fetching, and upserting notes
- [x] T005 Wire the adapter into the core indexing flow via the note indexer
- [x] T006 Preserve tags, links, and path metadata through the adapter layer

## Phase 3: Testing

- [x] T007 Add unit tests for Obsidian note mapping and validation
- [x] T008 Add integration tests for adapter-driven note indexing
- [x] T009 Run the full test suite and confirm the adapter works end to end
