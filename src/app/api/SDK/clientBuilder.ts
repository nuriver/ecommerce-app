import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

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

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
