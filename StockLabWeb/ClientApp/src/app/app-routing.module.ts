import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaInsumosComponent } from './stocklab/consulta-insumos/consulta-insumos.component';
import { GestionSolicitudesComponent } from './stocklab/gestion-solicitudes/gestion-solicitudes.component';
import { RegistroInsumosComponent } from './stocklab/registro-insumos/registro-insumos.component';
import { PersonaSolicitudInsumosComponent } from './stocklab/persona-solicitud-insumos/persona-solicitud-insumos.component';
import { HomeComponent } from './home/home.component';
import {RegistroDocentesComponent } from './stocklab/registro-docentes/registro-docentes.component';
import {RegistroAsignaturasComponent } from './stocklab/registro-asignaturas/registro-asignaturas.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import {ConsultaAsignaturasComponent} from './stocklab/consulta-asignaturas/consulta-asignaturas.component';
import { SolicitudIndividualComponent } from './stocklab/solicitud-individual/solicitud-individual.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

import { combineLatest } from 'rxjs';
import { AuthGuard } from './services/guard/auth.guard'; 

const routes : Routes = [
  { path: 'ConsultaInsumos', component: ConsultaInsumosComponent, canActivate: [AuthGuard] },
  { path: 'GestionSolicitudes', component: GestionSolicitudesComponent, canActivate: [AuthGuard] },
  { path: 'RegistroInsumos', component: RegistroInsumosComponent, canActivate: [AuthGuard] },
  { path: 'PersonaSolicitud', component: PersonaSolicitudInsumosComponent, canActivate: [AuthGuard] },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'InicioSesion', component: InicioSesionComponent },
  { path: 'RegistroDocentes', component: RegistroDocentesComponent, canActivate: [AuthGuard] },
  { path: 'RegistroAsignaturas', component: RegistroAsignaturasComponent, canActivate: [AuthGuard] },
  { path: 'ConsultaAsignaturas', component: ConsultaAsignaturasComponent, canActivate: [AuthGuard] },
  { path: 'SolicitudIndividual/:numero', component: SolicitudIndividualComponent, canActivate: [AuthGuard] },
  { path: 'notificaciones', component: NotificacionesComponent, canActivate: [AuthGuard]}

  
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
