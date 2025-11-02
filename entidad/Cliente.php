<?php
class Cliente {
    public $N_Servicio;
    public $nombre;
    public $telefono;
    public $direccion;
    public $estatus;
    public $correo;
    public $f_contrato;

    public function __construct($data = []) {
        $this->N_Servicio = $data['N_Servicio'] ?? null;
        $this->nombre = $data['nombre'] ?? null;
        $this->telefono = $data['telefono'] ?? null;
        $this->direccion = $data['direccion'] ?? null;
        $this->estatus = $data['estatus'] ?? 'activo';
        $this->correo = $data['correo'] ?? null;
        $this->f_contrato = $data['f_contrato'] ?? null;
    }

    public function getInfo() {
        return "{$this->nombre} ({$this->N_Servicio})";
    }
}
