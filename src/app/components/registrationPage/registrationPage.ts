import {
  checkCity,
  checkDate,
  checkEmail,
  checkName,
  checkPassword,
  checkPostCode,
  checkStreet,
} from '../../utilities/checkers';
import createElement from '../../utilities/createElement';
import printError from '../../utilities/printError';

export default function createRegistrationPage(parent: HTMLElement) {
  const errors = {
    email: true,
    password: true,
    name: true,
    surname: true,
    billingCity: true,
    shippingCity: true,
    date: true,
    billingStreet: true,
    shippingStreet: true,
    billingCode: true,
    shippingCode: true,
  };
  const registerPage: HTMLDivElement = createElement('div', ['register-page'], parent);

  const registerWrapper: HTMLDivElement = createElement('div', ['register-page__wrapper'], registerPage);
  createElement('h1', ['register-page__title'], registerWrapper, 'REGISTRATION');
  const userData: HTMLDivElement = createElement('div', ['register-page__user-data'], registerWrapper);
  createElement('label', ['user-data__label'], userData, 'first name');
  const firstName: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__first-name'], userData);
  firstName.id = 'firstName';
  const firstNameErr = createElement('div', ['user-data__errors'], userData);
  createElement('label', ['user-data__label'], userData, 'last name');
  const lastName: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__last-name'], userData);
  lastName.id = 'lastName';
  const lastNameErr = createElement('div', ['user-data__errors'], userData);
  createElement('label', ['user-data__label'], userData, 'birth date');
  const birthDate: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__birth-date'], userData);
  birthDate.setAttribute('type', 'date');
  birthDate.id = 'birthDate';
  const birthDateErr = createElement('div', ['user-data__errors'], userData);
  createElement('label', ['user-data__label'], userData, 'email');
  const email: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__email'], userData);
  email.id = 'email';
  const emailErr = createElement('div', ['user-data__errors'], userData);
  createElement('label', ['user-data__label'], userData, 'password');
  const password: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__password'], userData);
  password.id = 'password';
  const passwordErr = createElement('div', ['user-data__errors'], userData);

  const addressesBlock: HTMLDivElement = createElement('div', ['register-page__addresses-block'], registerWrapper);

  const billingAddress: HTMLDivElement = createElement(
    'div',
    ['address-block', 'addresses-block__billing-address'],
    addressesBlock
  );
  createElement('h2', ['billing-address__label'], billingAddress, 'Billing address');
  createElement('label', ['user-data__label'], billingAddress, 'country');

  const billingCountry: HTMLSelectElement = createElement(
    'select',
    ['address-block__input', 'billing-address__input'],
    billingAddress
  );

  createElement('option', ['billing-address__input'], billingCountry, 'United States');

  billingCountry.id = 'billingCountry';
  createElement('label', ['user-data__label'], billingAddress, 'city');
  const billingCity: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    billingAddress
  );
  billingCity.id = 'billingCity';
  const billingCityErr = createElement('div', ['user-data__errors'], billingAddress);
  createElement('label', ['user-data__label'], billingAddress, 'street');
  const billingStreet: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    billingAddress
  );
  billingStreet.id = 'billingStreet';
  const billingStreetErr = createElement('div', ['user-data__errors'], billingAddress);
  createElement('label', ['user-data__label'], billingAddress, 'postal code');
  const billingPostalCode: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    billingAddress
  );
  billingPostalCode.id = 'billingPostalCode';
  const billingPostalCodeErr = createElement('div', ['user-data__errors'], billingAddress);

  const checkboxBillingAdd: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block_default'],
    billingAddress
  );

  const checkboxInputBillingAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxBillingAdd
  );
  checkboxInputBillingAdd.id = 'address-billing-default';
  checkboxInputBillingAdd.setAttribute('type', 'checkbox');
  createElement('label', ['checkbox-block__checkbox-label'], checkboxBillingAdd, 'default');

  const checkboxSameAdd: HTMLDivElement = createElement('div', ['checkbox-block'], billingAddress);

  const checkboxInputSameAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxSameAdd
  );
  checkboxInputSameAdd.id = 'address-billing-default';
  checkboxInputSameAdd.setAttribute('type', 'checkbox');
  createElement(
    'label',
    ['checkbox-block__checkbox-label'],
    checkboxSameAdd,
    'use the same address for both billing and shipping'
  );

  const shippingAddress: HTMLDivElement = createElement(
    'div',
    ['address-block', 'addresses-block__billing-address'],
    addressesBlock
  );
  createElement('h2', ['shipping-address__label'], shippingAddress, 'Shipping address');

  createElement('label', ['user-data__label'], shippingAddress, 'country');
  const shippingCountry: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    shippingAddress
  );
  shippingCountry.id = 'shippingCountry';
  createElement('label', ['user-data__label'], shippingAddress, 'city');
  const shippingCity: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    shippingAddress
  );
  shippingCity.id = 'shippingCity';
  const shippingCityErr = createElement('div', ['user-data__errors'], shippingAddress);
  createElement('label', ['user-data__label'], shippingAddress, 'street');
  const shippingStreet: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    shippingAddress
  );
  shippingStreet.id = 'shippingStreet';
  const shippingStreetErr = createElement('div', ['user-data__errors'], shippingAddress);
  createElement('label', ['user-data__label'], shippingAddress, 'postal code');
  const shippingPostalCode: HTMLInputElement = createElement(
    'input',
    ['address-block__input', 'billing-address__input'],
    shippingAddress
  );
  shippingPostalCode.id = 'shippingPostalCode';
  const shippingPostalCodeErr = createElement('div', ['user-data__errors'], shippingAddress);

  const checkboxShippingAdd: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block_default'],
    shippingAddress
  );

  const checkboxInputShippingAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxShippingAdd
  );
  checkboxInputShippingAdd.id = 'address-shipping-default';
  checkboxInputShippingAdd.setAttribute('type', 'checkbox');
  createElement('label', ['checkbox-block__checkbox-label'], checkboxShippingAdd, 'default');

  const registerButton: HTMLButtonElement = createElement(
    'button',
    ['button', 'register-page__register-button'],
    registerWrapper,
    'REGISTER'
  );
  console.log(registerButton);
  const toLoginPageButton: HTMLButtonElement = createElement(
    'button',
    ['button', 'register-page__to-login-button'],
    registerWrapper,
    'TO THE LOGIN PAGE'
  );
  console.log(toLoginPageButton);

  firstName.addEventListener('input', () => {
    const check = checkName(firstName.value);
    if (check === false) {
      errors.name = false;
      printError(firstNameErr, '');
    } else {
      printError(firstNameErr, check);
    }
  });
  lastName.addEventListener('input', () => {
    const check = checkName(firstName.value);
    if (check === false) {
      errors.surname = false;
      printError(lastNameErr, '');
    } else {
      printError(lastNameErr, check);
    }
  });
  birthDate.addEventListener('input', () => {
    const check = checkDate(birthDate.value);
    if (check === false) {
      errors.date = false;
      printError(birthDateErr, '');
    } else {
      printError(birthDateErr, check);
    }
  });
  email.addEventListener('input', () => {
    const check = checkEmail(email.value);
    if (check === false) {
      errors.email = false;
      printError(emailErr, '');
    } else {
      printError(emailErr, check);
    }
  });
  password.addEventListener('input', () => {
    const check = checkPassword(password.value);
    if (check === false) {
      errors.password = false;
      printError(passwordErr, '');
    } else {
      printError(passwordErr, check);
    }
  });
  billingCity.addEventListener('input', () => {
    const check = checkCity(billingCity.value);
    if (check === false) {
      errors.billingCity = false;
      printError(billingCityErr, '');
    } else {
      printError(billingCityErr, check);
    }
  });
  billingStreet.addEventListener('input', () => {
    const check = checkStreet(billingStreet.value);
    if (check === false) {
      errors.billingStreet = false;
      printError(billingStreetErr, '');
    } else {
      printError(billingStreetErr, check);
    }
  });
  billingPostalCode.addEventListener('input', () => {
    const check = checkPostCode(billingPostalCode.value);
    if (check === false) {
      errors.billingCode = false;
      printError(billingPostalCodeErr, '');
    } else {
      printError(billingPostalCodeErr, check);
    }
  });
  shippingCity.addEventListener('input', () => {
    const check = checkCity(shippingCity.value);
    if (check === false) {
      errors.shippingCity = false;
      printError(shippingCityErr, '');
    } else {
      printError(shippingCityErr, check);
    }
  });
  shippingStreet.addEventListener('input', () => {
    const check = checkStreet(shippingStreet.value);
    if (check === false) {
      errors.shippingStreet = false;
      printError(shippingStreetErr, '');
    } else {
      printError(shippingStreetErr, check);
    }
  });
  shippingPostalCode.addEventListener('input', () => {
    const check = checkPostCode(shippingPostalCode.value);
    if (check === false) {
      errors.shippingCode = false;
      printError(shippingPostalCodeErr, '');
    } else {
      printError(shippingPostalCodeErr, check);
    }
  });
}
