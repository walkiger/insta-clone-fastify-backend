import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";
import { CreateReelDto } from "src/modules/reels/reels.types";
import { CreateTaggedDto } from "src/modules/tagged/tagged.types";
import { CreateHighlightDto } from "src/modules/highlights/highlights.types";

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
  // We use prepared statements for security and performance.
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"),
    getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
    getAllReels: db.prepare("SELECT * FROM reels"),
    createReel: db.prepare(
      "INSERT INTO reels (thumbnail_url, video_url, caption, views) VALUES (@thumbnail_url, @video_url, @caption, @views) RETURNING *",
    ),
    getTaggedById: db.prepare("SELECT * FROM tagged WHERE id = ?"),
    getAllTagged: db.prepare("SELECT * FROM tagged"),
    createTagged: db.prepare(
      "INSERT INTO tagged (img_url, caption, tagger) VALUES (@img_url, @caption, @tagger) RETURNING *"),
    getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    getAllHighlights: db.prepare("SELECT * FROM highlights"),
    createHighlight: db.prepare(
      "INSERT INTO highlights (cover_url, title) VALUES (@cover_url, @title) RETURNING *"),
  };

  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: CreatePostDto) => {
      return statements.createPost.get(data);
    },
  };

  const reels = {
    getById: (id: number) => {
      return statements.getReelById.get(id);
    },
    getAll: () => {
      return statements.getAllReels.all();
    },
    create: (data: CreateReelDto) => {
      return statements.createReel.get(data);
    },
  };

  const tagged = {
    getById: (id: number) => {
      return statements.getTaggedById.get(id);
    },
    getAll: () => {
      return statements.getAllTagged.all();
    },
    create: (data: CreateTaggedDto) => {
      return statements.createTagged.get(data);
    },
  };

  const highlights = {
    getById: (id: number) => {
      return statements.getHighlightById.get(id);
    },
    getAll: () => {
      return statements.getAllHighlights.all();
    },
    create: (data: CreateHighlightDto) => {
      return statements.createHighlight.get(data);
    },
  };

  return {
    posts,
    reels,
    tagged,
    highlights
  };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };