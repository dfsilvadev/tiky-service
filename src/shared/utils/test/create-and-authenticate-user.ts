import { type FastifyInstance } from "fastify";
import request from "supertest";

import { Role } from "../../../generated/prisma/client";

import {
  DUMMY_ACCOUNT,
  DUMMY_CREDENTIALS,
  DUMMY_FAMILY
} from "../../mocks/data.mocked";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  const familyResponse = await request(app.server)
    .post("/api/v1/families")
    .send(DUMMY_FAMILY);

  const { id: familyId } = familyResponse.body.details.data;

  await request(app.server)
    .post("/api/v1/auth/sign-up")
    .send({
      ...DUMMY_ACCOUNT,
      familyId,
      role: isAdmin ? Role.ADMIN : Role.PLAYER
    });

  const authResponse = await request(app.server)
    .post("/api/v1/auth/sign-in")
    .send(DUMMY_CREDENTIALS);

  const { details: token } = authResponse.body;

  return { token, familyId, DUMMY_ACCOUNT, DUMMY_FAMILY };
}
