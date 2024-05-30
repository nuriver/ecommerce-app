import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  ClientResponse,
  CustomerPagedQueryResponse,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { TokenCache } from '@commercetools/sdk-client-v2';
import { CustomerCredentials } from '../../types/interfaces';
import { createCtpClientPasswordFlow, ctpClient, tokenCacheObject } from './clientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY as string,
});

export function createCustomer(customerDraft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  return apiRoot.customers().post({ body: customerDraft }).execute();
}

export async function signInCustomer(credentials: CustomerCredentials): Promise<boolean> {
  const ctpClientPasswordFlow = createCtpClientPasswordFlow(credentials);
  const apiRootPasswordFlow = createApiBuilderFromCtpClient(ctpClientPasswordFlow).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });

  try {
    const response = await apiRootPasswordFlow.login().post({ body: credentials }).execute();
    const customerId = response.body.customer.id;
    const tokenCache = tokenCacheObject.tokenCache as TokenCache;
    const customerToken = tokenCache.get().token;
    const loginLink = document.querySelector('.header-link-login') as HTMLElement;

    const customer = {
      id: customerId,
      token: customerToken,
    };

    localStorage.setItem('customer', JSON.stringify(customer));
    loginLink.innerText = 'LOGOUT';
    window.location.href = '#/main';
    return true;
  } catch {
    return false;
  }
}

export function getCustomers(): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  return apiRoot.customers().get().execute();
}

export function getSubcategoriesByParentId(parentId: string): Promise<ClientResponse<CategoryPagedQueryResponse>> {
  return apiRoot
    .categories()
    .get({
      queryArgs: {
        where: `parent(id="${parentId}")`,
      },
    })
    .execute();
}
