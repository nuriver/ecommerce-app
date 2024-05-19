import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  ClientResponse,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import CustomerCredentials from '../../types/interfaces';
import { createCtpClientPasswordFlow, ctpClient } from './clientBuilder';
import pageToggle from '../../utilities/pageToggle';

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
      sessionStorage.setItem('customer', customerId);
      const mainPage = document.querySelector('.main-page') as HTMLElement;
      pageToggle(mainPage, 'main');
      return true;
    })
    .catch(() => false);
}

export function getCustomers(): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  return apiRoot.customers().get().execute();
}
