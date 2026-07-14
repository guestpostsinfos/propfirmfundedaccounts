import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    category: z.enum(['best', 'reviews', 'compare', 'guides', 'news']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // One-sentence direct answer to the title query — rendered at the top of
    // the article and used by AI engines / featured snippets.
    directAnswer: z.string().optional(),
    takeaways: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    // For reviews only: powers the review box + Review schema.
    review: z
      .object({
        firm: z.string(),
        rating: z.number().min(0).max(5),
        founded: z.string(),
        bestFor: z.string(),
        pros: z.array(z.string()),
        cons: z.array(z.string()),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
