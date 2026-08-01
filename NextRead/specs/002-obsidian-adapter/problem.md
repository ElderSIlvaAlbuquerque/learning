# Problem

## Context

NextRead currently supports a foundational recommendation engine and a ZenElf adapter. The next step is to support Obsidian notes as a first-class source so users can import and query their existing note graph without manual conversion.

## Goals

- G1: Import Obsidian notes into the shared NextRead note contract.
- G2: Preserve note metadata such as tags, links, and file path for ranking and traceability.
- G3: Allow Obsidian-backed notes to participate in similar-note and next-step recommendation flows.

## Non-Goals

- NG1: Full Obsidian plugin UI.
- NG2: Real-time sync or bi-directional editing.
- NG3: Complex parsing of all Obsidian plugins or markdown extensions.

## Constraints

- C1: The adapter must work with the shared contract and core recommendation services.
- C2: The adapter should support a local-first workflow and avoid external services.
- C3: The implementation should stay deterministic and testable in the MVP.

## Acceptance Criteria

- AC1: An Obsidian-style note payload can be mapped into the shared Note contract.
- AC2: Imported Obsidian notes can be indexed and returned in similar-note queries.
- AC3: The adapter preserves core metadata needed for ranking and display.
- AC4: Unsupported or malformed note payloads fail with a clear error.
