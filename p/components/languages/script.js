/**
 * Update the `flag` paths below to match your local image files
 * (supports .png, .svg, .webp, .jpg).
 */
const languageRows = [
  {
    direction: 'left',
    items: [
      { name: 'Spanish', flag: 'images/flags/spanish.png' },
      { name: 'French', flag: 'images/flags/french.png' },
      { name: 'German', flag: 'images/flags/german.png' },
      { name: 'Portuguese', flag: 'images/flags/portuguese.png' },
      { name: 'Italian', flag: 'images/flags/italian.png' },
      { name: 'Dutch', flag: 'images/flags/dutch.png' },
      { name: 'Polish', flag: 'images/flags/polish.png' },
      { name: 'English', flag: 'images/flags/english.png' },
    ],
  },
  {
    direction: 'right',
    items: [
      { name: 'Chinese', flag: 'images/flags/chinese.png' },
      { name: 'Hindi', flag: 'images/flags/hindi.png' },
      { name: 'Arabic', flag: 'images/flags/arabic.png' },
      { name: 'Turkish', flag: 'images/flags/turkish.png' },
      { name: 'Vietnamese', flag: 'images/flags/vietnamese.png' },
      { name: 'Thai', flag: 'images/flags/thai.png' },
      { name: 'Japanese', flag: 'images/flags/japanese.png' },
      { name: 'Korean', flag: 'images/flags/korean.png' },
    ],
  },
  {
    direction: 'left',
    items: [
      { name: 'Danish', flag: 'images/flags/danish.png' },
      { name: 'Finnish', flag: 'images/flags/finnish.png' },
      { name: 'Greek', flag: 'images/flags/greek.png' },
      { name: 'Czech', flag: 'images/flags/czech.png' },
      { name: 'Romanian', flag: 'images/flags/romanian.png' },
      { name: 'Hungarian', flag: 'images/flags/hungarian.png' },
      { name: 'Swedish', flag: 'images/flags/swedish.png' },
      { name: 'Norwegian', flag: 'images/flags/norwegian.png' },
    ],
  },
  {
    direction: 'right',
    items: [
      { name: 'Bulgarian', flag: 'images/flags/bulgarian.png' },
      { name: 'Croatian', flag: 'images/flags/croatian.png' },
      { name: 'Slovak', flag: 'images/flags/slovak.png' },
      { name: 'Indonesian', flag: 'images/flags/indonesian.png' },
      { name: 'Malay', flag: 'images/flags/malay.png' },
      { name: 'Filipino', flag: 'images/flags/filipino.png' },
      { name: 'Ukrainian', flag: 'images/flags/ukrainian.png' },
      { name: 'Hebrew', flag: 'images/flags/hebrew.png' },
    ],
  },
];

function createPillElement({ name, flag }) {
  const pill = document.createElement('div');
  pill.className = 'language-pill';

  const img = document.createElement('img');
  img.className = 'language-flag';
  img.src = flag;
  img.alt = `${name} flag`;
  img.loading = 'lazy';

  const label = document.createElement('span');
  label.className = 'language-name';
  label.textContent = name;

  pill.append(img, label);
  return pill;
}

function buildMarquee() {
  const container = document.getElementById('marquee-container');
  if (!container) return;

  languageRows.forEach(({ direction, items }) => {
    const row = document.createElement('div');
    row.className = 'marquee-row';
    row.dataset.direction = direction;

    const track = document.createElement('div');
    track.className = 'marquee-track';

    // Create two identical groups so the -50% transform loops seamlessly
    for (let copy = 0; copy < 2; copy++) {
      const group = document.createElement('div');
      group.className = 'marquee-group';
      if (copy === 1) group.setAttribute('aria-hidden', 'true');

      items.forEach((item) => {
        group.appendChild(createPillElement(item));
      });

      track.appendChild(group);
    }

    row.appendChild(track);
    container.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', buildMarquee);
