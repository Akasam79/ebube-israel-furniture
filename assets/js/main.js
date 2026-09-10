(() => {
const primary = '2348166377843';

const activateWhatsApp = () => {
  document.querySelectorAll('[data-wa]').forEach((link) => {
    link.href = `https://wa.me/${primary}?text=${encodeURIComponent(link.dataset.wa)}`;
    link.target = '_blank';
    link.rel = 'noopener';
  });
};

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
const tokenList = (value) => (Array.isArray(value) ? value : String(value ?? '').split(' ')).filter(Boolean);
const tokenValue = (value) => tokenList(value).join(' ');
const hasToken = (value, token) => tokenList(value).includes(token);
const imagePath = (image) => String(image ?? '').startsWith('/') ? image : `assets/images/${image}`;
const cardMarkup = (item, index) => {
  const title = escapeHtml(item.title);
  const collection = tokenValue(item.collection);
  const category = tokenValue(item.category);
  const enquiry = escapeHtml(`Hello Ebube Israel Furniture, I like the ${item.title} in your gallery and would like an enquiry.`);
  return `<article class="catalogue-card ${item.featured && index % 5 === 0 ? 'span-two' : ''}" data-collection="${escapeHtml(collection)}" data-category="${escapeHtml(category)}"><img src="${escapeHtml(imagePath(item.image))}" alt="${title} by Ebube Israel Furniture Enterprise"><div><p>${escapeHtml(item.label)}</p><h3>${title}</h3><a data-wa="${enquiry}" href="#">Ask about this ${hasToken(item.collection, 'inspiration') ? 'style' : 'design'} →</a></div></article>`;
};

const renderGallery = (galleryItems) => {
  if (!Array.isArray(galleryItems)) return;
  const newArrivalsSection = document.querySelector('#new-arrivals');
  const newArrivalsGrid = document.querySelector('#new-arrivals-grid');
  const fullCatalogue = document.querySelector('#full-catalogue');
  const signatureGrid = document.querySelector('#signature-grid');
  const workshopGrid = document.querySelector('#workshop-grid');

  if (newArrivalsSection && newArrivalsGrid) {
    const newArrivals = galleryItems.filter((item) => item.newArrival).slice(0, 5);
    newArrivalsGrid.innerHTML = newArrivals.length
      ? newArrivals.map((item) => `<article><img src="${escapeHtml(imagePath(item.image))}" alt="${escapeHtml(item.title)} by Ebube Israel Furniture Enterprise"><p>${escapeHtml(item.label)}</p><h3>${escapeHtml(item.title)}</h3><a data-wa="${escapeHtml(`Hello Ebube Israel Furniture, I like the new ${item.title} and would like an enquiry.`)}" href="#">Ask about this design →</a></article>`).join('')
      : '<p class="new-arrivals-empty">Fresh work is being added. Check back soon, or explore the full catalogue below.</p>';
  }

  if (fullCatalogue) fullCatalogue.innerHTML = galleryItems.map(cardMarkup).join('');

  if (signatureGrid) {
    const signatureItems = galleryItems.filter((item) => hasToken(item.collection, 'signature')).slice(0, 5);
    signatureGrid.innerHTML = signatureItems.map((item) => `<figure><img src="${escapeHtml(imagePath(item.image))}" alt="${escapeHtml(item.title)} by Ebube Israel Furniture Enterprise"><figcaption>${escapeHtml(item.title)}</figcaption></figure>`).join('');
  }

  if (workshopGrid) {
    const workshopItems = galleryItems.filter((item) => hasToken(item.collection, 'workshop')).slice(0, 5);
    workshopGrid.innerHTML = workshopItems.map((item, index) => `<figure class="${index === 0 ? 'workshop-feature' : ''}"><img src="${escapeHtml(imagePath(item.image))}" alt="${escapeHtml(item.title)} in the Ebube Israel Furniture workshop"><figcaption>${index === 0 ? '<span>Work in progress</span><strong>' + escapeHtml(item.title) + '</strong>' : escapeHtml(item.title)}</figcaption></figure>`).join('');
  }

  let activeCollection = 'all';
  let activeSpace = 'all';
  const updateGallery = () => {
    document.querySelectorAll('#full-catalogue .catalogue-card').forEach((card) => {
      const inCollection = activeCollection === 'all' || card.dataset.collection.split(' ').includes(activeCollection);
      const inSpace = activeSpace === 'all' || card.dataset.category.split(' ').includes(activeSpace);
      card.hidden = !(inCollection && inSpace);
    });
  };

  document.querySelectorAll('.collection-filter').forEach((button) => button.addEventListener('click', () => {
    activeCollection = button.dataset.collectionFilter;
    document.querySelectorAll('.collection-filter').forEach((item) => item.classList.toggle('active', item === button));
    updateGallery();
  }));

  document.querySelectorAll('.space-filter').forEach((button) => button.addEventListener('click', () => {
    activeSpace = button.dataset.spaceFilter;
    document.querySelectorAll('.space-filter').forEach((item) => item.classList.toggle('active', item === button));
    updateGallery();
  }));

  document.querySelectorAll('[data-quick-collection]').forEach((link) => link.addEventListener('click', () => {
    const value = link.dataset.quickCollection;
    const filter = document.querySelector(`.collection-filter[data-collection-filter="${value}"]`);
    if (filter) filter.click();
  }));

  const requestedCollection = new URLSearchParams(window.location.search).get('collection');
  const requestedFilter = requestedCollection && document.querySelector(`.collection-filter[data-collection-filter="${requestedCollection}"]`);
  if (requestedFilter) requestedFilter.click();

  activateWhatsApp();
};

const loadGallery = async () => {
  let galleryItems = Array.isArray(window.galleryItems) ? window.galleryItems : [];
  try {
    const response = await fetch('content/gallery.json', { cache: 'no-store' });
    if (response.ok) {
      const gallery = await response.json();
      if (Array.isArray(gallery.items)) galleryItems = gallery.items;
    }
  } catch {
    // The checked-in gallery script is a safe local/offline fallback.
  }
  renderGallery(galleryItems);
};

loadGallery();

activateWhatsApp();
document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menu) menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Close' : 'Menu';
});
})();
