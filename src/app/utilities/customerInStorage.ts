export default function customerInStorage(): boolean {
  const customer = localStorage.getItem('customer');
  if (customer) return true;
  return false;
}

export function sessionIsAnonymous() {
  const anonymousCustomer = sessionStorage.getItem('anonymousCustomer');
  if (anonymousCustomer) return true;
  return false;
}
