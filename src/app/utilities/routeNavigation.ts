import customerInStorage from './customerInStorage';
import pageToggle from './pageToggle';

const workingRoutes = ['#/login', '#/main', '#/registration'];

export default function routeNavigation(
  main: HTMLElement,
  login: HTMLElement,
  registration: HTMLElement,
  profile: HTMLElement,
  catalog: HTMLElement,
  wrongRoute: HTMLElement,
  viaUrlBar: boolean
) {
  const currentRoute = window.location.hash;
  const signInRouting = () => {
    if (workingRoutes.includes(currentRoute)) {
     pageToggle(main, 'main');
    } else if (currentRoute === '#/profile') {
      pageToggle(profile, 'profile');
    } else if (currentRoute === '#/catalog') {
      pageToggle(catalog);
      const allCategory = document.querySelector('.all-category') as HTMLElement;
      allCategory.click();
    } else {
     pageToggle(wrongRoute, '404');
    }
   };
  const signOutRoutingManually = () => {
    if (currentRoute === '#/login') {
      pageToggle(login);
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
      pageToggle(main);
    } else if (currentRoute === '#/registration') {
      pageToggle(registration);
    } else if (currentRoute === '#/profile') {
      pageToggle(profile);
    } else if (currentRoute === '#/catalog') {
      pageToggle(catalog);
      const allCategory = document.querySelector('.all-category') as HTMLElement;
      allCategory.click();
    } else {
      pageToggle(wrongRoute);
    }
  };

  const signOutRoutingAuto = () => {
    if (currentRoute === '#/login') {
      pageToggle(login, 'login');
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '') {
      pageToggle(main, 'main');
    } else if (currentRoute === '#/registration') {
      pageToggle(registration, 'registration');
    } else if (currentRoute === '#/profile') {
      pageToggle(profile, 'profile');
    } else if (currentRoute === '#/catalog') {
      pageToggle(catalog, 'catalog');
      const allCategory = document.querySelector('.all-category') as HTMLElement;
      allCategory.click();
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
