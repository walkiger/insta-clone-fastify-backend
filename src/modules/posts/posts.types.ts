import { z } from "zod";

// Accept either absolute URL or relative upload path like /uploads/...
const imageUrlSchema = z.union([
  z.string().url(),
  z.string().regex(/^\/(uploads|images)\/[^\s]+$/, {
    message: "Expected relative path starting with /uploads or /images",
  }),
]);

// First, we define the zod schemas
const createPostDtoSchema = z.object({
  img_url: imageUrlSchema,
  caption: z.string().nullable().optional(), // Caption can be a string, null, or undefined
});

const postSchema = z.object({
  id: z.number(),
  img_url: imageUrlSchema,
  caption: z.string().nullable(),
  created_at: z.string(), // SQLite returns DATETIME as a string by default
});

// This will be useful for validating the response from the `GET /posts` endpoint.
const postsSchema = z.array(postSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreatePostDto = z.infer<typeof createPostDtoSchema>;
type Post = z.infer<typeof postSchema>;

export { createPostDtoSchema, postSchema, postsSchema, CreatePostDto, Post };