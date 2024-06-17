export type ElementMap = {
  button: HTMLButtonElement;
  input: HTMLInputElement;
  div: HTMLDivElement;
  img: HTMLImageElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  form: HTMLFormElement;
  label: HTMLLabelElement;
  p: HTMLParagraphElement;
  a: HTMLAnchorElement;
  select: HTMLSelectElement;
  option: HTMLOptionElement;
};

export type ProductData = {
  name: string;
  description: string;
  image: string;
  price: number | string;
  id: string;
  discountPrice?: string;
};

export type SortData = {
  currentId: string | undefined;
  currentSort: string | undefined;
};

export type FilterData = {
  artistFilters: string;
  priceRange: string;
  clearFilters: () => void;
};
