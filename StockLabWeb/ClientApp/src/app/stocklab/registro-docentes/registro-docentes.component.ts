import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Persona } from '../models/persona';
import { Asignatura } from '../models/asignatura';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Usuario } from '../models/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/@base/modal/modal.component';
@Component({
  selector: 'app-registro-docentes',
  templateUrl: './registro-docentes.component.html',
  styleUrls: ['./registro-docentes.component.css']
})
export class RegistroDocentesComponent implements OnInit {

  formGroup: FormGroup;
  docente: Persona;
  asignatura: Asignatura;
  asignaturas: Asignatura[];
  stringAsignaturas: string;
  stringasi: string[];
  usuario: Usuario;

  constructor(private formBuilder: FormBuilder, private asignaturaService: AsignaturaService,
    private personService: PersonaService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.llenarasignaturas();
    this.buildForm();
  }

  private buildForm(...args: []) {
    this.docente = new Persona();
    this.usuario = new Usuario();
    this.docente.identificacion = '';
    this.docente.nombre = '';
    this.docente.apellidos = '';
    this.docente.sexo = '';
    this.docente.correo = '';
    this.usuario.password = '';



    this.formGroup = this.formBuilder.group({
      identificacion: [this.docente.identificacion, [Validators.required, Validators.maxLength(13)]],
      nombre: [this.docente.nombre, [Validators.required, Validators.maxLength(25)]],
      apellidos: [this.docente.apellidos, [Validators.required, Validators.maxLength(25)]],
      sexo: [this.docente.sexo, [Validators.required, this.ValidaSexo, Validators.maxLength(11)]],
      edad: [this.docente.edad, [Validators.required, this.ValidaEdad]],
      correo: [this.docente.correo, [Validators.required,Validators.maxLength(30), Validators.pattern("[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}")]],
      asignatura: ["", Validators.required],
      password: [this.usuario.password, [Validators.required, Validators.pattern("(?=.*[-!#$%&/()?¡_])(?=.*[A-Z])(?=.*[a-z]).{8,}")]]
    });
  }

  llenarasignaturas() {
    this.asignaturaService.get().subscribe(result => {
      this.asignaturas = result;
    })
  }

  private ValidaSexo(control: AbstractControl) {
    const sexo = control.value;
    if (sexo.toLocaleUpperCase() !== 'MASCULINO' && sexo.toLocaleUpperCase() !== 'FEMENINO') {
      return { validSexo: true, messageSexo: 'Sexo No Valido' };
    }
    return null;
  }

  private ValidaEdad(control: AbstractControl){
    const edad = control.value;
    if(edad < 0 || edad > 100){
      return {validEdad: true, messageEdad: 'Edad no valida'};
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
    this.agregar();
  }
  agregar() {
    this.mapear();
    if(this.asignatura == null)
    {
      const messageBox = this.modalService.open(ModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.cuerpo = 'Error: Asignatura no valida';
      return;
    }
    this.personService.post(this.docente).subscribe(result => {
      if (result != null) {
        const messageBox = this.modalService.open(ModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Docente creado!!! :-)';
        this.docente = result;
      }
    });
  }


  mapear() {
    this.stringAsignaturas = this.formGroup.value.asignatura;
    this.stringasi = this.stringAsignaturas.split(';');
    this.asignatura = this.asignaturas.find(a => a.codigo == this.stringasi[1]);
    this.usuario.user = this.formGroup.value.correo;
    this.usuario.password = this.formGroup.value.password;
    this.docente = this.formGroup.value;
    this.usuario.nombre = this.docente.nombre;
    this.usuario.nombre = this.formGroup.value.nombre;
    this.usuario.idpersona = this.docente.identificacion;
    this.usuario.estado = "Activo";
    this.usuario.apellidos = this.docente.apellidos;
    this.docente.usuario = this.usuario;
    this.docente.asignatura = this.asignatura;
  }

}