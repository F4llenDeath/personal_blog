import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      lang: z.union([z.literal('en'), z.literal('zh')]).optional(),
    }),
})

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    href: z.string().url(),
    icon: z.string().optional(),
    published: z.coerce.date(),
    journal: z.string().optional(),
  }),
})

const albums = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      lang: z.union([z.literal('en'), z.literal('zh')]).optional(),
      title: z.string(),
      description: z.string().optional(),
      cover: image(),
    }),
})

export const collections = {
  blog,
  publications,
  albums,
}
