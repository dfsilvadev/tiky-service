import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Role } from "../../../../generated/prisma/client";

import { prismaClient } from "../../../../infrastructure/persistence/prisma/prisma-client";

import { HTTP_STATUS_SUCCESS } from "../../../../shared/constants/success.constants";
import {
  DUMMY_PASS_VALUE,
  DUMMY_TASK_TEMPLATE
} from "../../../../shared/mocks/data.mocked";
import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

let app: FastifyInstance;

describe("Create Task Template Controller (e2e)", () => {
  beforeAll(async () => {
    const moduleApp = await import("../../../server/app");
    app = moduleApp.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new task template", async () => {
    const { token, familyId } = await createAndAuthenticateUser(app, true);

    await request(app.server).post("/api/v1/auth/sign-up").send({
      name: "Joana Doe",
      email: "joanadoe@email.com",
      password: DUMMY_PASS_VALUE,
      role: Role.PLAYER,
      familyId
    });

    const playerAccount = await prismaClient.account.findFirstOrThrow({
      where: { email: "joanadoe@email.com" }
    });

    const response = await request(app.server)
      .post("/api/v1/task-templates")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...DUMMY_TASK_TEMPLATE,
        playerId: playerAccount.id,
        familyId
      });

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
    expect(response.body.details.data).toHaveProperty("id");
    expect(response.body.details.data).toHaveProperty(
      "title",
      DUMMY_TASK_TEMPLATE.title
    );
  });
});
