import { getCustomers, signInCustomer } from '../../api/SDK/client';
import isEmailRegistered from './isEmailRegistered';

function submitLoginForm(form: HTMLFormElement, event: Event): void {
  event.preventDefault();
  const loginBtn = event.target as HTMLButtonElement;
  loginBtn.disabled = true;

  const emailInput = form.querySelector('.email-input') as HTMLInputElement;
  const passwordInput = form.querySelector('.password-input') as HTMLInputElement;
  const emailError = form.querySelector('.email-error-indicator') as HTMLParagraphElement;
  const passwordError = form.querySelector('.password-error-indicator') as HTMLParagraphElement;

  if (emailInput.value.length === 0) {
    emailError.style.display = 'flex';
    emailError.innerText = 'please fill out this field';
  }

  if (passwordInput.value.length === 0) {
    passwordError.style.display = 'flex';
    passwordError.innerText = 'please fill out this field';
  }

  if (
    emailInput.value.length > 0 &&
    passwordInput.value.length > 0 &&
    emailError.style.display !== 'block' &&
    passwordError.style.display !== 'block'
  ) {
    const anonymousId = sessionStorage.getItem('anonymousCustomer');

    const credentials = {
      email: emailInput.value,
      password: passwordInput.value,
      anonymousId: anonymousId as string,
    };

    signInCustomer(credentials).then((isSignedIn) => {
      if (!isSignedIn) {
        getCustomers().then((response) => {
          const { email } = credentials;
          const registeredCustomers = response.body.results;
          if (isEmailRegistered(registeredCustomers, email)) {
            passwordInput.value = '';
            passwordError.style.display = 'flex';
            passwordError.innerText = 'incorrect password';
          } else {
            emailError.style.display = 'flex';
            emailError.innerText = 'this email is not registered';
            emailInput.value = '';
            passwordInput.value = '';
          }
        });
      }
    });
  }
}

export default submitLoginForm;
