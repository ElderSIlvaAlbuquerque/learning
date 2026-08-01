import { describe, expect, it } from 'vitest';
import { sampleBooks, sampleNotes } from '../src/fixtures/index.js';

describe('fixture data', () => {
  it('provides sample notes and books for local exploration', () => {
    expect(sampleNotes.length).toBeGreaterThan(0);
    expect(sampleBooks.length).toBeGreaterThan(0);
  });
});
