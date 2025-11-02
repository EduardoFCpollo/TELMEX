<?php
class Regla {
    public $id_regla;
    public $nombre_regla;
    public $descripcion;
    public $puntos;
    public $nivel_riesgo;
    public $activo;

    public function __construct($data = []) {
        $this->id_regla = $data['id_regla'] ?? null;
        $this->nombre_regla = $data['nombre_regla'] ?? null;
        $this->descripcion = $data['descripcion'] ?? null;
        $this->puntos = $data['puntos'] ?? 0;
        $this->nivel_riesgo = $data['nivel_riesgo'] ?? 'BAJO';
        $this->activo = $data['activo'] ?? true;
    }
}
