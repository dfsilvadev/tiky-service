import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { TemplateStatus, Weight } from "../../../../generated/prisma/client";

import { HTTP_STATUS_SUCCESS } from "../../../../shared/constants/success.constants";
import { DUMMY_SUGGESTED_TASK_TEMPLATE } from "../../../../shared/mocks/data.mocked";
import { getXpByWeight } from "../../../../shared/utils/get-xp-by-weight";
import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

let app: FastifyInstance;

describe("Suggest Task Template Controller (e2e)", () => {
  beforeAll(async () => {
    const moduleApp = await import("../../../server/app");
    app = moduleApp.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should suggest task templates based on the provided title, description, and time limit", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const { title, description, timeLimit } = DUMMY_SUGGESTED_TASK_TEMPLATE;

    const response = await request(app.server)
      .post("/api/v1/task-templates/suggest")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, description, timeLimit });

    expect(response.status).toBe(HTTP_STATUS_SUCCESS.CREATED);
    expect(response.body).toHaveProperty(
      "statusCode",
      HTTP_STATUS_SUCCESS.CREATED
    );
    expect(response.body).toHaveProperty("details");
    expect(response.body.details).toHaveProperty("code", "RESOURCE_CREATED");
    expect(response.body.details).toHaveProperty(
      "message",
      "The resource has been created successfully"
    );
    expect(response.body.details).toHaveProperty("data");
    expect(response.body.details.data).toHaveProperty(
      "weight",
      Weight.SUGGESTED
    );
    expect(response.body.details.data).toHaveProperty(
      "status",
      TemplateStatus.PENDING_APPROVAL
    );
    expect(response.body.details.data).toHaveProperty(
      "baseXp",
      getXpByWeight(Weight.SUGGESTED)
    );
  });
});
