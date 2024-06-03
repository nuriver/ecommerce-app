import createElement from '../../utilities/createElement';
import customerInStorage from '../../utilities/customerInStorage';
import toggleMenu from './toggleMenu';

const headerLinks = [
  { name: 'CATALOG', href: '#/catalog' },
  { name: 'MAIN', href: '#/main' },
  { name: 'ABOUT US', href: '#/404' },
  { name: 'LOGIN', href: '#/login' },
  { name: 'PROFILE', href: '#/profile' },
  { name: 'REGISTRATION', href: '#/registration' },
];

function createHeaderMenu(container: HTMLElement): void {
  const header = createElement('div', ['header-menu'], container);
  headerLinks.forEach((link) => {
    const headerLink = createElement('a', ['header-link', 'hoverline'], header, `${link.name}`);

    headerLink.addEventListener('click', toggleMenu);
    headerLink.href = `${link.href}`;
    if (link.name === 'PROFILE') {
      headerLink.classList.add('header-link-profile-hidden');
      headerLink.classList.add('header-link-profile');
    }
    if (link.name === 'LOGIN') {
      headerLink.classList.add('header-link-login');
      headerLink.addEventListener('click', () => {
        if (customerInStorage()) {
          localStorage.clear();
          window.location.href = '#/login';
          headerLink.innerText = 'LOGIN';
          const allHeaderLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.header-link');
          allHeaderLinks.forEach((myLink) => {
            if (
              myLink.classList.contains('header-link-profile') &&
              !myLink.classList.contains('header-link-profile-hidden')
            ) {
              myLink.classList.add('header-link-profile-hidden');
            }
          });
        }
      });
    }
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
