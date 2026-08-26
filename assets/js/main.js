const primary = '2348166377843';

const activateWhatsApp = () => {
  document.querySelectorAll('[data-wa]').forEach((link) => {
    link.href = `https://wa.me/${primary}?text=${encodeURIComponent(link.dataset.wa)}`;
    link.target = '_blank';
    link.rel = 'noopener';
  });
};

const cardMarkup = (item, index) => `<article class="catalogue-card ${item.featured && index % 5 === 0 ? 'span-two' : ''}" data-collection="${item.collection}" data-category="${item.category}"><img src="assets/images/${item.image}" alt="${item.title} by Ebube Israel Furniture Enterprise"><div><p>${item.label}</p><h3>${item.title}</h3><a data-wa="Hello Ebube Israel Furniture, I like the ${item.title} in your gallery and would like an enquiry." href="#">Ask about this ${item.collection.includes('inspiration') ? 'style' : 'design'} →</a></div></article>`;

if (Array.isArray(window.galleryItems)) {
  const fullCatalogue = document.querySelector('#full-catalogue');
  const signatureGrid = document.querySelector('#signature-grid');
  const workshopGrid = document.querySelector('#workshop-grid');

  if (fullCatalogue) fullCatalogue.innerHTML = window.galleryItems.map(cardMarkup).join('');

  if (signatureGrid) {
    const signatureItems = window.galleryItems.filter((item) => item.collection.includes('signature')).slice(0, 5);
    signatureGrid.innerHTML = signatureItems.map((item) => `<figure><img src="assets/images/${item.image}" alt="${item.title} by Ebube Israel Furniture Enterprise"><figcaption>${item.title}</figcaption></figure>`).join('');
  }

  if (workshopGrid) {
    const workshopItems = window.galleryItems.filter((item) => item.collection.includes('workshop')).slice(0, 5);
    workshopGrid.innerHTML = workshopItems.map((item, index) => `<figure class="${index === 0 ? 'workshop-feature' : ''}"><img src="assets/images/${item.image}" alt="${item.title} in the Ebube Israel Furniture workshop"><figcaption>${index === 0 ? '<span>Work in progress</span><strong>' + item.title + '</strong>' : item.title}</figcaption></figure>`).join('');
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
}

activateWhatsApp();
document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menu) menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Close' : 'Menu';
});
