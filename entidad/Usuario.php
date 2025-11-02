<?php
class Usuario {
    public $userID;
    public $nombre;
    public $direccion;
    public $telefono;
    public $rol;
    public $correo;
    public $f_inicio;
    public $contrasena;

    public function __construct($data = []) {
        $this->userID = $data['userID'] ?? null;
        $this->nombre = $data['nombre'] ?? null;
        $this->direccion = $data['direccion'] ?? null;
        $this->telefono = $data['telefono'] ?? null;
        $this->rol = $data['rol'] ?? 'AGENTE';
        $this->correo = $data['correo'] ?? null;
        $this->f_inicio = $data['f_inicio'] ?? null;
        $this->contrasena = $data['contrasena'] ?? null;
    }
}
