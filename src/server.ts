import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes"
import { highlightsRoutes } from "./modules/highlights/highlights.routes"

const fastify = Fastify({
  logger: true,
});

// Register multipart plugin
fastify.register(multipart);

// Serve static files from ./public
fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/",
});

// Register our database plugin
fastify.register(databasePlugin);
// Register our new posts routes
fastify.register(postsRoutes);
// Register our new reels routes
fastify.register(reelsRoutes);
// Register our new tagged routes
fastify.register(taggedRoutes)
// Register our new highlights routes
fastify.register(highlightsRoutes)

// Declare a default route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

const port = 3000;

fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});