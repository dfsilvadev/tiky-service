import { SessionRepository } from "../persistence/prisma/repositories/auth/prisma.session.repository";

export function makeSessionRepository() {
  return new SessionRepository();
}
