import createElement from '../../utilities/createElement';
import { updateCustomerById } from '../profilePage/updateCustomer';

export default function createBasketProductCard(
  productName: string,
  productPrice: number,
  currency: string,
  block: HTMLDivElement
): HTMLDivElement {
  const cardProduct: HTMLDivElement = createElement('div', ['basket-page__card-product'], block);
  const cardProductImgPart: HTMLDivElement = createElement('div', ['card-product__img-part'], cardProduct);
  const cardProductDataPart: HTMLDivElement = createElement('div', ['card-product__data-part'], cardProduct);
  const cardProductTitle: HTMLHeadingElement = createElement(
    'h2',
    ['card-product__data', 'card-product__title'],
    cardProductDataPart
  );
  cardProductTitle.innerHTML = `${productName}`;
  const cardProductImg: HTMLImageElement = createElement('img', ['card-product__img'], cardProductImgPart);
  // cardProductImg.innerHTML = ;
  const cardProductprice: HTMLHeadingElement = createElement(
    'h2',
    ['card-product__data', 'card-product__price'],
    cardProductDataPart
  );
  cardProductprice.innerHTML = `${productPrice} ${currency}`;

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
  const cardProductPrice: HTMLDivElement = createElement(
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
  cardProductQuantity.addEventListener('input', () => {
    cardProductPrice.innerHTML = `${+cardProductQuantity.value * productPrice} ${currency}`;
  });
  return cardProduct;
}
