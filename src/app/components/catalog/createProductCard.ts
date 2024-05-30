import { ProductData } from '../../types/types';
import createElement from '../../utilities/createElement';

export default function createProductCard(product: ProductData, parent: HTMLElement): void {
  const productCard = createElement('div', ['product-card'], parent);
  const productImg = createElement('div', ['product-image'], productCard);
  productImg.style.backgroundImage = `url(${product.image})`;
  createElement('p', ['product-name'], productCard, product.name);
  createElement('p', ['product-description'], productCard, product.description);
  createElement('p', ['product-price'], productCard, `${product.price}$`);
  const bagRegex = /\bbag\b/i;
  const noteRegex = /\bnotebook\b/i;
  if (bagRegex.test(product.name)) {
    productImg.classList.add('bag-image');
  }
  if (noteRegex.test(product.name)) {
    productImg.classList.add('notebook-image');
  }
}
