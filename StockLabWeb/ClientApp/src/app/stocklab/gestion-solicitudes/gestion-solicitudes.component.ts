import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/@base/modal/modal.component';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Asignatura } from '../models/asignatura';
import { DetalleInsumo } from '../models/detalle-insumo';
import { Insumo } from '../models/insumo';
import { Persona } from '../models/persona';
import { Solicitud } from '../models/solicitud';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrls: ['./gestion-solicitudes.component.css']
})
export class GestionSolicitudesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private personaService: PersonaService,
    private modalService: NgbModal, private asignaturaService: AsignaturaService,
    private insumoService: InsumoService, private solicitudService: SolicitudService) { }
  solicitud: Solicitud;
  formGroup: FormGroup;
  persona: Persona;
  asignatura: Asignatura;
  asignaturas: Asignatura[];
  stringAsignaturas: string;
  stringasi: string[];
  detalle: DetalleInsumo;
  detalles: DetalleInsumo[];

  insumo: Insumo;
  insumos: Insumo[];
  stringInsumo: string;
  arrayinsumo: string[];

  ngOnInit(): void {
    this.llenarasignaturas();
    this.llenarinsumos();
    this.detalles = [];
    this.buildForm();
  }

  private buildForm(...args: []) {
    this.solicitud = new Solicitud();
    this.persona = new Persona();
    this.detalle = new DetalleInsumo();
    this.solicitud.fecha = new Date(Date.now()).toDateString();
    this.persona.identificacion = '';
    this.persona.nombre = '';
    this.persona.apellidos = '';
    this.solicitud.hora = '';
    this.solicitud.monitor = '';
    this.detalle.cantidad = 0;
    this.solicitud.detalles = [];



    this.formGroup = this.formBuilder.group({
      identificacion: [this.persona.identificacion, [Validators.required, Validators.maxLength(13)]],
      fecha: [this.solicitud.fecha, [Validators.required, this.validafecha]],
      hora: [this.solicitud.hora, [Validators.required, Validators.maxLength(20)]],
      asignatura: ["", [Validators.required]],
      monitor: [this.solicitud.monitor, [Validators.required]],
      detalle: ["", [Validators.required]],
      cantidad: [this.detalle.cantidad, [Validators.required, this.validCantidad]]
    });
  }

  llenarasignaturas() {
    this.asignaturaService.get().subscribe(result => {
      this.asignaturas = result;
    })
  }

  llenarinsumos() {
    this.insumoService.get().subscribe(result => {
      this.insumos = result;
    })
  }

  agregardetalle() {
    if (this.formGroup.value.detalle == '' || this.formGroup.value.cantidad == '') {
      const messageBox = this.modalService.open(ModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.cuerpo = 'Error al añadir detalle';
    }
    else {
      var fecha = new Date();
      this.detalle.cantidad = this.formGroup.value.cantidad;
      this.stringInsumo = this.formGroup.value.detalle;
      this.arrayinsumo = this.stringInsumo.split(';');
      this.insumo = this.insumos.find(I => I.item == this.arrayinsumo[1]);
      if(this.detalle.cantidad > this.insumo.cantidad){
        const messageBox = this.modalService.open(ModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Error: la cantidad es mayor a la disponible ';
      }
      else{
        this.detalle.codigoinsumo = this.insumo.item;
      this.detalle.insumo = this.insumo;
      this.detalle.fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
      this.detalle.numeroDetalle = (this.detalles.length + 1).toString();
      var detallerespuesta = this.detalles.find(d => d.insumo.item == this.insumo.item);
      if (detallerespuesta != null) {
        var numero = this.detalles.findIndex(d => d.insumo.item == this.insumo.item)
        this.detalles[numero].cantidad += this.detalle.cantidad;
        this.detalles[numero].fecha = this.detalle.fecha;
      }
      else {
        this.detalles.push(this.detalle);
        this.solicitud.detalles = this.detalles;
        this.detalle = new DetalleInsumo;
        //this.option = true;
      }
      const messageBox = this.modalService.open(ModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.cuerpo = 'Se ha añadido el insumo';
      }
    }
  }

  private validCantidad(control: AbstractControl){
    const cantidad = control.value;
    if(cantidad <= 0){
      return { validCantidad: true, messageCantidad: 'La cantidad no puede ser menor o igual a 0'};
    }
  }
  private validafecha(control: AbstractControl) {
    const fecha = control.value;

    var fechactual = new Date(Date.now());
    var fecha2 = new Date(fecha);
    var day_as_milliseconds = 86400000;
    var diff_in_millisenconds = fecha2.getTime() - fechactual.getTime();
    var dias = (Math.round(diff_in_millisenconds / (1000 * 60 * 60 * 24))) + 1;
    if (fecha2 < fechactual) {
      return { validadFecha: true, messageFecha: 'Fecha No Valida' };
    }
    if (dias < 8) {
      return { validadFecha: true, messageFecha: 'Dias menores a 8' };
    }
    return null;
  }

  get control() {
    return this.formGroup.controls;
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.detalles.length == 0) {
      const messageBox = this.modalService.open(ModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.cuerpo = 'Error: No ha agregado ningun detalle';
    }
    if(this.persona == null){
      const messageBox = this.modalService.open(ModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.cuerpo = 'Error: No ha agregado una persona a la solicitud';
    }
    this.agregar();
  }

  

  buscarpersona() {
    var id = this.formGroup.value.identificacion;
    this.personaService.get(id).subscribe(result => {
      if (result != null) {
        this.persona = result;
        const messageBox = this.modalService.open(ModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Se ha añadido a la solicitud a ' + this.persona.nombre;
      }
      else {
        this.persona = undefined;
      }
    })
  }
  agregar() {
    this.mapear();
    this.solicitudService.post(this.solicitud).subscribe(result => {
      if (result != null) {
        const messageBox = this.modalService.open(ModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Se ha creado la solicitud';
        this.solicitud = result;
      }
    })
  }

  mapear() {
    this.stringAsignaturas = this.formGroup.value.asignatura;
    this.stringasi = this.stringAsignaturas.split(';');
    this.asignatura = this.asignaturas.find(a => a.codigo == this.stringasi[1]);
    this.solicitud = this.formGroup.value;
    this.solicitud.estado = "Activo";
    this.solicitud.detalles = this.detalles;
    this.solicitud.asignatura = this.asignatura;
    this.solicitud.idpersona = this.persona.identificacion;
  }

}
