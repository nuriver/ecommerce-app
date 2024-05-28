import createElement from '../../utilities/createElement';

const { body } = document;

const filterMenuWrapper = createElement('div', ['filter-menu-wrapper'], body);
const filterMenu = createElement('div', ['filter-menu'], filterMenuWrapper);

const filterMenuHeader = createElement('div', ['filter-menu-header'], filterMenu);
createElement('p', ['filter-menu-heading'], filterMenuHeader, 'FILTER BY');
const filterButtonInnerText = '<span class="filter-icon"></span> APPLY FILTERS';
createElement('button', ['button', 'filter-button'], filterMenuHeader, filterButtonInnerText);

const artistFilter = createElement('div', ['artist-filter'], filterMenu);
const artistFilterLabel = createElement('label', ['filter-label', 'filter-name'], artistFilter, 'ARTIST');
artistFilterLabel.setAttribute('for', 'artistFilterInput');
const artistFilterInput = createElement('input', ['artist-filter-input'], artistFilter, 'ARTIST');
artistFilterInput.id = 'artistFilterInput';
createElement('p', ['filter-reset'], artistFilter, 'RESET');

const priceFilter = createElement('div', ['price-filter'], filterMenu);
createElement('div', ['filter-name'], priceFilter, 'PRICE');

const priceRangeFrom = createElement('div', ['price-range'], priceFilter);
const priceRangeFromLabel = createElement('label', ['price-range-label'], priceRangeFrom, 'FROM');
priceRangeFromLabel.setAttribute('for', 'priceRangeFromInput');
const priceRangeFromInput = createElement('input', ['price-range-input'], priceRangeFrom);
priceRangeFromInput.id = 'priceRangeFromInput';

const priceRangeTo = createElement('div', ['price-range'], priceFilter);
const priceRangeToLabel = createElement('label', ['price-range-label'], priceRangeTo, 'TO');
priceRangeToLabel.setAttribute('for', 'priceRangeToInput');
const priceRangeToInput = createElement('input', ['price-range-input'], priceRangeTo);
priceRangeToInput.id = 'priceRangeToInput';
createElement('p', ['filter-reset'], priceFilter, 'RESET');

export const showFilter = () => {
  filterMenuWrapper.style.display = 'block';
  body.classList.add('body-locked');
};
export default showFilter;
