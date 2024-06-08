import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { TokenCache } from '@commercetools/sdk-client-v2';

export interface CustomerCredentials {
  email: string;
  password: string;
  anonymousId: string;
}

export interface TokenCacheObject {
  tokenCache: TokenCache | null;
}

export interface ApiRootStorage {
  value: ByProjectKeyRequestBuilder;
  updateRoot: () => void;
}
