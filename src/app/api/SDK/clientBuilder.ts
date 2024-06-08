import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  TokenStore,
  createAuthForAnonymousSessionFlow,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { v4 as uuidv4 } from 'uuid';
import { CustomerCredentials, TokenCacheObject } from '../../types/interfaces';

const projectKey = process.env.CTP_PROJECT_KEY as string;
const scopes = [process.env.CTP_SCOPES as string];
const clientId = process.env.CTP_CLIENT_ID as string;
const clientSecret = process.env.CTP_CLIENT_SECRET as string;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// Token cache
class PasswordFlowTokenCache implements TokenCache {
  tokenStorage: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: undefined,
  };

  set(newCache: TokenStore) {
    this.tokenStorage = newCache;
  }

  get() {
    return this.tokenStorage;
  }
}

export const tokenCacheObject: TokenCacheObject = {
  tokenCache: null,
};

function createPasswordAuthMiddlewareOptions(credentials: CustomerCredentials): PasswordAuthMiddlewareOptions {
  const passwordFlowTokenCache = new PasswordFlowTokenCache();
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: credentials.email,
        password: credentials.password,
      },
    },
    scopes,
    tokenCache: passwordFlowTokenCache,
    fetch,
  };

  tokenCacheObject.tokenCache = passwordFlowTokenCache;
  return options;
}

export function createCtpClientPasswordFlow(credentials: CustomerCredentials): Client {
  const options = createPasswordAuthMiddlewareOptions(credentials);
  const ctpClientPasswordFlow = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return ctpClientPasswordFlow;
}

export function createClientWithAnonymousFlow(): Client {
  const passwordFlowTokenCache = new PasswordFlowTokenCache();
  const anonymousId = uuidv4();
  sessionStorage.setItem('anonymousCustomer', anonymousId);

  const authMiddlewareOptionsWithAnonymousFlow = createAuthForAnonymousSessionFlow({
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      anonymousId,
    },
    tokenCache: passwordFlowTokenCache,
    scopes,
    fetch,
  });
  const anonymousClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withMiddleware(authMiddlewareOptionsWithAnonymousFlow)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return anonymousClient;
}
