import { z } from 'zod';
export declare const NoteSourceSchema: z.ZodEnum<["zenelf", "obsidian", "other"]>;
export declare const NoteSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    links: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    path: z.ZodOptional<z.ZodString>;
    source: z.ZodDefault<z.ZodEnum<["zenelf", "obsidian", "other"]>>;
    updatedAt: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    content: string;
    tags: string[];
    links: string[];
    source: "zenelf" | "obsidian" | "other";
    updatedAt: string;
    path?: string | undefined;
}, {
    id: string;
    title: string;
    content: string;
    path?: string | undefined;
    tags?: string[] | undefined;
    links?: string[] | undefined;
    source?: "zenelf" | "obsidian" | "other" | undefined;
    updatedAt?: string | undefined;
}>;
export declare const BookSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    authors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    description: z.ZodDefault<z.ZodString>;
    categories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    rating: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    authors: string[];
    description: string;
    categories: string[];
    rating: number;
}, {
    id: string;
    title: string;
    authors?: string[] | undefined;
    description?: string | undefined;
    categories?: string[] | undefined;
    rating?: number | undefined;
}>;
export declare const RecommendationResultSchema: z.ZodObject<{
    id: z.ZodString;
    score: z.ZodNumber;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    score: number;
}, {
    id: string;
    title: string;
    score: number;
}>;
export declare const RecommendationExplanationSchema: z.ZodObject<{
    id: z.ZodString;
    score: z.ZodNumber;
    title: z.ZodString;
} & {
    explanation: z.ZodString;
    cluster: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    score: number;
    explanation: string;
    cluster: string;
}, {
    id: string;
    title: string;
    score: number;
    explanation: string;
    cluster: string;
}>;
export declare const TopicClusterSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    items: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    items: string[];
}, {
    id: string;
    name: string;
    items: string[];
}>;
export type Note = z.infer<typeof NoteSchema>;
export type Book = z.infer<typeof BookSchema>;
export type RecommendationResult = z.infer<typeof RecommendationResultSchema>;
export type RecommendationExplanation = z.infer<typeof RecommendationExplanationSchema>;
export type TopicCluster = z.infer<typeof TopicClusterSchema>;
//# sourceMappingURL=contracts.d.ts.map