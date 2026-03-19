import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import { CreateFamilyUseCase } from "./create-family.use-case";

import { InMemoryFamilyRepository } from "../../../infrastructure/persistence/in-memory/in-memory.family.repository";

import { IFamilyRepository } from "../../../domain/repositories/family.repository";

import { DUMMY_FAMILY } from "../../../shared/mocks/data.mocked";

let familyRepositoryMocked: IFamilyRepository;
let sut: CreateFamilyUseCase;

describe("Create Family Use Case (Unit)", () => {
  beforeEach(() => {
    familyRepositoryMocked = new InMemoryFamilyRepository();
    sut = new CreateFamilyUseCase(familyRepositoryMocked);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should create a family successfully", async () => {
    const response = await sut.execute(DUMMY_FAMILY);

    expect(response).toMatchObject({
      family: {
        name: DUMMY_FAMILY.name,
        description: DUMMY_FAMILY.description,
        status: "ACTIVE"
      }
    });
  });
});
