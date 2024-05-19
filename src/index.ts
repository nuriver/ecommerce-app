import createHeader from './app/components/header';
import createElement from './app/utilities/createElement';
import './styles/style.css';
import createLoginPage from './app/components/loginPage/loginPage';
import createMain from './app/components/mainPage/mainPage';
import createRegistrationPage from './app/components/registrationPage/registrationPage';
import routeNavigation from './app/utilities/routeNavigation';
import create404Page from './app/components/404Page/404Page';

const { body } = document;

createHeader(body);
createElement('div', ['page-wrapper'], body);

const loginPage = createLoginPage();
const mainPage = createMain();
const registerPage = createRegistrationPage();
const page404 = create404Page();

routeNavigation(mainPage, loginPage, registerPage, page404, false);

window.addEventListener('hashchange', () => {
  routeNavigation(mainPage, loginPage, registerPage, page404, true);
});

window.addEventListener('load', () => {
  sessionStorage.clear();
  console.log('reload');
});
