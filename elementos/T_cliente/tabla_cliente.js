async function cargarClientes() {
  try {
    const response = await fetch('../controller/ClienteController.php?accion=listar');
    const data = await response.json();

    const tbody = document.getElementById('tablaClientes');
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay clientes registrados.</td></tr>`;
      return;
    }

    data.forEach(cliente => {
      const estadoBadge =
        cliente.estado === 'Activo'
          ? '<span class="badge bg-success">Activo</span>'
          : '<span class="badge bg-warning text-dark">En riesgo</span>';

      const fila = `
        <tr>
          <td>${cliente.idCliente}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.email}</td>
          <td>${estadoBadge}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#modalEditarCliente" onclick="editarCliente('${cliente.idCliente}')">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-sm btn-danger me-1" onclick="eliminarCliente('${cliente.idCliente}')">
              <i class="bi bi-trash-fill"></i>
            </button>
            <button class="btn btn-sm btn-info text-white" data-bs-toggle="modal" data-bs-target="#modalDetallesCliente" onclick="verCliente('${cliente.idCliente}')">
              <i class="bi bi-file-earmark-text"></i>
            </button>
          </td>
        </tr>`;
      tbody.insertAdjacentHTML('beforeend', fila);
    });
  } catch (error) {
    console.error('Error al cargar clientes:', error);
    document.getElementById('tablaClientes').innerHTML =
      `<tr><td colspan="6" class="text-center text-danger">Error al cargar los datos.</td></tr>`;
  }
}

// Ejecutar función al cargar el archivo
cargarClientes();

// Botones adicionales
const scriptEditar = document.createElement('script');
scriptEditar.src = '../elementos/T_cliente/btn_cliente/editar.js';
document.body.appendChild(scriptEditar);

const scriptEliminar = document.createElement('script');
scriptEliminar.src = '../elementos/T_cliente/btn_cliente/eliminar.js';
document.body.appendChild(scriptEliminar);

const scriptVer = document.createElement('script');
scriptVer.src = '../elementos/T_cliente/btn_cliente/ver.js';
document.body.appendChild(scriptVer);
