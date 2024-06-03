import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import createElement from '../../utilities/createElement';
import getCustomerById from './getCustomerBuId';
import addAddress from './addAddress';
import { updateCustomerById, updateCustomerPasswordById } from './updateCustomer';
import { checkPersonalInfo, checkPasswordsForChange } from './checks';
import { isError } from '../../utilities/checkers';

export default function createProfilePage(): HTMLDivElement {
  let customerId: string | undefined;
  //   let customerVersion: string | undefined;
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
  const firstNameErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);

  const lastName: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__last-name'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], lastName, 'last name');
  const lastNameValue: HTMLInputElement = createElement('input', ['data-block__input', 'last-name__input'], lastName);
  lastNameValue.disabled = true;
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
  const birthDateErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);

  const email: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'personal-info-email__email'],
    personalInfoEmail
  );
  createElement('label', ['data-block__label'], email, 'email');
  const emailValue: HTMLInputElement = createElement('input', ['data-block__input', 'email__input'], email);
  emailValue.disabled = true;
  const emailErr: HTMLDivElement = createElement('div', ['user-data__errors'], personalInfoEmail);
  const accumulatePersonalInfoErr: HTMLDivElement = createElement(
    'div',
    ['user-data__errors', 'user__password-changed'],
    personalInfoEmail
  );

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

  const delayPasswordButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__delay-button', 'password__delay-btn'],
    passwordTitleBlock,
    'Not now'
  );
  delayPasswordButton.disabled = true;

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
  const currentPasswordErr: HTMLDivElement = createElement('div', ['user-data__errors'], passwordBlock);

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
  const newPasswordErr: HTMLDivElement = createElement('div', ['user-data__errors'], passwordBlock);
  const accumulatePassErr: HTMLDivElement = createElement(
    'div',
    ['user-data__errors', 'user__password-changed'],
    passwordBlock
  );

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
    addAddress(addressesBlock, true, '', '', '', '', false, false, false);
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
  const resultCheckPasswords: { [key: string]: boolean } = checkPasswordsForChange(
    currentPasswordInput,
    newPasswordInput,
    currentPasswordErr,
    newPasswordErr,
    savePasswordButton,
    delayPasswordButton
  );
  delayPasswordButton.addEventListener('click', () => {
    editPasswordButton.disabled = false;
    delayPasswordButton.disabled = true;
    savePasswordButton.disabled = true;
    currentPasswordInput.value = '';
    newPasswordInput.value = '';
    currentPasswordInput.disabled = true;
    newPasswordInput.disabled = true;
    currentPasswordErr.innerHTML = '';
    newPasswordErr.innerHTML = '';
  });

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

        if (customerId && localStorage.getItem('customerVersion')) {
          const customer: ClientResponse<Customer> = await updateCustomerById(
            customerId,
            +(localStorage.getItem('customerVersion') as string),
            [
              { action: 'setFirstName', firstName: firstNameValue.value },
              { action: 'setLastName', lastName: lastNameValue.value },
              { action: 'setDateOfBirth', dateOfBirth: birthDateValue.value },
              { action: 'changeEmail', email: emailValue.value },
            ]
          );
          localStorage.setItem('customerVersion', `${customer.body.version}`);
        }

        accumulatePersonalInfoErr.style.color = 'green';
        accumulatePersonalInfoErr.innerHTML = 'Account has been updated!';
        setTimeout(async () => {
          accumulatePersonalInfoErr.innerHTML = '';
          infoEmailInputElements.forEach((input) => {
            input.disabled = true;
          });
          editInfoEmailButton.disabled = false;
        }, 2500);
      } catch {
        accumulatePersonalInfoErr.style.color = 'red';
        accumulatePersonalInfoErr.innerHTML = `Oops! Something wrong. Try again...`;
        setTimeout(async () => {
          accumulatePersonalInfoErr.innerHTML = '';
        }, 2500);
      }
    }
  });

  const passwordInputElements: NodeListOf<HTMLInputElement> = passwordBlock.querySelectorAll('.data-block__input');

  editPasswordButton.addEventListener('click', async () => {
    passwordInputElements.forEach((input) => {
      input.disabled = false;
    });
    editPasswordButton.disabled = true;
    // savePasswordButton.disabled = true;
    delayPasswordButton.disabled = false;
  });

  savePasswordButton.addEventListener('click', async (event) => {
    const customerUpdated: ClientResponse<Customer> = await getCustomerById(customerId as string);

    if (!isError(resultCheckPasswords)) {
      try {
        (event.target as HTMLButtonElement).disabled = true;
        delayPasswordButton.disabled = true;

        if (customerId && localStorage.getItem('customerVersion')) {
          const customer: ClientResponse<Customer> = await updateCustomerPasswordById(
            customerId,
            +customerUpdated.body.version,
            currentPasswordInput.value,
            newPasswordInput.value
          );
          accumulatePassErr.style.color = 'green';
          accumulatePassErr.innerHTML = 'Your password has been changed successfully!';
          localStorage.setItem('customerVersion', `${customer.body.version}`);
          setTimeout(async () => {
            accumulatePassErr.innerHTML = '';
            passwordInputElements.forEach((input) => {
              input.disabled = true;
            });
            editPasswordButton.disabled = false;
          }, 2500);
        }
      } catch (error) {
        accumulatePassErr.style.color = 'red';
        accumulatePassErr.innerHTML = `Oops! ${(error as Error).message}`;
        setTimeout(async () => {
          accumulatePassErr.innerHTML = '';
        }, 2500);
        editPasswordButton.disabled = false;
      } finally {
        (event.target as HTMLButtonElement).disabled = true;
        passwordInputElements.forEach((input) => {
          input.value = '';
        });
      }
    }
  });

  let previousSessionStorage = JSON.stringify(localStorage);

  setInterval(async () => {
    const currentSessionStorage = JSON.stringify(localStorage);

    const customerString: string = localStorage.getItem('customer') as string;
    if (customerString) {
      const customerObj = JSON.parse(customerString);
      customerId = customerObj.id;
    }
    if (
      currentSessionStorage !== previousSessionStorage &&
      JSON.parse(currentSessionStorage) &&
      (JSON.parse(currentSessionStorage).customer !== JSON.parse(previousSessionStorage).customer ||
        JSON.parse(currentSessionStorage).customerVersion !== JSON.parse(previousSessionStorage).customerVersion)
    ) {
      const allEditBtns: NodeListOf<HTMLButtonElement> = profilePage.querySelectorAll('.title-block__edit-button');
      const allSaveBtns: NodeListOf<HTMLButtonElement> = profilePage.querySelectorAll('.title-block__save-button');
      const allInputs: NodeListOf<HTMLInputElement> = profileWrapper.querySelectorAll('.data-block__input');
      const allErrorMessages: NodeListOf<HTMLDivElement> = profileWrapper.querySelectorAll('.user-data__errors');

      addressesBlock.innerHTML = '';
      allEditBtns.forEach((btn) => {
        btn.disabled = false;
      });
      allSaveBtns.forEach((btn) => {
        btn.disabled = true;
      });
      allInputs.forEach((input) => {
        input.value = '';
        input.disabled = true;
      });
      allErrorMessages.forEach((message) => {
        message.innerHTML = '';
      });

      const customer: ClientResponse<Customer> = await getCustomerById(customerId as string);
      customerId = customer.body.id;
      localStorage.setItem('customerVersion', `${customer.body.version}`);
      firstNameValue.value = customer.body.firstName as string;
      lastNameValue.value = customer.body.lastName as string;
      birthDateValue.value = customer.body.dateOfBirth as string;
      emailValue.value = customer.body.email;

      customer.body.addresses.forEach((address) => {
        addAddress(
          addressesBlock,
          false,
          address.id,
          address.city as string,
          address.streetName as string,
          address.postalCode as string,
          customer.body.billingAddressIds?.some((id) => id === address.id),
          customer.body.shippingAddressIds?.some((id) => id === address.id),
          customer.body.defaultBillingAddressId === address.id,
          customer.body.defaultShippingAddressId === address.id
        );
      });
    }

    previousSessionStorage = currentSessionStorage;
  }, 500);
  return profilePage;
}
