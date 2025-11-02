<?php
class Interaccion {
    public $interaccionID;
    public $idCliente;
    public $idUsuario;
    public $idCaso;
    public $fecha;
    public $motivo;
    public $observaciones;
    public $tipo;

    public function __construct($data = []) {
        $this->interaccionID = $data['interaccionID'] ?? null;
        $this->idCliente = $data['idCliente'] ?? null;
        $this->idUsuario = $data['idUsuario'] ?? null;
        $this->idCaso = $data['idCaso'] ?? null;
        $this->fecha = $data['fecha'] ?? null;
        $this->motivo = $data['motivo'] ?? null;
        $this->observaciones = $data['observaciones'] ?? null;
        $this->tipo = $data['tipo'] ?? 'VISITA';
    }
}
