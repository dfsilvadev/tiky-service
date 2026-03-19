import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prismaClient } from "../../../../infrastructure/persistence/prisma/prisma-client";
import {
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";
import {
  DUMMY_ACCOUNT,
  DUMMY_FAMILY
} from "../../../../shared/mocks/data.mocked";

let app: FastifyInstance;

describe("Sign Up Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new account", async () => {
    await request(app.server).post("/api/v1/families").send(DUMMY_FAMILY);

    const family = await prismaClient.family.findFirstOrThrow({
      where: { name: DUMMY_FAMILY.name }
    });

    const response = await request(app.server)
      .post("/api/v1/auth/sign-up")
      .send({ ...DUMMY_ACCOUNT, familyId: family.id });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        details: {
          code: SUCCESS_CODES.ACCOUNT_CREATED,
          message: SUCCESS_MESSAGES.ACCOUNT_CREATED
        }
      })
    );
  });
});
