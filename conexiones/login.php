<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

session_start(); // ✅ Solo aquí
require_once __DIR__ . '/../controller/UsuarioController.php';
require_once __DIR__ . '/conexion.php';

$userID = $_POST['userID'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

$ok = UsuarioController::login($userID, $contrasena, $conn);

if ($ok) {
    echo json_encode(['status' => 'OK']);
} else {
    echo json_encode(['status' => 'ERROR']);
}
