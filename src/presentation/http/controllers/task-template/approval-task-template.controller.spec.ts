import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

import {
  DUMMY_PASS_VALUE,
  DUMMY_SUGGESTED_TASK_TEMPLATE
} from "../../../../shared/mocks/data.mocked";

import {
  Role,
  TemplateStatus,
  Weight
} from "../../../../generated/prisma/client";

import { SUCCESS_CODES } from "../../../../shared/constants/success.constants";

let app: FastifyInstance;

describe("Approval Task Template Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should approve a task template suggestion", async () => {
    const { token: playerToken, familyId } =
      await createAndAuthenticateUser(app);

    const { title, description, timeLimit } = DUMMY_SUGGESTED_TASK_TEMPLATE;

    const suggestedTaskTemplate = await request(app.server)
      .post("/api/v1/task-templates/suggest")
      .set("Authorization", `Bearer ${playerToken}`)
      .send({ title, description, timeLimit });

    await request(app.server).post("/api/v1/auth/sign-up").send({
      name: "John Doe",
      email: "johndoe-admin@email.com",
      password: DUMMY_PASS_VALUE,
      role: Role.ADMIN,
      familyId
    });

    const authResponse = await request(app.server)
      .post("/api/v1/auth/sign-in")
      .send({
        email: "johndoe-admin@email.com",
        password: DUMMY_PASS_VALUE
      });

    const { details: adminToken } = authResponse.body;

    const response = await request(app.server)
      .patch(
        `/api/v1/task-templates/${suggestedTaskTemplate.body.details.data.id}/approve-suggestion`
      )
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ weight: Weight.BASIC });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("statusCode", 200);
    expect(response.body).toHaveProperty("details");
    expect(response.body.details).toHaveProperty(
      "code",
      SUCCESS_CODES.TASK_TEMPLATE_APPROVED
    );
    expect(response.body.details).toHaveProperty("data");
    expect(response.body.details.data).toHaveProperty("weight", Weight.BASIC);
    expect(response.body.details.data).toHaveProperty(
      "status",
      TemplateStatus.ACTIVE
    );
  });
});
