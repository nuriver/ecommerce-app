import categoryButtonToggle from './categoryButtonToggle';
import displayProducts, { searchData } from './displayProducts';
import { updatePage } from './pagination';
import { clearSort } from './sortProducts';
import updateBreadCrumbs from './updateBreadCrumbs';

export default function searchProducts(): void {
  const searchInput = document.querySelector('.search-input') as HTMLInputElement;
  const searchValue = searchInput.value;
  const allCategoryButton = document.querySelector('.all-category') as HTMLElement;

  if (searchValue.length > 0) {
    searchData.value = searchValue;
    categoryButtonToggle(allCategoryButton);
    clearSort();
    updatePage(1);
    displayProducts();
    updateBreadCrumbs();
    searchInput.value = '';
  }
}
