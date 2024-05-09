import createElement from '../../utilities/createElement';

const { body } = document;

const registerWrapper: HTMLDivElement = createElement('div', ['register-page'], body);

createElement('h1', ['register-page__title'], registerWrapper, 'REGISTRATION');

const userData: HTMLDivElement = createElement('div', ['register-page__user-data'], registerWrapper);
createElement('label', ['user-data__label'], userData, 'first name');
const firstName: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__first-name'], userData);
firstName.id = 'firstName';
createElement('label', ['user-data__label'], userData, 'last name');
const lastName: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__last-name'], userData);
lastName.id = 'lastName';
createElement('label', ['user-data__label'], userData, 'birth date');
const birthDate: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__birth-date'], userData);
birthDate.id = 'birthDate';
createElement('label', ['user-data__label'], userData, 'email');
const email: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__email'], userData);
email.id = 'email';
createElement('label', ['user-data__label'], userData, 'password');
const password: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__password'], userData);
password.id = 'password';

const addressesBlock: HTMLDivElement = createElement('div', ['register-page__addresses-block'], registerWrapper);
const billingAddress: HTMLDivElement = createElement(
  'div',
  ['address-block', 'addresses-block__billing-address'],
  addressesBlock
);
createElement('h2', ['billing-address__label'], billingAddress, 'Billing address');
createElement('label', ['user-data__label'], billingAddress, 'country');
const billingCountry: HTMLInputElement = createElement(
  'input',
  ['address-block__input', 'billing-address__input'],
  billingAddress
);
billingCountry.id = 'billingCountry';
createElement('label', ['user-data__label'], billingAddress, 'city');
const billingCity: HTMLInputElement = createElement(
  'input',
  ['address-block__input', 'billing-address__input'],
  billingAddress
);
billingCity.id = 'billingCity';
createElement('label', ['user-data__label'], billingAddress, 'street');
const billingStreet: HTMLInputElement = createElement(
  'input',
  ['address-block__input', 'billing-address__input'],
  billingAddress
);
billingStreet.id = 'billingStreet';
createElement('label', ['user-data__label'], billingAddress, 'postal code');
const billingPostalCode: HTMLInputElement = createElement(
  'input',
  ['address-block__input', 'billing-address__input'],
  billingAddress
);
billingPostalCode.id = 'billingPostalCode';

const checkboxBillingAdd: HTMLDivElement = createElement('div', ['checkbox-block'], billingAddress);

const checkboxInputBillingAdd: HTMLInputElement = createElement('input', ['checkbox-block__checkbox-input'], checkboxBillingAdd);
checkboxInputBillingAdd.id = 'address-billing-default';
checkboxInputBillingAdd.setAttribute("type", "checkbox");
createElement('label', ['checkbox-block__checkbox-label'], checkboxBillingAdd, 'default');

const checkboxSameAdd: HTMLDivElement = createElement('div', ['checkbox-block'], billingAddress);

const checkboxInputSameAdd: HTMLInputElement = createElement('input', ['checkbox-block__checkbox-input'], checkboxSameAdd);
checkboxInputSameAdd.id = 'address-billing-default';
checkboxInputSameAdd.setAttribute("type", "checkbox");
createElement('label', ['checkbox-block__checkbox-label'], checkboxSameAdd, 'use the same address for both billing and shipping');


const shippingAddress: HTMLDivElement = createElement(
  'div',
  ['address-block', 'addresses-block__billing-address'],
  addressesBlock
);
createElement('h2', ['billing-address__label'], shippingAddress, 'Shipping address');

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
createElement('label', ['user-data__label'], shippingAddress, 'street');
const shippingStreet: HTMLInputElement = createElement(
  'input',
  ['address-block__input', 'billing-address__input'],
  shippingAddress
);
shippingStreet.id = 'shippingStreet';
createElement('label', ['user-data__label'], shippingAddress, 'postal code');
const shippingPostalCode: HTMLInputElement = createElement(
  'input',
  ['address-block__input', 'billing-address__input'],
  shippingAddress
);
shippingPostalCode.id = 'shippingPostalCode';

const checkboxShippingAdd: HTMLDivElement = createElement('div', ['checkbox-block'], shippingAddress);

const checkboxInputShippingAdd: HTMLInputElement = createElement('input', ['checkbox-block__checkbox-input'], checkboxShippingAdd);
checkboxInputShippingAdd.id = 'address-shipping-default';
checkboxInputShippingAdd.setAttribute("type", "checkbox");
createElement('label', ['checkbox-block__checkbox-label'], checkboxShippingAdd, 'default');

const registerButton: HTMLButtonElement = createElement('button', ['button', 'register-page__register-button'], registerWrapper, 'REGISTER');
console.log(registerButton)
const toLoginPageButton: HTMLButtonElement = createElement('button', ['button', 'register-page__register-button'], registerWrapper, 'TO THE LOGIN PAGE');
console.log(toLoginPageButton)


export default registerWrapper;
