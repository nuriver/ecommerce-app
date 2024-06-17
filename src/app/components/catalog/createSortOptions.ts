import createElement from '../../utilities/createElement';
import sortHandler from './sortProducts';

export default function createSortOptions(parent: HTMLElement, sortBy: string): void {
  const sortOption = createElement('div', ['sort-option'], parent);
  createElement('p', ['sort-option-name'], sortOption, `${sortBy.toUpperCase()}`);
  const sortOptionOrder = createElement('div', ['sort-option-order'], sortOption);

  const ascOrderWrapper = createElement('div', ['order-wrapper'], sortOptionOrder);

  const sortAscCheckbox = createElement('input', ['sort-checkbox'], ascOrderWrapper);
  sortAscCheckbox.type = 'checkbox';
  sortAscCheckbox.id = `sortAscCheckbox${sortBy}`;
  sortAscCheckbox.dataset.sortOption = sortBy === 'price' ? `${sortBy}` : `${sortBy}.en`;
  sortAscCheckbox.dataset.sortOrder = 'asc';
  sortAscCheckbox.addEventListener('change', sortHandler);

  const sortAscLabel = createElement('label', ['sort-label'], ascOrderWrapper, 'ASC');
  sortAscLabel.setAttribute('for', `sortAscCheckbox${sortBy}`);

  const descOrderWrapper = createElement('div', ['order-wrapper'], sortOptionOrder);

  const sortDescCheckbox = createElement('input', ['sort-checkbox'], descOrderWrapper);
  sortDescCheckbox.type = 'checkbox';
  sortDescCheckbox.id = `sortDescCheckbox${sortBy}`;
  sortDescCheckbox.dataset.sortOption = sortBy === 'price' ? `${sortBy}` : `${sortBy}.en`;
  sortDescCheckbox.dataset.sortOrder = 'desc';
  sortDescCheckbox.addEventListener('change', sortHandler);

  const sortDescLabel = createElement('label', ['sort-label'], descOrderWrapper, 'DESC');
  sortDescLabel.setAttribute('for', `sortDescCheckbox${sortBy}`);
}
