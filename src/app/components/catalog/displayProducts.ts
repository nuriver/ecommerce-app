import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { getAllProducts, getProductsByMainCategory } from '../../api/SDK/client';
import createProductCard from './createProductCard';
import getProductDataFromProductProjection from './getProductData';
import { FilterData, SortData } from '../../types/types';

export const currentSubcategory: { value: undefined | string } = {
  value: undefined,
};

export const sortData: SortData = {
  currentId: undefined,
  currentSort: undefined,
};

export const searchData: { value: string | undefined } = {
  value: undefined,
};

export const filterData: FilterData = {
  artistFilters: '',
  priceRange: '',
  clearFilters() {
    this.artistFilters = '';
    this.priceRange = '';
  },
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

  let response: ClientResponse<ProductProjectionPagedQueryResponse>;

  if (id) {
    const filters = [`categories.id:subtree("${id}")`, filterData.artistFilters, filterData.priceRange];
    response = await getProductsByMainCategory(filters, paginationData.pageLimit, offset, sortData.currentSort);
    currentSubcategory.value = id;
    sortData.currentId = id;
  } else {
    const filters = [filterData.artistFilters, filterData.priceRange];
    response = await getAllProducts(filters, paginationData.pageLimit, offset, sortData.currentSort, searchData.value);
    currentSubcategory.value = undefined;
    sortData.currentId = undefined;
  }
  const products = response.body.results;
  const totalProducts = response.body.total as number;
  if (totalProducts > paginationData.pageLimit) paginationRight.classList.remove('pagination-disabled');
  if (totalProducts < offset + 12) paginationRight.classList.add('pagination-disabled');

  products.forEach((product) => {
    console.log(product);
    const productCardData = getProductDataFromProductProjection(product);
    createProductCard(productCardData, catalog);
  });
}
