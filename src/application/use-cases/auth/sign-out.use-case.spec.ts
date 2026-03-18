import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SignOutUseCase } from "./sign-out.use-case";

import { InMemorySessionRepository } from "../../../infrastructure/persistence/in-memory/in-memory.session.repository";

let sessionRepository: InMemorySessionRepository;
let sut: SignOutUseCase;

describe("Sign Out Use Case (Unit)", () => {
  beforeEach(() => {
    sessionRepository = new InMemorySessionRepository();
    sut = new SignOutUseCase(sessionRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should revoke session successfully", async () => {
    const session = await sessionRepository.create({
      userId: "user-id",
      refreshToken: "valid-refresh-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    });

    await sut.execute({ refreshToken: session.refreshToken });

    const revokedSession = await sessionRepository.findByToken(
      session.refreshToken
    );

    expect(revokedSession?.isRevoked).toBe(true);
  });
});
