let selectors = [
  'article',
  'aside',
  'figure',
  'figcaption',
  'footer',
  'header',
  'main',
  'nav',
  'section',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'nav',
  'button',
  'ul > li > a',
  'input[type=radio]',
  'input[type=number]',
  'input[type=range]',
  'img:not([alt])',
];

selectors.forEach((selector) => {
  const count = Array.from(document.querySelectorAll(selector)).length;
  console.log(`${selector} : ${count}`);
});
