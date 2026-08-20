export function buildExplanation(shared: string[], similarity: number): string {
  if (shared.length > 0) {
    return `Shares topics: ${shared.join(', ')}`;
  }

  return `Similar content (score ${similarity.toFixed(2)})`;
}
