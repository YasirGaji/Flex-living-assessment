import { FastifyInstance } from "fastify";

import { reviewRoutes } from "./review-routes";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(reviewRoutes, { prefix: "/api/reviews" }); 



  fastify.get("/health", async (request, reply) => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  fastify.get("/", async (request, reply) => {
    return {
      message: "Flex Living API Server (Reviews Assessment)",
      version: "1.0.0",
      endpoints: {
        reviews: "/api/reviews",
        health: "/health",
      },
    };
  });
}