import createElement from '../../utilities/createElement';

const headerLinks = [
  { name: 'CATALOG', href: '#' },
  { name: 'MAIN', href: '#' },
  { name: 'ABOUT US', href: '#' },
  { name: 'LOGIN', href: '#' },
  { name: 'REGISTRATION', href: '#' },
];

function createHeader(container: HTMLElement): void {
  const header = createElement('div', ['header', 'header-hide'], container);
  headerLinks.forEach((link) => {
    const headerLink = createElement('a', ['header-link'], header, `${link.name}`);
    headerLink.href = `${link.href}`;
  });
}

export default createHeader;
