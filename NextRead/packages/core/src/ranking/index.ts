export function computeSimilarityScore(a: string, b: string): number {
  const aTokens = tokenize(a);
  const bTokens = tokenize(b);
  const overlap = new Set([...aTokens].filter((word) => bTokens.includes(word)));
  const union = new Set([...aTokens, ...bTokens]);
  return union.size === 0 ? 0 : overlap.size / union.size;
}

export function computeNextStepScore(note: { tags: string[]; links: string[]; content: string }, candidate: { tags: string[]; links: string[]; content: string }): number {
  const similarity = computeSimilarityScore(note.content, candidate.content);
  const tagBonus = note.tags.some((tag) => candidate.tags.includes(tag)) ? 0.2 : 0;
  const linkBonus = note.links.some((link) => candidate.links.includes(link)) ? 0.15 : 0;
  return similarity + tagBonus + linkBonus;
}

function tokenize(value: string): string[] {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}
