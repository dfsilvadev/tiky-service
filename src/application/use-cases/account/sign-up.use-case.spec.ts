import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SignUpUseCase } from "./sign-up.use-case";

import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";
import { BcryptPasswordHasherService } from "../../../infrastructure/security/bcrypt-password-hasher.service";

import { AccountAlreadyExistsError } from "../../../domain/errors";

import {
  mockAccount,
  mockHashedPassword
} from "../../../shared/mocks/data.mocked";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(async () => "mocked-hash"),
    compare: vi.fn(async () => true)
  }
}));

let accountRepositoryMocked: InMemoryAccountRepository;
let passwordHasherService: BcryptPasswordHasherService;
let sut: SignUpUseCase;

describe("Sing up Use Case (Unit)", () => {
  beforeEach(() => {
    accountRepositoryMocked = new InMemoryAccountRepository();
    passwordHasherService = new BcryptPasswordHasherService(10);
    sut = new SignUpUseCase(accountRepositoryMocked, passwordHasherService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to sign up", async () => {
    const response = await sut.execute(mockAccount);

    expect(response).toMatchObject({
      account: {
        name: mockAccount.name,
        email: mockAccount.email,
        role: mockAccount.role
      }
    });
  });

  it("should not be able to sign up with an existing email", async () => {
    await sut.execute(mockAccount);

    await expect(sut.execute(mockAccount)).rejects.toBeInstanceOf(
      AccountAlreadyExistsError
    );
    await expect(sut.execute(mockAccount)).rejects.toThrowError(
      "An account with email johndoe@example.com already exists"
    );
  });

  it("should hash the password before saving the account", async () => {
    const hashSpy = vi.spyOn(passwordHasherService, "hash");

    await sut.execute(mockAccount);
    expect(hashSpy).toHaveBeenCalledWith(mockAccount.password);
  });

  it("should save the account with the hashed password", async () => {
    const hashSpy = vi.spyOn(passwordHasherService, "hash");
    const createSpy = vi.spyOn(accountRepositoryMocked, "create");
    hashSpy.mockResolvedValue(mockHashedPassword);

    await sut.execute(mockAccount);

    expect(hashSpy).toHaveBeenCalledWith(mockAccount.password);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockAccount.name,
        email: mockAccount.email,
        password: mockHashedPassword,
        role: mockAccount.role
      })
    );
  });
});
