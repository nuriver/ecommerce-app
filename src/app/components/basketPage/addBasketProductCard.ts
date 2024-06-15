import { CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import { deleteProductFromCart, getCurrentCustomerCart, updateCart, updateQtyCart } from '../../api/SDK/client';
import { hideLoadIndicator, showLoadIndicator } from '../../api/SDK/loadIndicator';
import createElement from '../../utilities/createElement';
import addEmptyBasketPage from './addEmptyBasketPage';

export default function createBasketProductCard(
  id: string,
  image: string,
  productName: string,
  finishPrice: string,
  currency: string,
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
  const quantitySelector: HTMLDivElement = createElement(
    'div',
    ['quantity-block__quantity-selector'],
    cardProductQuantityBlock
  );
  const buttonMinus: HTMLButtonElement = createElement(
    'button',
    ['quantity-selector__button', 'quantity-selector__button-minus'],
    quantitySelector,
    '-'
  );
  const cardProductQuantity: HTMLDivElement = createElement('div', ['quantity-block__quantity'], quantitySelector);
  const buttonPlus: HTMLButtonElement = createElement(
    'button',
    ['quantity-selector__button', 'quantity-selector__button-plus'],
    quantitySelector,
    '+'
  );

  // cardProductQuantity.min = '1';
  // cardProductQuantity.max = '999';
  //   const cardProductQuantity: HTMLInputElement = createElement(
  //     'input',
  //     ['quantity-block__quantity'],
  //     cardProductQuantityBlock
  //   );
  cardProductQuantity.innerHTML = `${quantity}`;
  if (quantity === '1') {
    buttonMinus.disabled = true;
  }
  if (quantity === '999') {
    buttonPlus.disabled = true;
  }
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
    cardProductTotalPrice,
    `${(+cardProductQuantity.innerHTML * +finishPrice).toFixed(2)}`
  );

  const cardProductRemoveBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'card-product__button'],
    cardProductDataPart,
    'Remove'
  );

  cardProductRemoveBtn.addEventListener('click', async () => {
    const cartTotalPrice: HTMLDivElement = document.querySelector('.total-sum-block__sum') as HTMLDivElement;

    await deleteProductFromCart(productId);
    cardProduct.remove();

    if (!block.firstChild) {
      const basketPageWrapper: HTMLDivElement = document.querySelector('.basket-page') as HTMLDivElement;
      basketPageWrapper.innerHTML = '';
      addEmptyBasketPage(basketPageWrapper);
    }
    const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
      new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await getCurrentCustomerCart());
        }, 250);
      });
    const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
    cartTotalPrice.innerHTML = `${(customerCart.body.results[0].totalPrice.centAmount / 100).toFixed(2)}`;

    const totalQty: number = customerCart.body.results[0].totalLineItemQuantity
      ? +customerCart.body.results[0].totalLineItemQuantity
      : 0;
    const basketStatus: HTMLDivElement = document.querySelector('.header__basket-status') as HTMLDivElement;
    basketStatus.innerHTML = totalQty.toString();
    hideLoadIndicator();
  });

  buttonMinus.addEventListener('click', async () => {
    if (+quantity > 1) {
      const cartTotalPrice: HTMLDivElement = document.querySelector('.total-sum-block__sum') as HTMLDivElement;
      try {
        buttonMinus.disabled = true;
        buttonPlus.disabled = true;
        cardProductQuantity.innerHTML = (+cardProductQuantity.innerHTML - 1).toString();
        cardProductTotalSum.innerHTML = `${(+cardProductQuantity.innerHTML * +finishPrice).toFixed(2)} ${currency}`;
        showLoadIndicator();
        await updateQtyCart(id, +cardProductQuantity.innerHTML);
        const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
          new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await getCurrentCustomerCart());
            }, 250);
          });
        const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
        cartTotalPrice.innerHTML = `${(customerCart.body.results[0].totalPrice.centAmount / 100).toFixed(2)}`;
        const totalQty: number = customerCart.body.results[0].totalLineItemQuantity
          ? +customerCart.body.results[0].totalLineItemQuantity
          : 0;
        const basketStatus: HTMLDivElement = document.querySelector('.header__basket-status') as HTMLDivElement;
        basketStatus.innerHTML = totalQty.toString();
      } catch (error) {
        console.error((error as Error).message);
      } finally {
        hideLoadIndicator();
        buttonMinus.disabled = false;
        buttonPlus.disabled = false;
      }
    }
    if (cardProductQuantity.innerHTML === '1') {
      buttonMinus.disabled = true;
    }
  });

  buttonPlus.addEventListener('click', async () => {
    const cartTotalPrice: HTMLDivElement = document.querySelector('.total-sum-block__sum') as HTMLDivElement;
    try {
      buttonMinus.disabled = true;
      buttonPlus.disabled = true;
      cardProductQuantity.innerHTML = (+cardProductQuantity.innerHTML + 1).toString();
      cardProductTotalSum.innerHTML = `${(+cardProductQuantity.innerHTML * +finishPrice).toFixed(2)} ${currency}`;
      showLoadIndicator();
      await updateQtyCart(id, +cardProductQuantity.innerHTML);
      const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
        new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await getCurrentCustomerCart());
          }, 250);
        });
      const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
      cartTotalPrice.innerHTML = `${(customerCart.body.results[0].totalPrice.centAmount / 100).toFixed(2)}`;
      const totalQty: number = customerCart.body.results[0].totalLineItemQuantity
        ? +customerCart.body.results[0].totalLineItemQuantity
        : 0;
      const basketStatus: HTMLDivElement = document.querySelector('.header__basket-status') as HTMLDivElement;
      basketStatus.innerHTML = totalQty.toString();
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      hideLoadIndicator();
      buttonMinus.disabled = false;
      buttonPlus.disabled = false;
    }

    if ((cardProductQuantity as HTMLInputElement).value === '999') {
      buttonPlus.disabled = true;
    }
  });

  return cardProduct;
}
