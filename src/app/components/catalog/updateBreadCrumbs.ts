export default function updateBreadCrumbs(category?: HTMLElement, subcategory?: HTMLElement) {
  const mainCategoryCrumb = document.querySelector('.bread-crumbs-category') as HTMLElement;
  const subcategoryCrumb = document.querySelector('.bread-crumbs-subcategory') as HTMLElement;
  const breadCrumbsDelimiter = document.querySelector('.bread-crumbs-delimiter') as HTMLElement;

  // Test code
  if (category) console.log(category.id);

  // Deploy code

  if (category) {
    mainCategoryCrumb.innerHTML = category.innerHTML;
  }

  if (category && subcategory) {
    mainCategoryCrumb.classList.add('bread-crumb-active');
  }
  if (subcategory) {
    breadCrumbsDelimiter.style.display = 'block';
    subcategoryCrumb.style.display = 'block';
    subcategoryCrumb.innerHTML = subcategory.innerHTML.toUpperCase();
  }

  if (category && !subcategory) {
    breadCrumbsDelimiter.style.display = 'none';
    subcategoryCrumb.style.display = 'block';
    subcategoryCrumb.innerHTML = '';
  }

  if (!category && !subcategory) {
    breadCrumbsDelimiter.style.display = 'none';
    subcategoryCrumb.style.display = 'none';
    mainCategoryCrumb.innerHTML = 'ALL';
  }
}
