import createElement from '../../utilities/createElement';
import { updateCustomerById } from '../profilePage/updateCustomer';
import changeQtyProducts from './changeProductQuantity';

export default function createBasketProductCard(
  image: string,
  productName: string,
  finishPrice: string,
  currency: string,
  // id: string,
  block: HTMLDivElement,
  startPrice?: string
): HTMLDivElement {
  const cardProduct: HTMLDivElement = createElement('div', ['basket-page__card-product'], block);
  const cardProductImgPart: HTMLDivElement = createElement('div', ['card-product__img-part'], cardProduct);

  console.log(cardProductImgPart.style.backgroundImage);

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
  // cardProductQuantity.addEventListener('input', () => {
  //   cardProductTotalSum.innerHTML = `${+cardProductQuantity.value * +finishPrice} ${currency}`;
  // });
  return cardProduct;
}
