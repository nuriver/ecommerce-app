import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  ClientResponse,
  CustomerPagedQueryResponse,
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
  ByProjectKeyRequestBuilder,
  CartPagedQueryResponse,
  Cart,
} from '@commercetools/platform-sdk';
import { Client, TokenCache } from '@commercetools/sdk-client-v2';
import { ApiRootStorage, CustomerCredentials } from '../../types/interfaces';
import {
  createClientWithAnonymousFlow,
  createClientWithRefreshTokenFlow,
  createCtpClientPasswordFlow,
  ctpClient,
  tokenCacheObject,
} from './clientBuilder';
import { hideLoadIndicator, showLoadIndicator } from './loadIndicator';
import customerInStorage from '../../utilities/customerInStorage';

let apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY as string,
});

export const apiRootStorage: ApiRootStorage = {
  value: apiRoot,
  updateRoot() {
    this.value = apiRoot;
  },
};

export function createCustomer(customerDraft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  return apiRoot.customers().post({ body: customerDraft }).execute();
}

export async function signInCustomer(credentials: CustomerCredentials): Promise<boolean> {
  const ctpClientPasswordFlow = createCtpClientPasswordFlow(credentials);
  const apiRootPasswordFlow = createApiBuilderFromCtpClient(ctpClientPasswordFlow).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });
  apiRoot = apiRootPasswordFlow;
  apiRootStorage.updateRoot();

  try {
    const response = await apiRootPasswordFlow.login().post({ body: credentials }).execute();
    const customerId = response.body.customer.id;
    const customerVersion = response.body.customer.version;
    const tokenCache = tokenCacheObject.tokenCache as TokenCache;
    const customerToken = tokenCache.get().refreshToken;
    const loginLink = document.querySelector('.header-link-login') as HTMLElement;
    const profileLink: HTMLLinkElement = document.querySelector('.header-link-profile') as HTMLLinkElement;
    const registrationLink: HTMLAnchorElement | null = document.querySelector('.header-link-registration');

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
    if (!registrationLink?.classList.contains('header-link-registration-hidden')) {
      registrationLink?.classList.add('header-link-registration-hidden');
    }

    window.location.href = '#/main';
    sessionStorage.clear();
    return true;
  } catch {
    return false;
  }
}

export function getCustomers(): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  return apiRoot.customers().get().execute();
}

export function getSubcategoriesByParentId(parentId: string): Promise<ClientResponse<CategoryPagedQueryResponse>> {
  showLoadIndicator();
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
  showLoadIndicator();
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
  showLoadIndicator();
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
  showLoadIndicator();
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

// PRODUCT CARTS

export async function createAnonymousCart(): Promise<false | ClientResponse<Cart>> {
  const anonymousCustomer = sessionStorage.getItem('anonymousCustomer');
  const anonymousId = anonymousCustomer as string;
  try {
    return await apiRoot
      .carts()
      .post({
        body: {
          currency: 'USD',
          anonymousId,
        },
      })
      .execute();
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function startAnonymousSession(): void {
  const anonymousClient: Client = createClientWithAnonymousFlow();
  apiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });
  apiRootStorage.updateRoot();
  createAnonymousCart();
}

export function getCurrentCustomerCart(): Promise<ClientResponse<CartPagedQueryResponse>> {
  return apiRootStorage.value.me().carts().get().execute();
}

export async function updateCart(product: string, quantity?: number) {
  showLoadIndicator();

  const response = await getCurrentCustomerCart();
  const cart = response.body.results[0];

  await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: product,
            variantId: 1,
            quantity,
          },
        ],
      },
    })
    .execute();
  hideLoadIndicator();
}

if (!customerInStorage()) startAnonymousSession();

export function signInWithRefreshToken(): void {
  const ctpClientRefreshTokenFlow = createClientWithRefreshTokenFlow();
  const apiRootRefreshTokenFlow = createApiBuilderFromCtpClient(ctpClientRefreshTokenFlow).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });
  apiRoot = apiRootRefreshTokenFlow;
  apiRootStorage.updateRoot();
}
