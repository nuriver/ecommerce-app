import { updateCart } from '../../api/SDK/client';
import createElement from '../../utilities/createElement';

export default function createBasketProductCard(
  image: string,
  productName: string,
  finishPrice: string,
  currency: string,
  // id: string,
  block: HTMLDivElement,
  quantity: string,
  productId: string,
  startPrice?: string
): HTMLDivElement {
  const cardProduct: HTMLDivElement = createElement('div', ['basket-page__card-product'], block);
  const cardProductImgPart: HTMLDivElement = createElement('div', ['card-product__img-part'], cardProduct);
  
  cardProduct.setAttribute('id', productId);

  const cardProductDataPart: HTMLDivElement = createElement('div', ['card-product__data-part'], cardProduct);
  const cardProductTitle: HTMLHeadingElement = createElement(
    'h2',
    ['card-product__data', 'card-product__title'],
    cardProductDataPart
  );

  cardProductTitle.innerHTML = `${productName}`;

  const cardProductImg: HTMLImageElement = createElement('img', ['card-product__img'], cardProductImgPart);
  cardProductImg.style.backgroundImage = `url('${image}')`;

  const shopPrices: HTMLDivElement = createElement('div', ['card-product__shop-prices'], cardProductDataPart);
  const cardProductPrice: HTMLHeadingElement = createElement(
    'h2',
    ['card-product__data', 'card-product__price'],
    shopPrices
  );
  cardProductPrice.innerHTML = `${finishPrice} ${currency}`;
  if (startPrice) {
    const cardProductStartPrice: HTMLHeadingElement = createElement(
      'h2',
      ['card-product__data', 'card-product__discounted-price'],
      shopPrices
    );
    cardProductStartPrice.innerHTML = `${startPrice} ${currency}`;
    cardProductPrice.style.color = 'red';
    cardProductStartPrice.style.textDecoration = 'line-through';
  }

  const cardProductQuantityBlock: HTMLDivElement = createElement(
    'div',
    ['card-product__quantity-block'],
    cardProductDataPart
  );

  const cardProductQuantityTitle: HTMLDivElement = createElement(
    'div',
    ['quantity-block__title', 'card-product__data'],
    cardProductQuantityBlock,
    'Quantity:'
  );
  const cardProductQuantity: HTMLInputElement = createElement(
    'input',
    ['quantity-block__quantity'],
    cardProductQuantityBlock
  );
  cardProductQuantity.type = 'number';
  cardProductQuantity.value = `${quantity}`;
  cardProductQuantity.min = '1';
  cardProductQuantity.max = '999';

  const cardProductTotalPrice: HTMLDivElement = createElement(
    'div',
    ['card-product__price-block'],
    cardProductDataPart
  );
  const cardProductPriceTitle: HTMLDivElement = createElement(
    'div',
    ['price-block__title', 'card-product__data'],
    cardProductTotalPrice,
    'Total: '
  );
  const cardProductTotalSum: HTMLDivElement = createElement(
    'div',
    ['price-block__price'],
    cardProductTotalPrice
    // `${+cardProductQuantity.value * productPrice}`
  );

  const cardProductRemoveBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'card-product__button'],
    cardProductDataPart,
    'Remove'
  );
  cardProductQuantity.addEventListener('input', async () => {
    if (+cardProductQuantity.value < 1) {
      cardProductQuantity.value = '1';
    }
    if (+cardProductQuantity.value > 999) {
      cardProductQuantity.value = '999';
    }
    // FIX cardProductQuantity.value !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    cardProductTotalSum.innerHTML = `${+cardProductQuantity.value * +finishPrice} ${currency}`;
    await updateCart(productId, +cardProductQuantity.value);
  });
  return cardProduct;
}
