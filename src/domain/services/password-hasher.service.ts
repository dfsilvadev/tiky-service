export interface IPasswordHasherService {
  hash: (_password: string) => Promise<string>;
  compare: (_password: string, _hashedPassword: string) => Promise<boolean>;
}
