import createElement from '../../utilities/createElement';

export default function createFooter(parent: HTMLElement): HTMLElement {
  const footerBlock = createElement('div', ['footer'], parent);
  const footerCont = createElement('div', ['footer-cont'], footerBlock);
  createElement('p', ['footer-text'], footerCont, 'Rolling Scopes School');
  createElement('p', ['footer-text'], footerCont, 'FUNC CRAFTERS');
  createElement('p', ['footer-text'], footerCont, '2024');
  return footerBlock;
}
