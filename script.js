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
el('currently').innerHTML = `<div class="flipbook" data-page="0" tabindex="0" role="button" aria-label="Current note. Click to turn the page."><section class="flip-page flip-main"><span class="current-intro">${safe(portfolio.currently.intro)}</span><span class="current-topics">Curious about: ${portfolio.currently.topics.map(safe).join(', ')}</span></section><section class="flip-page flip-reading"><p>Reading</p><div class="reading-book"><img src="assets/DATA FEMINISM.jpg" alt="Data Feminism book cover" /><div><strong><em>${safe(portfolio.currently.reading)}</em></strong><small>by Catherine D’Ignazio and Lauren F. Klein</small><span>A feminist manifesto for rethinking data science.</span></div></div></section><section class="flip-page flip-location"><p>Based in</p><strong>📍 ${safe(portfolio.currently.location)}</strong></section><section class="flip-page flip-coffee"><p>Drinking</p><strong>Too much coffee.</strong></section></div>`;
const flipbook = document.querySelector('.flipbook');
if (flipbook) {
  const turnPage = () => { flipbook.dataset.page = (Number(flipbook.dataset.page) + 1) % 4; };
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

el('projects').innerHTML = portfolio.projectCollections.map(collection => `
  <section class="project-page-section" id="${safe(collection.id)}" aria-labelledby="${safe(collection.id)}-title">
    <header class="project-page-heading">
      <p class="eyebrow">02.${safe(collection.number)} / ${safe(collection.label)}</p>
      <div>
        <h2 id="${safe(collection.id)}-title">${safe(collection.title)}</h2>
        <p>${safe(collection.subtitle)}</p>
      </div>
    </header>
    ${collection.methods ? `<div class="gis-method-strip" aria-label="GIS methods">${collection.methods.map(method => `<span>${safe(method)}</span>`).join('')}</div>` : ''}
    <div class="project-list">
      ${collection.projects.map((p, i) => `
        <a class="project ${safe(p.color)}" href="${safe(p.link)}" target="_blank" rel="noreferrer">
          <span class="project-number">${String(i + 1).padStart(2, '0')}</span>
          <div><p class="project-type">${safe(p.type)} · ${safe(p.year)}</p><h3>${safe(p.title)} <span>↗</span></h3><p class="project-description">${safe(p.description)}</p></div>
        </a>`).join('')}
    </div>
  </section>`).join('');

el('studies').innerHTML = portfolio.studies.map((s, index) => {
  const isUdCollage = s.degree === 'Master in Urban Design';
  const isMurpCollage = s.degree === 'Master in Urban & Regional Planning';
  const isCollage = isUdCollage || isMurpCollage;
  const tag = isCollage ? 'button' : s.link ? 'a' : 'article';
  const attributes = isUdCollage ? 'type="button" aria-haspopup="dialog" aria-controls="ud-collage"' : isMurpCollage ? 'type="button" aria-haspopup="dialog" aria-controls="murp-collage"' : s.link ? `href="${safe(s.link)}" target="_blank" rel="noreferrer"` : '';
  const action = s.link ? '<b>Explore ↗</b>' : isCollage ? '<small>watch my journey here</small>' : '';
  return `<${tag} class="study-card ${safe(s.markClass)}${isUdCollage ? ' study-card-trigger' : ''}${isMurpCollage ? ' murp-card-trigger' : ''}" ${attributes}>
    <span class="study-mark">${safe(s.mark).replace(/\n/g, '<br />')}</span>
    <span class="study-period">${safe(s.period)}</span>
    <h3>${safe(s.degree)}</h3>
    <p>${safe(s.school)}</p>
    ${action}
  </${tag}>`;
}).join('');

const udCollage = el('ud-collage');
const udCollageTrigger = document.querySelector('.study-card-trigger');
const udCollageClose = udCollage?.querySelector('.ud-collage-close');
const udJourneyVideo = el('ud-journey-video');
const udCollageGrid = udCollage?.querySelector('.ud-collage-grid');
const udCollageStage = udCollage?.querySelector('.ud-collage-stage');
const murpCollage = el('murp-collage');
const murpCollageTrigger = document.querySelector('.murp-card-trigger');
const murpCollageClose = murpCollage?.querySelector('.ud-collage-close');
const murpCollageGrid = murpCollage?.querySelector('.murp-collage-grid');
const murpCollageStage = murpCollage?.querySelector('.ud-collage-stage');
const udMemoryLightbox = el('ud-memory-lightbox');
const udMemoryMedia = udMemoryLightbox?.querySelector('.ud-memory-lightbox-media');
const udMemoryClose = udMemoryLightbox?.querySelector('.ud-memory-lightbox-close');
const udMemoryTitle = el('ud-memory-title');
const udMemoryDate = el('ud-memory-date');
const udMemoryReflection = el('ud-memory-reflection');
let activeMemory;
let udHoverCloseTimer;
let udHoverReadyAt = 0;
let murpHoverReadyAt = 0;

const layoutUdMemories = () => {
  if (!udCollageGrid || !udCollageStage || udCollage.hidden) return;
  const stageWidth = udCollageStage.clientWidth;
  const stageHeight = udCollageStage.clientHeight;
  if (!stageWidth || !stageHeight) return;
  const bounds = { left: 100, top: 20, width: 985, height: 451 };
  const edge = stageWidth >= 900 ? 40 : 2;
  const scale = Math.min(
    (stageWidth - edge * 2) / bounds.width,
    (stageHeight - edge * 2) / bounds.height,
    1.5
  );
  udCollageGrid.style.setProperty('--collage-scale', scale.toFixed(4));
  udCollageGrid.style.setProperty('--collage-caption-size', `${(10 / scale).toFixed(3)}px`);
  udCollageGrid.style.left = `${(stageWidth - bounds.width * scale) / 2 - bounds.left * scale}px`;
  udCollageGrid.style.top = `${(stageHeight - bounds.height * scale) / 2 - bounds.top * scale}px`;
};

const prepareUdMedia = () => {
  if (!udCollageGrid) return;
  udCollageGrid.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', layoutUdMemories, { once: true });
  });
  udCollageGrid.querySelectorAll('video').forEach(video => {
    if (video.readyState < 1) video.addEventListener('loadedmetadata', layoutUdMemories, { once: true });
  });
};

const layoutMurpMemories = () => {
  if (!murpCollageGrid || !murpCollageStage || murpCollage.hidden) return;
  const stageWidth = murpCollageStage.clientWidth;
  const stageHeight = murpCollageStage.clientHeight;
  if (!stageWidth || !stageHeight) return;
  const bounds = { left: 85, top: 23, width: 979, height: 399 };
  const edge = stageWidth >= 900 ? 40 : 2;
  const scale = Math.min(
    (stageWidth - edge * 2) / bounds.width,
    (stageHeight - edge * 2) / bounds.height,
    1.5
  );
  murpCollageGrid.style.setProperty('--collage-scale', scale.toFixed(4));
  murpCollageGrid.style.setProperty('--collage-caption-size', `${(10 / scale).toFixed(3)}px`);
  murpCollageGrid.style.left = `${(stageWidth - bounds.width * scale) / 2 - bounds.left * scale}px`;
  murpCollageGrid.style.top = `${(stageHeight - bounds.height * scale) / 2 - bounds.top * scale}px`;
};

const prepareMurpMedia = () => {
  if (!murpCollageGrid) return;
  murpCollageGrid.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', layoutMurpMemories, { once: true });
  });
};

const udVideoObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.target.closest('.ud-collage-modal')?.hidden && entry.isIntersecting && entry.intersectionRatio >= .2 && udMemoryLightbox?.hidden) {
      entry.target.play().catch(() => {});
    } else {
      entry.target.pause();
    }
  });
}, { root: udCollage, threshold: [0, .2, .6] }) : null;

udCollageGrid?.querySelectorAll('video').forEach(video => udVideoObserver?.observe(video));
document.addEventListener('visibilitychange', () => {
  if (!udJourneyVideo) return;
  if (document.hidden || udCollage?.hidden || !udMemoryLightbox?.hidden) udJourneyVideo.pause();
  else udJourneyVideo.play().catch(() => {});
});

const openUdCollage = () => {
  udCollage.hidden = false;
  udHoverReadyAt = Date.now() + 500;
  udCollage.scrollTop = 0;
  document.body.classList.add('collage-open');
  prepareUdMedia();
  window.requestAnimationFrame(() => {
    layoutUdMemories();
    udCollage.scrollTop = 0;
  });
  udCollageClose.focus();
};
const closeUdCollage = () => {
  closeUdMemory();
  udCollage.hidden = true;
  document.body.classList.remove('collage-open');
  udCollageGrid?.querySelectorAll('video').forEach(video => video.pause());
  udCollageTrigger.focus();
};

const openMurpCollage = () => {
  murpCollage.hidden = false;
  murpHoverReadyAt = Date.now() + 500;
  murpCollage.scrollTop = 0;
  document.body.classList.add('collage-open');
  prepareMurpMedia();
  window.requestAnimationFrame(() => {
    layoutMurpMemories();
    murpCollage.scrollTop = 0;
  });
  murpCollageClose.focus();
};

const closeMurpCollage = () => {
  closeUdMemory();
  murpCollage.hidden = true;
  document.body.classList.remove('collage-open');
  murpCollageTrigger.focus();
};

function openUdMemory(figure, hoverPreview = false) {
  if (!udMemoryLightbox || !udMemoryMedia) return;
  window.clearTimeout(udHoverCloseTimer);
  activeMemory = figure;
  const source = figure.querySelector('img, video');
  const isVideo = source.tagName === 'VIDEO';
  const media = document.createElement(isVideo ? 'video' : 'img');
  if (isVideo) {
    media.src = source.currentSrc || source.querySelector('source')?.src;
    media.muted = true;
    media.loop = true;
    media.autoplay = true;
    media.playsInline = true;
    media.controls = !hoverPreview;
    source.pause();
  } else {
    media.src = source.currentSrc || source.src;
    media.alt = source.alt;
  }
  udMemoryMedia.replaceChildren(media);
  udMemoryTitle.textContent = figure.querySelector('figcaption')?.textContent.trim() || '';
  udMemoryDate.textContent = figure.dataset.date || '';
  udMemoryReflection.textContent = figure.dataset.memory || '';
  udMemoryLightbox.classList.toggle('hover-preview', hoverPreview);
  udMemoryLightbox.classList.remove('memory-enter');
  void udMemoryLightbox.querySelector('.ud-memory-lightbox-panel')?.offsetWidth;
  udMemoryLightbox.classList.add('memory-enter');
  udMemoryLightbox.hidden = false;
  if (!hoverPreview) udMemoryClose.focus();
  if (isVideo) media.play().catch(() => {});
}

function closeUdMemory() {
  if (!udMemoryLightbox || udMemoryLightbox.hidden) return;
  const wasHoverPreview = udMemoryLightbox.classList.contains('hover-preview');
  udMemoryLightbox.querySelectorAll('video').forEach(video => video.pause());
  udMemoryLightbox.hidden = true;
  udMemoryLightbox.classList.remove('hover-preview', 'memory-enter');
  udMemoryMedia?.replaceChildren();
  if (!wasHoverPreview) activeMemory?.focus();
  activeMemory = null;
}

document.addEventListener('click', event => {
  if (event.target.closest('.study-card-trigger')) openUdCollage();
  if (event.target.closest('.murp-card-trigger')) openMurpCollage();
}, true);
udCollageClose?.addEventListener('click', closeUdCollage);
udCollage?.addEventListener('click', event => { if (event.target === udCollage) closeUdCollage(); });
udCollageGrid?.addEventListener('click', event => {
  const figure = event.target.closest('figure');
  if (figure) openUdMemory(figure, false);
});
udCollageGrid?.addEventListener('pointerover', event => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (Date.now() < udHoverReadyAt) return;
  const figure = event.target.closest('figure');
  if (!figure || figure.contains(event.relatedTarget)) return;
  openUdMemory(figure, true);
});
udCollageGrid?.addEventListener('pointerout', event => {
  if (!udMemoryLightbox?.classList.contains('hover-preview')) return;
  const figure = event.target.closest('figure');
  if (!figure || figure.contains(event.relatedTarget)) return;
  window.clearTimeout(udHoverCloseTimer);
  udHoverCloseTimer = window.setTimeout(closeUdMemory, 90);
});
udCollageGrid?.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const figure = event.target.closest('figure');
  if (!figure) return;
  event.preventDefault();
  openUdMemory(figure, false);
});
murpCollageClose?.addEventListener('click', closeMurpCollage);
murpCollage?.addEventListener('click', event => { if (event.target === murpCollage) closeMurpCollage(); });
murpCollageGrid?.addEventListener('click', event => {
  const figure = event.target.closest('figure');
  if (figure) openUdMemory(figure, false);
});
murpCollageGrid?.addEventListener('pointerover', event => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (Date.now() < murpHoverReadyAt) return;
  const figure = event.target.closest('figure');
  if (!figure || figure.contains(event.relatedTarget)) return;
  openUdMemory(figure, true);
});
murpCollageGrid?.addEventListener('pointerout', event => {
  if (!udMemoryLightbox?.classList.contains('hover-preview')) return;
  const figure = event.target.closest('figure');
  if (!figure || figure.contains(event.relatedTarget)) return;
  window.clearTimeout(udHoverCloseTimer);
  udHoverCloseTimer = window.setTimeout(closeUdMemory, 90);
});
murpCollageGrid?.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const figure = event.target.closest('figure');
  if (!figure) return;
  event.preventDefault();
  openUdMemory(figure, false);
});
udMemoryClose?.addEventListener('click', closeUdMemory);
udMemoryLightbox?.addEventListener('click', event => { if (event.target === udMemoryLightbox) closeUdMemory(); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!udMemoryLightbox?.hidden) closeUdMemory();
  else if (!udCollage?.hidden) closeUdCollage();
  else if (!murpCollage?.hidden) closeMurpCollage();
});
window.addEventListener('resize', () => { layoutUdMemories(); layoutMurpMemories(); });
const collageQuery = new URLSearchParams(window.location.search).get('collage');
if (collageQuery === 'urban-design') openUdCollage();
if (collageQuery === 'urban-planning') openMurpCollage();
el('experience-list').innerHTML = portfolio.experience.map(e => {
  const logo = e.logoSrc ? `<img src="${safe(e.logoSrc)}" alt="" />` : `<span>${safe(e.logo)}</span>`;
  return `<article><span>${safe(e.period)}</span><div class="experience-content"><h3>${safe(e.title)}</h3><p class="experience-organization">${safe(e.organization)}</p><p>${safe(e.summary)}</p></div><div class="organization-mark ${safe(e.logoClass)}" role="img" aria-label="${safe(e.organization)} logo">${logo}</div></article>`;
}).join('');
el('awards').innerHTML = portfolio.awards.map(a => `<article tabindex="0"><span>${safe(a.year)}</span><div><h3>${safe(a.title)}</h3><p>${safe(a.organization)}</p></div></article>`).join('');
const credentialsSection = document.querySelector('.credentials-section');
let awardPreviewTimer;
const awardsList = el('awards');
const showAwardPreview = award => {
  const index = [...awardsList.children].indexOf(award);
  if (index < 0) return;
  if (credentialsSection.classList.contains('award-preview-active') && credentialsSection.dataset.awardPreview === String(index + 1)) return;
  window.clearTimeout(awardPreviewTimer);
  credentialsSection.classList.remove('award-preview-active');
  void credentialsSection.offsetWidth;
  credentialsSection.dataset.awardPreview = String(index + 1);
  credentialsSection.classList.add('award-preview-active');
  awardPreviewTimer = window.setTimeout(() => {
    credentialsSection.classList.remove('award-preview-active');
    delete credentialsSection.dataset.awardPreview;
  }, 3000);
};
// Capture at the list level, so the preview starts whether the pointer reaches the
// year, title, organization text, or any other part of an award row.
awardsList.addEventListener('pointerover', event => {
  const award = event.target.closest('article');
  if (award && awardsList.contains(award)) showAwardPreview(award);
}, true);
awardsList.addEventListener('focusin', event => {
  const award = event.target.closest('article');
  if (award && awardsList.contains(award)) showAwardPreview(award);
});
el('publications').innerHTML = portfolio.publications.map(p => `<a href="${safe(p.link)}" target="_blank" rel="noreferrer"><div><h3>${safe(p.title)}</h3><p>${safe(p.source)}</p><p class="publication-summary">${safe(p.summary)}</p></div><span>↗</span></a>`).join('');
el('countries').innerHTML = portfolio.countries.map((country, index) => {
  return `<span class="country country-${index % 5}${country === 'Nepal' ? ' country-nepal' : ''}">${safe(country)}</span>`;
}).join('');

const countryCloud = el('countries');
let flightMonitorFrame;
const drawFlightRoute = () => {
  if (!countryCloud) return;
  countryCloud.querySelector('.flight-route-overlay')?.remove();
  const cloudBox = countryCloud.getBoundingClientRect();
  const countries = [...countryCloud.querySelectorAll('.country')];
  if (cloudBox.width === 0 || countries.length < 2) return;

  const points = countries.map(country => {
    const box = country.getBoundingClientRect();
    return {
      x: box.left - cloudBox.left + box.width / 2,
      y: box.top - cloudBox.top + box.height / 2
    };
  });
  // Revisit Nepal midway through the journey, then return there to close the loop.
  points.splice(Math.ceil(points.length / 2), 0, { ...points[0] });
  points.push(points[0]);

  const route = points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const bend = Math.max(22, Math.abs(point.x - previous.x) * .28);
    const direction = index % 2 === 0 ? -1 : 1;
    const controlY = (previous.y + point.y) / 2 + bend * direction;
    return `${path} C ${previous.x.toFixed(1)} ${controlY.toFixed(1)}, ${point.x.toFixed(1)} ${controlY.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }, `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'flight-route-overlay');
  svg.setAttribute('viewBox', `0 0 ${cloudBox.width} ${cloudBox.height}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `<path id="country-flight-path" class="country-flight-path" d="${route}" />
    <text class="flight-plane" x="0" y="0" text-anchor="middle" dominant-baseline="central">✈<animateMotion dur="45s" repeatCount="indefinite" rotate="auto"><mpath href="#country-flight-path" /></animateMotion></text>`;
  countryCloud.prepend(svg);
  countryCloud.classList.add('has-flight-route');

  window.cancelAnimationFrame(flightMonitorFrame);
  const nepal = countryCloud.querySelector('.country-nepal');
  const plane = svg.querySelector('.flight-plane');
  const monitorNepalArrival = () => {
    const nepalBox = nepal.getBoundingClientRect();
    const planeBox = plane.getBoundingClientRect();
    const distance = Math.hypot(
      planeBox.left + planeBox.width / 2 - (nepalBox.left + nepalBox.width / 2),
      planeBox.top + planeBox.height / 2 - (nepalBox.top + nepalBox.height / 2)
    );
    nepal.classList.toggle('plane-arrived', distance < Math.max(24, nepalBox.width * .48));
    flightMonitorFrame = window.requestAnimationFrame(monitorNepalArrival);
  };
  monitorNepalArrival();
};

window.requestAnimationFrame(drawFlightRoute);
window.addEventListener('resize', drawFlightRoute);
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
      if (count === 10) {
        window.clearInterval(countTimer);
        window.setTimeout(countCountries, 2000);
      }
    }, 200);
  };
  countCountries();
} else if (countryDisplay) {
  countryDisplay.textContent = '10';
}
el('creator-copy').textContent = portfolio.creator;
el('creator-links').innerHTML = portfolio.creatorLinks.map(l => `<a href="${safe(l.link)}" target="_blank" rel="noreferrer"><span><i aria-hidden="true">${safe(l.icon)}</i>${safe(l.label)}</span><small>${safe(l.handle)}</small><b>↗</b></a>`).join('');
