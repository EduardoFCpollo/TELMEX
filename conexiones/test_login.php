<?php
// Ajustamos ruta absoluta al controlador
require_once __DIR__ . '/../controller/UsuarioController.php';

// Crear instancia del controlador
$controller = new UsuarioController();

// Datos de prueba
$usuario = "2884567890";    // tu userID real
$password = "1234567890";   // la contraseña que pusiste

// Ejecutamos login
$resultado = $controller->login($usuario, $password);

if ($resultado) {
    echo "✅ Login exitoso:\n";
    print_r($resultado);
} else {
    echo "❌ Usuario o contraseña incorrectos.\n";
}
