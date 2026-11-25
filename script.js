
/* Adventskalender 2026 – sechs Kalender, gemeinsames Script */
const firstPathSegment = window.location.pathname.split('/').filter(Boolean)[0];

const calendarConfig = {
  advent:     { key: 'advent', title: 'Adventskalender 2026', subtitle: 'Täglich ein neues Lieblingsrezept', lang: 'de' },
  advent_veg: { key: 'advent_veg', title: 'Adventskalender 2026', subtitle: 'Täglich ein neues Lieblingsrezept', lang: 'de' },
  lwl:        { key: 'lwl', title: 'Adventskalender 2026', subtitle: 'Täglich ein neues Lieblingsrezept', lang: 'de' },
  lwl_veg:    { key: 'lwl_veg', title: 'Adventskalender 2026', subtitle: 'Täglich ein neues Lieblingsrezept', lang: 'de' },
  vegan:      { key: 'vegan', title: 'Adventskalender 2026', subtitle: 'Täglich ein neues Lieblingsrezept', lang: 'de' },
  ODAE:       { key: 'ODAE', title: 'Advent Calendar 2026', subtitle: 'A new favourite recipe every day', lang: 'en' }
};

const config = calendarConfig[firstPathSegment] || calendarConfig.advent;
const en = config.lang === 'en';
document.documentElement.lang = config.lang;

const tr = en ? {
  door: 'Day',
  today: 'a new day, a new recipe!',
  unavailable: 'This door opens in December.',
  test: 'Design preview: all doors are open for testing.',
  missing: 'The recipe PDF has not been added yet.',
  open: 'Open PDF',
  close: 'Close',
  calendar: 'Advent calendar'
} : {
  door: 'Türchen',
  today: 'Ein neuer Tag, ein neues Rezept!',
  unavailable: 'Dieses Türchen öffnet sich erst im Dezember.',
  test: 'Gestaltungsvorschau: Alle Türchen sind zum Testen geöffnet.',
  missing: 'Das Rezept-PDF wurde noch nicht hinzugefügt.',
  open: 'PDF öffnen',
  close: 'Schließen',
  calendar: 'Adventskalender'
};

document.getElementById('title').textContent = config.title;
document.getElementById('subtitle').textContent = config.subtitle;
document.title = config.title;
document.getElementById('groupLabel').textContent = config.key;
document.querySelector('.calendar').setAttribute('aria-label', tr.calendar);
document.getElementById('closeDialog').setAttribute('aria-label', tr.close);

// Datumsschaltung: 1.–24. Dezember 2026. Mit ?demo=1 sind alle Türchen testbar.
const now = new Date();
const demo = new URLSearchParams(window.location.search).get('demo') === '1';
const day = demo ? 24 :
  now.getFullYear() > 2026 ? 24 :
  now.getFullYear() === 2026 && now.getMonth() === 11 ? Math.min(24, now.getDate()) : 0;

// PDF-Dateien
const pdfs = {
  advent: {
    1: '../rezepte_advent_alles/01_Herzhafte-Gemuese-Rolle.pdf',
    2: '../rezepte_advent_alles/02_Pfifferlings-Omelett-mit-Tomatencarpaccio-und-Burrata.pdf',
    3: '../rezepte_advent_alles/03_Mafaldine-mit-Kuerbissosse.pdf',
    4: '../rezepte_advent_alles/04_Lachs-aus-dem-Wok.pdf',
    5: '../rezepte_advent_alles/05_Saltimbocca-a-la-casa.pdf',
    6: '../rezepte_advent_alles/06_Kichererbsen-Curry.pdf',
    7: '../rezepte_advent_alles/07_Matts-Curry.pdf',
    8: '../rezepte_advent_alles/08_Rote-Linsensuppe.pdf',
    9: '../rezepte_advent_alles/09_Blumenkohl-Curry.pdf',
    10: '../rezepte_advent_alles/10_Udon-Nudeln-in-Massaman-Erdnuss-Sauce-mit-Kokosmilch-und-Pak-Choi.pdf',
    11: '../rezepte_advent_alles/11_Auberginen-Auflauf-mit-Mozzarella.pdf',
    12: '../rezepte_advent_alles/12_Ofenkuerbis-mit-Rucola.pdf',
    13: '../rezepte_advent_alles/13_Cookie-und-Kates-Enchiladas-mit-Spinat-und-Artischocke.pdf',
    14: '../rezepte_advent_alles/14_Chili-mit-Bagel.pdf',
    15: '../rezepte_advent_alles/15_Suesskartoffel-Blech.pdf',
    16: '../rezepte_advent_alles/16_Greek-Night.pdf',
    17: '../rezepte_advent_alles/17_Easy-peasy-Erdnuss-Miso-Ramen.pdf',
    18: '../rezepte_advent_alles/18_Crunchy-Kartoffel-Wrap-aus-der-Pfanne-mit-Pesto-und-geraeuchertem-Tofu.pdf',
    19: '../rezepte_advent_alles/19_Graupenrisotto-mit-geroesteten-Rotkohlspalten.pdf',
    20: '../rezepte_advent_alles/20_Kuerbis-mit-Tahini-Zaatar.pdf',
    21: '../rezepte_advent_alles/21_Hausgemachte-Dinkelpizza.pdf',
    22: '../rezepte_advent_alles/22_Veggie-Bolognese-Pasta.pdf',
    23: '../rezepte_advent_alles/23_Brokkolitorte.pdf',
    24: '../rezepte_advent_alles/24_Knoedelpfanne-mit-Champignons-und-Tofu.pdf'
  },

  advent_veg: {
    1: '../rezepte_advent_veg/01_Kichererbsen-Curry.pdf',
    2: '../rezepte_advent_veg/02_Matts-Curry.pdf',
    3: '../rezepte_advent_veg/03_Rote-Linsensuppe.pdf',
    4: '../rezepte_advent_veg/04_Blumenkohl-Curry.pdf',
    5: '../rezepte_advent_veg/05_Auberginen-Auflauf-mit-Mozzarella.pdf',
    6: '../rezepte_advent_veg/06_Ofenkuerbis-mit-Rucola.pdf',
    7: '../rezepte_advent_veg/07_Cookie-und-Kates-Enchiladas-mit-Spinat-und-Artischocke.pdf',
    8: '../rezepte_advent_veg/08_Chili-mit-Bagel.pdf',
    9: '../rezepte_advent_veg/09_Suesskartoffel-Blech.pdf',
    10: '../rezepte_advent_veg/10_Udon-Nudeln-in-Massaman-Erdnuss-Sauce-mit-Kokosmilch-und-Pak-Choi.pdf',
    11: '../rezepte_advent_veg/11_Mungbohnenpfannkuchen.pdf',
    12: '../rezepte_advent_veg/12_Rote-Bete-Burger.pdf',
    13: '../rezepte_advent_veg/13_Greek-Night.pdf',
    14: '../rezepte_advent_veg/14_Crunchy-Kartoffel-Wrap-aus-der-Pfanne-mit-Pesto-und-geraeuchertem-Tofu.pdf',
    15: '../rezepte_advent_veg/15_Graupenrisotto-mit-geroesteten-Rotkohlspalten.pdf',
    16: '../rezepte_advent_veg/16_Kuerbis-mit-Tahini-Zaatar.pdf',
    17: '../rezepte_advent_veg/17_Brokkolitorte.pdf',
    18: '../rezepte_advent_veg/18_Knoedelpfanne-mit-Champignons-und-Tofu.pdf',
    19: '../rezepte_advent_veg/19_Tom-Ka-Gai.pdf',
    20: '../rezepte_advent_veg/20_Chicken-Katsu-Burger.pdf',
    21: '../rezepte_advent_veg/21_Hausgemachte-Dinkelpizza.pdf',
    22: '../rezepte_advent_veg/22_Veggie-Bolognese-Pasta.pdf',
    23: '../rezepte_advent_veg/23_Easy-peasy-Erdnuss-Miso-Ramen.pdf',
    24: '../rezepte_advent_veg/24_Pasta-Trapanese-benannt-nach-der-sizilianischen-Stadt-Trapani.pdf'
  },

  lwl: {
    1: '../rezepte_lwl_alles/01_Een-beetje-van-Greetje-Rote-Bete-mit-Curry-und-Essig.pdf',
    2: '../rezepte_lwl_alles/02_Kartoffelgulasch-mit-Wuerstchen.pdf',
    3: '../rezepte_lwl_alles/03_Dolma-Ein-Stueck-kurdische-Heimat-auf-dem-Teller.pdf',
    4: '../rezepte_lwl_alles/04_Veganer-Curry.pdf',
    5: '../rezepte_lwl_alles/05_Udon-Nudeln-in-Massaman-Erdnuss-Sauce-mit-Kokosmilch-und-Pak-Choi.pdf',
    6: '../rezepte_lwl_alles/06_Ein-einfacher-Pfaelzer-Saumagen.pdf',
    7: '../rezepte_lwl_alles/07_Kartoffel-Karotten-Kohl-Eintopf.pdf',
    8: '../rezepte_lwl_alles/08_Easy-peasy-Erdnuss-Miso-Ramen.pdf',
    9: '../rezepte_lwl_alles/09_Tom-Ka-Gai.pdf',
    10: '../rezepte_lwl_alles/10_Dinkel-Wurzelbrot.pdf',
    11: '../rezepte_lwl_alles/11_Suesskartoffel-Pizza.pdf',
    12: '../rezepte_lwl_alles/12_Graupenrisotto-mit-geroesteten-Rotkohlspalten.pdf',
    13: '../rezepte_lwl_alles/13_Maultaschenpfanne.pdf',
    14: '../rezepte_lwl_alles/14_Pasta-Trapanese-benannt-nach-der-sizilianischen-Stadt-Trapani.pdf',
    15: '../rezepte_lwl_alles/15_was-mit-Kohl.pdf',
    16: '../rezepte_lwl_alles/16_Mungbohnenpfannkuchen.pdf',
    17: '../rezepte_lwl_alles/17_Kuerbissuppe-mit-Chili.pdf',
    18: '../rezepte_lwl_alles/18_Palak-Paneer.pdf',
    19: '../rezepte_lwl_alles/19_Linzer-Kuchen.pdf',
    20: '../rezepte_lwl_alles/20_Suesskartoffel-Salat-mit-Nuessen-und-Huettenkaese.pdf',
    21: '../rezepte_lwl_alles/21_Rote-Bete-Burger.pdf',
    22: '../rezepte_lwl_alles/22_Traenchenkuchen-mit-Rhabarber.pdf',
    23: '../rezepte_lwl_alles/23_Auberginen-Auflauf-mit-Mozzarella.pdf',
    24: '../rezepte_lwl_alles/24_Brokkolitorte.pdf'
  },

  lwl_veg: {
    1: '../rezepte_lwl_veg/01_Graupenrisotto-mit-geroesteten-Rotkohlspalten.pdf',
    2: '../rezepte_lwl_veg/02_Auberginen-Auflauf-mit-Mozzarella.pdf',
    3: '../rezepte_lwl_veg/03_Brokkolitorte.pdf',
    4: '../rezepte_lwl_veg/04_Blumenkohl-Curry.pdf',
    5: '../rezepte_lwl_veg/05_Dolma-Ein-Stueck-kurdische-Heimat-auf-dem-Teller.pdf',
    6: '../rezepte_lwl_veg/06_Veganer-Curry.pdf',
    7: '../rezepte_lwl_veg/07_Udon-Nudeln-in-Massaman-Erdnuss-Sauce-mit-Kokosmilch-und-Pak-Choi.pdf',
    8: '../rezepte_lwl_veg/08_Een-beetje-van-Greetje-Rote-Bete-mit-Curry-und-Essig.pdf',
    9: '../rezepte_lwl_veg/09_Kartoffel-Karotten-Kohl-Eintopf.pdf',
    10: '../rezepte_lwl_veg/10_Easy-peasy-Erdnuss-Miso-Ramen.pdf',
    11: '../rezepte_lwl_veg/11_Tom-Ka-Gai.pdf',
    12: '../rezepte_lwl_veg/12_Dinkel-Wurzelbrot.pdf',
    13: '../rezepte_lwl_veg/13_Suesskartoffel-Pizza.pdf',
    14: '../rezepte_lwl_veg/14_Maultaschenpfanne.pdf',
    15: '../rezepte_lwl_veg/15_Pasta-Trapanese-benannt-nach-der-sizilianischen-Stadt-Trapani.pdf',
    16: '../rezepte_lwl_veg/16_was-mit-Kohl.pdf',
    17: '../rezepte_lwl_veg/17_Mungbohnenpfannkuchen.pdf',
    18: '../rezepte_lwl_veg/18_Kuerbissuppe-mit-Chili.pdf',
    19: '../rezepte_lwl_veg/19_Palak-Paneer.pdf',
    20: '../rezepte_lwl_veg/20_Linzer-Kuchen.pdf',
    21: '../rezepte_lwl_veg/21_Suesskartoffel-Salat-mit-Nuessen-und-Huettenkaese.pdf',
    22: '../rezepte_lwl_veg/22_Rote-Bete-Burger.pdf',
    23: '../rezepte_lwl_veg/23_Traenchenkuchen-mit-Rhabarber.pdf',
    24: '../rezepte_lwl_veg/24_Kuerbis-mit-Tahini-Zaatar.pdf'
  },

  vegan: {
    1: '../rezepte_vegan/01_Kichererbsen-Curry.pdf',
    2: '../rezepte_vegan/02_Kartoffel-Karotten-Kohl-Eintopf.pdf',
    3: '../rezepte_vegan/03_Rote-Linsensuppe.pdf',
    4: '../rezepte_vegan/04_Tom-Ka-Gai.pdf',
    5: '../rezepte_vegan/05_Dolma-Ein-Stueck-kurdische-Heimat-auf-dem-Teller.pdf',
    6: '../rezepte_vegan/06_Veganer-Curry.pdf',
    7: '../rezepte_vegan/07_Udon-Nudeln-in-Massaman-Erdnuss-Sauce-mit-Kokosmilch-und-Pak-Choi.pdf',
    8: '../rezepte_vegan/08_Een-beetje-van-Greetje-Rote-Bete-mit-Curry-und-Essig.pdf',
    9: '../rezepte_vegan/09_Cookie-und-Kates-Enchiladas-mit-Spinat-und-Artischocke.pdf',
    10: '../rezepte_vegan/10_Maultaschenpfanne.pdf',
    11: '../rezepte_vegan/11_Kuerbissuppe-mit-Chili.pdf',
    12: '../rezepte_vegan/12_Mafaldine-mit-Kuerbissosse.pdf',
    13: '../rezepte_vegan/13_Matts-Curry.pdf',
    14: '../rezepte_vegan/14_Greek-Night.pdf',
    15: '../rezepte_vegan/15_Crunchy-Kartoffel-Wrap-aus-der-Pfanne-mit-Pesto-und-geraeuchertem-Tofu.pdf',
    16: '../rezepte_vegan/16_Graupenrisotto-mit-geroesteten-Rotkohlspalten.pdf',
    17: '../rezepte_vegan/17_Easy-peasy-Erdnuss-Miso-Ramen.pdf',
    18: '../rezepte_vegan/18_Blumenkohl-Curry.pdf',
    19: '../rezepte_vegan/19_Dinkel-Wurzelbrot.pdf',
    20: '../rezepte_vegan/20_Chicken-Katsu-Burger.pdf',
    21: '../rezepte_vegan/21_Hausgemachte-Dinkelpizza.pdf',
    22: '../rezepte_vegan/22_Veggie-Bolognese-Pasta.pdf',
    23: '../rezepte_vegan/23_Kuerbis-mit-Tahini-Zaatar.pdf',
    24: '../rezepte_vegan/24_Tide-me-over-bars.pdf'
  },

  ODAE: {
	  1: '../recipes_ODAE/01_Caramelized-Onion-Dip.pdf',
2: '../recipes_ODAE/02_Honey-BBQ-Wings.pdf',
3: '../recipes_ODAE/03_Rice-with-Coca-Cola-Recipe.pdf',
4: '../recipes_ODAE/04_Crockpot-Beef-and-Broccoli.pdf',
5: '../recipes_ODAE/05_Zimtsterne-Cinnamon-Stars.pdf',
6: '../recipes_ODAE/06_Gebrannte-Mandeln-Candied-Almonds.pdf',
7: '../recipes_ODAE/07_Tide-me-over-bars.pdf',
8: '../recipes_ODAE/08_Gluten-Free-Lactose-Free-Banana-Chocolate-Chip-Muffins.pdf',
9: '../recipes_ODAE/09_Pumpkin-Cookies.pdf',
10: '../recipes_ODAE/10_Steamed-Christmas-Pudding.pdf',
11: '../recipes_ODAE/11_Christmas-Crack.pdf',
12: '../recipes_ODAE/12_Peaches-and-Cream-Chicken.pdf',
13: '../recipes_ODAE/13_Nuts-and-Bolts.pdf',
14: '../recipes_ODAE/14_Mint-Chocolate-Chip-Cookies.pdf',
15: '../recipes_ODAE/15_Maple-Curry-Chicken-Penne.pdf',
16: '../recipes_ODAE/16_Chubby-Hubby-Popcorn.pdf',
17: '../recipes_ODAE/17_Eggplant-and-Tomato-Dip.pdf',
18: '../recipes_ODAE/18_Rolo-Pretzel-Turtles.pdf',
  }
};

const doors = document.getElementById('doors');
for (let i = 1; i <= 24; i++) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'door ' + (i > day ? 'future' : i === day ? 'today' : 'past');
  button.textContent = i;
  button.disabled = i > day;
  button.setAttribute('aria-label', tr.door + ' ' + i + (i > day ? ' – ' + tr.unavailable : ''));
  if (i <= day) button.addEventListener('click', () => showRecipe(i));
  doors.appendChild(button);
}

document.getElementById('notice').textContent = demo ? tr.test : '';

const dialog = document.getElementById('recipeDialog');
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

function showRecipe(dayNumber) {
  document.getElementById('dialogEyebrow').textContent = tr.door + ' ' + dayNumber;
  document.getElementById('dialogTitle').textContent = tr.today;
  const path = pdfs[config.key]?.[dayNumber];
  document.getElementById('dialogText').textContent = path ? '' : tr.missing;
  const link = document.getElementById('pdfLink');
  link.hidden = !path;
  if (path) {
    link.href = path;
    link.textContent = tr.open;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  dialog.showModal();
}
