import createElement from '../../utilities/createElement';
import createSubcategoriesMenu from './createSubcategoriesMenu';

export default function createCategoriesMenu(parent: HTMLElement) {
  const subcategoriesContainer = createElement('div', ['dropdown-container']);
  createElement('div', ['subcategory'], subcategoriesContainer);
  createElement('div', ['subcategory'], subcategoriesContainer);
  createElement('div', ['subcategory'], subcategoriesContainer);
  createElement('div', ['default-subcategory'], subcategoriesContainer, 'View all');

  function categoryHandler(event: Event): void {
    const parentElement = event.target as HTMLElement;
    createSubcategoriesMenu(parentElement, parent.id, subcategoriesContainer);
  }

  const bagsCategory = createElement('div', ['bags-category', 'category'], parent, 'BAGS');
  bagsCategory.id = 'd7d1554a-78bb-412a-9789-d185d4d523cf';
  bagsCategory.addEventListener('click', categoryHandler);

  const notebooksCategory = createElement('div', ['bags-category', 'category'], parent, 'NOTEBOOKS');
  notebooksCategory.id = '2edd9856-004c-40f9-91b7-6edcf567dd75';
  notebooksCategory.addEventListener('click', categoryHandler);

  const mugsCategory = createElement('div', ['bags-category', 'category'], parent, 'MUGS');
  mugsCategory.id = 'f899db6d-d133-4548-b7ec-010cec468274';
  mugsCategory.addEventListener('click', categoryHandler);

  const bottlesCategory = createElement('div', ['bags-category', 'category'], parent, 'BOTTLES');
  bottlesCategory.id = '86c6c2bc-9117-4ad3-9324-252fd03434d2';
  bottlesCategory.addEventListener('click', categoryHandler);

  createElement('div', ['all-category', 'category'], parent, 'ALL');

  const closeButton = createElement('button', ['close-button'], subcategoriesContainer, 'X');
  closeButton.addEventListener('click', () => {
    subcategoriesContainer.remove();
  });
}
