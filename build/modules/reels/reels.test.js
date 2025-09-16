"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const reels_routes_1 = require("./reels.routes");
describe("GET /reels/grid", () => {
    it("should return a list of reels with a 200 status code", async () => {
        const app = (0, fastify_1.default)();
        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        };
        const newReelPayload = {
            video_url: "http://example.com/new-video.mp4",
            caption: "A brand new reel from our test!",
        };
        const createdPost = { ...newPostPayload, id: 1 };
        const createdReel = { ...newReelPayload, id: 1 };
        const mockReels = [
            {
                id: 1,
                video_url: "[http://example.com/video1.mp4](http://example.com/video1.mp4)",
                thumbnail_url: "[http://example.com/thumb1.png](http://example.com/thumb1.png)",
                caption: "Reel 1",
                views: 100,
            },
            {
                id: 2,
                video_url: "[http://example.com/video2.mp4](http://example.com/video2.mp4)",
                thumbnail_url: "[http://example.com/thumb2.png](http://example.com/thumb2.png)",
                caption: "Reel 2",
                views: 200,
            },
        ];
        // To satisfy TypeScript, our mock must match the full shape of the
        // 'transactions' dependency, including all methods on 'posts'.
        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
            reels: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdReel),
            },
        });
        app.register(reels_routes_1.reelsRoutes);
        const response = await app.inject({
            method: "GET",
            url: "/reels/grid",
        });
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.payload)).toEqual(mockReels);
    });
});
