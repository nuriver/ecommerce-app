export default function customerInStorage(): boolean {
  const customer = sessionStorage.getItem('customer');
  if (customer) return true;
  return false;
}
