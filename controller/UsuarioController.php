<?php
session_start(); // Siempre al inicio

require_once("../entidades/Usuario.php");

class UsuarioController {

    /**
     * Devuelve el nombre del usuario actual en sesión
     * Si no hay usuario, devuelve 'Invitado'
     */
    public static function getNombre() {
        if(isset($_SESSION['userID'])) {
            return $_SESSION['nombre'] ?? 'Invitado';
        }
        return 'Invitado';
    }

    /**
     * Cierra la sesión actual
     */
    public static function logout() {
        // Limpiar todas las variables de sesión
        $_SESSION = [];

        // Destruir la sesión
        if(session_status() === PHP_SESSION_ACTIVE){
            session_destroy();
        }
    }

    /**
     * Inicia sesión con un usuario (simulado para ejemplo)
     * $usuarioData: array con los datos del usuario
     */
    public static function login($usuarioData) {
        if(!empty($usuarioData) && isset($usuarioData['userID'])) {
            $_SESSION['userID'] = $usuarioData['userID'];
            $_SESSION['nombre'] = $usuarioData['nombre'] ?? 'Invitado';
            $_SESSION['rol'] = $usuarioData['rol'] ?? 'AGENTE';
            return true;
        }
        return false;
    }

    /**
     * Devuelve el usuario completo en sesión como objeto Usuario
     */
    public static function getUsuario() {
        if(isset($_SESSION['userID'])) {
            return new Usuario([
                'userID' => $_SESSION['userID'],
                'nombre' => $_SESSION['nombre'] ?? 'Invitado',
                'rol' => $_SESSION['rol'] ?? 'AGENTE'
            ]);
        }
        return null;
    }
}
