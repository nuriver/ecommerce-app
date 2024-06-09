import { startAnonymousSession } from '../../api/SDK/client';
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
  { name: 'BASKET', href: '#/basket' },
];

function createHeaderMenu(container: HTMLElement): void {
  const header = createElement('div', ['header-menu'], container);
  headerLinks.forEach((link) => {
    const headerLink = createElement('a', ['header-link', 'hoverline'], header, `${link.name}`);

    headerLink.addEventListener('click', toggleMenu);
    headerLink.href = `${link.href}`;
    if (link.name === 'PROFILE') {
      headerLink.classList.add('header-link-profile');
      if (!customerInStorage()) {
        headerLink.classList.add('header-link-profile-hidden');
      }
    }
    if (link.name === 'REGISTRATION') {
      headerLink.classList.add('header-link-registration');
      if (customerInStorage()) {
        headerLink.classList.add('header-link-registration-hidden');
      }
    }
    if (link.name === 'LOGIN') {
      headerLink.classList.add('header-link-login');
      headerLink.addEventListener('click', () => {
        const headerProfileLink: HTMLAnchorElement | null = document.querySelector('.header-link-profile');
        const headerRegistrationLink: HTMLAnchorElement | null = document.querySelector('.header-link-registration');

        if (customerInStorage()) {
          localStorage.clear();
          window.location.href = '#/login';
          headerLink.innerText = 'LOGIN';
          headerProfileLink?.classList.add('header-link-profile-hidden');
          if (headerRegistrationLink?.classList.contains('header-link-registration-hidden')) {
            headerRegistrationLink?.classList.remove('header-link-registration-hidden');
          }

          startAnonymousSession();
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
