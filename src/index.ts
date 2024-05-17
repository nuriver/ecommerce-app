import './styles/style.css';
import createHeader from './app/components/header';
import createRegistrationPage from './app/components/registrationPage/registrationPage';
import createLoginPage from './app/components/loginPage/loginPage';

const { body } = document;

createHeader(body);
createRegistrationPage(body);
// createLoginPage(body);
