import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { applicationRoutes } from "../http/routes";

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
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: env.ACCESS_TOKEN_TTL
  }
});

app.register(fastifyCookie);

/**
 * Registering routes
 */
app.register(applicationRoutes, {
  prefix: "/api/v1"
});
