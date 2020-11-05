import { Asignatura } from "./asignatura";
import { DetalleInsumo } from "./detalle-insumo";
import { Persona } from "./persona";

export class Solicitud {
    numero: string;
    fecha: string;
    fechaSolicitud: string;
    estado: string;
    hora: string;
    monitor: string;
    idpersona: string;
    asignatura: Asignatura;
    detalles: DetalleInsumo[];
    persona: Persona;
    cantidadinsumos: number;
    constructor(){
        this.asignatura = new Asignatura;
        this.persona = new Persona;
        this.detalles = [];
    }
}
