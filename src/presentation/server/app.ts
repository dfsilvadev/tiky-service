import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { accountRoutes, healthRoutes } from "../http/routes";

import { env } from "../../shared/config/env";

export const app = fastify({
  logger: true
});

/**
 * Registering plugins
 */
app.register(cors, {
  origin: env.CORS_ORIGINS
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
});

/**
 * Registering routes
 */
app.register(healthRoutes, {
  prefix: "/api/v1"
});
app.register(accountRoutes, {
  prefix: "/api/v1"
});
