import { prismaClient } from "../../prisma-client";

import {
  type ISessionRepository,
  type ISessionRepositoryCreateData
} from "../../../../../domain/repositories/session.repository";
import { type Session } from "../../../../../generated/prisma/client";

export class SessionRepository implements ISessionRepository {
  async create(data: ISessionRepositoryCreateData): Promise<Session> {
    const row = await prismaClient.session.create({
      data: {
        ...data,
        expiresAt: new Date(data.expiresAt)
      }
    });

    return row;
  }

  async findByToken(token: string): Promise<Session | null> {
    const row = await prismaClient.session.findUnique({
      where: {
        refreshToken: token
      }
    });

    return row ?? null;
  }

  async revoke(sessionId: string): Promise<void> {
    await prismaClient.session.update({
      where: {
        id: sessionId
      },
      data: {
        isRevoked: true
      }
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await prismaClient.session.updateMany({
      where: {
        userId: userId,
        isRevoked: false
      },
      data: {
        isRevoked: true
      }
    });
  }
}
