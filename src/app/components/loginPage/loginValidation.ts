const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
const MIN_PASSWORD_LENGTH = 8;

export function emailValidation(event: Event, form: HTMLFormElement): boolean {
  const emailInput = event.target as HTMLInputElement;
  let email: string = emailInput.value;
  email = email.trim();

  const emailError = form.querySelector('.email-error-indicator') as HTMLParagraphElement;
  const loginBtn = form.querySelector('.login-button') as HTMLButtonElement;

  loginBtn.disabled = true;

  if (emailInput.value.length > 0) {
    if (emailRegex.test(email)) {
      emailError.style.display = 'none';
      loginBtn.disabled = false;
      return true;
    }
    emailError.style.display = 'block';
    emailError.innerText = 'enter valid email address';
    return false;
  }
  emailError.style.display = 'none';
  return false;
}

export function passwordValidation(event: Event, form: HTMLFormElement): boolean {
  const passwordInput = event.target as HTMLInputElement;
  const password = passwordInput.value;
  const loginBtn = form.querySelector('.login-button') as HTMLButtonElement;
  const passwordError = form.querySelector('.password-error-indicator') as HTMLParagraphElement;

  if (password.length > 0) {
    loginBtn.disabled = true;
    if (!/^[A-Za-z0-9]+$/.test(password)) {
      passwordError.style.display = 'flex';
      passwordError.innerText = 'password may have only english letters and digits';
      return false;
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/.test(password)) {
      passwordError.style.display = 'flex';
      passwordError.innerText = 'password requires upper, lower case letters, and digits';
      return false;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      passwordError.style.display = 'flex';
      passwordError.innerText = 'password must have at least 8 characters';
      return false;
    }
    passwordError.style.display = 'none';
    loginBtn.disabled = false;
    return true;
  }
  passwordError.style.display = 'none';
  return false;
}
