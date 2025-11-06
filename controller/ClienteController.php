<?php
require_once __DIR__ . '/../conexiones/conexion.php';
require_once __DIR__ . '/../entidad/Cliente.php';

class ClienteController {
    private $conn;

    public function __construct($conexion) {
        $this->conn = $conexion;
    }

    public function obtenerClientes() {
        $clientes = [];
        $sql = "SELECT N_Servicio, nombre, telefono, direccion, estatus, correo, f_contrato FROM cliente";
        $result = $this->conn->query($sql);

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $clientes[] = new Cliente($row);
            }
        }

        return $clientes;
    }
}

// Si se accede directamente desde fetch o navegador
if (basename(__FILE__) == basename($_SERVER['SCRIPT_FILENAME'])) {
    header('Content-Type: application/json; charset=utf-8');

    $controller = new ClienteController($conn);
    $clientes = $controller->obtenerClientes();

    echo json_encode($clientes, JSON_UNESCAPED_UNICODE);
    $conn->close();
}
?>
