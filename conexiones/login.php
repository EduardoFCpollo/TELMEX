<?php
include("conexion.php"); // misma carpeta, así está bien

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $userID = $_POST['userID'];
  $contrasena = $_POST['contrasena'];

  $query = "SELECT * FROM usuarios WHERE userID = '$userID' AND contrasena = '$contrasena'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    echo "OK";
  } else {
    echo "ERROR";
  }
}
?>
