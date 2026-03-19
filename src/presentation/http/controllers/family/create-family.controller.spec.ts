import { type FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";
import { DUMMY_FAMILY } from "../../../../shared/mocks/data.mocked";

let app: FastifyInstance;

describe("Create Family Controller (e2e)", () => {
  beforeAll(async () => {
    const appModule = await import("../../../server/app");
    app = appModule.app;

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a family successfully", async () => {
    const response = await request(app.server)
      .post("/api/v1/families")
      .send(DUMMY_FAMILY)
      .expect(HTTP_STATUS_SUCCESS.CREATED);

    expect(response.body).toMatchObject({
      statusCode: HTTP_STATUS_SUCCESS.CREATED,
      details: {
        code: SUCCESS_CODES.RESOURCE_CREATED,
        message: SUCCESS_MESSAGES.RESOURCE_CREATED
      }
    });
  });

  it("should return validation error for missing required fields", async () => {
    const response = await request(app.server)
      .post("/api/v1/families")
      .send({ description: "A family without a name" })
      .expect(400);

    expect(response.body).toMatchObject({
      code: "VALIDATION_ERROR",
      message:
        "We couldn't process your request due to invalid data. Please check your information and try again"
    });
  });

  it("should return validation error for empty name", async () => {
    const response = await request(app.server)
      .post("/api/v1/families")
      .send({ name: "", description: "A family with an empty name" })
      .expect(400);

    expect(response.body).toMatchObject({
      code: "VALIDATION_ERROR",
      message:
        "We couldn't process your request due to invalid data. Please check your information and try again"
    });
  });
});
