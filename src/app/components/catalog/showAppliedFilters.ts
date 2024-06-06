import createElement from '../../utilities/createElement';

export default function showAppliedFilters(filters: string[]): void {
  const appliedFiltersContainer = document.querySelector('.applied-filters-container') as HTMLElement;
  appliedFiltersContainer.innerHTML = '';
  filters.forEach((filter) => {
    createElement('div', ['applied-filter'], appliedFiltersContainer, filter);
  });
}
