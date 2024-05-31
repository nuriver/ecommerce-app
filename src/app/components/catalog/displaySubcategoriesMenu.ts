import { getSubcategoriesByParentId } from '../../api/SDK/client';

export const currentParent: { value: null | HTMLElement } = {
  value: null,
};

export async function displaySubcategoriesMenu(parent: HTMLElement, parentId: string, container: HTMLElement) {
  const response = await getSubcategoriesByParentId(parentId);
  const subcategoryButtons = container.querySelectorAll('.subcategory');
  const subcategories = response.body.results;

  currentParent.value = parent;

  subcategories.forEach((category, i) => {
    const name = category.name.en;
    const { id } = category;
    const subcategoryButton = subcategoryButtons[i] as HTMLElement;

    subcategoryButton.innerHTML = `${name}`;
    subcategoryButton.id = id;
  });
  parent.after(container);
}
