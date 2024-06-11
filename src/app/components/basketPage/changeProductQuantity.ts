import { updateCart } from '../../api/SDK/client';

export default function changeQtyProducts(element: HTMLElement) {
  element.addEventListener('change', async (event) => {
    const quantity: HTMLInputElement = event.target as HTMLInputElement;
    if (+quantity.value < 1) {
      quantity.value = '1';
    }
    if (+quantity.value > 999) {
      quantity.value = '999';
    }

    quantity.disabled = true;
    await updateCart(element.id, +quantity.value);
    quantity.disabled = false;
    window.location.href = '#/basket';
  });
}
