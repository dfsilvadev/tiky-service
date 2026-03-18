export interface ITokenSignInput {
  payload: Record<string, any>;
  options?: Record<string, any>;
}

export interface ITokenService {
  sign(_input: ITokenSignInput): string;
  verify(_token: string): Record<string, any>;
}
