import { getCurrentCustomerCart } from '../api/SDK/client';

export default async function getAddedToCartProducts(): Promise<string[]> {
  const currentCartResponse = await getCurrentCustomerCart();
  const addedProducts = currentCartResponse.body.results[0].lineItems;
  const addedProductsId: string[] = [];
  addedProducts.forEach((product) => {
    addedProductsId.push(product.productId);
  });
  return addedProductsId;
}
