import createElement from '../../utilities/createElement';
import createCategoriesMenu from './createCategoriesMenu';
import createSortOptions from './createSortOptions';
import { createPagination } from './pagination';

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

  createElement('div', ['bread-crumbs'], catalogWrapper);

  createElement('div', ['catalog'], catalogWrapper);

  const paginationContainer = createElement('div', ['pagination-container'], catalogWrapper);
  createPagination(paginationContainer);

  return catalogWrapper;
}
