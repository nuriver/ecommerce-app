import createElement from '../../utilities/createElement';
import toggleMenu from './toggleMenu';

const headerLinks = [
  { name: 'CATALOG', href: '#' },
  { name: 'MAIN', href: '#' },
  { name: 'ABOUT US', href: '#' },
  { name: 'LOGIN', href: '#' },
  { name: 'REGISTRATION', href: '#' },
];

function createHeaderMenu(container: HTMLElement): void {
  const header = createElement('div', ['header-menu'], container);
  headerLinks.forEach((link) => {
    const headerLink = createElement('a', ['header-link', 'hoverline'], header, `${link.name}`);
    headerLink.addEventListener('click', toggleMenu);

    headerLink.href = `${link.href}`;
  });
}

export default createHeaderMenu;
