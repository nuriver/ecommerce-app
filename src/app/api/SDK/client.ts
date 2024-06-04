import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  ClientResponse,
  CustomerPagedQueryResponse,
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
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
    const customerVersion = response.body.customer.version;
    const tokenCache = tokenCacheObject.tokenCache as TokenCache;
    const customerToken = tokenCache.get().token;
    const loginLink = document.querySelector('.header-link-login') as HTMLElement;
    const profileLink: HTMLLinkElement = document.querySelector('.header-link-profile') as HTMLLinkElement;

    const customer = {
      id: customerId,
      token: customerToken,
      version: customerVersion,
    };

    localStorage.setItem('customer', JSON.stringify(customer));

    loginLink.innerText = 'LOGOUT';
    if (profileLink.classList.contains('header-link-profile-hidden')) {
      profileLink.classList.remove('header-link-profile-hidden');
    }
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

export function getProductsByCategory(
  categoryId: string
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`categories.id:"${categoryId}"`],
      },
    })
    .execute();
}

export function getAllProducts(
  filter: string[],
  limit: number,
  offset: number,
  sort?: string,
  searchText?: string
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter,
        limit,
        offset,
        sort,
        'text.en': searchText,
        fuzzy: true,
      },
    })
    .execute();
}

export function getProductsByMainCategory(
  filters: string[],
  limit: number,
  offset: number,
  sort?: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filters,
        limit,
        offset,
        sort,
      },
    })
    .execute();
}

export function getProductsBySlug(slug: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `slug.en: "${slug}"`,
      },
    })
    .execute();
}
