import { getSubcategoriesByParentId } from '../../api/SDK/client';

export default async function createSubcategoriesMenu(parent: HTMLElement, parentId: string, container: HTMLElement) {
  const response = await getSubcategoriesByParentId(parentId);
  const subcategoryButtons = container.querySelectorAll('.subcategory');
  const subcategories = response.body.results;
  subcategories.forEach((category, i) => {
    const name = category.name.en;
    const { id } = category;
    const subcategoryButton = subcategoryButtons[i];
    subcategoryButton.innerHTML = `${name}`;
    subcategoryButton.id = id;
  });
  parent.after(container);
}
