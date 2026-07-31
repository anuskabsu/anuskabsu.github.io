const el = (id) => document.getElementById(id);
const safe = (value) => String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[c]));

const nameHighlight = document.querySelector('.name-highlight');
if (nameHighlight && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const fullName = nameHighlight.textContent.trim();
  let character = 0;
  nameHighlight.textContent = '';
  nameHighlight.classList.add('typing');
  const typeName = () => {
    nameHighlight.textContent += fullName.charAt(character);
    character += 1;
    if (character < fullName.length) window.setTimeout(typeName, 105);
  };
  window.setTimeout(typeName, 350);
}

el('intro').innerHTML = safe(portfolio.intro).replace(/\n/g, '<br />');
el('about-copy').textContent = portfolio.about;
el('currently').innerHTML = `<div class="flipbook" data-page="0" tabindex="0" role="button" aria-label="Current note. Click to turn the page."><section class="flip-page flip-main"><span class="current-intro">${safe(portfolio.currently.intro)}</span><span class="current-topics">Curious about: ${portfolio.currently.topics.map(safe).join(', ')}</span></section><section class="flip-page flip-reading"><p>Reading</p><strong><em>${safe(portfolio.currently.reading)}</em></strong></section><section class="flip-page flip-location"><p>Based in</p><strong>📍 ${safe(portfolio.currently.location)}</strong></section></div>`;
const flipbook = document.querySelector('.flipbook');
if (flipbook) {
  const turnPage = () => { flipbook.dataset.page = (Number(flipbook.dataset.page) + 1) % 3; };
  flipbook.addEventListener('click', turnPage);
  flipbook.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); turnPage(); } });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setInterval(turnPage, 2000);
}
el('email-link').href = `mailto:${portfolio.email}`;
el('email-link').textContent = `${portfolio.email} ↗`;
el('resume-nav').href = portfolio.resume;
el('year').textContent = new Date().getFullYear();
const countryCount = el('country-count');
if (countryCount) countryCount.textContent = String(portfolio.countryCount || portfolio.countries.length).padStart(2, '0');

el('projects').innerHTML = portfolio.projects.map((p, i) => `
  <a class="project ${safe(p.color)}" href="${safe(p.link)}" target="_blank" rel="noreferrer">
    <span class="project-number">0${i + 1}</span>
    <div><p class="project-type">${safe(p.type)} · ${safe(p.year)}</p><h3>${safe(p.title)} <span>↗</span></h3><p class="project-description">${safe(p.description)}</p></div>
  </a>`).join('');

el('studies').innerHTML = portfolio.studies.map(s => {
  const tag = s.link ? 'a' : 'article';
  const attributes = s.link ? `href="${safe(s.link)}" target="_blank" rel="noreferrer"` : '';
  const action = s.link ? '<b>Explore ↗</b>' : '<small>Link coming soon</small>';
  return `<${tag} class="study-card ${safe(s.markClass)}" ${attributes}>
    <span class="study-mark">${safe(s.mark).replace(/\n/g, '<br />')}</span>
    <span class="study-period">${safe(s.period)}</span>
    <h3>${safe(s.degree)}</h3>
    <p>${safe(s.school)}</p>
    ${action}
  </${tag}>`;
}).join('');
el('experience-list').innerHTML = portfolio.experience.map(e => `<article><span>${safe(e.period)}</span><div><h3>${safe(e.title)}</h3><p class="experience-organization">${safe(e.organization)}</p><p>${safe(e.summary)}</p></div></article>`).join('');
el('awards').innerHTML = portfolio.awards.map(a => `<article><span>${safe(a.year)}</span><div><h3>${safe(a.title)}</h3><p>${safe(a.organization)}</p></div></article>`).join('');
el('publications').innerHTML = portfolio.publications.map(p => `<a href="${safe(p.link)}" target="_blank" rel="noreferrer"><div><h3>${safe(p.title)}</h3><p>${safe(p.source)}</p><p class="publication-summary">${safe(p.summary)}</p></div><span>↗</span></a>`).join('');
el('countries').innerHTML = portfolio.countries.map((country, index) => {
  const marker = country === 'Nepal' ? '<i aria-hidden="true">⌂</i>' : country === 'United States' ? '<i aria-hidden="true">▣</i>' : '';
  return `<span class="country country-${index % 5}${country === 'Nepal' ? ' country-nepal' : ''}">${marker}${safe(country)}</span>`;
}).join('');
const countryDisplay = el('country-count-display');
if (countryDisplay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let countTimer;
  const countCountries = () => {
    let count = 1;
    countryDisplay.textContent = String(count).padStart(2, '0');
    window.clearInterval(countTimer);
    countTimer = window.setInterval(() => {
      count += 1;
      countryDisplay.textContent = String(count).padStart(2, '0');
      if (count === 9) window.clearInterval(countTimer);
    }, 500);
  };
  countCountries();
  window.setInterval(countCountries, 10000);
}
el('creator-copy').textContent = portfolio.creator;
el('creator-links').innerHTML = portfolio.creatorLinks.map(l => `<a href="${safe(l.link)}" target="_blank" rel="noreferrer"><span><i aria-hidden="true">${safe(l.icon)}</i>${safe(l.label)}</span><small>${safe(l.handle)}</small><b>↗</b></a>`).join('');
