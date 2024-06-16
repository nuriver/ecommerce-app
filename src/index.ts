import createHeader from './app/components/header';
import createElement from './app/utilities/createElement';
import './styles/style.css';
import createLoginPage from './app/components/loginPage/loginPage';
import createMain from './app/components/mainPage/mainPage';
import createRegistrationPage from './app/components/registrationPage/registrationPage';
import routeNavigation from './app/utilities/routeNavigation';
import create404Page from './app/components/404Page/404Page';
import createFooter from './app/components/footer';
import customerInStorage from './app/utilities/customerInStorage';
import createCatalog from './app/components/catalog/catalog';
import createProfilePage from './app/components/profilePage/profilePage';
import { signInWithRefreshToken } from './app/api/SDK/client';

const { body } = document;

createHeader(body);
createElement('div', ['page-wrapper'], body);
createFooter(body);

const catalogPage = createCatalog();
const loginPage = createLoginPage();
const mainPage = createMain();
const registerPage = createRegistrationPage();
const page404 = create404Page();
const profilePage = createProfilePage();

routeNavigation(mainPage, loginPage, registerPage, profilePage, catalogPage, page404, false);

window.addEventListener('hashchange', () => {
  routeNavigation(mainPage, loginPage, registerPage, profilePage, catalogPage, page404, true);
});

window.addEventListener('load', () => {
  if (customerInStorage()) {
    const loginLink = document.querySelector('.header-link-login') as HTMLElement;
    loginLink.innerText = 'LOGOUT';
    const profileLink = document.querySelector('.header-link-profile') as HTMLElement;
    if (profileLink.classList.contains('header-link-profile-hidden')) {
      profileLink.classList.remove('header-link-profile-hidden');
    }
    signInWithRefreshToken();
  } else if (localStorage.getItem('promoId')) {
    localStorage.setItem('promoId', '')
  }
});
