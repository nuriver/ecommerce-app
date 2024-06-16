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
  createElement('div', ['about-us-member-name'], nameCont1, 'Alexei Golubkov — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member1textcont,
    '&nbsp; &nbsp; &nbsp; &nbsp; is the team leader of Fun Crafters. Aleksei based in Belgrade, Serbia, with a degree in Psychology from Kurgan State University and currently working as an E-commerce Manager. He leads Fun Crafters with exceptional leadership and technical prowess. Aleksei took the initiative to set up GitHub, configure bundlers, and master the SDK, providing essential guidance to the team. Aleksei also played a crucial role in configuring routing and developing key website components, including the Catalog and Login pages. He also developed product mockups, bringing our ideas to life.'
  );

  nameCont1.addEventListener('click', () => {
    window.open('https://github.com/nuriver', '_blank');
  });

  const member2 = createElement('div', ['about-us-member'], members);
  const member2textcont = createElement('div', ['about-us-member-text-cont-r'], member2);
  const nameCont2 = createElement('div', ['about-us-member-name-cont'], member2textcont);
  createElement('a', ['about-us-member-github'], nameCont2);
  createElement('div', ['about-us-member-name'], nameCont2, 'Maria Panteleeva — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member2textcont,
    "&nbsp; &nbsp; &nbsp; is the powerhouse behind our development process. Maria based in Mogilev, with a degree in Teaching from Belarusian Pedagogical University and currently working as a Foreign Trade Manager. As the project manager, she orchestrates the entire development cycle, ensuring tasks are assigned appropriately and deadlines are met. Maria implemented the Registration, Profile and Basket pages. Additionally, she provided support to the team in navigating and utilizing Commercetools, enhancing our project's functionality."
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
  createElement('div', ['about-us-member-name'], nameCont3, 'Kate Sharai — ');
  createElement(
    'div',
    ['about-us-member-decs'],
    member3textcont,
    "&nbsp; &nbsp; &nbsp; is the creative force behind Fun Crafter's aesthetic and design. Kate is from Simferopol, a Software Engineering student at Crimean Federal University. She is responsible for the overall design and user experience, ensuring our platform is visually stunning and intuitive to navigate. Kate worked with Commercetools, enhancing our project's e-commerce functionality. She also created the Main page and the About Us page, accurately representing our team's ethos and spirit. Kate's design expertise and innovative thinking are at the heart of Fun Crafter's visual identity."
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
