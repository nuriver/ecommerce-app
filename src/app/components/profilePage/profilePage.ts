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

  const addressesWrapper: HTMLDivElement = createElement(
    'div',
    ['profile-page__data-block', 'profile-page__addresses-wrapper'],
    profileWrapper
  );

  const addressesTitleBlock: HTMLDivElement = createElement('div', ['data-block__title-block'], addressesWrapper);
  createElement('h2', ['data-block__title'], addressesTitleBlock, 'Addresses');
  const addressesBlock: HTMLDivElement = createElement('div', ['addresses-wrapper__addresses-block'], addressesWrapper);

  const addAddressButton: HTMLButtonElement = createElement(
    'button',
    ['button', 'profile-page__add-address-button'],
    profileWrapper,
    'Add new address'
  );
  addAddressButton.addEventListener('click', () => {
    addAddress(addressesBlock, '', '', '', false, false, false);
  });

  const infoEmailInputElements: NodeListOf<HTMLInputElement> = personalInfoEmail.querySelectorAll('.data-block__input');

  const resultCheckPersonalInfo: { [key: string]: boolean } = checkPersonalInfo(
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
  editInfoEmailButton.addEventListener('click', () => {
    infoEmailInputElements.forEach((input) => {
      input.disabled = false;
    });
    editInfoEmailButton.disabled = true;
    saveInfoEmailButton.disabled = false;
  });

  saveInfoEmailButton.addEventListener('click', async (event) => {
    if (!isError(resultCheckPersonalInfo)) {
      try {
        (event.target as HTMLButtonElement).disabled = true;
        if (idCustomer && versionCustomer) {
          updateCustomerById(idCustomer, versionCustomer, [
            { action: 'setFirstName', firstName: firstNameValue.value },
            { action: 'setLastName', lastName: lastNameValue.value },
            { action: 'setDateOfBirth', dateOfBirth: birthDateValue.value },
            { action: 'changeEmail', email: emailValue.value },
          ]);
        }
      } catch {
        console.log(666);
      }
    }
    infoEmailInputElements.forEach((input) => {
      input.disabled = true;
    });
    editInfoEmailButton.disabled = false;
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
            console.log(customer.body.billingAddressIds, customer.body.shippingAddressIds);
            if (customer.body.billingAddressIds[0] === customer.body.shippingAddressIds[0]) {
              addAddress(
                addressesBlock,
                customer.body.addresses[0].city as string,
                customer.body.addresses[0].streetName as string,
                customer.body.addresses[0].postalCode as string,
                true,
                true,
                !!customer.body.defaultBillingAddressId
              );
            } else {
              addAddress(
                addressesBlock,
                customer.body.addresses[0].city as string,
                customer.body.addresses[0].streetName as string,
                customer.body.addresses[0].postalCode as string,
                true,
                false,
                !!customer.body.defaultBillingAddressId
              );

              addAddress(
                addressesBlock,
                customer.body.addresses[1].city as string,
                customer.body.addresses[1].streetName as string,
                customer.body.addresses[1].postalCode as string,
                false,
                true,
                !!customer.body.defaultShippingAddressId
              );
            }
          }
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
