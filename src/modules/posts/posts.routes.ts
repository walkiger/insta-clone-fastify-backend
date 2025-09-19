import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { postsService } from "./posts.service";
import { postsSchema } from "./posts.types";
import { z } from "zod";

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = postsService(fastify);

  fastify.get("/posts/grid", async (request, reply) => {
    const posts = await service.getAll();
    // Optionally validate response shape
    const data = postsSchema.parse(posts);
    return reply.code(200).send(data);
  });

  const createPostSchema = z.object({
    caption: z.string().min(1, "Caption cannot be empty.").optional(),
  });
  const createPostJsonSchema = z.object({
    img_url: z.union([
      z.string().url(),
      z.string().regex(/^\/(uploads|images)\/[^\s]+$/),
    ]),
    caption: z.string(),
  });

  fastify.post("/posts", async (request, reply) => {
    const isMultipart = typeof (request as any).isMultipart === "function"
      ? (request as any).isMultipart()
      : false;

    if (!isMultipart) {
      try {
        const parsed = createPostJsonSchema.parse(request.body as any);
        const newPost = await service.create({
          caption: parsed.caption,
          img_url: parsed.img_url,
        });
        return reply.code(201).send(newPost);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply
            .code(400)
            .send({ message: "Validation failed", errors: error.errors });
        }
        fastify.log.error(error);
        return reply.code(500).send({ message: "Failed to create post" });
      }
    }

    const parts = (request as any).parts();

    let caption: string | undefined;
    let imageFile: { buffer: Buffer; filename: string } | undefined;

    for await (const part of parts) {
      if (part.type === "field") {
        if (part.fieldname === "caption") {
          caption = part.value as string;
        }
      } else if (part.type === "file") {
        const buffers: Buffer[] = [];
        for await (const chunk of part.file) {
          buffers.push(chunk as Buffer);
        }
        imageFile = {
          buffer: Buffer.concat(buffers),
          filename: part.filename,
        };
      }
    }

    if (!imageFile && !caption) {
      return reply
        .code(400)
        .send({ message: "Either image or caption is required." });
    }

    try {
      if (caption) {
        createPostSchema.pick({ caption: true }).parse({ caption });
      }

      const newPost = await service.create({
        caption: caption || "",
        imageFile,
      });

      return reply.code(201).send(newPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .code(400)
          .send({ message: "Validation failed", errors: error.errors });
      }
      fastify.log.error(error);
      return reply.code(500).send({ message: "Failed to create post" });
    }
  });
};

export { postsRoutes };