import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RefreshTokenUseCase } from "./refresh-token.use-case";

import { env } from "../../../shared/config/env";

import { ITokenService } from "../../../domain/services/token.service";

import { InMemoryAccountRepository } from "../../../infrastructure/persistence/in-memory/in-memory.account.repository";
import { InMemorySessionRepository } from "../../../infrastructure/persistence/in-memory/in-memory.session.repository";

import { DUMMY_ACCOUNT } from "../../../shared/mocks/data.mocked";

let sessionRepository: InMemorySessionRepository;
let accountRepositoryMocked: InMemoryAccountRepository;
let tokenService: ITokenService;
let signTokenSpy: ReturnType<typeof vi.fn<ITokenService["sign"]>>;
let sut: RefreshTokenUseCase;

describe("Refresh Token Use Case (Unit)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-17T10:00:00.000Z"));

    sessionRepository = new InMemorySessionRepository();
    accountRepositoryMocked = new InMemoryAccountRepository();
    signTokenSpy = vi
      .fn<ITokenService["sign"]>()
      .mockReturnValue("new-access-token");
    tokenService = {
      sign: signTokenSpy,
      verify: vi.fn<ITokenService["verify"]>()
    };
    sut = new RefreshTokenUseCase(
      sessionRepository,
      accountRepositoryMocked,
      tokenService
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("should refresh access token successfully", async () => {
    const user = await accountRepositoryMocked.create(DUMMY_ACCOUNT);

    const session = await sessionRepository.create({
      userId: user.id,
      refreshToken: "valid-refresh-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60) // Expires in 1 hour
    });

    const result = await sut.execute({ refreshToken: session.refreshToken });

    expect(result).toEqual({ token: "new-access-token" });
    expect(signTokenSpy).toHaveBeenCalledWith({
      payload: {
        account: { name: user.name, email: user.email, role: user.role }
      },
      options: { sub: user.id, expiresIn: env.ACCESS_TOKEN_TTL }
    });
  });

  it("should throw UnauthorizedError for invalid refresh token", async () => {
    await expect(
      sut.execute({ refreshToken: "invalid-refresh-token" })
    ).rejects.toThrow("Invalid or expired refresh token");
  });

  it("should throw UnauthorizedError for expired refresh token", async () => {
    const user = await accountRepositoryMocked.create(DUMMY_ACCOUNT);

    await sessionRepository.create({
      userId: user.id,
      refreshToken: "expired-refresh-token",
      expiresAt: new Date(Date.now() - 1000 * 60 * 60)
    });

    await expect(
      sut.execute({ refreshToken: "expired-refresh-token" })
    ).rejects.toThrow("Invalid or expired refresh token");
  });

  it("should throw UnauthorizedError if user not found", async () => {
    await sessionRepository.create({
      userId: "non-existent-user-id",
      refreshToken: "valid-refresh-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    } as any);

    await expect(
      sut.execute({ refreshToken: "valid-refresh-token" })
    ).rejects.toThrow("User not found");
  });

  it("should throw UnauthorizedError if refresh token is revoked", async () => {
    const user = await accountRepositoryMocked.create(DUMMY_ACCOUNT);

    const session = await sessionRepository.create({
      userId: user.id,
      refreshToken: "revoked-refresh-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    });

    await sessionRepository.revoke(session.id);

    await expect(
      sut.execute({ refreshToken: "revoked-refresh-token" })
    ).rejects.toThrow("Invalid or expired refresh token");
  });
});
