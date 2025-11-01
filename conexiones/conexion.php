<?php
$servername = "localhost";
$username = "root";
$password = "111"; // tu contraseña real
$dbname = "TELMEX";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("❌ Error de conexión: " . $conn->connect_error);
}
?>

