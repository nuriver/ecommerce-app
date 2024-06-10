// import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import createElement from '../../utilities/createElement';
import getCartsByCustomerId from './createrCustomerCart';
import { getCurrentCustomerCart } from '../../api/SDK/client';
import createBasketProductCard from './addBasketProductCard';
// import getCustomerById from './getCustomerBuId';

export default function createBasketPage(): HTMLDivElement {
  // if (localStorage.getItem('customer')) {
  //     const customerString: string = localStorage.getItem('customer') as string;
  //       const customerId:string = JSON.parse(customerString).id;

  //     getCartsByCustomerId(customerId)
  // }
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

  //   createBasketProductCard(goodsInBasketBlock);
  //   createBasketProductCard(goodsInBasketBlock);
  //   createBasketProductCard(goodsInBasketBlock);

  const emptyWrapper: HTMLElement = createElement('div', ['basket-page__empty-wrapper'], basketWrapper);
  const emptyMassage: HTMLElement = createElement(
    'h1',
    ['basket-page__empty-massage'],
    emptyWrapper,
    'Basket is Empty, please go to catalog!'
  );
  //   const basketToCatalogLink = createElement('a', ['header-link', 'hoverline'], emptyWrapper, 'CATALOG');
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
    const productsInBasket = customerCart.body.results[0].lineItems;
    console.log(productsInBasket);
    productsInBasket.forEach((element) => {
      createBasketProductCard(
        element.name.en,
        element.price.value.centAmount / 100,
        element.price.value.currencyCode,
        goodsInBasketBlock
      );
    });
  }, 1500);

  getCartsByCustomerId('be57bafe-d61b-4919-b690-1b6343d8cbaa');
  return basketPage;
}
