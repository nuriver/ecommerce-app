import { getProducts, getProductsByMainCategory } from '../../api/SDK/client';
import createProductCard from './createProductCard';
import getProductDataFromProduct, { getProductDataFromProductProjection } from './getProductData';

export default async function displayProducts(id?: string): Promise<void> {
  const catalog = document.querySelector('.catalog') as HTMLElement;
  catalog.innerHTML = '';

  if (id) {
    const response = await getProductsByMainCategory(id);
    const products = response.body.results;

    products.forEach((product) => {
      const productCardData = getProductDataFromProductProjection(product);
      createProductCard(productCardData, catalog);
    });
  } else {
    const response = await getProducts();
    const products = response.body.results;

    products.forEach((product) => {
      const productCardData = getProductDataFromProduct(product);
      createProductCard(productCardData, catalog);
    });
  }
}
