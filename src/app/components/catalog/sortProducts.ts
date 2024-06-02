import displayProducts, { sortData } from './displayProducts';
import { updatePage } from './pagination';

export function clearSort() {
  const sortCheckboxes = document.querySelectorAll('.sort-checkbox') as NodeListOf<HTMLInputElement>;
  sortCheckboxes.forEach((sortCheckbox) => {
    sortCheckbox.checked = false;
  });
  sortData.currentSort = undefined;
}

function sortProducts(option?: string, order?: string): void {
  updatePage(1);
  if (option && order) {
    sortData.currentSort = `${option} ${order}`;
  } else {
    sortData.currentSort = undefined;
  }
  displayProducts(sortData.currentId);
}

function updateCheckbox(checkbox: HTMLInputElement) {
  const isChecked = checkbox.checked;

  clearSort();

  if (isChecked) checkbox.checked = true;
}

export default function sortHandler(event: Event): void {
  const currentCheckbox = event.target as HTMLInputElement;
  const { sortOption } = currentCheckbox.dataset;
  const { sortOrder } = currentCheckbox.dataset;

  updateCheckbox(currentCheckbox);

  if (currentCheckbox.checked && sortOption && sortOrder) {
    sortProducts(sortOption, sortOrder);
  }

  if (!currentCheckbox.checked) sortProducts();
}
