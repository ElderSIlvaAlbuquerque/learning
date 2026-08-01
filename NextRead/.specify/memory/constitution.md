<!--
Sync Impact Report
- Version change: template placeholders → 1.0.0
- Modified principles: none; this constitution was initialized from the project template
- Added sections: Core Principles, Architecture and Data Constraints, Development Workflow, Governance
- Removed sections: none
- Follow-up TODOs: None
-->

# NextRead Constitution

## Core Principles

### I. Spec-First Delivery

Every change must start with a problem definition, explicit acceptance criteria, and a matching spec before implementation begins. The team must not start feature work until the relevant spec and tests are documented.

### II. Explicit Contracts

Core data models and adapter interfaces must use explicit, versioned contracts. Any change to note, book, ranking, or adapter behavior must update the contract documentation and the corresponding tests.

### III. Adapter Independence

Recommendation logic must remain independent from specific readers, writers, or storage implementations. Adapters may translate external data into the shared contracts, but they must not embed core ranking behavior.

### IV. Deterministic Heuristics Before Complexity

The default recommendation system must favor deterministic, explainable heuristics over opaque or overly complex models. If a more advanced technique is introduced, it must be justified by a spec and measurable improvement.

### V. Small, Measurable Slices

Work must be delivered in small slices that satisfy acceptance criteria and can be validated quickly. MVP scope must stay focused on similar notes, next-step suggestions, and book recommendations rather than expanding into unrelated product concerns.

## Architecture and Data Constraints

The project must preserve the layered structure of core, adapters, and optional API components. The core package must own parsing, normalization, embedding, ranking, and vector database interactions; adapters must translate external data into the shared contracts.

The MVP must use the documented note and book payloads, with cosine similarity as the default distance metric for vector retrieval. Unknown or unsupported adapter sources must fail with a clear error rather than silently producing incorrect results.

## Development Workflow

The team must follow the SDD workflow in order: problem spec, data contract spec, ranking spec, adapter spec, test spec, implementation, validation, and iteration. Every feature must include acceptance tests and regression tests that can be executed before the work is considered complete.

MVP delivery must satisfy the defined outcomes: similar notes, next-step recommendations, and book recommendations. Scope must remain within the documented MVP boundaries, including no full UI polish, no multi-tenant auth, and no distributed infrastructure in the first release.

## Governance

This constitution supersedes ad-hoc development practices for the NextRead project. Any amendment to these principles or workflow rules must be documented in this constitution, reviewed against the project README and active specs, and accompanied by updated tests or validation criteria where behavior changes.

Compliance is reviewed through the spec and test workflow: a change is considered compliant when it can be traced to a documented requirement, uses the agreed contracts, and passes the relevant acceptance and regression tests. If a principle cannot be followed for a specific case, the exception must be documented and linked to a follow-up task.

**Version**: 1.0.0 | **Ratified**: 2026-07-30 | **Last Amended**: 2026-07-30
