import createElement from '../../utilities/createElement';
import createBurger from './createBurger';
import createHeaderMenu from './createHeaderMenu';

export default function createHeader(parent: HTMLElement) {
  const header: HTMLDivElement = createElement('div', ['header'], parent);

  createHeaderMenu(header);
  createBurger(header);
}
