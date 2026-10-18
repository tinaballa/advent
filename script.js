
/* Adventskalender 2026 – vier Gruppen */

const params = new URLSearchParams(window.location.search);
const firstPathSegment = window.location.pathname.split('/').filter(Boolean)[0];

const pathGroups = {
  advent: 'advent1',
  vegan: 'vegan',
  lwl: 'lwl',
  english: 'advent_en'
};

const groups = {
  advent1: { lang: 'de' },
  vegan: { lang: 'de' },
  lwl: { lang: 'de' },
  advent_en: { lang: 'en' }
};

const requestedGroup =
  pathGroups[firstPathSegment] || params.get('gruppe') || 'advent1';

const group = Object.prototype.hasOwnProperty.call(groups, requestedGroup)
  ? requestedGroup
  : 'advent1';

const en = groups[group].lang === 'en';
document.documentElement.lang = en ? 'en' : 'de';

const tr = en ? {
  title: 'Advent Calendar 2026',
  subtitle: 'A new favourite recipe every day',
  door: 'Day',
  today: 'Today’s recipe',
  unavailable: 'This door opens in December.',
  test: 'Design preview: day 3 is open for testing.',
  missing: 'The recipe PDF will be linked here later.',
  open: 'Open PDF'
} : {
  title: 'Adventskalender 2026',
  subtitle: 'Täglich ein neues Lieblingsrezept',
  door: 'Türchen',
  today: 'Heutiges Rezept',
  unavailable: 'Dieses Türchen öffnet sich erst im Dezember.',
  test: 'Gestaltungsvorschau: Türchen 3 ist zum Testen geöffnet.',
  missing: 'Hier wird später das Rezept-PDF verlinkt.',
  open: 'PDF öffnen'
};

document.getElementById('title').textContent = tr.title;
document.getElementById('subtitle').textContent = tr.subtitle;
document.title = tr.title;
document.getElementById('groupLabel').textContent = group;

// Datumsfreischaltung und Testmodus
const now = new Date();
const demo = params.get('demo') === '1';

 const day = demo
  ? 25
  : now.getFullYear() > 2026
    ? 25
    : now.getFullYear() === 2026 && now.getMonth() === 11
      ? Math.min(25, now.getDate())
      : 0;

// PDF-Zuordnungen der vier Kalender
const pdfs = {
  advent1: {
    1: 'rezepte_advent1/DE_Tag-01.pdf',
    2: 'rezepte_advent1/DE_Tag-02.pdf',
    3: 'rezepte_advent1/DE_Tag-03.pdf',
    4: 'rezepte_advent1/DE_Tag-04.pdf'
  },

  vegan: {
    1: 'rezepte_vegan/DE_Tag-01.pdf',
    2: 'rezepte_vegan/DE_Tag-02.pdf',
    3: 'rezepte_vegan/DE_Tag-03.pdf',
    4: 'rezepte_vegan/DE_Tag-04.pdf'
  },

  lwl: {
    1: 'rezepte_lwl/DE_Tag-01.pdf',
    2: 'rezepte_lwl/DE_Tag-02.pdf',
    3: 'rezepte_lwl/DE_Tag-03.pdf',
    4: 'rezepte_lwl/DE_Tag-04.pdf'
  },

  advent_en: {
    1: 'rezepte_advent_en/EN_Tag-01.pdf',
    2: 'rezepte_advent_en/EN_Tag-02.pdf',
    3: 'rezepte_advent_en/EN_Tag-03.pdf',
    4: 'rezepte_advent_en/EN_Tag-04.pdf'
  }
};

// Kalendertürchen erstellen
const doors = document.getElementById('doors');

for (let i = 1; i <= 24; i++) {
  const button = document.createElement('button');

  button.type = 'button';
  button.className = 'door ' +
    (i > day ? 'future' : i === day ? 'today' : 'past');

  button.textContent = i;
  button.disabled = i > day;

  button.setAttribute(
    'aria-label',
    tr.door + ' ' + i + (i > day ? ' – ' + tr.unavailable : '')
  );

  if (i <= day) {
    button.addEventListener('click', () => showRecipe(i));
  }

  doors.appendChild(button);
}

// Bonuskachel für den 25. Dezember
const bonus = document.createElement('button');

bonus.type = 'button';
bonus.className = 'door bonus ' +
  (day < 25 ? 'future' : day === 25 ? 'today' : 'past');

bonus.textContent = en ? 'Bonus' : 'Bonus';
bonus.disabled = day < 25;

if (day >= 25) {
  bonus.addEventListener('click', () => showRecipe(25));
}

doors.appendChild(bonus);

// Hinweis zum Testmodus
document.getElementById('notice').textContent = demo ? tr.test : '';

// Rezeptfenster
const dialog = document.getElementById('recipeDialog');

document.getElementById('closeDialog').addEventListener(
  'click',
  () => dialog.close()
);

dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

function showRecipe(dayNumber) {
  document.getElementById('dialogEyebrow').textContent =
    tr.door + ' ' + dayNumber;

  document.getElementById('dialogTitle').textContent = tr.today;

  const path = pdfs[group]?.[dayNumber];

  document.getElementById('dialogText').textContent =
    path ? '' : tr.missing;

  const link = document.getElementById('pdfLink');

  link.hidden = !path;

  if (path) {
    link.href = '/' + path;
    link.textContent = tr.open;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }

  dialog.showModal();
}
