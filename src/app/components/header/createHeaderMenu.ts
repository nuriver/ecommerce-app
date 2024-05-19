import createElement from '../../utilities/createElement';
import customerInStorage from '../../utilities/customerInStorage';
import toggleMenu from './toggleMenu';

const headerLinks = [
  { name: 'CATALOG', href: '#/404' },
  { name: 'MAIN', href: '#/main' },
  { name: 'ABOUT US', href: '#/404' },
  { name: 'LOGIN', href: '#/login' },
  { name: 'REGISTRATION', href: '#/registration' },
];

function createHeaderMenu(container: HTMLElement): void {
  const header = createElement('div', ['header-menu'], container);
  headerLinks.forEach((link) => {
    const headerLink = createElement('a', ['header-link', 'hoverline'], header, `${link.name}`);

    headerLink.addEventListener('click', toggleMenu);
    headerLink.href = `${link.href}`;

    if (link.name === 'LOGIN') {
      headerLink.classList.add('header-link-login');
      headerLink.addEventListener('click', () => {
        if (customerInStorage()) {
          sessionStorage.clear();
          window.location.href = '#/login';
          headerLink.innerText = 'LOGIN';
        }
      });
    }
  });
}

export default createHeaderMenu;
