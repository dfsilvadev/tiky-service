import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

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
    const response = await request(app.server)
      .post("/api/v1/auth/sign-up")
      .send({
        name: "John Doe",
        email: "johndoe@email.com",
        password: "password123"
      });

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
