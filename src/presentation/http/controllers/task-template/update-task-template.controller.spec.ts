import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Weight } from "../../../../generated/prisma/client";

import { getXpByWeight } from "../../../../shared/utils/get-xp-by-weight";

import { DUMMY_TASK_TEMPLATE } from "../../../../shared/mocks/data.mocked";
import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

let app: FastifyInstance;

describe("Update Task Template Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a task template", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/api/v1/task-templates")
      .set("Authorization", `Bearer ${token}`)
      .send(DUMMY_TASK_TEMPLATE);

    const getResponse = await request(app.server)
      .get(`/api/v1/task-templates/${response.body.details.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    const updatedResponse = await request(app.server)
      .put(`/api/v1/task-templates/${getResponse.body.details.data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ weight: Weight.EPIC });

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.details.data.weight).toBe(Weight.EPIC);
    expect(updatedResponse.body.details.data.baseXp).toBe(
      getXpByWeight(Weight.EPIC)
    );
  });
});
