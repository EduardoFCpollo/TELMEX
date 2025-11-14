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

// Muestra errores para depurar
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Si se llama con ?accion=listar
if (isset($_GET['accion']) && $_GET['accion'] === 'listar') {
    header('Content-Type: application/json; charset=utf-8');

    $controller = new ClienteController($conn);
    $clientes = $controller->obtenerClientes();

    // Si no hay resultados, devolver arreglo vacío
    if (empty($clientes)) {
        echo json_encode([]);
        $conn->close();
        exit;
    }

    $clientesArray = array_map(function($cliente) {
        $estadoLimpio = ucfirst(strtolower(trim($cliente->estatus ?? 'Desconocido')));

        return [
            'idCliente'  => $cliente->N_Servicio,
            'nombre'     => $cliente->nombre,
            'telefono'   => $cliente->telefono,
            'email'      => $cliente->correo,
            'estado'     => $estadoLimpio,
            'direccion'  => $cliente->direccion,
            'f_contrato' => $cliente->f_contrato
        ];
    }, $clientes);

    echo json_encode($clientesArray, JSON_UNESCAPED_UNICODE);
    $conn->close();
    exit;
}

?>

