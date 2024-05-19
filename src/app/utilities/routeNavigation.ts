import customerInStorage from './customerInStorage';
import pageToggle from './pageToggle';

export default function routeNavigation(
  main: HTMLElement,
  login: HTMLElement,
  registration: HTMLElement,
  viaUrlBar: boolean
) {
  const currentRoute = window.location.hash;
  if (!viaUrlBar) {
    if (customerInStorage()) {
      pageToggle(main, 'main');
    } else if (currentRoute === '#/login') {
      pageToggle(login, 'login');
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
      pageToggle(main, 'main');
    } else if (currentRoute === '#/registration') {
      pageToggle(registration, 'registration');
    } else {
      pageToggle(main, 'main');
    }
  } else if (customerInStorage()) {
    pageToggle(main, 'main');
  } else if (currentRoute === '#/login') {
    pageToggle(login);
  } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
    pageToggle(main);
  } else if (currentRoute === '#/registration') {
    pageToggle(registration);
  } else {
    pageToggle(main);
  }
}
