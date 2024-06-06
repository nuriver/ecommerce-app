import createElement from '../../utilities/createElement';
import displayProducts, { filterData, sortData } from './displayProducts';
import showAppliedFilters from './showAppliedFilters';

const { body } = document;
const allArtist = [
  'Salvador Dali',
  'Frida Kahlo',
  'Rene Magritte',
  'Max Ernst',
  'Alphonse Mucha',
  'Vincent van Gogh',
  'Banksy',
  'Os Gemeos',
];

export function createArtistFilter(parent: HTMLElement, artists: string[]): void {
  const artistsContainer = createElement('div', ['artists-container'], parent);
  artists.forEach((artist) => {
    const artistButton = createElement('button', ['artist-button'], artistsContainer, `${artist}`);
    artistButton.id = artist;
  });
  artistsContainer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('artist-button')) {
      target.classList.toggle('artist-button-active');
    }
  });
}

const filterMenuWrapper = createElement('div', ['filter-menu-wrapper'], body);
const filterMenu = createElement('div', ['filter-menu'], filterMenuWrapper);

const filterMenuHeader = createElement('div', ['filter-menu-header'], filterMenu);
createElement('p', ['filter-menu-heading'], filterMenuHeader, 'FILTER BY');

const filterButtonInnerText = '<span class="filter-icon"></span> APPLY FILTERS';
const applyButton = createElement('button', ['button', 'filter-button'], filterMenuHeader, filterButtonInnerText);

const artistFilter = createElement('div', ['artist-filter'], filterMenu);
createElement('p', ['filter-label', 'filter-name'], artistFilter, 'ARTIST');
createArtistFilter(artistFilter, allArtist);
const artistReset = createElement('p', ['filter-reset'], artistFilter, 'RESET');
artistReset.addEventListener('click', () => {
  const chosenArtists = artistFilter.querySelectorAll('.artist-button-active');
  chosenArtists.forEach((artist) => {
    artist.classList.remove('artist-button-active');
  });
});

const priceFilter = createElement('div', ['price-filter'], filterMenu);
createElement('div', ['filter-name'], priceFilter, 'PRICE');

const priceRangeFrom = createElement('div', ['price-range'], priceFilter);
const priceRangeFromLabel = createElement('label', ['price-range-label'], priceRangeFrom, 'FROM');
priceRangeFromLabel.setAttribute('for', 'priceRangeFromInput');
const priceRangeFromInput = createElement('input', ['price-range-input'], priceRangeFrom);
priceRangeFromInput.id = 'priceRangeFromInput';
priceRangeFromInput.type = 'number';
priceRangeFromInput.min = '0';
priceRangeFromInput.max = '100';
priceRangeFromInput.addEventListener('input', (event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace('-', '');
  if (input.value.length > 3) {
    input.value = input.value.substring(0, 3);
  }
});
createElement('p', ['price-currency'], priceRangeFrom, '$');

const priceRangeTo = createElement('div', ['price-range'], priceFilter);
const priceRangeToLabel = createElement('label', ['price-range-label'], priceRangeTo, 'TO');
priceRangeToLabel.setAttribute('for', 'priceRangeToInput');
const priceRangeToInput = createElement('input', ['price-range-input'], priceRangeTo);
priceRangeToInput.id = 'priceRangeToInput';
priceRangeToInput.type = 'number';
priceRangeToInput.min = '0';
priceRangeToInput.max = '100';
priceRangeToInput.addEventListener('input', (event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace('-', '');
  if (input.value.length > 3) {
    input.value = input.value.substring(0, 3);
  }
});
createElement('p', ['price-currency'], priceRangeTo, '$');
const priceReset = createElement('p', ['filter-reset'], priceFilter, 'RESET');
priceReset.addEventListener('click', () => {
  priceRangeFromInput.value = '';
  priceRangeToInput.value = '';
});

export const showFilter = () => {
  filterMenuWrapper.style.display = 'block';
  body.classList.add('filters-shown');
};

export function resetFilterMenu() {
  priceReset.click();
  artistReset.click();
  filterData.clearFilters();
}

export function totalFiltersReset() {
  const appliedFiltersContainer = document.querySelector('.applied-filters-container') as HTMLElement;
  appliedFiltersContainer.innerHTML = '';
  const resetAppliedFilters = document.querySelector('.reset-applied-filters') as HTMLElement;
  resetAppliedFilters.style.display = 'none';
  filterData.clearFilters();
}

applyButton.addEventListener('click', () => {
  const appliedFiltersNames: string[] = [];
  const artistFilters = document.querySelectorAll('.artist-button-active') as NodeListOf<HTMLButtonElement>;
  const resetAppliedFilters = document.querySelector('.reset-applied-filters') as HTMLButtonElement;
  resetAppliedFilters.style.display = 'none';

  if (artistFilters.length > 0) {
    resetAppliedFilters.style.display = 'block';
    artistFilters.forEach((filter) => {
      appliedFiltersNames.push(`${filter.id}`);
    });

    const artistNames = appliedFiltersNames.map((item) => `"${item}"`).join(', ');
    filterData.artistFilters = `variants.attributes.artist-name: ${artistNames}`;
  }

  const fromInput = document.getElementById('priceRangeFromInput') as HTMLInputElement;
  const toInput = document.getElementById('priceRangeToInput') as HTMLInputElement;

  if (fromInput.value.length > 0 && toInput.value.length > 0) {
    resetAppliedFilters.style.display = 'block';
    const fromPrice = +fromInput.value;
    const toPrice = +toInput.value;
    const minPrice = Math.min(fromPrice, toPrice);
    const maxPrice = Math.max(fromPrice, toPrice);
    const minPriceCent = minPrice * 100;
    const maxPriceCent = maxPrice * 100;
    const priceToFilter = `variants.price.centAmount:range (${minPriceCent} to ${maxPriceCent})`;
    filterData.priceRange = priceToFilter;
    appliedFiltersNames.push(`${minPrice}$ - ${maxPrice}$`);
  }

  filterMenuWrapper.style.display = 'none';
  body.classList.remove('filters-shown');

  displayProducts(sortData.currentId);
  if (appliedFiltersNames.length > 0) {
    showAppliedFilters(appliedFiltersNames);
  }

  priceReset.click();
  artistReset.click();
});
