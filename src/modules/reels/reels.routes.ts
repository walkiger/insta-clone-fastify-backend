import { type FastifyInstance, type FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.get("/reels/grid", async (request, reply) => {
    const reels = await service.getAll();

    // Return a 200 Created status code with the new post object
    return reply.code(200).send(reels);
  });
};

export { reelsRoutes };