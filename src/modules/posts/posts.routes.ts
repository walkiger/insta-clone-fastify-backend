import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { postsService } from "./posts.service";
import { CreatePostDto, postsSchema } from "./posts.types";

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = postsService(fastify);

  fastify.get("/posts/grid", async (request, reply) => {
    const posts = await service.getAll();
    // Optionally validate response shape
    const data = postsSchema.parse(posts);
    return reply.code(200).send(data);
  });

  fastify.post<{ Body: CreatePostDto }>("/posts", async (request, reply) => {
    const newPost = await service.create(request.body);
    return reply.code(201).send(newPost);
  });
};

export { postsRoutes };