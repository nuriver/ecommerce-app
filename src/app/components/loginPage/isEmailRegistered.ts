import { Customer } from '@commercetools/platform-sdk';

const isEmailRegistered = (customers: Customer[], email: string): boolean => {
  const emailsInServer: string[] = [];
  customers.forEach((customer) => {
    emailsInServer.push(customer.email);
  });
  if (emailsInServer.includes(email)) {
    return true;
  }
  return false;
};

export default isEmailRegistered;
