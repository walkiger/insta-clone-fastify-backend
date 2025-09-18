import { type FastifyInstance, type FastifyPluginAsync } from "fastify";
import { taggedService } from "./tagged.service";
import { CreateTaggedDto, taggedSchema } from "./tagged.types";

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = taggedService(fastify);

  fastify.post<{ Body: CreateTaggedDto }>("/tagged", async (request, reply) => {
    const newTagged = await service.create(request.body);
    return reply.code(201).send(newTagged);
  });

  fastify.get("/tagged/grid", async (request, reply) => {
    const tagged = await service.getAll();

    // Return a 200 Created status code with the new post object
    return reply.code(200).send(tagged);
  });
};

export { taggedRoutes };