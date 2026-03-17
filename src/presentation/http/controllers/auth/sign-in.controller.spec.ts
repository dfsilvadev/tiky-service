import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { DUMMY_ACCOUNT } from "../../../../shared/mocks/data.mocked";

let app: FastifyInstance;

describe("Sign In Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should sign in with valid credentials", async () => {
    await request(app.server).post("/api/v1/auth/sign-up").send(DUMMY_ACCOUNT);

    const response = await request(app.server)
      .post("/api/v1/auth/sign-in")
      .send({
        email: DUMMY_ACCOUNT.email,
        password: DUMMY_ACCOUNT.password
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        details: expect.objectContaining({ token: expect.any(String) })
      })
    );
  });
});
