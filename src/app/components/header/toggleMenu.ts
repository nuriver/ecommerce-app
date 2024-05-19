function toggleMenu(event: Event): void {
  const target: HTMLElement = event.target as HTMLElement;
  const header: HTMLElement = document.querySelector('.header-menu') as HTMLElement;
  const { body } = document;

  if (target.nodeName === 'A' || header?.classList.contains('header-menu--show')) {
    header?.classList.remove('header-menu--show');
    body.classList.remove('body-locked');
  } else {
    header?.classList.add('header-menu--show');
    body.classList.add('body-locked');
  }
}

export default toggleMenu;
