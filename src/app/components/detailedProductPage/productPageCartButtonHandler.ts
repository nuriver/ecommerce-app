import { deleteProductFromCart, updateCart } from '../../api/SDK/client';

export default async function productPageCartButtonHandler(event: Event): Promise<void> {
  const target = event.target as HTMLButtonElement;
  const cartButton = target.closest('.product-page-cart-button') as HTMLElement;
  const cartButtonIcon = cartButton.querySelector('.product-page-cart-button-icon') as HTMLElement;
  const cartButtonText = cartButton.querySelector('.product-page-cart-button-text') as HTMLElement;
  const productCartActionMessage = document.querySelector('.product-cart-action-message') as HTMLElement;

  if (cartButton.classList.contains('remove-from-cart-button')) {
    cartButton.classList.remove('remove-from-cart-button');
    cartButtonIcon.innerText = '+';
    cartButtonText.innerText = 'ADD TO CART';
    productCartActionMessage.style.display = 'block';
    productCartActionMessage.innerText = 'Product removed from cart!';
    deleteProductFromCart(cartButton.id);
  } else {
    cartButton.classList.add('remove-from-cart-button');
    cartButtonIcon.innerText = '-';
    cartButtonText.innerText = 'REMOVE FROM CART';
    productCartActionMessage.style.display = 'block';
    productCartActionMessage.innerText = 'Product added to cart!';
    updateCart(cartButton.id);
  }
}
