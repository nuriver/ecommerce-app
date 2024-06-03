import {
  checkName,
  checkDate,
  checkEmail,
  checkCity,
  checkStreet,
  checkPostCode,
  checkPassword,
  isError,
} from '../../utilities/checkers';
import printError from '../../utilities/printError';

export function checkPersonalInfo(
  firstName: HTMLDivElement,
  lastName: HTMLDivElement,
  birthDate: HTMLDivElement,
  email: HTMLDivElement,
  firstNameValue: HTMLInputElement,
  lastNameValue: HTMLInputElement,
  birthDateValue: HTMLInputElement,
  emailValue: HTMLInputElement,
  saveInfoEmailButton: HTMLButtonElement,
  firstNameErr: HTMLDivElement,
  lastNameErr: HTMLDivElement,
  birthDateErr: HTMLDivElement,
  emailErr: HTMLDivElement
): { [key: string]: boolean } {
  const errors: { [key: string]: boolean } = {
    email: false,
    password: false,
    name: false,
    surname: false,
  };
  firstName.addEventListener('input', () => {
    const check: string | false = checkName(firstNameValue.value);
    if (check === false) {
      errors.name = false;
      printError(firstNameErr, '');
      saveInfoEmailButton.disabled = false;
    } else {
      errors.name = true;
      printError(firstNameErr, check);
      saveInfoEmailButton.disabled = true;
    }
  });
  lastName.addEventListener('input', () => {
    const check: string | false = checkName(lastNameValue.value);
    if (check === false) {
      errors.surname = false;
      printError(lastNameErr, '');
      saveInfoEmailButton.disabled = false;
    } else {
      errors.surname = true;
      printError(lastNameErr, check);
      saveInfoEmailButton.disabled = true;
    }
  });
  birthDate.addEventListener('input', () => {
    const check: string | false = checkDate(birthDateValue.value);
    if (check === false) {
      errors.date = false;
      printError(birthDateErr, '');
      saveInfoEmailButton.disabled = false;
    } else {
      errors.date = true;
      printError(birthDateErr, check);
      saveInfoEmailButton.disabled = true;
    }
  });
  email.addEventListener('input', () => {
    const check: string | false = checkEmail(emailValue.value);
    if (check === false) {
      errors.email = false;
      printError(emailErr, '');
      saveInfoEmailButton.disabled = false;
    } else {
      errors.email = true;
      printError(emailErr, check);
      saveInfoEmailButton.disabled = true;
    }
  });
  return errors;
}

export function checkPasswordsForChange(
  currentPasswordInput: HTMLInputElement,
  newPasswordInput: HTMLInputElement,
  currentPasswordErr: HTMLDivElement,
  newPasswordErr: HTMLDivElement,
  savePasswordButton: HTMLButtonElement,
  delayPasswordButton: HTMLButtonElement
): { [key: string]: boolean } {
  const errors: { [key: string]: boolean } = {
    currentPassword: true,
    password: true,
  };

  currentPasswordInput.addEventListener('input', () => {
    delayPasswordButton.disabled = false;
    const check: string | false = checkPassword(currentPasswordInput.value);
    if (check === false) {
      errors.currentPassword = false;
      printError(currentPasswordErr, '');
      if (
        currentPasswordInput.value.length &&
        newPasswordInput.value.length &&
        !currentPasswordErr.innerText.length &&
        !newPasswordErr.innerText.length
      ) {
        savePasswordButton.disabled = false;
      }
    } else {
      errors.currentPassword = true;
      printError(currentPasswordErr, check);
      savePasswordButton.disabled = true;
    }
  });

  newPasswordInput.addEventListener('input', () => {
    delayPasswordButton.disabled = false;
    const check: string | false = checkPassword(newPasswordInput.value);
    if (check === false) {
      errors.password = false;
      printError(newPasswordErr, '');
      if (
        currentPasswordInput.value.length &&
        newPasswordInput.value.length &&
        !currentPasswordErr.innerText.length &&
        !newPasswordErr.innerText.length
      ) {
        savePasswordButton.disabled = false;
      }
    } else {
      errors.password = true;
      printError(newPasswordErr, check);
      savePasswordButton.disabled = true;
    }
  });

  return errors;
}

export function checkAddressInputs(
  city: HTMLDivElement,
  street: HTMLDivElement,
  postalCode: HTMLDivElement,
  cityValue: HTMLInputElement,
  streetValue: HTMLInputElement,
  postalCodeValue: HTMLInputElement,
  cityErr: HTMLDivElement,
  streetErr: HTMLDivElement,
  postalCodeErr: HTMLDivElement,
  saveAddressesButton: HTMLButtonElement,
  newAddress: boolean
): { [key: string]: boolean } {
  const errors: { [key: string]: boolean } = {
    city: newAddress,
    street: newAddress,
    billingCode: newAddress,
  };
  city.addEventListener('input', () => {
    const check: string | false = checkCity(cityValue.value);
    if (check === false) {
      errors.city = false;
      printError(cityErr, '');
    } else {
      errors.city = true;
      printError(cityErr, check);
    }
    saveAddressesButton.disabled = isError(errors);
  });
  street.addEventListener('input', () => {
    const check: string | false = checkStreet(streetValue.value);
    if (check === false) {
      errors.street = false;
      printError(streetErr, '');
    } else {
      errors.street = true;
      printError(streetErr, check);
    }
    saveAddressesButton.disabled = isError(errors);
  });
  postalCode.addEventListener('input', () => {
    const check: string | false = checkPostCode(postalCodeValue.value);
    if (check === false) {
      errors.billingCode = false;
      printError(postalCodeErr, '');
    } else {
      errors.billingCode = true;
      printError(postalCodeErr, check);
    }
    saveAddressesButton.disabled = isError(errors);
  });

  return errors;
}
