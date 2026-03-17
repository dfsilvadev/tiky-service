import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SignUpUseCase } from "./sign-up.use-case";

import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";
import { BcryptPasswordHasherService } from "../../../infrastructure/security/bcrypt-password-hasher.service";

import { AccountAlreadyExistsError } from "../../../domain/errors";

import { DUMMY_ACCOUNT, DUMMY_HASH } from "../../../shared/mocks/data.mocked";

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
    const response = await sut.execute(DUMMY_ACCOUNT);

    expect(response).toMatchObject({
      account: {
        name: DUMMY_ACCOUNT.name,
        email: DUMMY_ACCOUNT.email,
        role: DUMMY_ACCOUNT.role
      }
    });
  });

  it("should not be able to sign up with an existing email", async () => {
    await sut.execute(DUMMY_ACCOUNT);

    await expect(sut.execute(DUMMY_ACCOUNT)).rejects.toBeInstanceOf(
      AccountAlreadyExistsError
    );
    await expect(sut.execute(DUMMY_ACCOUNT)).rejects.toThrowError(
      "An account with email johndoe@example.com already exists"
    );
  });

  it("should hash the password before saving the account", async () => {
    const hashSpy = vi.spyOn(passwordHasherService, "hash");

    await sut.execute(DUMMY_ACCOUNT);
    expect(hashSpy).toHaveBeenCalledWith(DUMMY_ACCOUNT.password);
  });

  it("should save the account with the hashed password", async () => {
    const hashSpy = vi.spyOn(passwordHasherService, "hash");
    const createSpy = vi.spyOn(accountRepositoryMocked, "create");
    hashSpy.mockResolvedValue(DUMMY_HASH);

    await sut.execute(DUMMY_ACCOUNT);

    expect(hashSpy).toHaveBeenCalledWith(DUMMY_ACCOUNT.password);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: DUMMY_ACCOUNT.name,
        email: DUMMY_ACCOUNT.email,
        password: DUMMY_HASH,
        role: DUMMY_ACCOUNT.role
      })
    );
  });
});
