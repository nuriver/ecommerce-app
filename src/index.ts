import createHeader from './app/components/header';
// import createMain from './app/components/mainPage/mainPage';
// import createElement from './app/utilities/createElement';
import './styles/style.css';
// import createRegistrationPage from './app/components/registrationPage/registrationPage';
import create404Page from './app/components/404Page/404Page';
// import createLoginPage from './app/components/loginPage/loginPage';

const { body } = document;

createHeader(body);
create404Page();
// body.append(createMain())
// createRegistrationPage(body);
// createLoginPage(body);
