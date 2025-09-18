import Fastify from "fastify";
import { postsRoutes } from "./posts.routes";

describe("POST /posts", () => {
  it("should create a new post and return it with a 201 status code", async () => {
    const app = Fastify();

    const newPostPayload = {
      img_url: "http://example.com/new-image.jpg",
      caption: "A brand new post from our test!",
    };

    const createdPost = { ...newPostPayload, id: 1 };
    //const createdReel = { ...newReelPayload, id: 1 };

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn().mockReturnValue(createdPost),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      tagged: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      highlights: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "POST",
      url: "/posts",
      payload: newPostPayload,
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(createdPost);
  });
});

describe("GET /posts/grid", () => {  
  it("should return a list of posts with a 200 status code", async () => {
    const app = Fastify();
    
    const mockPosts = [
      {
        id: 1,
        img_url:
          "https://pixabay.com/de/photos/katze-k%C3%A4tzchen-katzen-tier-9183327/",
        caption: "Post 1",
        created_at: "2025-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        img_url:
          "https://pixabay.com/de/photos/katze-k%C3%A4tzchen-wei%C3%9Fe-katze-9813484/",
        caption: "Post 2",
        created_at: "2025-01-01T00:00:00.000Z",
      },
    ];

    // To satisfy TypeScript, our mock must match the full shape of the
    // 'transactions' dependency, including all methods on 'posts'.
    app.decorate("transactions", {
        posts: {
          getById: jest.fn(),
          getAll: jest.fn().mockReturnValue(mockPosts),
          create: jest.fn(),
        },
        reels: {
          getById: jest.fn(),
          getAll: jest.fn(),
          create: jest.fn(),
        },
        tagged: {
          getById: jest.fn(),
          getAll: jest.fn(),
          create: jest.fn(),
        },
        highlights: {
          getById: jest.fn(),
          getAll: jest.fn(),
          create: jest.fn(),
        },
      });

    app.register(postsRoutes);
    //await app.ready(); // ensure all plugins/routes are registered
    //console.log(app.printRoutes());

    const response = await app.inject({
      method: "GET",
      url: "/posts/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockPosts);
  });
});