import { Session } from "../../generated/prisma/client";

export interface ISessionRepositoryCreateData {
  readonly userId: string;
  readonly refreshToken: string;
  readonly expiresAt: Date;
}

export interface ISessionRepository {
  create(_data: ISessionRepositoryCreateData): Promise<Session>;
  findByToken(_token: string): Promise<Session | null>;
  revoke(_sessionId: string): Promise<void>;
  revokeAllForUser(_userId: string): Promise<void>;
}
