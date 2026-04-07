import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Role, TemplateStatus } from "../../../../generated/prisma/client";

import { prismaClient } from "../../../../infrastructure/persistence/prisma/prisma-client";

import {
  DUMMY_PASS_VALUE,
  DUMMY_TASK_TEMPLATE
} from "../../../../shared/mocks/data.mocked";
import { getXpByWeight } from "../../../../shared/utils/get-xp-by-weight";
import { createAndAuthenticateUser } from "../../../../shared/utils/test/create-and-authenticate-user";

let app: FastifyInstance;

describe("Delete Task Template Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a task template", async () => {
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

    const deletedResponse = await request(app.server)
      .delete(`/api/v1/task-templates/${response.body.details.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deletedResponse.status).toBe(200);
    expect(deletedResponse.body).toEqual(
      expect.objectContaining({
        statusCode: 200,
        details: expect.objectContaining({
          code: "RESOURCE_DELETED",
          message: "The resource has been deleted successfully",
          data: expect.objectContaining({
            id: response.body.details.data.id,
            title: DUMMY_TASK_TEMPLATE.title,
            description: DUMMY_TASK_TEMPLATE.description,
            weight: DUMMY_TASK_TEMPLATE.weight,
            baseXp: getXpByWeight(DUMMY_TASK_TEMPLATE.weight),
            familyId,
            status: TemplateStatus.ARCHIVED,
            deletedAt: expect.any(String)
          })
        })
      })
    );
  });
});
