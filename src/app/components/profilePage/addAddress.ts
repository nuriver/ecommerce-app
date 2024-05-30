import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import createElement from '../../utilities/createElement';
import { checkAddressInputs } from './checks';
import { updateCustomerById } from './updateCustomer';

export default function addAddress(
  block: HTMLDivElement,
  newAddress: boolean,
  addressId?: string,
  city?: string,
  street?: string,
  postalCode?: string,
  billingCheck?: boolean,
  shippingCheck?: boolean,
  defaultCheck?: boolean,
  defaultShipCheck?: boolean
) {
  const myAddress: HTMLDivElement = createElement('div', ['data-block__address-wrapper'], block);
  const newCountry: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__country'], myAddress);
  createElement('label', ['data-block__label'], newCountry, 'country');
  createElement('div', ['data-block__input', 'new-address__country-input'], newCountry, 'US');
  const newCity: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__city'], myAddress);
  const newCityErr: HTMLDivElement = createElement('div', ['user-data__errors'], myAddress);
  createElement('label', ['data-block__label'], newCity, 'city');
  const newCityValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-address__city-input'],
    newCity
  );
  newCityValue.disabled = true;
  newCityValue.value = city as string;
  newCityValue.disabled = !newAddress;

  const newStreet: HTMLDivElement = createElement('div', ['data-block__line', 'new-address__street'], myAddress);
  const newStreetErr: HTMLDivElement = createElement('div', ['user-data__errors'], myAddress);
  createElement('label', ['data-block__label'], newStreet, 'street');
  const newStreetValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-address__street-input'],
    newStreet,
    street
  );
  newStreetValue.value = street as string;
  newStreetValue.disabled = !newAddress;

  const newPostalCode: HTMLDivElement = createElement(
    'div',
    ['data-block__line', 'new-address__postal-code'],
    myAddress
  );
  const newPostalCodeErr: HTMLDivElement = createElement('div', ['user-data__errors'], myAddress);

  createElement('label', ['data-block__label'], newPostalCode, 'postal code');
  const newPostalCodeValue: HTMLInputElement = createElement(
    'input',
    ['data-block__input', 'new-address__postal-code-input'],
    newPostalCode,
    postalCode
  );
  newPostalCodeValue.value = postalCode as string;
  newPostalCodeValue.disabled = !newAddress;

  const checkboxWrapper: HTMLDivElement = createElement('div', ['user-data__checkbox-wrapper'], myAddress);
  const checkboxNewAdd: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    checkboxWrapper
  );
  const checkboxInputNewAdd: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input', 'checkbox-input__billing'],
    checkboxNewAdd
  );
  checkboxInputNewAdd.id = 'profile-address-billing-default';
  checkboxInputNewAdd.setAttribute('type', 'checkbox');
  checkboxInputNewAdd.disabled = !newAddress;
  if (billingCheck) {
    checkboxInputNewAdd.checked = billingCheck;
  }
  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAdd, 'Billing');

  const checkboxNewAddDef: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    checkboxWrapper
  );
  const checkboxInputNewAddDef: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxNewAddDef
  );
  checkboxInputNewAddDef.id = 'profile-address-default';
  checkboxInputNewAddDef.disabled = true;
  checkboxInputNewAddDef.setAttribute('type', 'checkbox');
  if (defaultCheck) {
    checkboxInputNewAddDef.checked = defaultCheck;
  }
  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddDef, 'default');

  const checkboxNewAddShip: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    checkboxWrapper
  );
  const checkboxInputNewAddShip: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxNewAddShip
  );
  checkboxInputNewAddShip.id = 'profile-address-shipping-default';
  checkboxInputNewAddShip.setAttribute('type', 'checkbox');
  checkboxInputNewAddShip.disabled = !newAddress;
  if (shippingCheck) {
    checkboxInputNewAddShip.checked = shippingCheck;
  }
  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddShip, 'Shipping');

  const checkboxNewAddShipDef: HTMLDivElement = createElement(
    'div',
    ['checkbox-block', 'checkbox-block__default'],
    checkboxWrapper
  );
  const checkboxInputNewAddShipDef: HTMLInputElement = createElement(
    'input',
    ['checkbox-block__checkbox-input'],
    checkboxNewAddShipDef
  );
  checkboxInputNewAddShipDef.id = 'profile-address-default';
  checkboxInputNewAddShipDef.disabled = true;
  checkboxInputNewAddShipDef.setAttribute('type', 'checkbox');
  if (defaultShipCheck) {
    checkboxInputNewAddShipDef.checked = defaultShipCheck;
  }
  createElement('label', ['checkbox-block__checkbox-label'], checkboxNewAddShipDef, 'default');

  const addressAllBtn: HTMLDivElement = createElement('div', ['new-address__all-btn'], myAddress);
  const editAddressesButton: HTMLButtonElement = createElement(
    'button',
    ['button-white', 'title-block__edit-button', 'addresses__edit-btn'],
    addressAllBtn,
    'EDIT'
  );
  editAddressesButton.disabled = false;
  if (newAddress) {
    editAddressesButton.style.display = 'none';
  }
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

  checkAddressInputs(
    newCity,
    newStreet,
    newPostalCode,
    newCityValue,
    newStreetValue,
    newPostalCodeValue,
    newCityErr,
    newStreetErr,
    newPostalCodeErr,
    saveAddressesButton,
    newAddress
  );

  checkboxInputNewAdd.addEventListener('input', (event) => {
    checkboxInputNewAddDef.disabled = !(event.target as HTMLInputElement).checked;
    if (!(event.target as HTMLInputElement).checked) {
      checkboxInputNewAddDef.checked = false;
    }
  });
  checkboxInputNewAddShip.addEventListener('input', (event) => {
    checkboxInputNewAddShipDef.disabled = !(event.target as HTMLInputElement).checked;
    if (!(event.target as HTMLInputElement).checked) {
      checkboxInputNewAddShipDef.checked = false;
    }
  });

  editAddressesButton.addEventListener('click', () => {
    addressInputs.forEach((input) => {
      input.disabled = false;
    });

    checkboxInputNewAdd.disabled = false;
    checkboxInputNewAddShip.disabled = false;
    checkboxInputNewAddDef.disabled = !checkboxInputNewAdd.checked;
    checkboxInputNewAddShipDef.disabled = !checkboxInputNewAddShip.checked;

    editAddressesButton.disabled = true;
    saveAddressesButton.disabled = false;
  });

  deleteAddressBtn.addEventListener('click', async () => {
    const customerId = sessionStorage.getItem('customer');
    const version = sessionStorage.getItem('customerVersion');
    if (customerId && version && addressId) {
      const customer = await updateCustomerById(customerId, +version, [{ action: 'removeAddress', addressId }]);
      sessionStorage.setItem('customerVersion', `${customer.body.version}`);
    } else {
      myAddress.remove();
    }
  });

  saveAddressesButton.addEventListener('click', async () => {
    const customerId = sessionStorage.getItem('customer');
    const versionFromStorage = sessionStorage.getItem('customerVersion');
    let version = versionFromStorage ? +versionFromStorage : 0;
    if (customerId && version) {
      try {
        const customer = await updateCustomerById(customerId, version, [
          {
            action: newAddress ? 'addAddress' : 'changeAddress',
            address: {
              country: 'US',
              city: newCityValue.value,
              streetName: newStreetValue.value,
              postalCode: newPostalCodeValue.value,
            },
            addressId: newAddress ? undefined : addressId,
          },
        ]);
        version = customer.body.version;
        const updAddressId = newAddress ? customer.body.addresses[customer.body.addresses.length - 1].id : addressId;

        const actions: CustomerUpdateAction[] = [];

        if (
          checkboxInputNewAdd.checked &&
          !customer.body.billingAddressIds?.some((address) => address === updAddressId)
        ) {
          actions.push({
            action: 'addBillingAddressId',
            addressId: updAddressId,
          });
        }
        if (
          !checkboxInputNewAdd.checked &&
          customer.body.billingAddressIds?.some((address) => address === updAddressId)
        ) {
          actions.push({
            action: 'removeBillingAddressId',
            addressId: updAddressId,
          });
        }
        if (
          checkboxInputNewAddShip.checked &&
          !customer.body.shippingAddressIds?.some((address) => address === updAddressId)
        ) {
          actions.push({
            action: 'addShippingAddressId',
            addressId: updAddressId,
          });
        }
        if (
          !checkboxInputNewAddShip.checked &&
          customer.body.shippingAddressIds?.some((address) => address === updAddressId)
        ) {
          actions.push({
            action: 'removeShippingAddressId',
            addressId: updAddressId,
          });
        }
        if (checkboxInputNewAddDef.checked && customer.body.defaultBillingAddressId !== updAddressId) {
          actions.push({
            action: 'setDefaultBillingAddress',
            addressId: updAddressId,
          });
        }
        if (checkboxInputNewAddShipDef.checked && customer.body.defaultShippingAddressId !== updAddressId) {
          actions.push({
            action: 'setDefaultShippingAddress',
            addressId: updAddressId,
          });
        }
        if (!checkboxInputNewAddDef.checked && customer.body.defaultBillingAddressId === updAddressId) {
          actions.push({
            action: 'removeBillingAddressId',
            addressId: updAddressId,
          });
          actions.push({
            action: 'addBillingAddressId',
            addressId: updAddressId,
          });
        }
        if (!checkboxInputNewAddShipDef.checked && customer.body.defaultShippingAddressId === updAddressId) {
          actions.push({
            action: 'removeShippingAddressId',
            addressId: updAddressId,
          });
          actions.push({
            action: 'addShippingAddressId',
            addressId: updAddressId,
          });
        }

        if (actions.length) {
          const customerUpd = await updateCustomerById(customerId, version, actions);
          version = customerUpd.body.version;
        }
        sessionStorage.setItem('customerVersion', `${version}`);
      } catch (error) {
        console.error((error as Error).message);
      } finally {
        saveAddressesButton.disabled = true;
        editAddressesButton.disabled = false;
        newCityValue.disabled = true;
        newStreetValue.disabled = true;
        newPostalCodeValue.disabled = true;
        checkboxInputNewAddShip.disabled = true;
        checkboxInputNewAdd.disabled = true;
        checkboxInputNewAddDef.disabled = true;
        checkboxInputNewAddShipDef.disabled = true;
      }
    }
  });
  return myAddress;
}
