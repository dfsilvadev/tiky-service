import bcrypt from "bcryptjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SignInUseCase } from "./sign-in.use-case";

import { Role } from "../../../generated/prisma/enums";
import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";
import { BcryptPasswordHasherService } from "../../../infrastructure/security/bcrypt-password-hasher.service";
import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(async () => "mocked-hash"),
    compare: vi.fn(async () => true)
  }
}));

let accountRepositoryMocked: InMemoryAccountRepository;
let passwordHasherService: BcryptPasswordHasherService;
let sut: SignInUseCase;

describe("Sign in Use Case (unit)", () => {
  beforeEach(() => {
    accountRepositoryMocked = new InMemoryAccountRepository();
    passwordHasherService = new BcryptPasswordHasherService(10);
    sut = new SignInUseCase(accountRepositoryMocked, passwordHasherService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const credentials = {
    email: "john.doe@email.com",
    password: "JohnDoe"
  };

  it("should be able to sign in", async () => {
    const account = await accountRepositoryMocked.create({
      name: "John Doe",
      email: credentials.email,
      password: await bcrypt.hash(credentials.password, 8),
      role: Role.ADMIN
    });

    const response = await sut.execute({
      email: account.email,
      password: credentials.password
    });

    expect(response).toEqual({
      account
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      credentials.password,
      account.passwordHash
    );
  });

  it("should not be able to sign in with non existing email", async () => {
    await expect(
      sut.execute({
        email: "johndoe@email.com",
        password: "JohnDoe"
      })
    ).rejects.toThrowError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  it("should not be able to sign in with wrong password", async () => {
    (bcrypt.compare as any).mockResolvedValueOnce(false);

    const account = await accountRepositoryMocked.create({
      name: "John Doe",
      email: credentials.email,
      password: await bcrypt.hash(credentials.password, 8),
      role: Role.ADMIN
    });

    await expect(
      sut.execute({
        email: account.email,
        password: "WrongPassword"
      })
    ).rejects.toThrowError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });
});
