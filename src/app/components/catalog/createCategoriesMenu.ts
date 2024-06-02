import createElement from '../../utilities/createElement';
import categoryButtonToggle from './categoryButtonToggle';
import { currentParent, displaySubcategoriesMenu } from './displaySubcategoriesMenu';
import displayProducts, { searchData } from './displayProducts';
import { updatePage } from './pagination';
import updateBreadCrumbs from './updateBreadCrumbs';
import { clearSort } from './sortProducts';

export default function createCategoriesMenu(parent: HTMLElement) {
  const subcategoriesContainer = createElement('div', ['subcategories-container']);
  createElement('div', ['subcategory'], subcategoriesContainer);
  createElement('div', ['subcategory'], subcategoriesContainer);
  createElement('div', ['subcategory'], subcategoriesContainer);

  const closeButton = createElement('button', ['close-button'], subcategoriesContainer, 'X');
  closeButton.addEventListener('click', () => {
    subcategoriesContainer.remove();
  });

  const subcategories = subcategoriesContainer.querySelectorAll('.subcategory');
  subcategories.forEach((subcategory) => {
    subcategory.addEventListener('click', () => {
      const childCategory = subcategory as HTMLElement;

      updatePage(1);

      const parentCategoryButton = currentParent.value;

      if (parentCategoryButton) {
        categoryButtonToggle(parentCategoryButton);
        updateBreadCrumbs(parentCategoryButton, childCategory);
      }
      clearSort();
      displayProducts(subcategory.id);
      closeButton.click();
    });
  });

  const viewAll = createElement('div', ['view-all-subcategory'], subcategoriesContainer, 'VIEW ALL');
  viewAll.addEventListener('click', () => {
    updatePage(1);
    const parentCategoryButton = currentParent.value;
    closeButton.click();
    clearSort();
    if (parentCategoryButton) {
      displayProducts(parentCategoryButton.id);
      categoryButtonToggle(parentCategoryButton);
      updateBreadCrumbs(parentCategoryButton);
    }
  });

  function categoryHandler(event: Event): void {
    const parentElement = event.target as HTMLElement;
    displaySubcategoriesMenu(parentElement, parentElement.id, subcategoriesContainer);
  }

  const bagsCategory = createElement('div', ['bags-category', 'category'], parent, 'BAGS');
  bagsCategory.id = 'd7d1554a-78bb-412a-9789-d185d4d523cf';
  bagsCategory.addEventListener('click', categoryHandler);

  const notebooksCategory = createElement('div', ['notebooks-category', 'category'], parent, 'NOTEBOOKS');
  notebooksCategory.id = '2edd9856-004c-40f9-91b7-6edcf567dd75';
  notebooksCategory.addEventListener('click', categoryHandler);

  const mugsCategory = createElement('div', ['mugs-category', 'category'], parent, 'MUGS');
  mugsCategory.id = 'f899db6d-d133-4548-b7ec-010cec468274';
  mugsCategory.addEventListener('click', categoryHandler);

  const bottlesCategory = createElement('div', ['bottles-category', 'category'], parent, 'BOTTLES');
  bottlesCategory.id = '86c6c2bc-9117-4ad3-9324-252fd03434d2';
  bottlesCategory.addEventListener('click', categoryHandler);

  const allCategory = createElement('div', ['all-category', 'category'], parent, 'ALL');
  allCategory.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    clearSort();
    updatePage(1);
    if (searchData.value) searchData.value = undefined;
    categoryButtonToggle(target);
    displayProducts();
    updateBreadCrumbs();
  });
}
