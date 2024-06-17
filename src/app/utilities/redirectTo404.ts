import simpleRedirect from './simpleRedirect';

export default function redirectTo404(parent: HTMLElement): void {
  const deadLinks = parent.querySelectorAll('.dead-link');
  deadLinks.forEach((link) => {
    link.addEventListener('click', () => {
      simpleRedirect('404');
    });
  });
}
