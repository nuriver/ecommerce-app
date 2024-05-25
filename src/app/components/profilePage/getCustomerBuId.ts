import { ClientResponse, Customer, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ctpClient } from "../../api/SDK/clientBuilder";

export default async function getCustomerById(ID: string): Promise<ClientResponse<Customer>> {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: process.env.CTP_PROJECT_KEY as string,
    });
    return apiRoot.customers().withId({ ID }).get().execute();
  }
  