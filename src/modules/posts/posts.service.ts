import type { FastifyInstance } from "fastify";
import { fileStorageService } from "../../common/file-storage.service";

type CreatePostServiceArgs = {
  caption: string;
  imageFile?: { buffer: Buffer; filename: string };
  img_url?: string;
};

const postsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching posts`);
      const posts = await fastify.transactions.posts.getAll();
      return posts;
    },
    create: async (data: CreatePostServiceArgs) => {
      fastify.log.info(`Creating a new post`);

      let img_url = data.img_url ?? data.caption; // fallback/placeholder if no image
      if (data.imageFile) {
        img_url = await fileStorageService.saveImage(
          data.imageFile.buffer,
          data.imageFile.filename,
        );
      }

      const post = await fastify.transactions.posts.create({
        img_url,
        caption: data.caption,
      });
      return post;
    },
  };
};

export { postsService };