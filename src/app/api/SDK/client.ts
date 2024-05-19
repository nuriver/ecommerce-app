import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  ClientResponse,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import CustomerCredentials from '../../types/interfaces';
import { createCtpClientPasswordFlow, ctpClient } from './clientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY as string,
});

export function createCustomer(customerDraft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  return apiRoot.customers().post({ body: customerDraft }).execute();
}

export function signInCustomer(credentials: CustomerCredentials): Promise<boolean> {
  const ctpClientPasswordFlow = createCtpClientPasswordFlow(credentials);
  const apiRootPasswordFlow = createApiBuilderFromCtpClient(ctpClientPasswordFlow).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });

  return apiRootPasswordFlow
    .login()
    .post({ body: credentials })
    .execute()
    .then((response) => {
      const customerId = response.body.customer.id;
      const loginLink = document.querySelector('.header-link-login') as HTMLElement;

      sessionStorage.setItem('customer', customerId);
      loginLink.innerText = 'LOGOUT';
      window.location.href = '#/main';

      return true;
    })
    .catch(() => false);
}

export function getCustomers(): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  return apiRoot.customers().get().execute();
}
