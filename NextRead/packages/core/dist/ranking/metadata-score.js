export function sharedTags(tagsA, tagsB) {
    const setB = new Set(tagsB.map((tag) => tag.toLowerCase()));
    return tagsA.filter((tag) => setB.has(tag.toLowerCase()));
}
export function tagOverlapScore(tagsA, tagsB) {
    if (tagsA.length === 0 || tagsB.length === 0)
        return 0;
    const setA = new Set(tagsA.map((tag) => tag.toLowerCase()));
    const setB = new Set(tagsB.map((tag) => tag.toLowerCase()));
    const shared = [...setA].filter((tag) => setB.has(tag));
    return shared.length / Math.max(setA.size, setB.size);
}
//# sourceMappingURL=metadata-score.js.map