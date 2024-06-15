import createElement from '../../utilities/createElement';

export default function createAboutUsPage(): HTMLElement {
  const aboutUsPage = createElement('div', ['about-us-page']);
  const firstBlock = createElement('div', ['about-us-first-block'], aboutUsPage);

  const title = createElement('div', ['about-us-title-cont'], firstBlock);
  createElement('h2', ['about-us-fc-title'], title, 'FUNC CRAFTERS');
  createElement('p', ['about-us-fc-title-line'], title, '———');
  createElement(
    'p',
    ['about-us-fc-desc'],
    firstBlock,
    'We are Alexei, Maria, and Kate, a passionate and dedicated team brought together by our mutual love for functional programming. Our journey began when we met through the team members market, and since then, we have been on an exciting adventure, creating innovative and engaging projects that reflect our technical skills and creativity'
  );

  const members = createElement('div', ['about-us-members'], aboutUsPage);
  createElement('div', ['about-us-members-title'], members, 'MORE ABOUT US');

  const member1 = createElement('div', ['about-us-member'], members);
  createElement('div', ['about-us-member-photo', 'alexei-photo'], member1);
  const member1textcont = createElement('div', ['about-us-member-text-cont'], member1);
  createElement('div', ['about-us-member-name'], member1textcont, 'Alexei — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member1textcont,
    '&nbsp; &nbsp; &nbsp; our team leader, is the cornerstone of Fun Crafters. His exceptional leadership and technical expertise make him an invaluable asset to our team. Alexei is the go-to person for all things technical. He took charge of setting up GitHub and configuring bundlers, ensuring that our development environment was efficient and streamlined. His deep understanding of the SDK allowed him to assist and guide the rest of the team, fostering a collaborative and supportive atmosphere. Alexei also played a crucial role in configuring routing and developing key components of our website, including the catalog and login pages. His dedication and reliability make him a remarkable leader and teammate.'
  );

  const member2 = createElement('div', ['about-us-member'], members);
  const member2textcont = createElement('div', ['about-us-member-text-cont-r'], member2);
  createElement('div', ['about-us-member-name'], member2textcont, 'Maria — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member2textcont,
    "&nbsp; &nbsp; &nbsp;   is the powerhouse behind our development process. As the project manager, she is responsible for orchestrating the entire development cycle. Maria ensures that every task is assigned appropriately and that deadlines are met with precision. In addition to her management responsibilities, Maria implemented the Registration and Profile pages, creating user-friendly and visually appealing interfaces. She also developed mockups for our products, bringing our ideas to life with her creative vision. Maria's versatility and commitment to excellence have been instrumental in the success of our projects. Moreover, she provided invaluable support to the team in navigating and utilizing Commercetools, further enhancing our project's functionality."
  );
  createElement('div', ['about-us-member-photo', 'maria-photo'], member2);

  return aboutUsPage;
}
