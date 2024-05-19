import createElement from '../../utilities/createElement';

export default function create404Page(): HTMLElement {
  const page404 = createElement('div', ['page-404']);

  const textcont404 = createElement('div', ['text-cont-404'], page404);
  createElement('div', ['ops-404'], textcont404, 'Oooops!');
  createElement('p', ['p-404'], textcont404, 'It seems you have gone too far and such a page does not exist...');
  createElement('p', ['p-404-small'], textcont404, "(cause we haven't done it yet)");
  const returnBtn = createElement('button', ['button', 'btn-cntr-404'], textcont404, 'RETURN TO MAIN');
  returnBtn.addEventListener('click', () => {
    window.location.href = '#/main';
  });
  createElement('p', ['p-404'], textcont404, 'press button above to escape the judgmental gaze of Vincent van Gogh');
  createElement('div', ['img-404'], page404);

  return page404;
}
