import { z } from 'zod';

export const NoteSourceSchema = z.enum(['zenelf', 'obsidian', 'other']);

export const NoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  links: z.array(z.string()).default([]),
  path: z.string().optional(),
  source: NoteSourceSchema.default('other'),
  updatedAt: z.string().datetime().default(new Date().toISOString())
});

export const BookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  authors: z.array(z.string()).default([]),
  description: z.string().default(''),
  categories: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).default(0)
});

export const RecommendationResultSchema = z.object({
  id: z.string().min(1),
  score: z.number(),
  title: z.string().min(1)
});

export const RecommendationExplanationSchema = RecommendationResultSchema.extend({
  explanation: z.string(),
  cluster: z.string()
});

export const TopicClusterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  items: z.array(z.string())
});

export type Note = z.infer<typeof NoteSchema>;
export type Book = z.infer<typeof BookSchema>;
export type RecommendationResult = z.infer<typeof RecommendationResultSchema>;
export type RecommendationExplanation = z.infer<typeof RecommendationExplanationSchema>;
export type TopicCluster = z.infer<typeof TopicClusterSchema>;
