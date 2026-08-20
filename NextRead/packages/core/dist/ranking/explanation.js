export function buildExplanation(shared, similarity) {
    if (shared.length > 0) {
        return `Shares topics: ${shared.join(', ')}`;
    }
    return `Similar content (score ${similarity.toFixed(2)})`;
}
//# sourceMappingURL=explanation.js.map