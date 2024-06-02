import createElement from '../../utilities/createElement';
import createCategoriesMenu from './createCategoriesMenu';
import createSortOptions from './createSortOptions';
import { createPagination } from './pagination';
import searchProducts from './searchProducts';

export default function createCatalog(): HTMLElement {
  const catalogWrapper = createElement('div', ['catalog-wrapper']);

  const categoriesBlock = createElement('div', ['categories-block'], catalogWrapper);
  createCategoriesMenu(categoriesBlock);

  const sortBlock = createElement('div', ['catalog-sort-block'], catalogWrapper);
  createElement('p', ['sort-block-header'], sortBlock, 'SORT BY');
  const sortOptionsContainer = createElement('div', ['sort-options-container'], sortBlock);
  createSortOptions(sortOptionsContainer, 'name');
  createSortOptions(sortOptionsContainer, 'price');

  const filterButtonInnerText = '<span class="filter-icon"></span> SHOW FILTERS';
  createElement('button', ['button', 'filter-button'], sortBlock, filterButtonInnerText);

  const searchBlock = createElement('div', ['search-block'], catalogWrapper);
  const searchLabel = createElement('label', ['search-label'], searchBlock, 'SEARCH');
  searchLabel.setAttribute('for', 'searchInput');
  const searchInput = createElement('input', ['search-input'], searchBlock);
  searchInput.id = 'searchInput';

  const searchButtonInnerText = '<span class="search-icon"></span>';
  const searchButton = createElement('button', ['search-button'], searchBlock, searchButtonInnerText);
  searchButton.addEventListener('click', searchProducts);

  const breadCrumbsContainer = createElement('div', ['bread-crumbs-container'], catalogWrapper);
  createElement('p', ['bread-crumbs-heading'], breadCrumbsContainer, 'CATEGORY:');
  createElement('p', ['bread-crumbs-category', 'bread-crumb'], breadCrumbsContainer, 'BAGS');
  createElement('p', ['bread-crumbs-delimiter'], breadCrumbsContainer, '>');
  createElement('p', ['bread-crumbs-subcategory', 'bread-crumb'], breadCrumbsContainer, 'MODERN BAGS');

  createElement('div', ['catalog'], catalogWrapper);

  const paginationContainer = createElement('div', ['pagination-container'], catalogWrapper);
  createPagination(paginationContainer);

  return catalogWrapper;
}
