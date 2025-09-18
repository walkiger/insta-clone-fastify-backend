import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("GET /highlights", () => {
  it("should return a list of highlights with a 200 status code", async () => {
    const app = Fastify();

    const mockHighlights = [
      {
        id: 1,
        cover_url: "https://pixabay.com/de/photos/katze-k%C3%A4tzchen-katzen-tier-9183327/",
        title: "Highlight 1",
        created_at: "2025-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        cover_url: "https://pixabay.com/de/photos/katze-k%C3%A4tzchen-wei%C3%9Fe-katze-9813484/",
        title: "Highlight 2",
        created_at: "2025-01-02T00:00:00.000Z",
      },
    ];

    app.decorate("transactions", {
      posts: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      reels: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      tagged: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      highlights: {
        getById: jest.fn(),
        getAll: jest.fn().mockReturnValue(mockHighlights),
        create: jest.fn(),
      },
    });

    app.register(highlightsRoutes);
    await app.ready();

    const response = await app.inject({
      method: "GET",
      url: "/highlights",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlights);
  });
});

describe("GET /highlights/:id", () => {
  it("should return a single highlight by id with a 200 status code", async () => {
    const app = Fastify();

    const highlight = {
      id: 42,
      cover_url: "https://pixabay.com/de/photos/katze-k%C3%A4tzchen-wei%C3%9Fe-katze-9813484/",
      title: "Answer Highlight",
      created_at: "2025-01-03T00:00:00.000Z",
    };

    app.decorate("transactions", {
      posts: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      reels: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      tagged: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn().mockReturnValue(highlight),
        create: jest.fn(),
      },
    });

    app.register(highlightsRoutes);
    await app.ready();

    const response = await app.inject({
      method: "GET",
      url: "/highlights/42",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(highlight);
  });
});