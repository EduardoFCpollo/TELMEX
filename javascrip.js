// ---------------- Inicializar Sidebar ----------------
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
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === paginaActual && link.id !== 'inicioLink') {
      link.classList.add('active');
    }
  });
}

// ---------------- Inicializar Modo Oscuro ----------------
function initDarkMode() {
  const switchOscuro = document.getElementById('modoOscuroSwitch');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!switchOscuro) return;

  // Aplicar dark-mode desde localStorage sin animación
  document.body.classList.remove('transition-dark-mode');
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
    switchOscuro.checked = true;
  }

  // Cambios manuales con animación
  switchOscuro.addEventListener('change', () => {
    document.body.classList.add('transition-dark-mode');
    document.body.classList.toggle('dark-mode', switchOscuro.checked);
    localStorage.setItem('modoOscuro', switchOscuro.checked);

    setTimeout(() => {
      document.body.classList.remove('transition-dark-mode');
    }, 400);
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('modoOscuro', 'false');
      window.location.href = '../controller/UsuarioController.php?action=logout';
    });
  }
}

// ---------------- Cargar Topbar ----------------
function loadTopbar() {
  const topbarContainer = document.getElementById('topbarContainer');
  if (!topbarContainer) return;

  fetch('../menusFijos/topbar.html')
    .then(resp => resp.text())
    .then(html => {
      topbarContainer.innerHTML = html;

      // Ajustar padding del appContainer según altura del topbar
      const topbarHeight = document.getElementById('mainNav')?.offsetHeight || 0;
      const appContainer = document.getElementById('appContainer');
      if (appContainer) appContainer.style.paddingTop = topbarHeight + 'px';

      // Inicializar funcionalidades del topbar
      initTopbar();
    })
    .catch(err => console.error('Error cargando topbar:', err));
}

// ---------------- Inicializar Topbar ----------------
function initTopbar() {
  console.log('✅ initTopbar ejecutado');

  const topUser = document.getElementById('topUser');
  if (topUser) {
    fetch('../controller/UsuarioController.php?action=nombre', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        topUser.textContent = data.status === 'ok' ? data.nombre : 'Invitado';
      })
      .catch(err => {
        console.error('Error al cargar nombre:', err);
        topUser.textContent = 'Invitado';
      });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = '../controller/UsuarioController.php?action=logout';
    });
  }

  const switchOscuro = document.getElementById('modoOscuroSwitch');
  if (switchOscuro) {
    if (localStorage.getItem('modoOscuro') === 'true') {
      document.body.classList.add('dark-mode');
      switchOscuro.checked = true;
    }

    switchOscuro.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode', switchOscuro.checked);
      localStorage.setItem('modoOscuro', switchOscuro.checked);
    });
  }
}

// ---------------- Inicializar App ----------------
function initApp() {
  console.log('🚀 initApp ejecutándose');
  initSidebar();
  initDarkMode();
  loadTopbar();
}

// ---------------- Observer para inicializar App después de cargar elementos dinámicos ----------------
const observer = new MutationObserver(() => {
  if (document.readyState === 'complete') {
    initApp();
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// ---------------- Aplicar modo oscuro antes de pintar ----------------
if (localStorage.getItem('modoOscuro') === 'true') {
  document.body.classList.add('dark-mode');
}
