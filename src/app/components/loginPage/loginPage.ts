import createElement from '../../utilities/createElement';
// import createHeader from '../header/createHeader';
import createBurger from '../header/createBurger';
import { emailValidation, passwordValidation } from './loginValidation';
import submitLoginForm from './submitLoginForm';
import togglePasswordVisibility from './togglePasswordVisibility';

const { body } = document;

export const loginWrapper = createElement('div', ['login-wrapper'], body);

createElement('div', ['login-img-container'], loginWrapper);

const loginContentContainer = createElement('div', ['login-content-container'], loginWrapper);

// createHeader(loginContentContainer);
createBurger(loginContentContainer);

const loginFormWrapper = createElement('div', ['login-form-wrapper'], loginContentContainer);
createElement('h1', ['login-heading'], loginFormWrapper, 'LOGIN');

const loginForm = createElement('form', ['login-form'], loginFormWrapper);
loginForm.autocomplete = 'off';

export const emailError = createElement('p', ['error-indicator', 'email-error-indicator'], loginForm);
export const passwordError = createElement('p', ['error-indicator', 'password-error-indicator'], loginForm);

const emailLabel = createElement('label', ['label', 'email-label'], loginForm, 'email');
emailLabel.setAttribute('for', 'emailInLogin');
const emailInput = createElement('input', ['input', 'email-input'], loginForm);
emailInput.id = 'emailInLogin';
emailInput.type = 'email';
emailInput.addEventListener('input', (event) => {
  emailValidation(event, loginForm);
});

const passwordLabel = createElement('label', ['label', 'password-label'], loginForm, 'password');
passwordLabel.setAttribute('for', 'passwordInLogin');
const passwordInput = createElement('input', ['input', 'password-input'], loginForm);
passwordInput.id = 'passwordInLogin';
passwordInput.type = 'password';
passwordInput.addEventListener('input', (event) => {
  passwordValidation(event, loginForm);
});

const passwordVisibility = createElement('div', ['password-visibility'], loginForm);
const passwordVisibilityCheckbox = createElement('input', ['password-visibility-checkbox'], passwordVisibility);
passwordVisibilityCheckbox.id = 'passwordVisibilityCheckbox';
passwordVisibilityCheckbox.type = 'checkbox';
passwordVisibilityCheckbox.addEventListener('change', togglePasswordVisibility);
const passwordVisibilityLabel = createElement(
  'label',
  ['password-visibility-label'],
  passwordVisibility,
  'show password'
);
passwordVisibilityLabel.setAttribute('for', 'passwordVisibilityCheckbox');

export const loginBtn = createElement('button', ['button', 'login-button'], loginForm, 'LOGIN');
loginBtn.disabled = true;
loginBtn.addEventListener('click', (event) => {
  submitLoginForm(loginForm, event);
});

createElement('button', ['button', 'button-white', 'registration-button'], loginForm, 'TO THE REGISTRATION PAGE');

createElement('p', ['team-name'], loginContentContainer, 'FUNC CRAFTERS');