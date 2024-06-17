import createBasketPage from '../components/basketPage/basketPage';
import displayBySlug from '../components/catalog/displayBySlug';
import { modalState } from '../components/detailedProductPage/detailedProductPage';
import customerInStorage from './customerInStorage';
import pageToggle from './pageToggle';

const workingRoutes = ['#/login', '#/main', '#/registration', '#/about'];
const productRoutePattern = /^#\/catalog\/((?:\w+-)+\w+)$/;

export default function routeNavigation(
  main: HTMLElement,
  login: HTMLElement,
  registration: HTMLElement,
  profile: HTMLElement,
  catalog: HTMLElement,
  about: HTMLElement,
  wrongRoute: HTMLElement,
  viaUrlBar: boolean
) {
  const currentRoute = window.location.hash;
  const signInRouting = async () => {
    if (workingRoutes.includes(currentRoute)) {
      pageToggle(main, 'main');
    } else if (currentRoute === '#/profile') {
      pageToggle(profile, 'profile');
    } else if (currentRoute === '#/catalog') {
      pageToggle(catalog);
      if (modalState.value === false) {
        const allCategory = document.querySelector('.all-category') as HTMLElement;
        allCategory.click();
      }
      modalState.value = false;

    } else if (currentRoute === '#/basket') {
      pageToggle(await createBasketPage(), 'basket');

    } else if (currentRoute === '#/about') {
      pageToggle(about, 'about');

    } else if (currentRoute.match(productRoutePattern)) {
      displayBySlug(currentRoute);
    } else {
      pageToggle(wrongRoute, '404');
    }
  };
  const signOutRoutingManually = async () => {
    if (currentRoute === '#/login') {
      pageToggle(login);
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
      pageToggle(main);
    } else if (currentRoute === '#/registration') {
      pageToggle(registration);
    } else if (currentRoute === '#/profile') {
      pageToggle(login);
    } else if (currentRoute.match(productRoutePattern)) {
      displayBySlug(currentRoute);
    } else if (currentRoute === '#/catalog') {
      pageToggle(catalog);
      if (modalState.value === false) {
        const allCategory = document.querySelector('.all-category') as HTMLElement;
        allCategory.click();
      }
      modalState.value = false;

    } else if (currentRoute === '#/basket') {
      pageToggle(await createBasketPage());

    } else if (currentRoute === '#/about') {
      pageToggle(about, 'about');

    } else {
      pageToggle(wrongRoute);
    }
  };

  const signOutRoutingAuto = async () => {
    if (currentRoute === '#/login') {
      pageToggle(login, 'login');
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '') {
      pageToggle(main, 'main');
    } else if (currentRoute === '#/registration') {
      pageToggle(registration, 'registration');
    } else if (currentRoute === '#/profile') {
      pageToggle(login, 'login');
    } else if (currentRoute === '#/basket') {
      pageToggle(await createBasketPage(), 'basket');
    } else if (currentRoute.match(productRoutePattern)) {
      displayBySlug(currentRoute);
    } else if (currentRoute === '#/catalog') {
      pageToggle(catalog, 'catalog');
      if (!modalState.value) {
        const allCategory = document.querySelector('.all-category') as HTMLElement;
        allCategory.click();
      }
      modalState.value = false;
    } else if (currentRoute === '#/about') {
      pageToggle(about, 'about');
    } else {
      pageToggle(wrongRoute, '404');
    }
  };

  if (!viaUrlBar) {
    if (customerInStorage()) {
      signInRouting();
    } else {
      signOutRoutingAuto();
    }
  }

  if (viaUrlBar) {
    if (customerInStorage()) {
      signInRouting();
    } else {
      signOutRoutingManually();
    }
  }
}
