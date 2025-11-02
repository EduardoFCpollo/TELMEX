<?php
class Alerta {
    public $alertID;
    public $tipo;
    public $mensaje;
    public $prioridad;
    public $estado;
    public $f_creacion;
    public $idcliente;
    public $idcaso;

    public function __construct($data = []) {
        $this->alertID = $data['alertID'] ?? null;
        $this->tipo = $data['tipo'] ?? null;
        $this->mensaje = $data['mensaje'] ?? null;
        $this->prioridad = $data['prioridad'] ?? 'baja';
        $this->estado = $data['estado'] ?? 'nuevo';
        $this->f_creacion = $data['f_creacion'] ?? null;
        $this->idcliente = $data['idcliente'] ?? null;
        $this->idcaso = $data['idcaso'] ?? null;
    }
}
