import createElement from '../../utilities/createElement';

export default function addAddress(
  block: HTMLDivElement,
  city?: string,
  street?: string,
  postalCode?: string,
  billingCheck?: boolean,
  shippingCheck?: boolean,
  defaultCheck?: boolean
) {
  // checkBillingInputs(
  //   billingCity,
  //   billingStreet,
  //   billingPostalCode,
  //   billingCityValue,
  //   billingStreetValue,
  //   billingPostalCodeValue,
  //   billingCityErr,
  //   billingStreetErr,
  //   billingPostalCodeErr,
  //   checkboxInputSameAdd,
  //   saveAddressesButton,
  //   shippingCityValue,
  //   shippingStreetValue,
  //   shippingPostalCodeValue,
  //   checkboxInputBillingAdd
  // );
  // checkShippingInputs(
  //   shippingCity,
  //   shippingStreet,
  //   shippingPostalCode,
  //   shippingCityValue,
  //   shippingStreetValue,
  //   shippingPostalCodeValue,
  //   shippingCityErr,
  //   shippingStreetErr,
  //   shippingPostalCodeErr,
  //   checkboxInputShippingAdd,
  //   saveAddressesButton
  // );

  const myAddress: HTMLDivElement = createElement('div', ['data-block__address-wrapper'], block);
  const newCountry: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__country'], myAddress);
  createElement('label', ['data-block__label'], newCountry, 'country');
  const newCountryValue: HTMLDivElement = createElement(
    'div',
    ['data-block__input', 'new-address__country-input'],
    newCountry,
    'US'
  );
  const newCity: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__city'], myAddress);
  createElement('label', ['data-block__label'], newCity, 'city');
  const newCityValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-address__city-input'],
    newCity
  );
  newCityValue.disabled = true;
  newCityValue.value = city as string;
  if (city && city.length) {
    newCityValue.disabled = true;
  } else {
    newCityValue.disabled = false;
  }

  const newStreet: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__street'], myAddress);
  createElement('label', ['data-block__label'], newStreet, 'street');
  const newStreetValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-address__street-input'],
    newStreet,
    street
  );
  newStreetValue.value = street as string;

  if (street && street.length) {
    newStreetValue.disabled = true;
  } else {
    newCityValue.disabled = false;
  }

  const newPostalCode: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'new-address__postal-code'],
    myAddress
  );
  createElement('label', ['data-block__label'], newPostalCode, 'postal code');
  const newPostalCodeValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-address__postal-code-input'],
    newPostalCode,
    postalCode
  );
  newPostalCodeValue.value = postalCode as string;

  if (street && street.length) {
    newPostalCodeValue.disabled = true;
  } else {
    newPostalCodeValue.disabled = false;
  }

  const checkboxNewAdd: HTMLDivElement = createElement('div', ['checkbox-block', 'checkbox-block__default'], myAddress);
  const checkboxInputNewAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input', 'checkbox-input__billing'],
    checkboxNewAdd
  );
  checkboxInputNewAdd.id = 'profile-address-billing-default';
  checkboxInputNewAdd.setAttribute('type', 'checkbox');
  checkboxInputNewAdd.disabled = true;

  if (billingCheck) {
    checkboxInputNewAdd.checked = billingCheck;
  }

  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAdd, 'Billing');

  const checkboxNewAddShip: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    myAddress
  );
  const checkboxInputNewAddShip: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxNewAddShip
  );
  checkboxInputNewAddShip.id = 'profile-address-shipping-default';
  checkboxInputNewAddShip.setAttribute('type', 'checkbox');
  checkboxInputNewAddShip.disabled = true;
  if (shippingCheck) {
    checkboxInputNewAddShip.checked = shippingCheck;
  }

  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddShip, 'Shipping');

  const checkboxNewAddDef: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    myAddress
  );
  const checkboxInputNewAddDef: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxNewAddDef
  );
  checkboxInputNewAddDef.id = 'profile-address-default';
  checkboxInputNewAddDef.disabled = true;
  checkboxInputNewAddDef.setAttribute('type', 'checkbox');
  if (checkboxInputNewAddDef && defaultCheck) {
    checkboxInputNewAddDef.checked = defaultCheck;
  }
  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddDef, 'Default');

  const addressAllBtn: HTMLDivElement = createElement('div', ['new-address__all-btn'], myAddress);
  const editAddressesButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'addresses__edit-btn'],
    addressAllBtn,
    'EDIT'
  );

  const saveAddressesButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__save-button', 'addresses__save-btn'],
    addressAllBtn,
    'SAVE'
  );
  saveAddressesButton.disabled = true;
  const deleteAddressBtn: HTMLButtonElement = createElement(
    'button',
    ['button', 'button-new-address', 'new-address__delete'],
    addressAllBtn,
    'Delete'
  );
  const addressInputs: NodeListOf<HTMLInputElement> = myAddress.querySelectorAll('.data-block__input');
  const adressCheckBoxes: NodeListOf<HTMLInputElement> = myAddress.querySelectorAll('.checkbox-block__checkbox-input');

  editAddressesButton.addEventListener('click', () => {
    addressInputs.forEach((input) => {
      input.disabled = false;
    });
    adressCheckBoxes.forEach((input) => {
      console.log(963963);
      input.disabled = false;
    });
    editAddressesButton.disabled = true;
    saveAddressesButton.disabled = false;
  });
  // const addressInputElements: NodeListOf<HTMLInputElement> = myAddress.querySelectorAll('.data-block__input');
  // const billingAddressInputElements: NodeListOf<HTMLInputElement> =
  //   billingAddressBlock.querySelectorAll('.data-block__input');
  // const shippingAddressInputElements: NodeListOf<HTMLInputElement> =
  //   shippingAddressBlock.querySelectorAll('.data-block__input');
  // const addressesCheckboxesElements: NodeListOf<HTMLInputElement> = myAddress.querySelectorAll(
  // '.checkbox-block__checkbox-input'
  // );
  // const shippingErrors: NodeListOf<HTMLDivElement> = shippingAddressBlock.querySelectorAll('.user-data__errors');

  // saveAddressesButton.addEventListener('click', () => {
  //   saveAddressesButton.disabled = true;
  //   editAddressesButton.disabled = false;
  //   addressInputElements.forEach((input) => {
  //     input.disabled = true;
  //   });
  //   addressesCheckboxesElements.forEach((checkbox) => {
  //     checkbox.disabled = true;
  //   });
  // });

  // if (customer.body.billingAddressIds && customer.body.shippingAddressIds) {
  //   if (customer.body.billingAddressIds[0] !== customer.body.shippingAddressIds[0]) {
  //     input.disabled = false;
  //   } else {
  //     billingAddressInputElements.forEach((item) => {
  //       item.disabled = false;
  //     });
  //   }

  //   checkboxInputSameAdd.addEventListener('click', () => {
  //     if (!checkboxInputSameAdd.checked) {
  //       shippingAddressInputElements.forEach((pos) => {
  //         pos.disabled = false;
  //       });
  //       checkboxInputShippingAdd.disabled = false;
  //     } else {
  //       shippingCityValue.value = billingCityValue.value;
  //       shippingStreetValue.value = billingStreetValue.value;
  //       shippingPostalCodeValue.value = billingPostalCodeValue.value;
  //       checkboxInputShippingAdd.disabled = true;
  //       shippingAddressInputElements.forEach((pos) => {
  //         pos.disabled = true;
  //       });
  //       shippingErrors.forEach((err) => {
  //         if (err.innerText.length) {
  //           err.innerText = '';
  //         }
  //       });
  //     }
  //   });
  // }
  // addressesCheckboxesElements.forEach((checkbox) => {
  //   checkbox.disabled = false;
  // });

  deleteAddressBtn.addEventListener('click', () => {
    myAddress.remove();
  });
  return myAddress;
}
