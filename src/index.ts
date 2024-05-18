import createHeader from './app/components/header';
// import { createMain } from './app/components/mainPage/mainPage';
import createElement from './app/utilities/createElement';
import './styles/style.css';
// import createRegistrationPage from './app/components/registrationPage/registrationPage';
import createLoginPage from './app/components/loginPage/loginPage';

const { body } = document;

createHeader(body);
const loginPage = createLoginPage();
const pageWrapper = createElement('div', ['page-wrapper'], body);
pageWrapper.append(loginPage);
// body.append(createMain())
// createRegistrationPage(body);
// createLoginPage(body);
