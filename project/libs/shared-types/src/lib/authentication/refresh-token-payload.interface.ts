import { AccessTokenPayload } from './access-token-payload.interface';

export interface RefreshTokenPayload extends AccessTokenPayload {
  tokenId: string;
}
