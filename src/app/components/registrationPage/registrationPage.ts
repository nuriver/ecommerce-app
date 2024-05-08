    import createElement  from '../../utilities/createElement';

    const { body } = document;

    const registerWrapper: HTMLDivElement = createElement('div', ['register-page'], body);

     createElement('h1', ['register-page__title'], registerWrapper, 'REGISTRATION');

    const userData: HTMLDivElement = createElement('div', ['register-page__user-data'], registerWrapper);
    createElement('span', ['user-data__label'], userData, 'first name');
    const firstName: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__first-name'], userData);
    firstName.id = 'firstName';
    createElement('span', ['user-data__label'], userData, 'last name');
    const lastName: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__last-name'], userData);
    lastName.id = 'lastName';
    createElement('span', ['user-data__label'], userData, 'birth date');
    const birthDate: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__birth-date'], userData);
    birthDate.id = 'birthDate';
    createElement('span', ['user-data__label'], userData, 'email');
    const email: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__email'], userData);
    email.id = 'email';
    createElement('span', ['user-data__label'], userData, 'password');
    const password: HTMLInputElement = createElement('input', ['user-data__input', 'user-data__password'], userData);
    password.id = 'password';

    const billingAddress: HTMLDivElement = createElement('div', ['register-page__address-block', 'register-page__billing-address'], registerWrapper, 'Billing address');
    createElement('span', ['user-data__label'], billingAddress, 'country');
    const billingCountry: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], billingAddress);
    billingCountry.id = 'billingCountry';
    createElement('span', ['user-data__label'], billingAddress, 'city');
    const billingCity: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], billingAddress);
    billingCity.id = 'billingCity'
    createElement('span', ['user-data__label'], billingAddress, 'street');
    const billingStreet: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], billingAddress);
    billingStreet.id = 'billingStreet';
    createElement('span', ['user-data__label'], billingAddress, 'postal code');
    const billingPostalCode: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], billingAddress);
    billingPostalCode.id = 'billingPostalCode';


    const shippingAddress: HTMLDivElement = createElement('div', ['register-page__address-block', 'register-page__billing-address'], registerWrapper, 'Shipping address');
    createElement('span', ['user-data__label'], shippingAddress, 'country');
    const shippingCountry: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], shippingAddress);
    shippingCountry.id = 'shippingCountry';
    createElement('span', ['user-data__label'], shippingAddress, 'city');
    const shippingCity: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], shippingAddress);
    shippingCity.id = 'shippingCity'
    createElement('span', ['user-data__label'], shippingAddress, 'street');
    const shippingStreet: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], shippingAddress);
    shippingStreet.id = 'shippingStreet';
    createElement('span', ['user-data__label'], shippingAddress, 'postal code');
    const shippingPostalCode: HTMLInputElement = createElement('input', ['address-block__input', 'billing-address__input'], shippingAddress);
    shippingPostalCode.id = 'shippingPostalCode';


    export default registerWrapper;
