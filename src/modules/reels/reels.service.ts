import type { FastifyInstance } from "fastify";
import { CreateReelDto } from "./reels.types";

const reelsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`fetching all reels`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const reel = fastify.transactions.reels.getAll();
      return reel;
    },
  };
};

export { reelsService };