import createElement from '../../utilities/createElement';
import pageToggle from '../../utilities/pageToggle';
import detailedProductPage from '../detailedProductPage/detailedProductPage';
import createCategoriesMenu from './createCategoriesMenu';
import createSortOptions from './createSortOptions';
import displayProducts, { sortData } from './displayProducts';
import { showFilter, totalFiltersReset } from './filterMenu';
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
  const filterButton = createElement('button', ['button', 'filter-button'], sortBlock, filterButtonInnerText);
  filterButton.addEventListener('click', showFilter);

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

  const filterInfoBlock = createElement('div', ['filter-info-block'], catalogWrapper);
  createElement('p', ['filter-info-heading'], filterInfoBlock, 'FILTERED BY:');
  createElement('p', ['applied-filters-container'], filterInfoBlock);
  const resetAppliedFilters = createElement(
    'button',
    ['reset-applied-filters', 'filter-reset'],
    filterInfoBlock,
    'RESET'
  );
  resetAppliedFilters.addEventListener('click', () => {
    totalFiltersReset();
    displayProducts(sortData.currentId);
  });

  const catalog = createElement('div', ['catalog'], catalogWrapper);
  catalog.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('catalog')) {
      const card = target.closest('.product-card') as HTMLElement;
      const productPage = detailedProductPage(card.id);
      pageToggle(productPage);
    }
  });

  const paginationContainer = createElement('div', ['pagination-container'], catalogWrapper);
  createPagination(paginationContainer);

  return catalogWrapper;
}
