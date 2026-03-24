import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Weight } from "../../../../generated/prisma/client";

import { getXpByWeight } from "../../../../shared/utils/get-xp-by-weight";

import {
  DUMMY_ACCOUNT,
  DUMMY_CREDENTIALS,
  DUMMY_FAMILY,
  DUMMY_TASK_TEMPLATE
} from "../../../../shared/mocks/data.mocked";

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
    const familyResponse = await request(app.server)
      .post("/api/v1/families")
      .send(DUMMY_FAMILY);

    const {
      family: { id: familyId }
    } = familyResponse.body.details.data;

    await request(app.server)
      .post("/api/v1/auth/sign-up")
      .send({ ...DUMMY_ACCOUNT, familyId, role: "ADMIN" });

    const authResponse = await request(app.server)
      .post("/api/v1/auth/sign-in")
      .send(DUMMY_CREDENTIALS);

    const {
      details: { token }
    } = authResponse.body;

    const response = await request(app.server)
      .post("/api/v1/task-templates")
      .set("Authorization", `Bearer ${token}`)
      .send(DUMMY_TASK_TEMPLATE);

    const getResponse = await request(app.server)
      .get(`/api/v1/task-templates/${response.body.details.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    const updatedResponse = await request(app.server)
      .put(
        `/api/v1/task-templates/${getResponse.body.details.data.taskTemplate.id}`
      )
      .set("Authorization", `Bearer ${token}`)
      .send({ weight: Weight.EPIC });

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.details.data.weight).toBe(Weight.EPIC);
    expect(updatedResponse.body.details.data.baseXp).toBe(
      getXpByWeight(Weight.EPIC)
    );
  });
});
