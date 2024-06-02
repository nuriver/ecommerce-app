import displayProducts, { sortData } from './displayProducts';
import { updatePage } from './pagination';

function sortProducts(option: string, order: string): void {
  updatePage(1);
  sortData.currentSort = `${option} ${order}`;
  displayProducts(sortData.currentId);
}

function updateCheckbox(checkbox: HTMLInputElement) {
  const sortCheckboxes = document.querySelectorAll('.sort-checkbox') as NodeListOf<HTMLInputElement>;
  const isChecked = checkbox.checked;

  sortCheckboxes.forEach((sortCheckbox) => {
    sortCheckbox.checked = false;
  });

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
}
