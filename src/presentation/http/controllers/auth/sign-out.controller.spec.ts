import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DUMMY_ACCOUNT } from "../../../../shared/mocks/data.mocked";

let app: FastifyInstance;

describe("Sign Out Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should log out the user and invalidate the refresh token", async () => {
    await request(app.server).post("/api/v1/auth/sign-up").send(DUMMY_ACCOUNT);

    const signInResponse = await request(app.server)
      .post("/api/v1/auth/sign-in")
      .send({
        email: DUMMY_ACCOUNT.email,
        password: DUMMY_ACCOUNT.password
      });

    const cookies = signInResponse.headers["set-cookie"];

    const signOutResponse = await request(app.server)
      .post("/api/v1/auth/sign-out")
      .set("Cookie", cookies)
      .send();

    expect(signOutResponse.statusCode).toEqual(204);
  });
});
