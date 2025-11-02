<?php
require_once("conexion.php");

if ($conn->connect_error) {
    die("❌ Error al conectar: " . $conn->connect_error);
} else {
    echo "✅ Conexión exitosa a la base de datos '" . $conn->host_info . "'";
}
?>
