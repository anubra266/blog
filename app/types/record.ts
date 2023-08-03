import { z } from 'zod'

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const recordZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  date: z.string(),
  likes: z.number(),
  dislikes: z.number(),
  // ...being a touch lazy here, these could be more strongly typed
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
})

export type RecordDocument = z.infer<typeof recordZ>

export const recordsZ = z.array(recordZ)

export const recordStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().nullable(),
  date: z.string(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
})

export const recordStubsZ = z.array(recordStubZ)

export type RecordStub = z.infer<typeof recordStubZ>
