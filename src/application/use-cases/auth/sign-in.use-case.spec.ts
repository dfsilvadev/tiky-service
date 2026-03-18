import bcrypt from "bcryptjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SignInUseCase } from "./sign-in.use-case";

import { Role } from "../../../generated/prisma/enums";

import { env } from "../../../shared/config/env";

import { IEncryptionService } from "../../../domain/services/encryption.service";
import { ITokenService } from "../../../domain/services/token.service";

import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";
import { InMemorySessionRepository } from "../../../infrastructure/persistence/in-memory/in-memory.session.repository";
import { BcryptEncryptionService } from "../../../infrastructure/security/bcrypt-encryption.service";

import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(async () => "mocked-hash"),
    compare: vi.fn(async () => true)
  }
}));

let accountRepositoryMocked: InMemoryAccountRepository;
let passwordHasherService: IEncryptionService;
let tokenService: ITokenService;
let sessionRepository: InMemorySessionRepository;
let signTokenSpy: ReturnType<typeof vi.fn<ITokenService["sign"]>>;
let sut: SignInUseCase;

describe("Sign in Use Case (unit)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-17T10:00:00.000Z"));

    accountRepositoryMocked = new InMemoryAccountRepository();
    passwordHasherService = new BcryptEncryptionService(10);
    signTokenSpy = vi
      .fn<ITokenService["sign"]>()
      .mockReturnValueOnce("access-token")
      .mockReturnValueOnce("refresh-token");
    tokenService = {
      sign: signTokenSpy,
      verify: vi.fn<ITokenService["verify"]>()
    };
    sessionRepository = new InMemorySessionRepository();
    sut = new SignInUseCase(
      accountRepositoryMocked,
      passwordHasherService,
      tokenService,
      sessionRepository
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
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
      account,
      token: "access-token",
      refreshToken: "refresh-token"
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      credentials.password,
      account.passwordHash
    );
  });

  it("should sign access and refresh tokens with the correct payload", async () => {
    const account = await accountRepositoryMocked.create({
      name: "John Doe",
      email: credentials.email,
      password: await bcrypt.hash(credentials.password, 8),
      role: Role.ADMIN
    });

    await sut.execute({
      email: account.email,
      password: credentials.password
    });

    expect(signTokenSpy).toHaveBeenNthCalledWith(1, {
      payload: {
        account: {
          name: account.name,
          email: account.email,
          role: account.role
        }
      },
      options: { sub: account.id, expiresIn: env.ACCESS_TOKEN_TTL }
    });
    expect(signTokenSpy).toHaveBeenNthCalledWith(2, {
      payload: { account: { role: account.role } },
      options: { sub: account.id, expiresIn: "7d" }
    });
  });

  it("should persist the refresh token in a session with 7 days expiration", async () => {
    const account = await accountRepositoryMocked.create({
      name: "John Doe",
      email: credentials.email,
      password: await bcrypt.hash(credentials.password, 8),
      role: Role.ADMIN
    });

    const createSessionSpy = vi.spyOn(sessionRepository, "create");

    const response = await sut.execute({
      email: account.email,
      password: credentials.password
    });

    expect(createSessionSpy).toHaveBeenCalledWith({
      userId: account.id,
      refreshToken: response.refreshToken,
      expiresAt: new Date("2026-03-24T10:00:00.000Z")
    });

    await expect(
      sessionRepository.findByToken(response.refreshToken)
    ).resolves.toMatchObject({
      userId: account.id,
      refreshToken: response.refreshToken,
      isRevoked: false,
      expiresAt: new Date("2026-03-24T10:00:00.000Z")
    });
  });

  it("should not be able to sign in with non existing email", async () => {
    await expect(
      sut.execute({
        email: "johndoe@email.com",
        password: "JohnDoe"
      })
    ).rejects.toThrowError(ERROR_MESSAGES.INVALID_CREDENTIALS);

    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(signTokenSpy).not.toHaveBeenCalled();
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

    expect(signTokenSpy).not.toHaveBeenCalled();
  });
});
