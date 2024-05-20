export default function printError(span: HTMLElement, error: false | string): HTMLElement {
  if (error === false) {
    span.innerText = '';
  } else {
    span.innerText = error;
  }
  return span;
}
