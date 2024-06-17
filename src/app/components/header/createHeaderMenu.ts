import { CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import { getCurrentCustomerCart, startAnonymousSession } from '../../api/SDK/client';
import createElement from '../../utilities/createElement';
import customerInStorage from '../../utilities/customerInStorage';
import toggleMenu from './toggleMenu';

const headerLinks = [
  { name: 'CATALOG', href: '#/catalog' },
  { name: 'MAIN', href: '#/main' },
  { name: 'ABOUT US', href: '#/about' },
  { name: 'LOGIN', href: '#/login' },
  { name: 'PROFILE', href: '#/profile' },
  { name: 'REGISTRATION', href: '#/registration' },
  { name: 'BASKET', href: '#/basket' },
];

function createHeaderMenu(container: HTMLElement): void {
  const header = createElement('div', ['header-menu'], container);
  headerLinks.forEach(async (link) => {
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
          const basketStatus: HTMLDivElement = document.querySelector('.header__basket-status') as HTMLDivElement;
          basketStatus.innerHTML = '0';

          startAnonymousSession();
        }
      });
    }
    if (link.name === 'BASKET') {
      const returnCustomerCartAfterHalfSecond = async (): Promise<ClientResponse<CartPagedQueryResponse>> =>
        new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await getCurrentCustomerCart());
          }, 250);
        });

      const customerCart: ClientResponse<CartPagedQueryResponse> = await returnCustomerCartAfterHalfSecond();
      headerLink.classList.add('header__basket');
      if (customerCart.body.results.length > 0) {
        const totalQty: number = customerCart.body.results[0].totalLineItemQuantity
          ? +customerCart.body.results[0].totalLineItemQuantity
          : 0;
        createElement('div', ['header__basket-status'], headerLink, `${totalQty}`);
      } else {
        createElement('div', ['header__basket-status'], headerLink, '0');
      }
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
