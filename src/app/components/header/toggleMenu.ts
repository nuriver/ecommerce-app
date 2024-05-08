function toggleMenu(event: Event): void {
  const target = event.target as HTMLElement;
  const burger = target.closest('.burger');
  if (burger) {
    const parent = burger.parentElement;
    const menu = parent?.querySelector('.header') as HTMLElement;
    const links = Array.from(menu.children);

    const hideMenu = (): void => {
      menu.style.display = 'none';
    };

    if (menu.style.display === 'none') {
      menu.style.display = 'flex';
      links.forEach((link) => link.addEventListener('click', hideMenu));
    } else {
      menu.style.display = 'none';
      links.forEach((link) => link.removeEventListener('click', hideMenu));
    }
  }
}

export default toggleMenu;
