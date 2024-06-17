import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  ProductPagedQueryResponse,
  Product,
} from '@commercetools/platform-sdk';

import { ctpClient } from '../../api/SDK/clientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY as string,
});

export function getProducts(): Promise<ClientResponse<ProductPagedQueryResponse>> {
  return apiRoot.products().get().execute();
}

export function getProductById(productId: string): Promise<ClientResponse<Product>> {
  return apiRoot.products().withId({ ID: productId }).get().execute();
}
