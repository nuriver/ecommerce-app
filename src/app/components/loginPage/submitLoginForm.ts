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

  if (emailInput.value.length > 0 && passwordInput.value.length > 0) {
    emailInput.value = '';
    passwordInput.value = '';
  }
}

export default submitLoginForm;
