// ---------------- Sidebar active state ----------------
function initSidebar() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  sidebarLinks.forEach(link => {
    if (link.id === 'inicioLink') return;

    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const paginaActual = window.location.pathname.split('/').pop();
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === paginaActual && link.id !== 'inicioLink') {
      link.classList.add('active');
    }
  });
}

// ---------------- Modo oscuro global ----------------
function initDarkMode() {
  const switchOscuro = document.getElementById('modoOscuroSwitch');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!switchOscuro) return;

  // 🔹 Aplicar dark-mode desde localStorage SIN animación
  document.body.classList.remove('transition-dark-mode');
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
    switchOscuro.checked = true;
  }

  // 🔹 Cambios manuales con animación
  switchOscuro.addEventListener('change', () => {
    document.body.classList.add('transition-dark-mode');
    document.body.classList.toggle('dark-mode', switchOscuro.checked);
    localStorage.setItem('modoOscuro', switchOscuro.checked);

    setTimeout(() => {
      document.body.classList.remove('transition-dark-mode');
    }, 400);
  });

  // 🔹 Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('modoOscuro', 'false');
      const basePath = window.location.pathname.includes('/modulos/') ? '../' : '';
      window.location.href = basePath + 'index.html';
    });
  }
}

// ---------------- Inicializar app ----------------
function initApp() {
  const topbar = document.getElementById('mainNav');
  const sidebar = document.querySelector('.sidebar');

  if (topbar && sidebar) {
    const appContainer = document.getElementById('appContainer');
    if (appContainer) appContainer.style.paddingTop = topbar.offsetHeight + 'px';

    initDarkMode();
    initSidebar();
    return true;
  }
  return false;
}

// ---------------- Observer para inicializar app ----------------
const observer = new MutationObserver(() => {
  if (initApp()) observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });

// ---------------- Aplicar modo oscuro ANTES de pintar la página ----------------
if (localStorage.getItem('modoOscuro') === 'true') {
  document.body.classList.add('dark-mode'); // ⚠ body, no html
}
