import { TokenCache } from '@commercetools/sdk-client-v2';

export interface CustomerCredentials {
  email: string;
  password: string;
}

export interface TokenCacheObject {
  tokenCache: TokenCache | null;
}
