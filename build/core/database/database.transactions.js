"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHelpers = void 0;
// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db) => {
    // We use prepared statements for security and performance.
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare("INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"),
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare("INSERT INTO reels (thumbnail_url, video_url, caption, views) VALUES (@thumbnail_url, @video_url, @caption, @views) RETURNING *"),
    };
    const posts = {
        getById: (id) => {
            return statements.getPostById.get(id);
        },
        getAll: () => {
            return statements.getAllPosts.all();
        },
        create: (data) => {
            return statements.createPost.get(data);
        },
    };
    const reels = {
        getById: (id) => {
            return statements.getReelById.get(id);
        },
        getAll: () => {
            return statements.getAllReels.all();
        },
        create: (data) => {
            return statements.createReel.get(data);
        },
    };
    return {
        posts,
        reels
    };
};
exports.createTransactionHelpers = createTransactionHelpers;
