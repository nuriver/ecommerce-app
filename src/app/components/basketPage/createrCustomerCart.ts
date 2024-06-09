import { Cart, CartPagedQueryResponse, ClientResponse, Customer, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ctpClient } from "../../api/SDK/clientBuilder";

export default async function getCartsByCustomerId(customerId: string)  {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
        projectKey: process.env.CTP_PROJECT_KEY as string,
      });
    
    const carts: ClientResponse<CartPagedQueryResponse> = await apiRoot.carts().get().execute();

    const customerCarts = carts.body.results.filter(cart => cart.id === customerId);

  const customerIdCart = customerCarts[0];
  console.log(customerIdCart)
  return customerIdCart
}

