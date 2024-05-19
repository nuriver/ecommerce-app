import createElement from '../../utilities/createElement';

// const mainPage = createElement('div', ['main-page'], body);
// createHeader(mainPage);
// createBurger(mainPage);

export default function createMain(): HTMLElement {
  const mainPage = createElement('div', ['main-page']);

  //  first
  const firstBlock = createElement('div', ['first-block'], mainPage);
  const firstTextCont = createElement('div', ['first-cont'], firstBlock);
  createElement('h1', ['first-title'], firstTextCont, 'FUNC CRAFTERS');
  createElement('p', ['first-title'], firstTextCont, '——');
  createElement('p', ['first-title'], firstTextCont, 'QUINTESSENCE OF EVERYDAY THINGS AND ART');

  //  products
  const productsBlock = createElement('div', ['products-block', 'header-wrapper'], mainPage);
  const productsText = createElement('div', ['products-title'], productsBlock, 'OUR PRODUCTS');
  createElement('div', ['products-cat'], productsText);
  const productsCards = createElement('div', ['products-cards-cont', 'pointer'], productsBlock);
  const productsCard = createElement('div', ['products-card'], productsCards);
  createElement('div', ['products-card__img', 'img-notebook', 'notebook-anim'], productsCard);
  createElement('div', ['products-card__desc'], productsCard, 'NOTEBOOKS');
  const productsCard2 = createElement('div', ['products-card'], productsCards);
  createElement('div', ['products-card__img', 'img-bottle'], productsCard2);
  createElement('div', ['products-card__desc'], productsCard2, 'BOTTLES');
  const productsCard3 = createElement('div', ['products-card'], productsCards);
  createElement('div', ['products-card__img', 'img-bag'], productsCard3);
  createElement('div', ['products-card__desc'], productsCard3, 'BAGS');
  createElement('div', ['products-see-all'], productsBlock, 'SEE ALL ->');

  //  art styles
  const artstylesBlock = createElement('div', ['artstyle-block'], mainPage);
  createElement('div', ['first-title'], artstylesBlock, 'ART STYLES');
  createElement('p', ['artstyle', 'pointer', 'hoverline-white'], artstylesBlock, 'IMPRESSIONISM');
  createElement('p', ['artstyle', 'pointer', 'hoverline-white'], artstylesBlock, 'MODERN');
  createElement('p', ['artstyle', 'pointer', 'hoverline-white'], artstylesBlock, 'STREET ART');

  //  artists
  const artistsBlock = createElement('div', ['artist-block'], mainPage);
  createElement('div', ['products-title'], artistsBlock, 'ARTISTS');
  const artistsCards = createElement('div', ['artists-cards-cont'], artistsBlock);
  const artistCard = createElement('div', ['artists-card', 'pointer'], artistsCards);
  createElement('div', ['artist-card__img', 'img-magritte'], artistCard);
  createElement('div', ['artist-card__desc'], artistCard, 'RENÉ MAGRITTE');
  const artistCard2 = createElement('div', ['artists-card', 'pointer'], artistsCards);
  createElement('div', ['artist-card__img', 'img-mucha'], artistCard2);
  createElement('div', ['artist-card__desc'], artistCard2, 'ALFONS MUCHA');
  const artistCard3 = createElement('div', ['artists-card', 'pointer'], artistsCards);
  createElement('div', ['artist-card__img', 'img-kahlo'], artistCard3);
  createElement('div', ['artist-card__desc'], artistCard3, 'FRIDA KAHLO');
  createElement('div', ['products-see-all'], artistsBlock, 'SEE ALL ->');

  //  goal
  const goalBlock = createElement('div', ['goal-block'], mainPage);
  createElement('div', ['title'], goalBlock, 'OUR GOAL — ');
  createElement(
    'div',
    ['goal-text'],
    goalBlock,
    'WE STRIVE TO CREATE A UNIQUE SPACE WHERE ART AND EVERYDAY LIFE MERGE INTO ONE. WE OFFER NOT JUST PRODUCTS WITH PRINTS OF GREAT PAINTINGS, BUT ALSO THE OPPORTUNITY TO IMMERSE ONESELF IN THE WORLD OF ART. OUR GOAL IS TO MAKE ART ACCESSIBLE AND UNDERSTANDABLE TO EVERYONE, REGARDLESS OF THEIR LEVEL OF KNOWLEDGE OR INTERESTS'
  );

  //  categories
  const categBlock = createElement('div', ['categ-block'], mainPage);
  createElement('div', ['title-black'], categBlock, 'OUR CATEGORIES');
  createElement('p', ['artstyle', 'pointer', 'hoverline'], categBlock, 'NOTEBOOKS');
  createElement('p', ['artstyle', 'pointer', 'hoverline'], categBlock, 'BOTTLES');
  createElement('p', ['artstyle', 'pointer', 'hoverline'], categBlock, 'BAGS');
  createElement('p', ['artstyle', 'pointer', 'hoverline'], categBlock, 'BOTTLES');

  //  join
  const joinBlock = createElement('div', ['join-block'], mainPage);
  const joinCont = createElement('div', ['join-cont'], joinBlock);
  createElement('div', ['join-title'], joinCont, 'Do you feel inspired?');
  createElement('div', ['join-text'], joinCont, 'Join us!');
  createElement('button', ['button', 'button-while-ins'], joinCont, 'REGISTER');
  createElement('button', ['button', 'button-white-out'], joinCont, 'LOGIN');
  createElement('div', ['join-img'], joinBlock);

  //  footer
  const footerBlock = createElement('div', ['footer-block'], mainPage);
  const footerCont = createElement('div', ['footer-cont'], footerBlock);
  createElement('p', ['footer-text'], footerCont, 'Rolling Scopes School');
  createElement('p', ['footer-text'], footerCont, 'MADE WITH LOVE');
  createElement('p', ['footer-text'], footerCont, '2024');

  return mainPage;
}