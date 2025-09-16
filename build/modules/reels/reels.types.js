"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsSchema = exports.reelSchema = exports.createReelDtoSchema = void 0;
const zod_1 = require("zod");
// First, we define the zod schemas
const createReelDtoSchema = zod_1.z.object({
    video_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable().optional(), // Caption can be a string, null, or undefined
});
exports.createReelDtoSchema = createReelDtoSchema;
const reelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    thumbnail_url: zod_1.z.string().url(),
    video_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable(),
    views: zod_1.z.number(),
});
exports.reelSchema = reelSchema;
// This will be useful for validating the response from the `GET /reels/grid` endpoint.
const reelsSchema = zod_1.z.array(reelSchema);
exports.reelsSchema = reelsSchema;
