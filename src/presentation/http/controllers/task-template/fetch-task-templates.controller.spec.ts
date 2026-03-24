import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { SUCCESS_CODES } from "../../../../shared/constants/success.constants";

import { DUMMY_TASK_TEMPLATE } from "../../../../shared/mocks/data.mocked";
import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

let app: FastifyInstance;

describe("Fetch Task Templates Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should fetch task templates successfully", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/api/v1/task-templates")
      .set("Authorization", `Bearer ${token}`)
      .send(DUMMY_TASK_TEMPLATE);

    const fetchResponse = await request(app.server)
      .get("/api/v1/task-templates")
      .set("Authorization", `Bearer ${token}`);

    expect(fetchResponse.status).toBe(200);
    expect(fetchResponse.body).toHaveProperty("statusCode", 200);
    expect(fetchResponse.body).toHaveProperty("details");
    expect(fetchResponse.body.details).toHaveProperty(
      "code",
      SUCCESS_CODES.RESOURCES_RETRIEVED
    );
    expect(fetchResponse.body.details).toHaveProperty("data");
    expect(fetchResponse.body.details.data).toMatchObject(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({
            title: DUMMY_TASK_TEMPLATE.title,
            description: DUMMY_TASK_TEMPLATE.description
          })
        ]),
        meta: expect.objectContaining({
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1
        })
      })
    );
  });
});
