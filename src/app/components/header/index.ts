import createElement from '../../utilities/createElement';
import createBurger from './createBurger';
import createHeaderMenu from './createHeaderMenu';

export default function createHeader(parent: HTMLElement) {
  const header: HTMLDivElement = createElement('div', ['header'], parent);
  const wrapper: HTMLDivElement = createElement('div', ['header__wrapper'], header);

  createHeaderMenu(wrapper);
  createBurger(wrapper);
}
