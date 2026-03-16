import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SignUpUseCase } from "./sign-up.use-case";

import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";
import { BcryptPasswordHasherService } from "../../../infrastructure/security/bcrypt-password-hasher.service";

import { AccountAlreadyExistsError } from "../../../domain/errors";

import {
  mockedHashedPassword,
  mockedUser
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
    const response = await sut.execute(mockedUser);

    expect(response).toMatchObject({
      account: {
        name: mockedUser.name,
        email: mockedUser.email,
        role: mockedUser.role
      }
    });
  });

  it("should not be able to sign up with an existing email", async () => {
    await sut.execute(mockedUser);

    await expect(sut.execute(mockedUser)).rejects.toBeInstanceOf(
      AccountAlreadyExistsError
    );
    await expect(sut.execute(mockedUser)).rejects.toThrowError(
      "An account with email johndoe@example.com already exists"
    );
  });

  it("should hash the password before saving the account", async () => {
    const hashSpy = vi.spyOn(passwordHasherService, "hash");

    await sut.execute(mockedUser);
    expect(hashSpy).toHaveBeenCalledWith(mockedUser.password);
  });

  it("should save the account with the hashed password", async () => {
    const hashSpy = vi.spyOn(passwordHasherService, "hash");
    const createSpy = vi.spyOn(accountRepositoryMocked, "create");
    hashSpy.mockResolvedValue(mockedHashedPassword);

    await sut.execute(mockedUser);

    expect(hashSpy).toHaveBeenCalledWith(mockedUser.password);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockedUser.name,
        email: mockedUser.email,
        password: mockedHashedPassword,
        role: mockedUser.role
      })
    );
  });
});
