import createElement from '../../utilities/createElement';

export default function createAboutUsPage(): HTMLElement {
  const aboutUsPage = createElement('div', ['about-us-page']);

  // first block

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

  // members

  const members = createElement('div', ['about-us-members'], aboutUsPage);
  createElement('div', ['about-us-members-title'], members, 'MORE ABOUT US');

  const member1 = createElement('div', ['about-us-member'], members);
  createElement('div', ['about-us-member-photo', 'alexei-photo'], member1);
  const member1textcont = createElement('div', ['about-us-member-text-cont'], member1);
  const nameCont1 = createElement('div', ['about-us-member-name-cont'], member1textcont);
  createElement('a', ['about-us-member-github'], nameCont1);
  createElement('div', ['about-us-member-name'], nameCont1, 'Alexei — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member1textcont,
    '&nbsp; &nbsp; &nbsp; our team leader, is the cornerstone of Fun Crafters. His exceptional leadership and technical expertise make him an invaluable asset to our team. Alexei is the go-to person for all things technical. He took charge of setting up GitHub and configuring bundlers, ensuring that our development environment was efficient and streamlined. His deep understanding of the SDK allowed him to assist and guide the rest of the team, fostering a collaborative and supportive atmosphere. Alexei also played a crucial role in configuring routing and developing key components of our website, including the catalog and login pages. His dedication and reliability make him a remarkable leader and teammate.'
  );

  nameCont1.addEventListener('click', () => {
    window.open('https://github.com/nuriver', '_blank');
  });

  const member2 = createElement('div', ['about-us-member'], members);
  const member2textcont = createElement('div', ['about-us-member-text-cont-r'], member2);
  const nameCont2 = createElement('div', ['about-us-member-name-cont'], member2textcont);
  createElement('a', ['about-us-member-github'], nameCont2);
  createElement('div', ['about-us-member-name'], nameCont2, 'Maria — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member2textcont,
    "&nbsp; &nbsp; &nbsp;   is the powerhouse behind our development process. As the project manager, she is responsible for orchestrating the entire development cycle. Maria ensures that every task is assigned appropriately and that deadlines are met with precision. In addition to her management responsibilities, Maria implemented the Registration and Profile pages, creating user-friendly and visually appealing interfaces. She also developed mockups for our products, bringing our ideas to life with her creative vision. Maria's versatility and commitment to excellence have been instrumental in the success of our projects. Moreover, she provided invaluable support to the team in navigating and utilizing Commercetools, further enhancing our project's functionality."
  );
  createElement('div', ['about-us-member-photo', 'maria-photo'], member2);

  nameCont2.addEventListener('click', () => {
    window.open('https://github.com/Maryinfun', '_blank');
  });

  const member3 = createElement('div', ['about-us-member'], members);
  createElement('div', ['about-us-member-photo', 'kate-photo'], member3);
  const member3textcont = createElement('div', ['about-us-member-text-cont'], member3);
  const nameCont3 = createElement('div', ['about-us-member-name-cont'], member3textcont);
  createElement('a', ['about-us-member-github'], nameCont3);
  createElement('div', ['about-us-member-name'], nameCont3, 'Kate — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member3textcont,
    "&nbsp; &nbsp; &nbsp;     is the creative force behind Fun Crafter's aesthetic and design. She was responsible for the overall design and user experience, ensuring that our platform is both visually stunning and intuitive to navigate. She worked with Commercetools, leveraging its capabilities to enhance our project's e-commerce functionality. She also took charge of creating the Main page and the About Us page, ensuring they accurately represent our team's ethos and spirit. Kate's design expertise and innovative thinking are at the heart of Fun Crafter's visual identity."
  );

  nameCont3.addEventListener('click', () => {
    window.open('https://github.com/aauroraaborealisrs', '_blank');
  });

  // Acknowledgments
  const acknowBlock = createElement('div', ['about-us-acknow-block'], aboutUsPage);
  const acknowTextCont = createElement('div', ['about-us-acknow-cont'], acknowBlock);
  createElement('div', ['about-us-acknow-title'], acknowTextCont, 'Acknowledgments');
  createElement(
    'div',
    ['about-us-acknow-text'],
    acknowTextCont,
    '  We would like to express our heartfelt gratitude to the Rolling Scopes School for their exceptional guidance and support. Their comprehensive curriculum and dedicated mentors provided us with the knowledge and skills necessary to bring Fun Crafter to life. It was through this incredible learning journey that we met and formed our team. We are immensely grateful for the opportunities and experiences that Rolling Scopes School has given us, enabling us to create this project and grow as professionals.'
  );
  const acknowLogo = createElement('div', ['about-us-acknow-logo'], acknowBlock);
  acknowLogo.addEventListener('click', () => {
    window.open('https://rs.school', '_blank');
  });

  return aboutUsPage;
}
