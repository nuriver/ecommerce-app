import { createApiBuilderFromCtpClient, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import CustomerCredentials from '../../types/interfaces';
import ctpClient from './clientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY as string,
});

export function createCustomer(customerDraft: CustomerDraft): Promise<CustomerSignInResult> {
  return apiRoot
    .customers()
    .post({ body: customerDraft })
    .execute()
    .then(
      (response): CustomerSignInResult =>
        // Here will be code for response handling
        response.body as CustomerSignInResult
    )
    .catch((err: Error) => {
      // Here will be code for error handling
      throw err;
    });
}

export function signInCustomer(credentials: CustomerCredentials): Promise<CustomerSignInResult> {
  return apiRoot
    .login()
    .post({ body: credentials })
    .execute()
    .then(
      (response): CustomerSignInResult =>
        // Here will be code for response handling
        response.body as CustomerSignInResult
    )
    .catch((err: Error) => {
      // Here will be code for error handling
      throw err;
    });
}
