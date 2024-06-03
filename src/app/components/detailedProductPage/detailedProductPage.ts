import createElement from '../../utilities/createElement';
import { getProductById } from './getProduct';

let img1: string;
let img2: string;
let img3: string;

let prodName: string;
let prodDesc: string | undefined;

let price: string;
let disc: string | undefined;

export default function detailedProductPage(productId: string): HTMLElement {
  const dpp = createElement('div', ['dpp-page']);

  let slideIndex: number = 1;
  let slideIndex1: number = 1;

  function showSlides(n: number): void {
    let i: number;
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName('mySlides');
    const dots: HTMLCollectionOf<Element> = document.getElementsByClassName('dot');

    if (n > slides.length) {
      slideIndex = 1;
      slideIndex1 = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
      slideIndex1 = slides.length;
    }

    for (i = 0; i < slides.length; i += 1) {
      (slides[i] as HTMLElement).style.display = 'none';
    }

    for (i = 0; i < dots.length; i += 1) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    if (slides[slideIndex - 1] && dots[slideIndex - 1]) {
      (slides[slideIndex - 1] as HTMLElement).style.display = 'block';
      dots[slideIndex - 1].className += ' active';
    }

    const prev = document.querySelector('.prev') as HTMLElement;
    const next = document.querySelector('.next') as HTMLElement;

    if (dots[0].classList.contains('active')) {
      prev.style.visibility = 'hidden';
    } else {
      prev.style.visibility = 'visible';
    }

    if (dots[dots.length - 1].classList.contains('active')) {
      next.style.visibility = 'hidden';
    } else {
      next.style.visibility = 'visible';
    }
  }

  function showSlides1(n: number): void {
    let i: number;
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName('mySlides1');
    const dots: HTMLCollectionOf<Element> = document.getElementsByClassName('dot1');

    if (n > slides.length) {
      slideIndex1 = 1;
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex1 = slides.length;
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i += 1) {
      (slides[i] as HTMLElement).style.display = 'none';
    }

    for (i = 0; i < dots.length; i += 1) {
      dots[i].className = dots[i].className.replace(' active1', '');
    }

    if (slides[slideIndex1 - 1] && dots[slideIndex1 - 1]) {
      (slides[slideIndex1 - 1] as HTMLElement).style.display = 'block';
      dots[slideIndex1 - 1].className += ' active1';
    }

    const prev = document.querySelector('.prev1') as HTMLElement;
    const next = document.querySelector('.next1') as HTMLElement;

    if (dots[0].classList.contains('active1')) {
      prev.style.visibility = 'hidden';
    } else {
      prev.style.visibility = 'visible';
    }

    if (dots[dots.length - 1].classList.contains('active1')) {
      next.style.visibility = 'hidden';
    } else {
      next.style.visibility = 'visible';
    }
  }

  function plusSlides(n: number): void {
    slideIndex += n;
    slideIndex1 = slideIndex;
    showSlides(slideIndex);
    showSlides1(slideIndex);
  }

  function currentSlide(n: number): void {
    slideIndex = n;
    slideIndex1 = n;
    showSlides(slideIndex);
    showSlides1(slideIndex);
  }

  function plusSlides1(n: number): void {
    slideIndex1 += n;
    slideIndex = slideIndex1;
    showSlides(slideIndex1);
    showSlides1(slideIndex1);
  }

  function currentSlide1(n: number): void {
    slideIndex1 = n;
    slideIndex = n;
    showSlides(slideIndex1);
    showSlides1(slideIndex1);
  }

  function generateDetailedProductPageDOM() {
    const dppCont = createElement('div', ['dpp-cont'], dpp);

    const sliderCont = createElement('div', ['slideshow-container'], dppCont);
    const picsandCont = createElement('div', ['slide-cont'], sliderCont);

    const prev = createElement('a', ['prev'], picsandCont, '&#10094;');
    prev.style.visibility = 'hidden';
    prev.onclick = () => plusSlides(-1);

    const slide1 = createElement('div', ['mySlides', 'fade'], picsandCont);
    const imgEl1 = createElement('img', ['slides-img'], slide1);
    imgEl1.src = img1;

    const slide2 = createElement('div', ['mySlides', 'fade'], picsandCont);
    const imgEl2 = createElement('img', ['slides-img'], slide2);
    imgEl2.src = img2;

    const slide3 = createElement('div', ['mySlides', 'fade'], picsandCont);
    const imgEl3 = createElement('img', ['slides-img'], slide3);
    imgEl3.src = img3;

    const next = createElement('a', ['next'], picsandCont, '&#10095;');
    next.onclick = () => plusSlides(1);

    const dotsCont = createElement('div', ['dots-cont'], sliderCont);

    const dot1 = createElement('a', ['dot', 'active'], dotsCont);
    dot1.onclick = () => currentSlide(1);

    const dot2 = createElement('a', ['dot'], dotsCont);
    dot2.onclick = () => currentSlide(2);

    const dot3 = createElement('a', ['dot'], dotsCont);
    dot3.onclick = () => currentSlide(3);

    const textCont = createElement('div', ['dpp-text-cont'], dppCont);

    createElement('div', ['dpp-back-to-cat'], textCont, 'go back to the catalog');

    const nadCont = createElement('div', ['dpp-nad-text-cont'], textCont);

    createElement('div', ['dpp-name'], nadCont, `${prodName}`);
    createElement('div', ['dpp-desc'], nadCont, `${prodDesc}`);

    const priceCont = createElement('div', ['dpp-price-cont'], textCont);

    if (disc !== undefined) {
      createElement('div', ['dpp-disc-price'], priceCont, `${disc}$`);
      createElement('div', ['dpp-price-stroke'], priceCont, `${price}$`);
    } else {
      createElement('div', ['dpp-price'], priceCont, `${price}$`);
    }

    const myModal = createElement('div', ['modal'], dpp);
    myModal.id = 'myModal';
    myModal.style.display = 'none';

    const modalCont = createElement('div', ['modal-content'], myModal);

    const sliderCont1 = createElement('div', ['slide-cont1'], modalCont);

    const prev1 = createElement('a', ['prev1'], sliderCont1, '&#10094;');
    prev1.style.visibility = 'hidden';
    prev1.onclick = () => plusSlides1(-1);

    const slide11 = createElement('div', ['mySlides1'], sliderCont1);
    const imgEl11 = createElement('img', ['slides-img1'], slide11);
    imgEl11.src = img1;

    const slide22 = createElement('div', ['mySlides1'], sliderCont1);
    const imgEl22 = createElement('img', ['slides-img1'], slide22);
    imgEl22.src = img2;

    const slide33 = createElement('div', ['mySlides1'], sliderCont1);
    const imgEl33 = createElement('img', ['slides-img1'], slide33);
    imgEl33.src = img3;

    const next1 = createElement('a', ['next1'], sliderCont1, '&#10095;');
    next1.onclick = () => plusSlides1(1);

    createElement('div', ['close'], sliderCont1, '&times');
    const dotsCont1 = createElement('div', ['dots-cont1'], modalCont);

    const dot11 = createElement('a', ['dot1', 'active1'], dotsCont1);
    dot11.onclick = () => currentSlide1(1);

    const dot22 = createElement('a', ['dot1'], dotsCont1);
    dot22.onclick = () => currentSlide1(2);

    const dot33 = createElement('a', ['dot1'], dotsCont1);
    dot33.onclick = () => currentSlide1(3);

    const slides = document.querySelectorAll('.mySlides');

    if (slides.length > 0) {
      const modal = document.getElementById('myModal');
      const closeModal = document.querySelector('.close');

      if (modal && closeModal) {
        slides.forEach((slide, index) => {
          slide.addEventListener('click', () => {
            currentSlide1(index + 1);
            modal.style.display = 'block';
          });
        });

        closeModal.addEventListener('click', () => {
          modal.style.display = 'none';
          textCont.style.display = 'flex';
        });
      }
    }
  }

  async function getProductInfo() {
    try {
      const productResponse = await getProductById(productId);
      prodName = productResponse.body.masterData.current.name.en;
      prodDesc = productResponse.body.masterData.current.description?.en;
      const productPrice = productResponse.body.masterData.current.masterVariant.prices?.[0];

      const discRaw = productPrice?.discounted?.value.centAmount;
      if (discRaw) {
        disc = (discRaw / 100).toFixed(2);
      } else {
        disc = undefined;
      }

      const priceRaw = productPrice?.value.centAmount;
      if (priceRaw) {
        price = (priceRaw / 100).toFixed(2);
      }

      const imagesUrl = productResponse.body.masterData.current.masterVariant.images;

      if (imagesUrl) {
        img1 = imagesUrl[0].url.replace(/(\.[^.]+$)/, '-large$1');
        img2 = imagesUrl[1].url.replace(/(\.[^.]+$)/, '-large$1');
        img3 = imagesUrl[2].url.replace(/(\.[^.]+$)/, '-large$1');
      }

      generateDetailedProductPageDOM();
      showSlides(slideIndex);
      showSlides1(slideIndex1);
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    }
  }

  getProductInfo();

  return dpp;
}
