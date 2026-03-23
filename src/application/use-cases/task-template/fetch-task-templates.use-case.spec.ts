import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FetchTaskTemplatesUseCase } from "./fetch-task-templates.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";

import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: FetchTaskTemplatesUseCase;

describe("Fetch Task Templates Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new FetchTaskTemplatesUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch task templates with pagination and filtering", async () => {
    const taskTemplateResponse = await taskTemplateRepository.create({
      title: "Test Task Template",
      description: "This is a test task template",
      accountId: "account-1",
      familyId: "family-1",
      baseXp: 50,
      weight: "BASIC",
      recurrenceType: "ONCE",
      isMandatory: false,
      subtasks: []
    });

    const { items, meta } = await sut.execute("family-1", {
      page: 1,
      limit: 10,
      status: "ACTIVE",
      order: "asc"
    });

    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: taskTemplateResponse.id,
          title: taskTemplateResponse.title,
          description: taskTemplateResponse.description,
          accountId: taskTemplateResponse.accountId,
          familyId: taskTemplateResponse.familyId
        })
      ])
    );

    expect(meta).toEqual(
      expect.objectContaining({
        total: 1,
        page: 1,
        limit: 10
      })
    );
  });

  it("should return an empty list if no task templates match the criteria", async () => {
    const { items, meta } = await sut.execute("family-1", {
      page: 1,
      limit: 10,
      status: "ACTIVE",
      order: "asc"
    });

    expect(items).toEqual([]);
    expect(meta).toEqual(
      expect.objectContaining({
        total: 0,
        page: 1,
        limit: 10
      })
    );
  });

  it("should handle pagination correctly", async () => {
    for (let i = 0; i < 15; i++) {
      await taskTemplateRepository.create({
        title: `Test Task Template ${i + 1}`,
        description: "This is a test task template",
        accountId: "account-1",
        familyId: "family-1",
        baseXp: 50,
        weight: "BASIC",
        recurrenceType: "ONCE",
        isMandatory: false,
        subtasks: []
      });
    }

    const { items, meta } = await sut.execute("family-1", {
      page: 2,
      limit: 10,
      status: "ACTIVE",
      order: "asc"
    });

    expect(items).toHaveLength(5);
    expect(meta).toEqual(
      expect.objectContaining({
        total: 15,
        page: 2,
        limit: 10
      })
    );
  });
});
