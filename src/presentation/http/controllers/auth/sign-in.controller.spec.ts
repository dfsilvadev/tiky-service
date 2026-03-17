import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { mockedUser } from "../../../../shared/mocks/data.mocked";

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
    await request(app.server).post("/api/v1/auth/sign-up").send(mockedUser);

    const response = await request(app.server)
      .post("/api/v1/auth/sign-in")
      .send({
        email: mockedUser.email,
        password: mockedUser.password
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        details: expect.objectContaining({ token: expect.any(String) })
      })
    );
  });
});
