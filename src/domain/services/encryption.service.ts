export interface IEncryptionService {
  hash: (_password: string) => Promise<string>;
  compare: (_password: string, _hashedPassword: string) => Promise<boolean>;
}
