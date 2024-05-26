import { ClientResponse, Customer } from '@commercetools/platform-sdk';
// import { createCustomer, signInCustomer } from '../../api/SDK/client';

// import { getCustomers } from '../../api/SDK/client';
import createElement from '../../utilities/createElement';
// import { ctpClient } from '../../api/SDK/clientBuilder';
import getCustomerById from './getCustomerBuId';
import addAddress from './addAddress';
import updateCustomerById from './updateCustomer';
import { checkPersonalInfo, checkBillingInputs, checkShippingInputs } from './checks';
// import simpleRedirect from '../../utilities/simpleRedirect';

export default function createProfilePage(): HTMLDivElement {
  function isError(obj: Record<string, boolean>): boolean {
    return !Object.values(obj).every((value) => !value);
  }
  let idCustomer: string | undefined;
  let versionCustomer: number | undefined;
  const errors: { [key: string]: boolean } = {
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

  const saveInfoEmailButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__save-button', 'personal-info-email__save-btn'],
    personalTitleBlock,
    'SAVE'
  );
  saveInfoEmailButton.disabled = true;

  const firstName: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__first-name'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], firstName, 'first name');
  const firstNameValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'first-name__input'],
    firstName
  );
  firstNameValue.disabled = true;
  //   firstNameValue.value =
  const firstNameErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);

  const lastName: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__last-name'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], lastName, 'last name');
  const lastNameValue: HTMLInputElement = createElement('input', ['data-block__input', 'last-name__input'], lastName);
  lastNameValue.disabled = true;
  // lastNameValue.value =
  const lastNameErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);

  const birthDate: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__birth-date'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], birthDate, 'date of birth');

  const birthDateValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'birth-date__input'],
    birthDate
  );

  birthDateValue.disabled = true;
  birthDateValue.setAttribute('type', 'date');
  //   birthDateValue.value =
  const birthDateErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);

  const email: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__email'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], email, 'email');
  const emailValue: HTMLInputElement = createElement('input', ['data-block__input', 'email__input'], email);
  emailValue.disabled = true;
  //   emailValue.value =
  const emailErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);

  /* END personal info */

  /* START addresses */

  const addressesWrapper: HTMLDivElement = createElement(
    'div',
    ['profile-page__data-block', 'profile-page__addresses-wrapper'],
    profileWrapper
  );

  const addressesTitleBlock: HTMLDivElement = createElement('div', ['data-block__title-block'], addressesWrapper);
  createElement('h2', ['data-block__title'], addressesTitleBlock, 'Addresses');
  const editAddressesButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'addresses__edit-btn'],
    addressesTitleBlock,
    'EDIT'
  );

  const saveAddressesButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__save-button', 'addresses__save-btn'],
    addressesTitleBlock,
    'SAVE'
  );
  saveAddressesButton.disabled = true;

  const myAddresses: HTMLDivElement = createElement('div', ['data-block__addresses-wrapper'], addressesWrapper);

  const billingAddressBlock: HTMLDivElement = createElement(
    'div',
    ['address-wrapper__address', 'address-wrapper__billing'],
    myAddresses
  );
  createElement('h2', ['data-block__title'], billingAddressBlock, 'Billing address');

  const billingCountry: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'billing-address__country'],
    billingAddressBlock
  );
  createElement('label', ['data-block__label'], billingCountry, 'country');
  const billingCountryValue: HTMLDivElement = createElement(
    'div',
    ['data-block__country', 'billing-address__country-input'],
    billingCountry,
    'US'
  );
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
  const billingCityErr: HTMLDivElement = createElement('div', ['user-data__errors'], billingAddressBlock);

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
  const billingStreetErr: HTMLDivElement = createElement('div', ['user-data__errors'], billingAddressBlock);

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
  const billingPostalCodeErr: HTMLDivElement = createElement('div', ['user-data__errors'], billingAddressBlock);

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
  checkboxInputBillingAdd.disabled = true;
  createElement('label', ['checkbox-block__checkbox-label'], checkboxBillingAdd, 'default');

  const checkboxBillingSameAdd: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    billingAddressBlock
  );

  const checkboxInputSameAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxBillingSameAdd
  );
  checkboxInputSameAdd.id = 'profile-same-addresses';
  checkboxInputSameAdd.setAttribute('type', 'checkbox');
  checkboxInputSameAdd.disabled = true;
  createElement(
    'label',
    ['checkbox-block__checkbox-label'],
    checkboxBillingSameAdd,
    'used as the same address for both billing and shipping'
  );

  const shippingAddressBlock: HTMLDivElement = createElement(
    'div',
    ['address-wrapper__address', 'address-wrapper__shipping'],
    myAddresses
  );
  createElement('h2', ['data-block__title'], shippingAddressBlock, 'Shipping address');

  const shippingCountry: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'address__country'],
    shippingAddressBlock
  );
  createElement('label', ['data-block__label'], shippingCountry, 'country');
  const shippingCountryValue: HTMLDivElement = createElement(
    'div',
    ['data-block__country', 'shipping-address__country-input'],
    shippingCountry,
    'US'
  );
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
  const shippingCityErr: HTMLDivElement = createElement('div', ['user-data__errors'], shippingAddressBlock);

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
  const shippingStreetErr: HTMLDivElement = createElement('div', ['user-data__errors'], shippingAddressBlock);

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
  const shippingPostalCodeErr: HTMLDivElement = createElement('div', ['user-data__errors'], shippingAddressBlock);

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
  checkboxInputShippingAdd.disabled = true;
  createElement('label', ['checkbox-block__checkbox-label'], checkboxShippingAdd, 'default');

  /* END addresses */

  const passwordBlock: HTMLDivElement = createElement(
    'div',
    ['profile-page__data-block', 'profile-page__password-wrapper'],
    profileWrapper
  );
  const passwordTitleBlock: HTMLDivElement = createElement('div', ['data-block__title-block'], passwordBlock);

  createElement('h2', ['data-block__title'], passwordTitleBlock, 'Password');

  const editPasswordButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'password__edit-btn'],
    passwordTitleBlock,
    'EDIT'
  );
  const savePasswordButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__save-button', 'password__save-btn'],
    passwordTitleBlock,
    'SAVE'
  );
  savePasswordButton.disabled = true;

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

  const addAddressButton: HTMLButtonElement = createElement(
    'button',
    ['button', 'profile-page__add-address-button'],
    profileWrapper,
    'Add new address'
  );
  addAddressButton.addEventListener('click', () => {
    addAddress(profileWrapper);
  });

  const infoEmailInputElements: NodeListOf<HTMLInputElement> = personalInfoEmail.querySelectorAll('.data-block__input');

  checkPersonalInfo(
    firstName,
    lastName,
    birthDate,
    email,
    firstNameValue,
    lastNameValue,
    birthDateValue,
    emailValue,
    saveInfoEmailButton,
    firstNameErr,
    lastNameErr,
    birthDateErr,
    emailErr
  );
  checkBillingInputs(
    billingCity,
    billingStreet,
    billingPostalCode,
    billingCityValue,
    billingStreetValue,
    billingPostalCodeValue,
    billingCityErr,
    billingStreetErr,
    billingPostalCodeErr,
    checkboxInputSameAdd,
    saveAddressesButton,
    shippingCityValue,
    shippingStreetValue,
    shippingPostalCodeValue,
    checkboxInputBillingAdd
  );
  checkShippingInputs(
    shippingCity,
    shippingStreet,
    shippingPostalCode,
    shippingCityValue,
    shippingStreetValue,
    shippingPostalCodeValue,
    shippingCityErr,
    shippingStreetErr,
    shippingPostalCodeErr,
    checkboxInputShippingAdd,
    saveAddressesButton
  );
  editInfoEmailButton.addEventListener('click', () => {
    infoEmailInputElements.forEach((input) => {
      input.disabled = false;
    });
    editInfoEmailButton.disabled = true;
    saveInfoEmailButton.disabled = false;
  });

  saveInfoEmailButton.addEventListener('click', async (event) => {
    if (!isError(errors)) {
      try {
        (event.target as HTMLButtonElement).disabled = true;
        console.log(123);
        if (idCustomer && versionCustomer) {
          updateCustomerById(idCustomer, versionCustomer, [{ action: 'setFirstName', firstName: 'newNameOooooooo' }]);
          console.log(789);
        }
      } catch {
        console.log(666);
      }
    }
    infoEmailInputElements.forEach((input) => {
      input.disabled = true;
    });
  });

  const addressesInputElements: NodeListOf<HTMLInputElement> = myAddresses.querySelectorAll('.data-block__input');
  const billingAddressInputElements: NodeListOf<HTMLInputElement> =
    billingAddressBlock.querySelectorAll('.data-block__input');
  const shippingAddressInputElements: NodeListOf<HTMLInputElement> =
    shippingAddressBlock.querySelectorAll('.data-block__input');
  const addressesCheckboxesElements: NodeListOf<HTMLInputElement> = myAddresses.querySelectorAll(
    '.checkbox-block__checkbox-input'
  );
  const shippingErrors: NodeListOf<HTMLDivElement> = shippingAddressBlock.querySelectorAll('.user-data__errors');

  saveAddressesButton.addEventListener('click', () => {
    saveAddressesButton.disabled = true;
    editAddressesButton.disabled = false;
    addressesInputElements.forEach((input) => {
      input.disabled = true;
    });
    addressesCheckboxesElements.forEach((checkbox) => {
      checkbox.disabled = true;
    });
  });

  const passwordInputElements: NodeListOf<HTMLInputElement> = passwordBlock.querySelectorAll('.data-block__input');

  editPasswordButton.addEventListener('click', () => {
    passwordInputElements.forEach((input) => {
      input.disabled = false;
    });
    editPasswordButton.disabled = true;
    savePasswordButton.disabled = false;
  });

  savePasswordButton.addEventListener('click', () => {
    savePasswordButton.disabled = true;
    editPasswordButton.disabled = false;
    passwordInputElements.forEach((input) => {
      input.disabled = true;
    });
  });

  let previousSessionStorage = JSON.stringify(sessionStorage);
  setInterval(async () => {
    const currentSessionStorage = JSON.stringify(sessionStorage);
    if (currentSessionStorage !== previousSessionStorage) {
      if (JSON.parse(currentSessionStorage).customer !== JSON.parse(previousSessionStorage).customer) {
        if (JSON.parse(currentSessionStorage).customer) {
          const customer: ClientResponse<Customer> = await getCustomerById(JSON.parse(currentSessionStorage).customer);
          idCustomer = customer.body.id;
          versionCustomer = customer.body.version;
          firstNameValue.value = customer.body.firstName as string;
          lastNameValue.value = customer.body.lastName as string;
          birthDateValue.value = customer.body.dateOfBirth as string;
          emailValue.value = customer.body.email;
          if (customer.body.billingAddressIds && customer.body.shippingAddressIds) {
            if (customer.body.billingAddressIds[0] === customer.body.shippingAddressIds[0]) {
              checkboxInputSameAdd.checked = true;
              billingCountryValue.innerText = customer.body.addresses[0].country;
              shippingCountryValue.innerText = customer.body.addresses[0].country;

              billingCityValue.value = customer.body.addresses[0].city as string;
              shippingCityValue.value = customer.body.addresses[0].city as string;

              billingStreetValue.value = customer.body.addresses[0].streetName as string;
              shippingStreetValue.value = customer.body.addresses[0].streetName as string;

              billingPostalCodeValue.value = customer.body.addresses[0].postalCode as string;
              shippingPostalCodeValue.value = customer.body.addresses[0].postalCode as string;

              if (customer.body.defaultBillingAddressId) {
                checkboxInputBillingAdd.checked = true;
              }
            } else {
              billingCountryValue.innerText = customer.body.addresses[0].country;
              shippingCountryValue.innerText = customer.body.addresses[1].country;

              billingCityValue.value = customer.body.addresses[0].city as string;
              shippingCityValue.value = customer.body.addresses[1].city as string;

              billingStreetValue.value = customer.body.addresses[0].streetName as string;
              shippingStreetValue.value = customer.body.addresses[1].streetName as string;

              billingPostalCodeValue.value = customer.body.addresses[0].postalCode as string;
              shippingPostalCodeValue.value = customer.body.addresses[1].postalCode as string;
              if (customer.body.defaultBillingAddressId) {
                checkboxInputBillingAdd.checked = true;
              }
              if (customer.body.defaultShippingAddressId) {
                checkboxInputShippingAdd.checked = true;
              }
            }
          }

          editAddressesButton.addEventListener('click', () => {
            addressesInputElements.forEach((input) => {
              if (customer.body.billingAddressIds && customer.body.shippingAddressIds) {
                if (customer.body.billingAddressIds[0] !== customer.body.shippingAddressIds[0]) {
                  input.disabled = false;
                } else {
                  billingAddressInputElements.forEach((item) => {
                    item.disabled = false;
                  });
                }

                checkboxInputSameAdd.addEventListener('click', () => {
                  if (!checkboxInputSameAdd.checked) {
                    shippingAddressInputElements.forEach((pos) => {
                      pos.disabled = false;
                    });
                    checkboxInputShippingAdd.disabled = false;
                  } else {
                    shippingCityValue.value = billingCityValue.value;
                    shippingStreetValue.value = billingStreetValue.value;
                    shippingPostalCodeValue.value = billingPostalCodeValue.value;
                    checkboxInputShippingAdd.disabled = true;
                    shippingAddressInputElements.forEach((pos) => {
                      pos.disabled = true;
                    });
                    shippingErrors.forEach((err) => {
                      if (err.innerText.length) {
                        err.innerText = '';
                      }
                    });
                  }
                });
              }
              addressesCheckboxesElements.forEach((checkbox) => {
                checkbox.disabled = false;
              });
            });
            editAddressesButton.disabled = true;
            saveAddressesButton.disabled = false;
          });
        } else {
          const allInputs: NodeListOf<HTMLInputElement> = profileWrapper.querySelectorAll('.data-block__input');
          const allCheckboxes: NodeListOf<HTMLInputElement> = profileWrapper.querySelectorAll(
            '.checkbox-block__checkbox-input'
          );
          allInputs.forEach((input) => {
            input.innerHTML = '';
          });
          allCheckboxes.forEach((checkbox) => {
            checkbox.innerHTML = '';
          });
        }
        previousSessionStorage = currentSessionStorage;
      }
    }
  }, 1000);
  return profilePage;
}
