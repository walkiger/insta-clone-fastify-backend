import type { FastifyInstance } from "fastify";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching highlights`);
      const highlights = await fastify.transactions.highlights.getAll();
      return highlights;
    },
    getById: async (id: number) => {
      fastify.log.info(`Fetching highlight by id`);
      const highlight = await fastify.transactions.highlights.getById(id);
      return highlight;
    },
  };
};

export { highlightsService };