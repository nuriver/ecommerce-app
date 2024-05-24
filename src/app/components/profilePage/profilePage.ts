// import { CustomerDraft } from '@commercetools/platform-sdk';
// import { createCustomer, signInCustomer } from '../../api/SDK/client';
// import {
//   checkCity,
//   checkDate,
//   checkEmail,
//   checkName,
//   checkPassword,
//   checkPostCode,
//   checkStreet,
// } from '../../utilities/checkers';
import createElement from '../../utilities/createElement';
// import printError from '../../utilities/printError';
// import simpleRedirect from '../../utilities/simpleRedirect';

export default function createProfilePage(): HTMLDivElement {
  const profilePage: HTMLDivElement = createElement('div', ['profile-page']);
  const profileWrapper: HTMLDivElement = createElement('div', ['profile-page__wrapper'], profilePage);
  createElement('h1', ['profile-page__title'], profileWrapper, 'MY ACCOUNT');

  /* START personal info */
  const personalInfoEmail: HTMLDivElement = createElement(
    'div',
    ['profile-page__data-block', 'profile-page__personal-info-email'],
    profileWrapper
  );
  const personalTitleBlock: HTMLDivElement = createElement('div', ['data-block__title-block'], personalInfoEmail);
  createElement('h2', ['data-block__title'], personalTitleBlock, 'Personal information & Email');
  const editInfoEmailButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'personal-info-email__edit-btn'],
    personalTitleBlock,
    'EDIT'
  );

  const firstName: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__first-name'],
    personalInfoEmail,
    'first name'
  );
  createElement('label', ['data-block__label'], firstName);
  const firstNameValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'first-name__input'],
    firstName
  );
  firstNameValue.disabled = true;
  //   firstNameValue.value =
  const lastName: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__last-name'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], lastName, 'last name');
  const lastNameValue: HTMLInputElement = createElement('input', ['data-block__input', 'last-name__input'], lastName);
  lastNameValue.disabled = true;
  // lastNameValue.value =

  const birthDate: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__birth-date'],
    personalInfoEmail,
    'date of birth'
  );
  createElement('label', ['data-block__label'], birthDate);
  const birthDateValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'birth-date__input'],
    birthDate
  );
  birthDateValue.disabled = true;
  birthDateValue.setAttribute('type', 'date');
  //   birthDateValue.value =

  const email: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__email'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], email, 'email');
  const emailValue: HTMLInputElement = createElement('input', ['data-block__input', 'email__input'], email);
  emailValue.disabled = true;
  //   emailValue.value =

  /* END personal info */

  /* START addresses */

  const addressesWrapper: HTMLDivElement = createElement(
    'div',
    ['profile-page__data-block', 'profile-page__addresses-wrapper'],
    profileWrapper
  );

  const addressesTitleBlock: HTMLDivElement = createElement('div', ['data-block__title-block'], addressesWrapper);
  createElement('h2', ['data-block__title'], addressesTitleBlock, 'Personal information & Email');
  const editAddressesButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'addresses__edit-btn'],
    addressesTitleBlock,
    'EDIT'
  );

  const billingAddressBlock: HTMLDivElement = createElement(
    'div',
    ['address-wrapper__address', 'address-wrapper__billing'],
    addressesWrapper
  );
  createElement('h2', ['data-block__title'], billingAddressBlock, 'Billing address');

  const billingCountry: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'billing-address__country'],
    billingAddressBlock
  );
  createElement('label', ['data-block__label'], billingCountry, 'country');
  const billingCountryValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'billing-address__country-input'],
    billingCountry
  );
  billingCountryValue.disabled = true;
  //   billingCountryValue.value =

  const billingCity: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'billing-address__city'],
    billingAddressBlock
  );
  createElement('label', ['data-block__label'], billingCity, 'city');
  const billingCityValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'billing-address__city-input'],
    billingCity
  );
  billingCityValue.disabled = true;
  //   billingCityValue.value =

  const billingStreet: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'billing-address__street'],
    billingAddressBlock
  );
  createElement('label', ['data-block__label'], billingStreet, 'street');
  const billingStreetValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'billing-address__street-input'],
    billingStreet
  );
  billingStreetValue.disabled = true;
  //   billingStreetValue.value =

  const billingPostalCode: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'billing-address__postal-code'],
    billingAddressBlock
  );
  createElement('label', ['data-block__label'], billingPostalCode, 'postal code');
  const billingPostalCodeValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'billing-address__postal-code-input'],
    billingPostalCode
  );
  billingPostalCodeValue.disabled = true;
  //   billingPostalCodeValue.value =

  const checkboxBillingAdd: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    billingAddressBlock
  );
  const checkboxInputBillingAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxBillingAdd
  );
  checkboxInputBillingAdd.id = 'profile-address-billing-default';
  checkboxInputBillingAdd.setAttribute('type', 'checkbox');
  createElement('label', ['checkbox-block__checkbox-label'], checkboxBillingAdd, 'default');

  const checkboxInputSameAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxBillingAdd
  );
  checkboxInputSameAdd.id = 'profile-same-addresses';
  checkboxInputSameAdd.setAttribute('type', 'checkbox');
  createElement(
    'label',
    ['checkbox-block__checkbox-label'],
    checkboxBillingAdd,
    'used as the same address for both billing and shipping'
  );

  const shippingAddressBlock: HTMLDivElement = createElement(
    'div',
    ['address-wrapper__address', 'address-wrapper__shipping'],
    addressesWrapper
  );
  createElement('h2', ['data-block__title'], shippingAddressBlock, 'Shipping address');

  const shippingCountry: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'address__country'],
    shippingAddressBlock
  );
  createElement('label', ['data-block__label'], shippingCountry, 'country');
  const shippingCountryValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'shipping-address__input-country'],
    shippingCountry
  );
  shippingCountryValue.disabled = true;
  //   shippingCountryValue.value =

  const shippingCity: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'address__city'],
    shippingAddressBlock
  );
  createElement('label', ['data-block__label'], shippingCity, 'city');
  const shippingCityValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'shipping-address__input-city'],
    shippingCity
  );
  shippingCityValue.disabled = true;
  //   shippingCityValue.value =

  const shippingStreet: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'shipping-address__street'],
    shippingAddressBlock
  );
  createElement('label', ['data-block__label'], shippingStreet, 'street');
  const shippingStreetValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'shipping-address__street-input'],
    shippingStreet
  );
  shippingStreetValue.disabled = true;
  //   shippingStreetValue.value =

  const shippingPostalCode: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'shipping-address__postal-code'],
    shippingAddressBlock
  );
  createElement('label', ['data-block__label'], shippingPostalCode, 'postal code');
  const shippingPostalCodeValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'shipping-address__postal-code-input'],
    shippingPostalCode
  );
  shippingPostalCodeValue.disabled = true;
  //   shippingPostalCodeValue.value =
  const checkboxShippingAdd: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    shippingAddressBlock
  );
  const checkboxInputShippingAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxShippingAdd
  );
  checkboxInputShippingAdd.id = 'profile-address-shipping-default';
  checkboxInputShippingAdd.setAttribute('type', 'checkbox');
  createElement('label', ['checkbox-block__checkbox-label'], checkboxShippingAdd, 'default');

  /* END addresses */

  const passwordBlock: HTMLDivElement = createElement(
    'div',
    ['profile-page__data-block', 'profile-page__password-wrapper'],
    profileWrapper
  );
  createElement('h2', ['data-block__title'], passwordBlock, 'Password');

  const editPasswordButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'password__edit-btn'],
    passwordBlock,
    'EDIT'
  );
  const currentPassword: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'password-block__current-password'],
    passwordBlock
  );
  createElement('label', ['data-block__label'], currentPassword, 'current password');
  const currentPasswordInput: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'current-password__input'],
    currentPassword
  );
  currentPasswordInput.disabled = true;
  //   currentPasswordInput.value =

  const newPassword: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'password-block__new-password'],
    passwordBlock
  );
  createElement('label', ['data-block__label'], newPassword, 'new password');
  const newPasswordInput: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-password__input'],
    newPassword
  );
  newPasswordInput.disabled = true;
  //   newPasswordInput.value =

  return profilePage;
}
