import {
  ClientResponse,
  Customer,
  CustomerUpdateAction,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ctpClient } from '../../api/SDK/clientBuilder';

export default async function updateCustomerById(
  ID: string,
  version: number,
  actions: CustomerUpdateAction[]
): Promise<ClientResponse<Customer>> {
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY as string,
  });
  return apiRoot
    .customers()
    .withId({ ID })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
}
// [{ action: 'setFirstName', firstName: 'newNameOooooooo' }];
