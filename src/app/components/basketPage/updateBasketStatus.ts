import { CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import { getCurrentCustomerCart } from '../../api/SDK/client';

export default async function updateBasketStatus() {
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
}
