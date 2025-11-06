function verCliente(id) {
  console.log("Ver detalles del cliente:", id);
  // Aquí podrías abrir un modal con la info
  const modal = new bootstrap.Modal(document.getElementById('modalDetallesCliente'));
  modal.show();
}
