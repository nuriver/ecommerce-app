import createHeader from './app/components/header';
import {createMain} from './app/components/mainPage/mainPage';
import createElement from './app/utilities/createElement';
import './styles/style.css';
import createRegistrationPage from './app/components/registrationPage/registrationPage';
// import createLoginPage from './app/components/loginPage/loginPage';

const { body } = document;

createHeader(body);
body.append(createMain())
// createRegistrationPage(body);
// createLoginPage(body);
