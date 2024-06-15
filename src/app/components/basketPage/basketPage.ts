import { CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import createElement from '../../utilities/createElement';
import { deleteProductFromCart, getCurrentCustomerCart } from '../../api/SDK/client';
import createBasketProductCard from './addBasketProductCard';

export default async function createBasketPage(): Promise<HTMLDivElement> {
  const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
    new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await getCurrentCustomerCart());
      }, 250);
    });

  const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
  const productsInBasket = customerCart.body.results[0]?.lineItems;
  const totalSumBasket = customerCart.body.results[0]?.totalPrice.centAmount;

  const basketPage: HTMLDivElement = createElement('div', ['basket-page']);

  if (customerCart.body.results[0]?.lineItems.length > 0) {
    const basketWrapper: HTMLDivElement = createElement('div', ['basket-page__wrapper'], basketPage);

    createElement('h1', ['basket-page__title'], basketWrapper, 'BASKET');

    const goodsInBasketBlock: HTMLDivElement = createElement('div', ['basket-page__goods-basket-block'], basketWrapper);

    const promoBlock: HTMLDivElement = createElement('div', ['basket-page__promo-block'], basketWrapper);
    createElement('h2', ['basket-block__title'], promoBlock, 'Promo code:');
    const promoInput: HTMLInputElement = createElement(
      'input',
      ['basket-page__input', 'promo-block__input'],
      promoBlock
    );
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
    const clearBasketBtn: HTMLButtonElement = createElement(
      'button',
      ['button', 'promo-block__clear-basket-button'],
      totalSumBlock,
      'Clear basket'
    );

    const clearBasketModalWindow: HTMLDivElement = createElement(
      'div',
      ['basket-page__clear-basket-modal', 'basket-page__clear-basket-modal-hidden'],
      basketPage
    );
    clearBasketModalWindow.setAttribute('id', 'no-blur');
    const clearBasketMessage: HTMLDivElement = createElement(
      'h1',
      ['clear-basket-modal__message'],
      clearBasketModalWindow,
      'Are you really insist on clearing your cart?'
    );
    const confirmClearBasket: HTMLButtonElement = createElement(
      'button',
      ['button', 'clear-basket-modal__clear-basket-btn'],
      clearBasketModalWindow,
      'CONFIRM'
    );
    const cancelClearBasket: HTMLButtonElement = createElement(
      'button',
      ['button', 'clear-basket-modal__cancel-clear-btn'],
      clearBasketModalWindow,
      'CANCEL'
    );

    clearBasketBtn.addEventListener('click', () => {
      if (clearBasketModalWindow.classList.contains('basket-page__clear-basket-modal-hidden')) {
        clearBasketModalWindow.classList.remove('basket-page__clear-basket-modal-hidden');
        basketWrapper.style.filter = 'blur(5px)';
      }
    });

    cancelClearBasket.addEventListener('click', () => {
      if (!clearBasketModalWindow.classList.contains('basket-page__clear-basket-modal-hidden')) {
        clearBasketModalWindow.classList.add('basket-page__clear-basket-modal-hidden');
        basketWrapper.style.filter = 'none';
      }
    });

    confirmClearBasket.addEventListener('click', async () => {
      if (!clearBasketModalWindow.classList.contains('basket-page__clear-basket-modal-hidden')) {
        clearBasketModalWindow.classList.add('basket-page__clear-basket-modal-hidden');
      }
      basketWrapper.style.filter = 'none';

      clearBasketBtn.disabled = true;
      // const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
      //   new Promise((resolve) => {
      //     setTimeout(async () => {
      //       resolve(await getCurrentCustomerCart());
      //     }, 250);
      //   });
      //   const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
      // const allCardsInBasket = customerCart.body.results[0].lineItems;
      // allCardsInBasket.forEach(card => {
      //     deleteProductFromCart(card.productId)
      // })
      //       for (const item of customerCart.body.results[0].lineItems) {
      //         const changedCart = await this.carts.removeProductOnCart(item.id);
      //   }
      //
    });

    productsInBasket.forEach((element) => {
      if (element.price.discounted) {
        createBasketProductCard(
          element.id,
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
          element.id,
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
    totalSumDisplay.innerHTML = (totalSumBasket / 100).toFixed(2);
  } else {
    const emptyWrapper: HTMLElement = createElement('div', ['basket-page__empty-wrapper'], basketPage);
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
  }

  return basketPage;
}
