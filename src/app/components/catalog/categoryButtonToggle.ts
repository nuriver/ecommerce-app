export default function categoryButtonToggle(button: HTMLElement) {
  const previousActiveCategory = document.querySelector('.category-active');
  if (previousActiveCategory) previousActiveCategory.classList.remove('category-active');

  button.classList.add('category-active');
}
