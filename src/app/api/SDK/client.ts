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
  CartUpdateAction,
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
export async function getCurrentCustomerCart(): Promise<ClientResponse<CartPagedQueryResponse>> {
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
export async function updateQtyCart(product: string, quantity: number) {
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
            action: 'changeLineItemQuantity',
            lineItemId: product,
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

export async function deleteProductFromCart(product: string) {
  showLoadIndicator();
  const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
    new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await getCurrentCustomerCart());
      }, 250);
    });

  const response: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
  const cart = response.body.results[0];
  const { lineItems } = cart;
  let lineItemId: string = '';
  lineItems.forEach((lineItem) => {
    if (lineItem.productId === product) {
      lineItemId = lineItem.id;
    }
  });
  await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      },
    })
    .execute();
  hideLoadIndicator();
  return response;
}

export async function clearCart(cartId: string) {
  const productCards: NodeListOf<HTMLDivElement> = document.querySelectorAll('.basket-page__card-product');
  showLoadIndicator();
  try {
    const cart = await apiRoot.carts().withId({ ID: cartId }).get().execute();
    const actions: CartUpdateAction[] = cart.body.lineItems.map((lineItem) => ({
      action: 'removeLineItem',
      lineItemId: lineItem.id,
    }));
    await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({ body: { version: cart.body.version, actions } })
      .execute();
    productCards.forEach((card) => card.remove());
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    hideLoadIndicator();
  }

}

export async function signInCustomer(credentials: CustomerCredentials): Promise<boolean> {
  const ctpClientPasswordFlow = createCtpClientPasswordFlow(credentials);
  const apiRootPasswordFlow = createApiBuilderFromCtpClient(ctpClientPasswordFlow).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });
  try {
    const response = await apiRootPasswordFlow.login().post({ body: credentials }).execute();
    apiRoot = apiRootPasswordFlow;
    apiRootStorage.updateRoot();
    const customerId = response.body.customer.id;
    const customerVersion = response.body.customer.version;
    const tokenCache = tokenCacheObject.tokenCache as TokenCache;
    const customerToken = tokenCache.get().refreshToken;
    const loginLink = document.querySelector('.header-link-login') as HTMLElement;
    const profileLink: HTMLLinkElement = document.querySelector('.header-link-profile') as HTMLLinkElement;
    const registerLink: HTMLLinkElement = document.querySelector('.header-link-registration') as HTMLLinkElement;
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
    if (!registerLink.classList.contains('header-link-registration-hidden')) {
      registerLink.classList.add('header-link-registration-hidden');
    }
    const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
      new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await getCurrentCustomerCart());
        }, 250);
      });

    const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
    const totalQty: number = customerCart.body.results[0].totalLineItemQuantity
      ? +customerCart.body.results[0].totalLineItemQuantity
      : 0;
    const basketStatus: HTMLDivElement = document.querySelector('.header__basket-status') as HTMLDivElement;
    basketStatus.innerHTML = `${totalQty}`;
    window.location.href = '#/main';
    sessionStorage.clear();
    return true;
  } catch {
    return false;
  }
}

export default async function applyPromo(promoCode: string) {
  const customerCart = await getCurrentCustomerCart();

  const cartId: string = customerCart.body.results[0].id;
  const cartVersion = customerCart.body.results[0].version;
  const cart = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addDiscountCode',
            code: promoCode,
          },
        ],
      },
    })
    .execute();
  return cart;
}
