import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { prismaClient } from "../../../../infrastructure/persistence/prisma/prisma-client";

import {
  DUMMY_ACCOUNT,
  DUMMY_FAMILY
} from "../../../../shared/mocks/data.mocked";

let app: FastifyInstance;

describe("Refresh Token Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should refresh token with valid refresh token", async () => {
    await request(app.server).post("/api/v1/families").send(DUMMY_FAMILY);

    const family = await prismaClient.family.findFirstOrThrow();

    await request(app.server)
      .post("/api/v1/auth/sign-up")
      .send({ ...DUMMY_ACCOUNT, familyId: family.id });

    const signInResponse = await request(app.server)
      .post("/api/v1/auth/sign-in")
      .send({
        email: DUMMY_ACCOUNT.email,
        password: DUMMY_ACCOUNT.password
      });

    const cookies = signInResponse.headers["set-cookie"];

    const refreshResponse = await request(app.server)
      .post("/api/v1/auth/refresh-token")
      .set("Cookie", cookies)
      .send();

    expect(refreshResponse.statusCode).toEqual(200);
    expect(refreshResponse.body).toEqual(
      expect.objectContaining({
        details: expect.objectContaining({ token: expect.any(String) })
      })
    );
  });
});
