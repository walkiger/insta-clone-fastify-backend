import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { highlightsService } from "./highlights.service";
import { highlightsSchema, highlightSchema } from "./highlights.types";

const highlightsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = highlightsService(fastify);

  fastify.get("/highlights", async (request, reply) => {
    const highlights = await service.getAll();
    const data = highlightsSchema.parse(highlights);
    return reply.code(200).send(data);
  });

  fastify.get<{ Params: { id: string } }>("/highlights/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const highlight = await service.getById(id);
    const data = highlightSchema.parse(highlight);
    return reply.code(200).send(data);
  });
};

export { highlightsRoutes };