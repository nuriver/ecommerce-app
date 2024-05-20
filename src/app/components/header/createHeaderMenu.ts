import createElement from '../../utilities/createElement';
import toggleMenu from './toggleMenu';

const headerLinks = [
  { name: 'CATALOG', href: '#' },
  { name: 'MAIN', href: '#/main' },
  { name: 'ABOUT US', href: '#' },
  { name: 'LOGIN', href: '#/login' },
  { name: 'REGISTRATION', href: '#/registration' },
];

function createHeaderMenu(container: HTMLElement): void {
  const header = createElement('div', ['header-menu'], container);
  headerLinks.forEach((link) => {
    const headerLink = createElement('a', ['header-link', 'hoverline'], header, `${link.name}`);
    headerLink.addEventListener('click', toggleMenu);

    headerLink.href = `${link.href}`;
  });

  window.addEventListener('resize', () => {
    const showBurgerScreenWidth = 900;
    if (header.classList.contains('header-menu--show') && window.innerWidth > showBurgerScreenWidth) {
      const { body } = document;
      header.classList.remove('header-menu--show');
      body.classList.remove('body-locked');
    }
  });
}

export default createHeaderMenu;
