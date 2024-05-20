import { CustomerDraft } from '@commercetools/platform-sdk';
import { createCustomer } from '../../api/SDK/client';
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
import simpleRedirect from '../../utilities/simpleRedirect';

export default function createRegistrationPage() {
  function isError(obj: Record<string, boolean>) {
    return !Object.values(obj).every((value) => !value);
  }
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
  const registerPage: HTMLDivElement = createElement('div', ['register-page']);

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
  const shippingCountry: HTMLSelectElement = createElement(
    'select',
    ['address-block__input', 'billing-address__input'],
    shippingAddress
  );
  createElement('option', ['billing-address__input'], shippingCountry, 'United States');

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
  const toLoginPageButton: HTMLButtonElement = createElement(
    'button',
    ['button', 'register-page__to-login-button'],
    registerWrapper,
    'TO THE LOGIN PAGE'
  );
  const accumulateErr = createElement('div', ['user-data__errors'], registerWrapper);

  firstName.addEventListener('input', () => {
    const check = checkName(firstName.value);
    if (check === false) {
      errors.name = false;
      printError(firstNameErr, '');
    } else {
      errors.name = true;
      printError(firstNameErr, check);
    }
  });
  lastName.addEventListener('input', () => {
    const check = checkName(lastName.value);
    if (check === false) {
      errors.surname = false;
      printError(lastNameErr, '');
    } else {
      errors.surname = true;
      printError(lastNameErr, check);
    }
  });
  birthDate.addEventListener('input', () => {
    const check = checkDate(birthDate.value);
    if (check === false) {
      errors.date = false;
      printError(birthDateErr, '');
    } else {
      errors.date = true;
      printError(birthDateErr, check);
    }
  });
  email.addEventListener('input', () => {
    const check = checkEmail(email.value);
    if (check === false) {
      errors.email = false;
      printError(emailErr, '');
    } else {
      errors.email = true;
      printError(emailErr, check);
    }
  });
  password.addEventListener('input', () => {
    const check = checkPassword(password.value);
    if (check === false) {
      errors.password = false;
      printError(passwordErr, '');
    } else {
      errors.password = true;
      printError(passwordErr, check);
    }
  });
  billingCity.addEventListener('input', () => {
    const check = checkCity(billingCity.value);
    if (check === false) {
      errors.billingCity = false;
      printError(billingCityErr, '');
    } else {
      errors.billingCity = true;
      printError(billingCityErr, check);
    }
  });
  billingStreet.addEventListener('input', () => {
    const check = checkStreet(billingStreet.value);
    if (check === false) {
      errors.billingStreet = false;
      printError(billingStreetErr, '');
    } else {
      errors.billingStreet = true;
      printError(billingStreetErr, check);
    }
  });
  billingPostalCode.addEventListener('input', () => {
    const check = checkPostCode(billingPostalCode.value);
    if (check === false) {
      errors.billingCode = false;
      printError(billingPostalCodeErr, '');
    } else {
      errors.billingCode = true;
      printError(billingPostalCodeErr, check);
    }
  });
  shippingCity.addEventListener('input', () => {
    const check = checkCity(shippingCity.value);
    if (check === false) {
      errors.shippingCity = false;
      printError(shippingCityErr, '');
    } else {
      errors.shippingCity = true;
      printError(shippingCityErr, check);
    }
  });
  shippingStreet.addEventListener('input', () => {
    const check = checkStreet(shippingStreet.value);
    if (check === false) {
      errors.shippingStreet = false;
      printError(shippingStreetErr, '');
    } else {
      errors.shippingStreet = true;
      printError(shippingStreetErr, check);
    }
  });
  shippingPostalCode.addEventListener('input', () => {
    const check = checkPostCode(shippingPostalCode.value);
    if (check === false) {
      errors.shippingCode = false;
      printError(shippingPostalCodeErr, '');
    } else {
      errors.shippingCode = true;
      printError(shippingPostalCodeErr, check);
    }
  });

  checkboxInputSameAdd.addEventListener('input', (event) => {
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

  registerButton.addEventListener('click', async (event) => {
    if (!isError(errors)) {
      try {
        (event.target as HTMLButtonElement).disabled = true;
        let defaultShippingAddress = checkboxInputSameAdd.checked && checkboxInputBillingAdd.checked ? 0 : undefined;
        if (checkboxInputSameAdd.checked && checkboxInputBillingAdd.checked) {
          defaultShippingAddress = 0;
        } else if (!checkboxInputSameAdd.checked && checkboxInputShippingAdd.checked) {
          defaultShippingAddress = 1;
        }
        const customerDraft: CustomerDraft = {
          firstName: firstName.value,
          lastName: lastName.value,
          dateOfBirth: birthDate.value,
          email: email.value,
          password: password.value,
          addresses: [
            {
              country: 'US',
              city: billingCity.value,
              streetName: billingStreet.value,
              postalCode: billingPostalCode.value,
            },
          ],
          billingAddresses: [0],
          shippingAddresses: checkboxInputSameAdd.checked ? [0] : [1],
          defaultBillingAddress: checkboxInputBillingAdd.checked ? 0 : undefined,
          defaultShippingAddress,
        };
        if (!checkboxInputSameAdd.checked) {
          customerDraft.addresses?.push({
            country: 'US',
            city: shippingCity.value,
            streetName: shippingStreet.value,
            postalCode: shippingPostalCode.value,
          });
        }
        console.log(await createCustomer(customerDraft));
        accumulateErr.style.color = 'green';
        accumulateErr.innerHTML = `Registration successful!`;
        setTimeout(() => {
          accumulateErr.innerHTML = '';
        }, 3000);
      } catch (error) {
        accumulateErr.style.color = 'red';
        accumulateErr.innerHTML = `Oops! ${(error as Error).message}`;
      } finally {
        (event.target as HTMLButtonElement).disabled = false;
      }
    } else {
      accumulateErr.style.color = 'red';
      accumulateErr.innerHTML = 'Please fill in all required fields correctly and try again!';
    }
  });

  toLoginPageButton.addEventListener('click', () => simpleRedirect('login'));

  return registerPage;
}
