export function assignCluster(tags) {
    return tags[0]?.toLowerCase() ?? 'general';
}
export function groupByCluster(items) {
    const clusters = new Map();
    for (const item of items) {
        const existing = clusters.get(item.cluster) ?? [];
        existing.push(item.id);
        clusters.set(item.cluster, existing);
    }
    return [...clusters.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([name, ids]) => ({ id: `cluster-${name}`, name, items: ids }));
}
//# sourceMappingURL=clustering.js.map