export default function pageToggle(page: HTMLElement, route?: string): void {
  const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
  pageWrapper.innerHTML = '';
  pageWrapper.append(page);
  if (route) window.history.pushState({}, '', `#/${route}`);
}
