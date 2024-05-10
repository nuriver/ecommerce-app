function toggleMenu(event: Event): void {
  const target: HTMLElement = event.target as HTMLElement;
  const header: HTMLElement = document.querySelector('.header') as HTMLElement;
  const burger: HTMLElement = target.closest('.burger') as HTMLElement;
  const { body } = document;
  if (burger) {
    const parent: HTMLElement = burger.parentElement as HTMLElement;
    const menu: HTMLElement = parent?.querySelector('.header') as HTMLElement;
    const links: Element[] = Array.from(menu.children);

    const hideMenu = (): void => {
      if (header?.classList.contains('header-hide')) header?.classList.remove('header-hide');
    };

    if (header?.classList.contains('header-hide')) {
      header?.classList.remove('header-hide');
      links.forEach((link) => link.removeEventListener('click', hideMenu));
      if (body.classList.contains('body-locked')) {
        body.classList.remove('body-locked');
      }
    } else {
      header?.classList.add('header-hide');
      body.classList.add('body-locked');
      links.forEach((link) => link.addEventListener('click', hideMenu));
    }
  }
}

export default toggleMenu;
