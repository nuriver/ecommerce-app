import { Cart, CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import createElement from '../../utilities/createElement';
import applyPromo, { clearCart, getCurrentCustomerCart } from '../../api/SDK/client';
import createBasketProductCard from './addBasketProductCard';
import addEmptyBasketPage from './addEmptyBasketPage';
import { hideLoadIndicator, showLoadIndicator } from '../../api/SDK/loadIndicator';

export default async function createBasketPage(): Promise<HTMLDivElement> {
  const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
    new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await getCurrentCustomerCart());
      }, 250);
    });

  const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
  const productsInBasket = customerCart.body.results[0]?.lineItems;

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
      'APPLY PROMO'
    );

    const totalSumBlock: HTMLDivElement = createElement('div', ['basket-page__total-sum-block'], basketWrapper);
    createElement('h2', ['basket-block__title'], totalSumBlock, 'Total, USD:');
    const totalSumDisplay: HTMLDivElement = createElement('div', ['total-sum-block__sum'], totalSumBlock);
    const totalSumDisplayDiscounted: HTMLDivElement = createElement(
      'div',
      ['total-sum-block__sum-discounted'],
      totalSumBlock
    );
    const clearBasketBtn: HTMLButtonElement = createElement(
      'button',
      ['button', 'promo-block__clear-basket-button'],
      totalSumBlock,
      'CLEAR BASKET'
    );

    const clearBasketModalWindow: HTMLDivElement = createElement(
      'div',
      ['basket-page__clear-basket-modal', 'basket-page__clear-basket-modal-hidden'],
      basketPage
    );
    clearBasketModalWindow.setAttribute('id', 'no-blur');
    createElement(
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

    if (customerCart.body.results[0].discountCodes.length) {
      const promoIdToSave: string = customerCart.body.results[0].discountCodes[0].discountCode.id;
      localStorage.setItem('promoId', promoIdToSave);
      const totalPriceWithDiscont: string = (
        (customerCart.body.results[0].totalPrice.centAmount as number) / 100
      ).toFixed(2);
      const totalPrice: string = (
        +totalPriceWithDiscont +
        (customerCart.body.results[0].discountOnTotalPrice?.discountedAmount.centAmount as number) / 100
      ).toFixed(2);

      (totalSumDisplay as HTMLDivElement).innerHTML = totalPrice;
      (totalSumDisplayDiscounted as HTMLDivElement).innerHTML = totalPriceWithDiscont;
      totalSumDisplay.style.textDecoration = 'line-through';
      totalSumDisplayDiscounted.style.color = 'red';
    } else {
      (totalSumDisplay as HTMLDivElement).innerHTML = (
        customerCart.body.results[0].totalPrice.centAmount / 100
      ).toFixed(2);
    }

    promoApplyBtn.addEventListener('click', async () => {
      const currentPromoId = localStorage.getItem('promoId') ? localStorage.getItem('promoId') : '';
      showLoadIndicator();
      try {
        const cartWithPromo: ClientResponse<Cart> = await applyPromo(promoInput.value);
        const newPromoId: string = cartWithPromo.body.discountCodes[0].discountCode.id;
        if (currentPromoId !== newPromoId) {
          promoApplyBtn.innerText = 'Success';
          promoApplyBtn.style.backgroundColor = 'green';

          setTimeout(() => {
            window.location.href = '#/basket';
          }, 1000);
          if (!localStorage.getItem('promoId')) {
            localStorage.setItem('promoId', `${newPromoId}`);
          }
          const totalPriceWithDiscont: string = ((cartWithPromo.body.totalPrice.centAmount as number) / 100).toFixed(2);
          const totalPrice: string = (
            +totalPriceWithDiscont +
            (cartWithPromo.body.discountOnTotalPrice?.discountedAmount.centAmount as number) / 100
          ).toFixed(2);

          (totalSumDisplay as HTMLDivElement).innerHTML = totalPrice;
          (totalSumDisplayDiscounted as HTMLDivElement).innerHTML = totalPriceWithDiscont;
          totalSumDisplay.style.textDecoration = 'line-through';
          totalSumDisplayDiscounted.style.color = 'red';
        } else {
          promoApplyBtn.innerText = 'Already used';
          promoApplyBtn.style.backgroundColor = 'red';
          promoInput.value = '';
          setTimeout(() => {
            window.location.href = '#/basket';
          }, 1000);
        }
      } catch {
        promoApplyBtn.innerText = 'Invalid promo';
        promoApplyBtn.style.backgroundColor = 'red';
        promoInput.value = '';

        setTimeout(() => {
          window.location.href = '#/basket';
        }, 1000);
      } finally {
        setTimeout(() => {
          promoApplyBtn.innerText = 'Apply promo';
          promoApplyBtn.style.backgroundColor = 'black';
        }, 2000);
        hideLoadIndicator();
      }
    });

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
      await clearCart(customerCart.body.results[0].id);
      const basketPageWrapper: HTMLDivElement = document.querySelector('.basket-page') as HTMLDivElement;
      basketPageWrapper.innerHTML = '';
      const basketStatus: HTMLDivElement = document.querySelector('.header__basket-status') as HTMLDivElement;
      basketStatus.innerHTML = '0';

      addEmptyBasketPage(basketPageWrapper);
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
  } else {
    addEmptyBasketPage(basketPage);
  }

  return basketPage;
}
