export interface EmbeddingProvider {
    createEmbedding(text: string): Promise<number[]>;
}
export declare class TensorFlowEmbeddingService implements EmbeddingProvider {
    private modelPromise?;
    private loadModel;
    createEmbedding(text: string): Promise<number[]>;
}
//# sourceMappingURL=tensorflow-embedding.d.ts.map