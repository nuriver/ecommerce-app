import createElement from '../../utilities/createElement';

export default function addEmptyBasketPage(block: HTMLDivElement) {
  const emptyWrapper: HTMLElement = createElement('div', ['basket-page__empty-wrapper'], block);
  createElement('div', ['basket-page__empty-page-image'], emptyWrapper);
  const textAndBtnBlock: HTMLDivElement = createElement('div', ['basket-page__empty-text-block'], emptyWrapper);
  createElement(
    'div',
    ['basket-page__empty-message'],
    textAndBtnBlock,
    `We searched high and low with Stephy Langui but found nothing in your basket.<br><br>It seems like it's time to fill it up!`
  );
  const basketToCatalogBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'basket-page__to-catalog-button'],
    textAndBtnBlock,
    'To catalog'
  );
  basketToCatalogBtn.addEventListener('click', () => {
    window.location.href = '#/catalog';
  });

  return emptyWrapper;
}
