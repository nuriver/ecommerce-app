function toggleMenu(event: Event): void {
  const target = event.target as HTMLElement;
  const header = document.querySelector('.header');
  const burger = target.closest('.burger');
  if (burger) {
    const parent = burger.parentElement;
    const menu = parent?.querySelector('.header') as HTMLElement;
    const links = Array.from(menu.children);

    const hideMenu = (): void => {
      header?.classList.add('header-hide');
    };

    if (header?.classList.contains('header-hide')) {
      header?.classList.remove('header-hide');
      links.forEach((link) => link.addEventListener('click', hideMenu));
    } else {
      hideMenu();
      links.forEach((link) => link.removeEventListener('click', hideMenu));
    }
  }
}

export default toggleMenu;
