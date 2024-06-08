import createElement from '../../utilities/createElement';
import { emailValidation, passwordValidation } from './loginValidation';
import submitLoginForm from './submitLoginForm';
import togglePasswordVisibility from './togglePasswordVisibility';

export default function createLoginPage(): HTMLElement {
  const loginWrapper = createElement('div', ['login-wrapper']);

  createElement('div', ['login-img-container'], loginWrapper);

  const loginContentContainer = createElement('div', ['login-content-container'], loginWrapper);

  const loginFormWrapper = createElement('div', ['login-form-wrapper'], loginContentContainer);
  createElement('h1', ['login-heading'], loginFormWrapper, 'LOGIN');

  const loginForm = createElement('form', ['login-form'], loginFormWrapper);
  loginForm.autocomplete = 'off';

  createElement('p', ['error-indicator', 'email-error-indicator'], loginForm);
  createElement('p', ['error-indicator', 'password-error-indicator'], loginForm);

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

  const loginBtn = createElement('button', ['button', 'login-button'], loginForm, 'LOGIN');
  loginBtn.disabled = true;
  loginBtn.addEventListener('click', (event) => {
    submitLoginForm(loginForm, event);
  });

  const registrationPage = createElement(
    'button',
    ['button', 'button-white', 'registration-button'],
    loginForm,
    'TO THE REGISTRATION PAGE'
  );
  registrationPage.addEventListener('click', async (event) => {
    event.preventDefault();
    window.location.href = '#/registration';
  });

  // TEST BUTTON
  //   const devButton = createElement(
  //     'button',
  //     ['button', 'button-white', 'registration-button'],
  //     loginForm,
  //     'DEV BUTTON'
  //   );
  // devButton.addEventListener('click', async (event) => {
  //   event.preventDefault();

  //   const findCart = () => apiRootStorage.value.me().carts().get().execute();

  //   const response = await findCart();
  //   const products = response.body.results[0].lineItems
  //   console.log(products)
  // });

  return loginWrapper;
}
