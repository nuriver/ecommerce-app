import createElement from '../../utilities/createElement';

export default function addEmptyBasketPage(block: HTMLDivElement) {
  const emptyWrapper: HTMLElement = createElement('div', ['basket-page__empty-wrapper'], block);
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

  return emptyWrapper;
}
