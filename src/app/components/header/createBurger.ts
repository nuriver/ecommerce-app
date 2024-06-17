import createElement from '../../utilities/createElement';
import toggleMenu from './toggleMenu';

function createBurger(container: HTMLElement): void {
  const burger = createElement('div', ['burger'], container);
  createElement('div', ['burger-part'], burger);
  createElement('div', ['burger-part'], burger);
  burger.addEventListener('click', toggleMenu);
}

export default createBurger;
