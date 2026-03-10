import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { healthRoutes } from "../http/routes";

import { env } from "../../shared/config/env";

export const app = fastify({
  logger: true
});

app.register(cors, {
  origin: env.CORS_ORIGINS
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
});

app.register(healthRoutes, {
  prefix: "/api/v1"
});
