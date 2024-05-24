export default function customerInStorage(): boolean {
  const customer = localStorage.getItem('customer');
  if (customer) return true;
  return false;
}
