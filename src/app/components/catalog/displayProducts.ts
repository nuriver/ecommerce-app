import { getProducts, getProductsByMainCategory } from '../../api/SDK/client';
import createProductCard from './createProductCard';
import getProductDataFromProduct, { getProductDataFromProductProjection } from './getProductData';
/* eslint-disable-next-line */
import detailedProductPage from '../detailedProductPage/detailedProductPage';

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

  let isCatalogClickListenerAdded = false;

  if (catalog && !isCatalogClickListenerAdded) {
    catalog.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement | null;

      if (target) {
        const card = target.closest('.product-card') as HTMLElement | null;

        if (card) {
          const productId = card.id;

          const existingDppPage = document.querySelector('.dpp-page');

          if (productId && !existingDppPage) {
            detailedProductPage(productId);
          }
        }
      }
    });
    isCatalogClickListenerAdded = true;
  }
}
