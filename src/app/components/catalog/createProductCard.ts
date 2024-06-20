import { ProductData } from '../../types/types';
import createElement from '../../utilities/createElement';

export default function createProductCard(product: ProductData, parent: HTMLElement, productsInCart: string[]): void {
  const productCard = createElement('div', ['product-card'], parent);
  productCard.id = product.id;
  const productImg = createElement('div', ['product-image'], productCard);
  productImg.style.backgroundImage = `url(${product.image})`;
  createElement('p', ['product-name'], productCard, product.name);
  createElement('p', ['product-description'], productCard, product.description);
  const addToCartButton = createElement('button', ['add-to-cart-button'], productCard, 'ADD TO CART');
  addToCartButton.id = product.id;
  if (productsInCart.includes(product.id)) {
    addToCartButton.disabled = true;
    addToCartButton.innerHTML = 'ADDED TO CART';
  }

  if (product.discountPrice) {
    createElement('p', ['product-price', 'product-price-discount'], productCard, `${product.discountPrice}$`);
    createElement('p', ['product-price', 'product-price-old'], productCard, `${product.price}$`);
  } else {
    createElement('p', ['product-price'], productCard, `${product.price}$`);
  }

  const bagRegex = /\bbag\b/i;
  const noteRegex = /\bnotebook\b/i;
  if (bagRegex.test(product.name)) {
    productImg.classList.add('bag-image');
  }
  if (noteRegex.test(product.name)) {
    productImg.classList.add('notebook-image');
  }
}
