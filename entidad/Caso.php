<?php
class Caso {
    public $folio;
    public $motivo;
    public $descripcion;
    public $estado;
    public $reincidente;
    public $f_apertura;
    public $f_cierre;
    public $idcliente;
    public $iduser;

    public function __construct($data = []) {
        $this->folio = $data['folio'] ?? null;
        $this->motivo = $data['motivo'] ?? null;
        $this->descripcion = $data['descripcion'] ?? null;
        $this->estado = $data['estado'] ?? 'ABIERTO';
        $this->reincidente = $data['reincidente'] ?? 'NO';
        $this->f_apertura = $data['f_apertura'] ?? null;
        $this->f_cierre = $data['f_cierre'] ?? null;
        $this->idcliente = $data['idcliente'] ?? null;
        $this->iduser = $data['iduser'] ?? null;
    }
}
