import ElementMap from '../types/types';

function createElement<K extends keyof ElementMap>(
  tag: K,
  className: string[],
  parent?: HTMLElement,
  innerHtml?: string
): ElementMap[K] {
  const element = document.createElement(tag);
  className.forEach((name) => element.classList.add(name));
  if (innerHtml !== undefined) element.innerHTML = innerHtml;
  if (parent) parent.append(element);
  return element;
}

export default createElement;
