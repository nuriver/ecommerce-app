import createHeader from './app/components/header';
import createElement from './app/utilities/createElement';
import './styles/style.css';
import createLoginPage from './app/components/loginPage/loginPage';
import createMain from './app/components/mainPage/mainPage';
import createRegistrationPage from './app/components/registrationPage/registrationPage';
import customerInStorage from './app/utilities/customerInStorage';
import pageToggle from './app/utilities/pageToggle';
import routeNavigation from './app/utilities/routeNavigation';

const { body } = document;

createHeader(body);
createElement('div', ['page-wrapper'], body);

const loginPage = createLoginPage();
export const mainPage = createMain();
const registerPage = createRegistrationPage();

const currentRoute = window.location.hash;

routeNavigation(mainPage, loginPage, registerPage);
if (customerInStorage()) {
  pageToggle(mainPage, 'main');
} else {
  if (currentRoute === '#/login') {
    pageToggle(loginPage, 'login');
  } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
    pageToggle(mainPage, 'main');
  } else if (currentRoute === '#/registration') {
    pageToggle(registerPage, 'registration');
  } else {
    pageToggle(mainPage, 'main');
  }
}

window.addEventListener('hashchange', (event) => {
  const currentRoute = window.location.hash;
  if (customerInStorage()) {
    pageToggle(mainPage, 'main');
  } else {
    if (currentRoute === '#/login') {
      pageToggle(loginPage, 'login');
    } else if (currentRoute === '#/main' || currentRoute === '#/' || currentRoute === '/') {
      pageToggle(mainPage, 'main');
    } else if (currentRoute === '#/registration') {
      pageToggle(registerPage, 'registration');
    } else {
      pageToggle(mainPage, 'main');
    }
  }
});

window.addEventListener('load', () => {
  console.log('reload');
});
