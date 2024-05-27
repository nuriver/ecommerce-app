import {
  checkName,
  checkDate,
  checkEmail,
  checkCity,
  checkStreet,
  checkPostCode,
  checkPassword,
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
  currentPassword: HTMLDivElement,
  newPassword: HTMLDivElement,
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
      savePasswordButton.disabled = false;
      printError(newPasswordErr, '');
    } else {
        errors.password = true;
      printError(newPasswordErr, check);
      savePasswordButton.disabled = true;
    }
  });
  if (
    currentPasswordInput.value &&
    newPasswordInput.value &&
    !currentPassword.innerText &&
    !newPassword.innerText
  ) {
    savePasswordButton.disabled = false;
  }

  return errors;
}

export function checkBillingInputs(
  billingCity: HTMLDivElement,
  billingStreet: HTMLDivElement,
  billingPostalCode: HTMLDivElement,
  billingCityValue: HTMLInputElement,
  billingStreetValue: HTMLInputElement,
  billingPostalCodeValue: HTMLInputElement,
  billingCityErr: HTMLDivElement,
  billingStreetErr: HTMLDivElement,
  billingPostalCodeErr: HTMLDivElement,
  checkboxInputSameAdd: HTMLInputElement,
  saveAddressesButton: HTMLButtonElement,
  shippingCityValue: HTMLInputElement,
  shippingStreetValue: HTMLInputElement,
  shippingPostalCodeValue: HTMLInputElement,
  checkboxInputBillingAdd: HTMLInputElement
): void {
  const errors: { [key: string]: boolean } = {
    billingCity: true,
    billingStreet: true,
    billingCode: true,
  };
  billingCity.addEventListener('input', () => {
    const check: string | false = checkCity(billingCityValue.value);
    if (check === false) {
      errors.billingCity = false;
      printError(billingCityErr, '');
      saveAddressesButton.disabled = false;
      checkboxInputSameAdd.disabled = false;
      checkboxInputBillingAdd.disabled = false;

      if (checkboxInputSameAdd.checked) {
        shippingCityValue.value = billingCityValue.value;
        shippingStreetValue.value = billingStreetValue.value;
        shippingPostalCodeValue.value = billingPostalCodeValue.value;
      }
    } else {
      errors.billingCity = true;
      printError(billingCityErr, check);
      saveAddressesButton.disabled = true;
      checkboxInputSameAdd.disabled = true;
      checkboxInputBillingAdd.disabled = true;
    }
  });
  billingStreet.addEventListener('input', () => {
    const check: string | false = checkStreet(billingStreetValue.value);
    if (check === false) {
      errors.billingStreet = false;
      printError(billingStreetErr, '');
      saveAddressesButton.disabled = false;
      checkboxInputSameAdd.disabled = false;
      checkboxInputBillingAdd.disabled = false;
    } else {
      errors.billingStreet = true;
      printError(billingStreetErr, check);
      saveAddressesButton.disabled = true;
      checkboxInputSameAdd.disabled = true;
      checkboxInputBillingAdd.disabled = true;
    }
  });
  billingPostalCode.addEventListener('input', () => {
    const check: string | false = checkPostCode(billingPostalCodeValue.value);
    if (check === false) {
      errors.billingCode = false;
      printError(billingPostalCodeErr, '');
      saveAddressesButton.disabled = false;
      checkboxInputSameAdd.disabled = false;
      checkboxInputBillingAdd.disabled = false;
    } else {
      errors.billingCode = true;
      printError(billingPostalCodeErr, check);
      saveAddressesButton.disabled = true;
      checkboxInputSameAdd.disabled = true;
      checkboxInputBillingAdd.disabled = true;
    }
  });

  checkboxInputSameAdd.addEventListener('input', (event: Event) => {
    if ((event.target as HTMLInputElement).checked) {
      errors.shippingCity = false;
      errors.shippingStreet = false;
      errors.shippingCode = false;
    } else {
      errors.shippingCity = true;
      errors.shippingStreet = true;
      errors.shippingCode = true;
    }
  });
}

export function checkShippingInputs(
  shippingCity: HTMLDivElement,
  shippingStreet: HTMLDivElement,
  shippingPostalCode: HTMLDivElement,
  shippingCityValue: HTMLInputElement,
  shippingStreetValue: HTMLInputElement,
  shippingPostalCodeValue: HTMLInputElement,
  shippingCityErr: HTMLDivElement,
  shippingStreetErr: HTMLDivElement,
  shippingPostalCodeErr: HTMLDivElement,
  checkboxInputShippingAdd: HTMLInputElement,
  saveAddressesButton: HTMLButtonElement
) {
  const errors: { [key: string]: boolean } = {
    shippingCity: true,
    shippingStreet: true,
    shippingCode: true,
  };
  shippingCity.addEventListener('input', () => {
    const check: string | false = checkCity(shippingCityValue.value);
    if (check === false) {
      errors.shippingCity = false;
      printError(shippingCityErr, '');
      checkboxInputShippingAdd.disabled = false;
      saveAddressesButton.disabled = false;
    } else {
      errors.shippingCity = true;
      printError(shippingCityErr, check);
      checkboxInputShippingAdd.disabled = true;
      saveAddressesButton.disabled = true;
    }
  });
  shippingStreet.addEventListener('input', () => {
    const check: string | false = checkStreet(shippingStreetValue.value);
    if (check === false) {
      errors.shippingStreet = false;
      printError(shippingStreetErr, '');
      checkboxInputShippingAdd.disabled = false;
      saveAddressesButton.disabled = false;
    } else {
      errors.shippingStreet = true;
      printError(shippingStreetErr, check);
      checkboxInputShippingAdd.disabled = true;
      saveAddressesButton.disabled = true;
    }
  });
  shippingPostalCode.addEventListener('input', () => {
    const check: string | false = checkPostCode(shippingPostalCodeValue.value);
    if (check === false) {
      errors.shippingCode = false;
      printError(shippingPostalCodeErr, '');
      checkboxInputShippingAdd.disabled = false;
      saveAddressesButton.disabled = false;
    } else {
      errors.shippingCode = true;
      printError(shippingPostalCodeErr, check);
      checkboxInputShippingAdd.disabled = true;
      saveAddressesButton.disabled = true;
    }
  });
}
