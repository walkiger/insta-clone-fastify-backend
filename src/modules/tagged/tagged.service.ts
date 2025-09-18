import type { FastifyInstance } from "fastify";
import { CreateTaggedDto } from "./tagged.types";

const taggedService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`fetching all tagged posts`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const tagged = fastify.transactions.tagged.getAll();
      return tagged;
    },
    create: async (taggedData: CreateTaggedDto) => {
      fastify.log.info(`Creating a new tagged post`);
      const tagged = await fastify.transactions.tagged.create(taggedData);
      return tagged;
    },
  };
};

export { taggedService };