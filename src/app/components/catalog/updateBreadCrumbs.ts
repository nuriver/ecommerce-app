export default function updateBreadCrumbs(category?: HTMLElement, subcategory?: HTMLElement) {
  const mainCategoryCrumb = document.querySelector('.bread-crumbs-category') as HTMLElement;
  mainCategoryCrumb.addEventListener('click', () => {});
  const subcategoryCrumb = document.querySelector('.bread-crumbs-subcategory') as HTMLElement;
  const breadCrumbsContainer = document.querySelector('.bread-crumbs-delimiter') as HTMLElement;

  if (category) mainCategoryCrumb.innerHTML = category.innerHTML;

  if (subcategory) {
    breadCrumbsContainer.style.display = 'block';
    subcategoryCrumb.style.display = 'block';
    subcategoryCrumb.innerHTML = subcategory.innerHTML.toUpperCase();
  }

  if (category && !subcategory) {
    breadCrumbsContainer.style.display = 'block';
    subcategoryCrumb.style.display = 'block';
    subcategoryCrumb.innerHTML = 'VIEW ALL';
  }

  if (!category && !subcategory) {
    breadCrumbsContainer.style.display = 'none';
    subcategoryCrumb.style.display = 'none';
    mainCategoryCrumb.innerHTML = 'ALL';
  }
}
