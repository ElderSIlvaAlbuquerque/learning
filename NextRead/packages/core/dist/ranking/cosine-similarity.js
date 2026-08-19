export function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
    return magnitudeA === 0 || magnitudeB === 0 ? 0 : dot / (magnitudeA * magnitudeB);
}
//# sourceMappingURL=cosine-similarity.js.map