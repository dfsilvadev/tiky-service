import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CreateTaskTemplateUseCase } from "./create-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";

import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import {
  DUMMY_ACCOUNT,
  DUMMY_TASK_TEMPLATE
} from "../../../shared/mocks/data.mocked";

import { ECONOMY_RULES } from "../../../domain/constants/economy.constants";
import { IAccountRepository } from "../../../domain/repositories/account.repository";
import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";

let taskTemplateRepository: ITaskTemplateRepository;
let accountRepository: IAccountRepository;
let sut: CreateTaskTemplateUseCase;

describe("Create Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    accountRepository = new InMemoryAccountRepository();
    sut = new CreateTaskTemplateUseCase(
      taskTemplateRepository,
      accountRepository
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new task template with valid data", async () => {
    const createdAccount = await accountRepository.create(DUMMY_ACCOUNT);
    const templateInput = {
      ...DUMMY_TASK_TEMPLATE,
      playerId: createdAccount.id,
      familyId: createdAccount.familyId
    };
    const { createdTaskTemplate } = await sut.execute(templateInput);

    expect(createdTaskTemplate).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        title: DUMMY_TASK_TEMPLATE.title,
        description: DUMMY_TASK_TEMPLATE.description,
        accountId: DUMMY_TASK_TEMPLATE.accountId,
        familyId: createdAccount.familyId
      })
    );
  });

  it("should calculate baseXp based on the task weight", async () => {
    const createdAccount = await accountRepository.create(DUMMY_ACCOUNT);
    const templateInput = {
      ...DUMMY_TASK_TEMPLATE,
      playerId: createdAccount.id,
      familyId: createdAccount.familyId
    };
    const { createdTaskTemplate } = await sut.execute(templateInput);

    expect(createdTaskTemplate.baseXp).toBe(
      ECONOMY_RULES.TASK_WEIGHT_XP[DUMMY_TASK_TEMPLATE.weight]
    );
  });
});
