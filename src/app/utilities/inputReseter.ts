export default function inputReset(parent: HTMLElement) {
  const inputs = parent.querySelectorAll('input');
  inputs.forEach((input) => {
    input.value = '';
  });
}
