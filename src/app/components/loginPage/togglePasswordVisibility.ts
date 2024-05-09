function togglePasswordVisibility(event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  const password = document.getElementById('passwordInLogin') as HTMLInputElement;
  if (checkbox.checked) {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
}

export default togglePasswordVisibility;
