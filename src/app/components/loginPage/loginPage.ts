import createElement from '../../utilities/createElement';

export default function createLoginPage(parent: HTMLElement) {
  const loginWrapper = createElement('div', ['login-wrapper'], parent);

  createElement('div', ['login-img-container'], loginWrapper);

  const loginContentContainer = createElement('div', ['login-content-container'], loginWrapper);

  const loginFormWrapper = createElement('div', ['login-form-wrapper'], loginContentContainer);
  createElement('h1', ['login-heading'], loginFormWrapper, 'LOGIN');

  const loginForm = createElement('form', ['login-form'], loginFormWrapper);

  const emailLabel = createElement('label', ['label', 'email-label'], loginForm, 'email');
  emailLabel.setAttribute('for', 'email');
  const emailInput = createElement('input', ['input', 'email-input'], loginForm);
  emailInput.id = 'email';

  const passwordLabel = createElement('label', ['label', 'password-label'], loginForm, 'password');
  passwordLabel.setAttribute('for', 'password');
  const passwordInput = createElement('input', ['input', 'password-input'], loginForm);
  passwordInput.id = 'password';

  createElement('button', ['button', 'login-button'], loginForm, 'LOGIN');
  createElement('button', ['button', 'button-white', 'registration-button'], loginForm, 'TO THE REGISTRATION PAGE');

  createElement('p', ['team-name'], loginContentContainer, 'FUNC CRAFTERS');
}
