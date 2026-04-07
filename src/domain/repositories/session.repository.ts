import { Session } from "../../generated/prisma/client";

export interface ICreateSessionRepositoryDTO {
  readonly userId: string;
  readonly refreshToken: string;
  readonly expiresAt: Date;
}

export interface ISessionRepository {
  create(_data: ICreateSessionRepositoryDTO): Promise<Session>;
  findByToken(_token: string): Promise<Session | null>;
  revoke(_sessionId: string): Promise<void>;
  revokeAllForUser(_userId: string): Promise<void>;
}
