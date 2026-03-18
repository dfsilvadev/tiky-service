import { type ISessionRepository } from "../../../domain/repositories/session.repository";
import { type ISignOutDTO } from "../../dtos/auth/sign-out.dto";

export class SignOutUseCase {
  constructor(private readonly _sessionRepository: ISessionRepository) {}

  async execute({ refreshToken }: ISignOutDTO): Promise<void> {
    const session = await this._sessionRepository.findByToken(refreshToken);

    if (!session || session.isRevoked || session.expiresAt < new Date()) return;

    await this._sessionRepository.revoke(session.id);
  }
}
