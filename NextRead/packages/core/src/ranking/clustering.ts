import type { TopicCluster } from '@nextread/shared';

export function assignCluster(tags: string[]): string {
  return tags[0]?.toLowerCase() ?? 'general';
}

export function groupByCluster(items: { id: string; cluster: string }[]): TopicCluster[] {
  const clusters = new Map<string, string[]>();

  for (const item of items) {
    const existing = clusters.get(item.cluster) ?? [];
    existing.push(item.id);
    clusters.set(item.cluster, existing);
  }

  return [...clusters.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, ids]) => ({ id: `cluster-${name}`, name, items: ids }));
}
