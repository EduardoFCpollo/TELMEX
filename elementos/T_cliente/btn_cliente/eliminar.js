async function eliminarCliente(id) {
  if (!confirm(`¿Seguro que quieres eliminar al cliente ${id}?`)) return;

  const response = await fetch(`../controller/ClienteController.php?accion=eliminar&id=${id}`);
  const data = await response.json();

  if (data.success) {
    alert("Cliente eliminado correctamente");
    cargarClientes();
  } else {
    alert("Error al eliminar el cliente");
  }
}
