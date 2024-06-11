import createElement from '../../utilities/createElement';
import { getCurrentCustomerCart } from '../../api/SDK/client';
import createBasketProductCard from './addBasketProductCard';

export default function createBasketPage(): HTMLDivElement {
  const basketPage: HTMLDivElement = createElement('div', ['basket-page']);
  const basketWrapper: HTMLDivElement = createElement('div', ['basket-page__wrapper'], basketPage);

  createElement('h1', ['basket-page__title'], basketWrapper, 'BASKET');

  const goodsInBasketBlock: HTMLDivElement = createElement('div', ['basket-page__goods-basket-block'], basketWrapper);

  const promoBlock: HTMLDivElement = createElement('div', ['basket-page__promo-block'], basketWrapper);
  createElement('h2', ['basket-block__title'], promoBlock, 'Promo code:');
  const promoInput: HTMLInputElement = createElement('input', ['basket-page__input', 'promo-block__input'], promoBlock);
  promoInput.placeholder = 'Place your promo here';
  const promoApplyBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'promo-block__promo-apply-button'],
    promoBlock,
    'Apply promo'
  );

  const totalSumBlock: HTMLDivElement = createElement('div', ['basket-page__total-sum-block'], basketWrapper);
  createElement('h2', ['basket-block__title'], totalSumBlock, 'Total to pay:');
  const totalSumDisplay: HTMLDivElement = createElement('div', ['total-sum-block__sum'], totalSumBlock);
  totalSumDisplay.innerHTML = 'SUM';
  const cleanBasketBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'promo-block__clean-basket-button'],
    totalSumBlock,
    'Clean basket'
  );

  const emptyWrapper: HTMLElement = createElement('div', ['basket-page__empty-wrapper'], basketWrapper);
  const emptyMassage: HTMLElement = createElement(
    'h1',
    ['basket-page__empty-massage'],
    emptyWrapper,
    'Basket is Empty, please go to catalog!'
  );
  const basketToCatalogBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'basket-page__to-catalog-button'],
    emptyWrapper,
    'To catalog'
  );
  basketToCatalogBtn.addEventListener('click', () => {
    window.location.href = '#/catalog';
  });

  setTimeout(async () => {
    const customerCart = await getCurrentCustomerCart();
    localStorage.setItem('customerCart', JSON.stringify(customerCart.body.results[0].version));
    const productsInBasket = customerCart.body.results[0].lineItems;

    productsInBasket.forEach((element) => {
      if (element.price.discounted) {
        createBasketProductCard(
          element.variant.images?.[0].url as string,
          element.name.en,
          (element.price.discounted.value.centAmount / 100).toFixed(2),
          element.price.value.currencyCode,
          goodsInBasketBlock,
          element.quantity.toString(),
          element.productId,
          (element.price.value.centAmount / 100).toFixed(2)
        );
      } else {
        createBasketProductCard(
          element.variant.images?.[0].url as string,
          element.name.en,
          (element.price.value.centAmount / 100).toFixed(2),
          element.price.value.currencyCode,
          goodsInBasketBlock,
          element.quantity.toString(),
          element.productId
        );
      }
    });
  }, 1500);

  return basketPage;
}
