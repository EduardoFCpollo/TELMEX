async function cargarClientes() {
  try {
    const response = await fetch('../controller/ClienteController.php?accion=listar');

    // Verificamos si la respuesta del servidor está vacía o con error
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const text = await response.text(); // Leemos primero como texto
    if (!text.trim()) {
      throw new Error("Respuesta vacía del servidor");
    }

    const data = JSON.parse(text); // Convertimos manualmente a JSON

    const tbody = document.getElementById('tablaClientes');
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-muted">No hay clientes registrados.</td>
        </tr>`;
      return;
    }

    data.forEach(cliente => {
      console.log('Estado recibido:', cliente.estado);

      let estadoBadge = '';
      // 🔹 Normalizar el texto del estado (quitar acentos, espacios y pasar a minúsculas)
      const estadoNormalizado = (cliente.estado || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();

      if (estadoNormalizado === 'activo') {
        estadoBadge = '<span class="badge bg-success">Activo</span>';
      } else if (estadoNormalizado === 'suspendido') {
        estadoBadge = '<span class="badge bg-warning text-dark">Suspendido</span>';
      } else if (estadoNormalizado === 'cancelado') {
        estadoBadge = '<span class="badge bg-danger">Cancelado</span>';
      } else {
        estadoBadge = `<span class="badge bg-secondary">${cliente.estado || 'Desconocido'}</span>`;
      }

      const fila = `
        <tr>
          <td>${cliente.idCliente}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.email || '-'}</td>
          <td>${estadoBadge}</td>
          <td class="text-nowrap text-center">
            <button class="btn btn-sm btn-outline-info me-1" title="Ver detalles"
                    data-bs-toggle="modal" data-bs-target="#modalDetallesCliente"
                    onclick="verCliente('${cliente.idCliente}')">
              <i class="bi bi-eye"></i>
            </button>

            <button class="btn btn-sm btn-outline-primary me-1" title="Editar"
                    data-bs-toggle="modal" data-bs-target="#modalEditarCliente"
                    onclick="editarCliente('${cliente.idCliente}')">
              <i class="bi bi-pencil"></i>
            </button>

            <button class="btn btn-sm btn-outline-danger" title="Eliminar"
                    onclick="eliminarCliente('${cliente.idCliente}')">
              <i class="bi bi-trash"></i>
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

// Ejecutar al cargar
cargarClientes();

// Cargar scripts específicos
['editar', 'eliminar', 'ver'].forEach(action => {
  const script = document.createElement('script');
  script.src = `../elementos/T_cliente/btn_cliente/${action}.js`;
  document.body.appendChild(script);
});
