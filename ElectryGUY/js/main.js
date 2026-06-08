// ── Navegación con highlight activo ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--dorado)' : '';
  });
});

// ── Función para enviar cotización por WhatsApp ──
function enviarCotizacion() {
  const nombre   = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const mensaje  = document.getElementById('mensaje').value.trim();

  if (!nombre || !telefono || !mensaje) {
    alert('Por favor completa al menos: nombre, teléfono y El mensaje.');
    return;
  }

  let texto = `Hola ElectriGATE, quiero cotizar \n\n`;
  texto += `*Nombre:* ${nombre}\n`;
  texto += `*Teléfono:* ${telefono}\n`;
  texto += `*Descripción:* ${mensaje}\n`;


  const encoded = encodeURIComponent(texto);
  window.open(`https://wa.me/56926373066?text=${encoded}`, '_blank');

  // Toast de confirmación
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── Animación de entrada para elementos al hacer scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step, .garantia-item, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── Cambio de teléfono y enlace WhatsApp — fácil personalización ──
// CAMBIA AQUÍ tu número de WhatsApp (formato internacional sin +):
const MI_WHATSAPP = '56926373066';
document.querySelectorAll('[href*="wa.me"]').forEach(a => {
  const url = new URL(a.href);
  const txt = url.searchParams.get('text') || '';
  a.href = `https://wa.me/${MI_WHATSAPP}${txt ? '?text=' + encodeURIComponent(txt) : ''}`;
});
