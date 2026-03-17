import {
  type ISessionRepository,
  type ISessionRepositoryCreateData
} from "../../../../../domain/repositories/session.repository";
import { type Session } from "../../../../../generated/prisma/client";
import { prismaClient } from "../../prisma-client";

export class SessionRepository implements ISessionRepository {
  async create(_data: ISessionRepositoryCreateData): Promise<Session> {
    const row = await prismaClient.session.create({
      data: {
        ..._data,
        expiresAt: new Date(_data.expiresAt)
      }
    });

    return row;
  }

  async findByToken(_token: string): Promise<Session | null> {
    const row = await prismaClient.session.findUnique({
      where: {
        refreshToken: _token
      }
    });

    return row ?? null;
  }

  async revoke(_sessionId: string): Promise<void> {
    await prismaClient.session.update({
      where: {
        id: _sessionId
      },
      data: {
        isRevoked: true
      }
    });
  }

  async revokeAllForUser(_userId: string): Promise<void> {
    await prismaClient.session.updateMany({
      where: {
        userId: _userId,
        isRevoked: false
      },
      data: {
        isRevoked: true
      }
    });
  }
}
