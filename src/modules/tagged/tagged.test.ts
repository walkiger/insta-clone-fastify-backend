import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
  it("should return a list of tagged posts with a 200 status code", async () => {
    const app = Fastify();

    const mockTagged = [
        {
          id: 1,
          img_url:
            "[https://pixabay.com/de/photos/katze-k%C3%A4tzchen-katzen-tier-9183327/](https://pixabay.com/de/photos/katze-k%C3%A4tzchen-katzen-tier-9183327/)",
          caption: "Tagged 1",
          tagger: "test user 1",
        },
        {
          id: 2,
          img_url:
            "[https://pixabay.com/de/photos/katze-k%C3%A4tzchen-wei%C3%9Fe-katze-9813484/](https://pixabay.com/de/photos/katze-k%C3%A4tzchen-wei%C3%9Fe-katze-9813484/)",
          caption: "Tagged 2",
          tagger: "test user 2",
        },
      ];
  
      // To satisfy TypeScript, our mock must match the full shape of the
      // 'transactions' dependency, including all methods on 'posts'.
      app.decorate("transactions", {
          posts: {
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
          },
          reels: {
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
          },
          tagged: {
            getById: jest.fn(),
            getAll: jest.fn().mockReturnValue(mockTagged),
            create: jest.fn(),
          },
          highlights: {
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
          },
        });
  
      app.register(taggedRoutes);
  
      const response = await app.inject({
        method: "GET",
        url: "/tagged/grid",
      });
  
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockTagged);
    });
  });