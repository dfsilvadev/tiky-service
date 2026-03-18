import {
  type ISessionRepository,
  type ISessionRepositoryCreateData
} from "../../../domain/repositories/session.repository";
import { type Session } from "../../../generated/prisma/client";

export class InMemorySessionRepository implements ISessionRepository {
  private sessions: Session[] = [];

  async create(_data: ISessionRepositoryCreateData): Promise<Session> {
    const session: Session = {
      id: crypto.randomUUID(),
      userId: _data.userId,
      refreshToken: _data.refreshToken,
      isRevoked: false,
      expiresAt: _data.expiresAt,
      createdAt: new Date()
    };

    this.sessions.push(session);
    return session;
  }

  async findByToken(_token: string): Promise<Session | null> {
    const session = this.sessions.find((s) => s.refreshToken === _token);

    return session ?? null;
  }

  revoke(_sessionId: string): Promise<void> {
    const sessionIndex = this.sessions.findIndex((s) => s.id === _sessionId);

    if (sessionIndex !== -1) {
      this.sessions[sessionIndex].isRevoked = true;
    }

    return Promise.resolve();
  }

  revokeAllForUser(_userId: string): Promise<void> {
    this.sessions = this.sessions.map((s) =>
      s.userId === _userId ? { ...s, isRevoked: true } : s
    );

    return Promise.resolve();
  }
}
