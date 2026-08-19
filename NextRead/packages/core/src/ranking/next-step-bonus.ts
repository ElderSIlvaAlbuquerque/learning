export function computeNextStepBonus(
  note: { tags: string[]; links: string[] },
  candidate: { tags: string[]; links: string[] }
): number {
  const tagBonus = note.tags.some((tag) => candidate.tags.includes(tag)) ? 0.2 : 0;
  const linkBonus = note.links.some((link) => candidate.links.includes(link)) ? 0.15 : 0;
  return tagBonus + linkBonus;
}
