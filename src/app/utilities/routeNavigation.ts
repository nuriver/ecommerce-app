import customerInStorage from './customerInStorage';
import pageToggle from './pageToggle';

export default function routeNavigation(main: HTMLElement, login: HTMLElement, registration: HTMLElement) {
  const currentRoute = window.location.hash;
  if (customerInStorage()) {
    pageToggle(main, 'main');
  } else {
    if (currentRoute === '#/login') {
      pageToggle(login, 'login');
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
      pageToggle(main, 'main');
    } else if (currentRoute === '#/registration') {
      pageToggle(registration, 'registration');
    } else {
      pageToggle(main, 'main');
    }
  }
}
