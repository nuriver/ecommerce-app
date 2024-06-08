import createElement from '../../utilities/createElement';

const { body } = document;

const loadIndicatorContainer = createElement('div', ['load-indicator-container'], body);
const loadIndicator = createElement('div', ['load-indicator'], loadIndicatorContainer);
createElement('div', ['indicator-circle'], loadIndicator);
createElement('p', ['loading-name'], loadIndicator, 'Just a moment...');
export function showLoadIndicator() {
  loadIndicatorContainer.style.display = 'flex';
}
export function hideLoadIndicator() {
  loadIndicatorContainer.style.display = 'none';
}
