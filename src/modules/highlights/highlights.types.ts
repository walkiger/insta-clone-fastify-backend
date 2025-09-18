import { z } from "zod";

// First, we define the zod schemas
const createHighlightDtoSchema = z.object({
  cover_url: z.string().url(),
  title: z.string(), // Caption can be a string, null, or undefined
});

const highlightSchema = z.object({
  id: z.number(),
  cover_url: z.string().url(),
  title: z.string(),
  created_at: z.string(), // SQLite returns DATETIME as a string by default
});

// This will be useful for validating the response from the `GET /posts` endpoint.
const highlightsSchema = z.array(highlightSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateHighlightDto = z.infer<typeof createHighlightDtoSchema>;
type Highlight = z.infer<typeof highlightSchema>;

export { createHighlightDtoSchema, highlightSchema, highlightsSchema, CreateHighlightDto, Highlight };