import createElement from "../../utilities/createElement";

export default function addAddress(block: HTMLDivElement) {
    const newAddress: HTMLDivElement = createElement('div', ['profile-page__new-address'], block);
    createElement('h2', ['new-address__title'], newAddress, 'Address');
    const newCountry: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__country'], newAddress);
    createElement('label', ['data-block__label'], newCountry, 'country');
    const newCountryValue: HTMLInputElement = createElement(
      'input',
      ['data-block__input', 'new-address__country-input'],
      newCountry
    );
    newCountryValue.disabled = false;
    const newCity: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__city'], newAddress);
    createElement('label', ['data-block__label'], newCity, 'city');
    const newCityValue: HTMLInputElement = createElement(
      'input',
      ['data-block__input', 'new-address__city-input'],
      newCity
    );
    newCityValue.disabled = false;
    //   newCityValue.value =
  
    const newStreet: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__street'], newAddress);
    createElement('label', ['data-block__label'], newStreet, 'street');
    const newStreetValue: HTMLInputElement = createElement(
      'input',
      ['data-block__input', 'new-address__street-input'],
      newStreet
    );
    newStreetValue.disabled = false;
    //   newStreetValue.value =
  
    const newPostalCode: HTMLDivElement = createElement(
      'div',
      ['data-block__line', 'new-address__postal-code'],
      newAddress
    );
    createElement('label', ['data-block__label'], newPostalCode, 'postal code');
    const newPostalCodeValue: HTMLInputElement = createElement(
      'input',
      ['data-block__input', 'new-address__postal-code-input'],
      newPostalCode
    );
    newPostalCodeValue.disabled = false;
    //   newPostalCodeValue.value =
  
    const checkboxNewAdd: HTMLDivElement = createElement(
      'div',
      ['checkbox-block', 'checkbox-block__default'],
      newAddress
    );
    const checkboxInputNewAdd: HTMLInputElement = createElement(
      'input',
      ['checkbox-block__checkbox-input'],
      checkboxNewAdd
    );
    checkboxInputNewAdd.id = 'profile-address-billing-default';
    checkboxInputNewAdd.setAttribute('type', 'checkbox');
    createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAdd, 'Billing');
  
    const checkboxNewAddShip: HTMLDivElement = createElement(
      'div',
      ['checkbox-block', 'checkbox-block__default'],
      newAddress
    );
    const checkboxInputNewAddShip: HTMLInputElement = createElement(
      'input',
      ['checkbox-block__checkbox-input'],
      checkboxNewAddShip
    );
    checkboxInputNewAddShip.id = 'profile-address-shipping-default';
    checkboxInputNewAddShip.setAttribute('type', 'checkbox');
    createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddShip, 'Shipping');
  
    const checkboxNewAddDef: HTMLDivElement = createElement(
      'div',
      ['checkbox-block', 'checkbox-block__default'],
      newAddress
    );
    const checkboxInputNewAddDef: HTMLInputElement = createElement(
      'input',
      ['checkbox-block__checkbox-input'],
      checkboxNewAddDef
    );
    checkboxInputNewAddDef.id = 'profile-address-default';
    checkboxInputNewAddDef.setAttribute('type', 'checkbox');
    createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddDef, 'Default');
  
    const newAddressAllBtn: HTMLDivElement = createElement('div', ['new-address__all-btn'], newAddress);
    const editNewAddressBtn: HTMLButtonElement = createElement(
      'button',
      ['button', 'button-new-address', 'new-address__edit'],
      newAddressAllBtn,
      'Edit'
    );
    editNewAddressBtn.disabled = true;
    const saveNewAddressBtn: HTMLButtonElement = createElement(
      'button',
      ['button', 'button-new-address', 'new-address__save'],
      newAddressAllBtn,
      'Save'
    );
    saveNewAddressBtn.disabled = true;
    const deleteNewAddressBtn: HTMLButtonElement = createElement(
      'button',
      ['button', 'button-new-address', 'new-address__delete'],
      newAddressAllBtn,
      'Delete'
    );
    deleteNewAddressBtn.addEventListener('click', () => {
      newAddress.remove();
    });
    return newAddress;
  }
  