const primary = '2348166377843';
document.querySelectorAll('[data-wa]').forEach((link) => { link.href = `https://wa.me/${primary}?text=${encodeURIComponent(link.dataset.wa)}`; link.target = '_blank'; link.rel = 'noopener'; });
document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());
const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav');
if (menu) menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.textContent = open ? 'Close' : 'Menu'; });

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.catalogue-card').forEach((card) => { card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter); });
}));
