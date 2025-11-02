<?php
// NO session_start() aquí
require_once __DIR__ . '/../entidad/Usuario.php';

class UsuarioController {

    public static function login($userID, $contrasena, $conn) {
        $userID = trim($conn->real_escape_string($userID));
        $contrasena = trim($conn->real_escape_string($contrasena));

        $query = "SELECT * FROM usuarios WHERE TRIM(userID) = '$userID' LIMIT 1";
        $result = $conn->query($query);

        if (!$result) {
            die("Error SQL: " . $conn->error);
        }

        if ($result->num_rows === 0) {
            return false;
        }

        $usuario = $result->fetch_assoc();

        if (trim($usuario['contrasena']) !== $contrasena) {
            return false;
        }

        // Guardar en sesión
        $_SESSION['userID'] = trim($usuario['userID']);
        $_SESSION['nombre'] = $usuario['nombre'];
        $_SESSION['rol'] = $usuario['rol'];

        return true;
    }

    public static function getNombre() {
        return $_SESSION['nombre'] ?? 'Invitado';
    }

    public static function logout() {
        session_unset();
        session_destroy();
    }
}
