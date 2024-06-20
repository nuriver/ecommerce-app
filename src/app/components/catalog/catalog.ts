import { updateCart } from '../../api/SDK/client';
import createElement from '../../utilities/createElement';
import pageToggle from '../../utilities/pageToggle';
import updateBasketStatus from '../basketPage/updateBasketStatus';
import detailedProductPage from '../detailedProductPage/detailedProductPage';
import categoryButtonToggle from './categoryButtonToggle';
import createCategoriesMenu from './createCategoriesMenu';
import createSortOptions from './createSortOptions';
import displayProducts, { sortData } from './displayProducts';
import { currentParent } from './displaySubcategoriesMenu';
import { showFilter, totalFiltersReset } from './filterMenu';
import { createPagination, updatePage } from './pagination';
import searchProducts from './searchProducts';
import { clearSort } from './sortProducts';
import updateBreadCrumbs from './updateBreadCrumbs';

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
  // filterButton.addEventListener('click', async () => {

  //   const response = await getCurrentCustomerCart()
  //   const products = response.body.results[0].lineItems;
  //   console.log(products);
  // });

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
  const catalogCrumb = createElement(
    'p',
    ['bread-crumbs-catalog', 'bread-crumb', 'bread-crumb-active'],
    breadCrumbsContainer,
    'CATALOG'
  );
  catalogCrumb.addEventListener('click', () => {
    const allProductsButton = document.querySelector('.all-category') as HTMLElement;
    const closeButton = document.querySelector('.close-button') as HTMLElement;
    allProductsButton.click();
    if (closeButton) closeButton.click();
  });
  createElement('p', ['bread-crumbs-delimiter-first'], breadCrumbsContainer, '>');
  const categoryCrumb = createElement('p', ['bread-crumbs-category', 'bread-crumb'], breadCrumbsContainer);
  categoryCrumb.addEventListener('click', () => {
    if (categoryCrumb.classList.contains('bread-crumb-active')) {
      updatePage(1);
      const parentCategoryButton = currentParent.value;
      totalFiltersReset();
      clearSort();
      if (parentCategoryButton) {
        displayProducts(parentCategoryButton.id);
        categoryButtonToggle(parentCategoryButton);
        updateBreadCrumbs(parentCategoryButton);
      }
      categoryCrumb.classList.remove('bread-crumb-active');
    }
    const closeButton = document.querySelector('.close-button') as HTMLElement;
    if (closeButton) closeButton.click();
  });
  createElement('p', ['bread-crumbs-delimiter'], breadCrumbsContainer, '>');
  const subCategoryCrumb = createElement('p', ['bread-crumbs-subcategory', 'bread-crumb'], breadCrumbsContainer);
  subCategoryCrumb.addEventListener('click', () => {
    subCategoryCrumb.classList.remove('bread-crumb-active');
  });

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
      if (!target.classList.contains('add-to-cart-button')) {
        const card = target.closest('.product-card') as HTMLElement;
        const addToCartButton = card.querySelector('.add-to-cart-button') as HTMLButtonElement;
        const addedToCart = addToCartButton.disabled === true;
        const productPage = detailedProductPage(card.id, addedToCart);
        pageToggle(productPage);
      } else {
        const addToCartButton = target.closest('.add-to-cart-button') as HTMLButtonElement;
        await updateCart(addToCartButton.id);
        addToCartButton.disabled = true;
        addToCartButton.innerHTML = 'ADDED TO CART';
        await updateBasketStatus();
      }
    }
  });

  const paginationContainer = createElement('div', ['pagination-container'], catalogWrapper);
  createPagination(paginationContainer);

  return catalogWrapper;
}
