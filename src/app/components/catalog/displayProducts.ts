import { getProducts, getProductsByMainCategory } from '../../api/SDK/client';
import createProductCard from './createProductCard';
import getProductDataFromProduct, { getProductDataFromProductProjection } from './getProductData';

export const currentSubcategory: { value: undefined | string } = {
  value: undefined,
};

export const paginationData = {
  pageLimit: 12,
  currentPage: 1,
};

export default async function displayProducts(id?: string): Promise<void> {
  const catalog = document.querySelector('.catalog') as HTMLElement;
  catalog.innerHTML = '';

  const offset = (paginationData.currentPage - 1) * paginationData.pageLimit;

  const paginationRight = document.querySelector('.pagination-right') as HTMLElement;

  if (id) {
    currentSubcategory.value = id;

    const response = await getProductsByMainCategory(id, paginationData.pageLimit, offset);
    const products = response.body.results;
    const totalProducts = response.body.total as number;
    if (totalProducts > paginationData.pageLimit) paginationRight.classList.remove('pagination-disabled');
    if (totalProducts < offset + 12) paginationRight.classList.add('pagination-disabled');

    products.forEach((product) => {
      const productCardData = getProductDataFromProductProjection(product);
      createProductCard(productCardData, catalog);
    });
  } else {
    currentSubcategory.value = undefined;

    const response = await getProducts(paginationData.pageLimit, offset);
    const products = response.body.results;
    const totalProducts = response.body.total as number;
    if (totalProducts > paginationData.pageLimit) paginationRight.classList.remove('pagination-disabled');
    if (totalProducts < offset + 12) paginationRight.classList.add('pagination-disabled');

    products.forEach((product) => {
      const productCardData = getProductDataFromProduct(product);
      createProductCard(productCardData, catalog);
    });
  }
}
