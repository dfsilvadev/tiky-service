import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { DUMMY_TASK_TEMPLATE } from "../../../../shared/mocks/data.mocked";
import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

let app: FastifyInstance;

describe("Get Task Template Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a task template by ID", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/api/v1/task-templates")
      .set("Authorization", `Bearer ${token}`)
      .send(DUMMY_TASK_TEMPLATE);

    const getResponse = await request(app.server)
      .get(`/api/v1/task-templates/${response.body.details.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty("statusCode", 200);
    expect(getResponse.body).toHaveProperty("details");
    expect(getResponse.body.details).toHaveProperty("data");
    expect(getResponse.body.details.data).toHaveProperty(
      "id",
      response.body.details.data.id
    );
  });
});
