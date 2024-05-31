import createElement from '../../utilities/createElement';
import displayProducts, { currentSubcategory, paginationData } from './displayProducts';

export function updatePage(page: number) {
  const paginationLeft = document.querySelector('.pagination-left');
  // const paginationRight = document.querySelector('.pagination-right');
  const pageNumber = document.querySelector('.page-number') as HTMLElement;

  if (page > 1) {
    paginationLeft?.classList.remove('pagination-disabled');
    pageNumber.innerHTML = `${page}`;
  } else {
    paginationLeft?.classList.add('pagination-disabled');
    pageNumber.innerHTML = `${page}`;
    paginationData.currentPage = 1;
  }
}

export function createPagination(parent: HTMLElement): void {
  const paginationLeft = createElement('p', ['pagination-left', 'pagination-disabled'], parent, '<');
  paginationLeft.addEventListener('click', () => {
    paginationData.currentPage -= 1;
    updatePage(paginationData.currentPage);
    displayProducts(currentSubcategory.value);
  });

  createElement('p', ['page-number'], parent, '1');

  const paginationRight = createElement('p', ['pagination-right', 'pagination-disabled'], parent, '>');
  paginationRight.addEventListener('click', () => {
    paginationData.currentPage += 1;
    updatePage(paginationData.currentPage);
    displayProducts(currentSubcategory.value);
  });
}
