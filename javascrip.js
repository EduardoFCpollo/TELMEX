// Sidebar link active state
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // evita que el link haga scroll al # o recargue
    // Remover clase active de todos
    sidebarLinks.forEach(l => l.classList.remove('active'));
    // Agregar active al link clickeado
    link.classList.add('active');
  });
});

// --------------------- Cerrar Sesión ---------------------
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirige al login
});
