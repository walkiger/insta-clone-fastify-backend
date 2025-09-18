import type { FastifyInstance } from "fastify";
import { CreatePostDto } from "./posts.types";

const postsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching posts`);
      const posts = await fastify.transactions.posts.getAll();
      return posts;
    },
    create: async (postData: CreatePostDto) => {
      fastify.log.info(`Creating a new post`);
      const post = await fastify.transactions.posts.create(postData);
      return post;
    },
  };
};

export { postsService };