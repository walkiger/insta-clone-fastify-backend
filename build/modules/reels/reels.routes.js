"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsRoutes = void 0;
const reels_service_1 = require("./reels.service");
const reelsRoutes = async (fastify) => {
    const service = (0, reels_service_1.reelsService)(fastify);
    fastify.post("/reels", async (request, reply) => {
        const newReel = await service.create(request.body);
        // Return a 201 Created status code with the new post object
        return reply.code(201).send(newReel);
    });
};
exports.reelsRoutes = reelsRoutes;
