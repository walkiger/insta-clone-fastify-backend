"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsService = void 0;
const reelsService = (fastify) => {
    return {
        create: async (reelsData) => {
            fastify.log.info(`Creating a new reel`);
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const reel = fastify.transactions.reels.create(reelsData);
            return reel;
        },
    };
};
exports.reelsService = reelsService;
