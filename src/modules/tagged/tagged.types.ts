import { z } from "zod";

// First, we define the zod schemas
const createTaggedDtoSchema = z.object({
  image_url: z.string().url(),
  caption: z.string().nullable().optional(), // Caption can be a string, null, or undefined
  tagger: z.string(),
});

const taggedSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  tagger: z.string(),
});

// This will be useful for validating the response from the `GET /reels/grid` endpoint.
const taggedsSchema = z.array(taggedSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateTaggedDto = z.infer<typeof createTaggedDtoSchema>;
type Tagged = z.infer<typeof taggedSchema>;

export { createTaggedDtoSchema, taggedSchema, taggedsSchema, CreateTaggedDto, Tagged };