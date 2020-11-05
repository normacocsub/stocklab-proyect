import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Solicitud } from '../stocklab/models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService
  ) { this.baseUrl = baseUrl; }

  post(solicitud: Solicitud): Observable<Solicitud> {

    return this.http.post<Solicitud>(this.baseUrl + 'api/Solicitud', solicitud).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Solicitud>('Registrar Solicitud', null))
    );
  }

  gets(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.baseUrl + 'api/Solicitud').pipe(
      tap(_ => this.handleErrorService.log('Datos')),
      catchError(this.handleErrorService.handleError<Solicitud[]>('Consulta Asignaturas', null))
    );
  }

  get(numero: string): Observable<Solicitud> {
    return this.http.get<Solicitud>(this.baseUrl + 'api/Solicitud/' + numero).pipe(
      tap(_ => this.handleErrorService.log('Datos')),
      catchError(this.handleErrorService.handleError<Solicitud>('Consulta Solicitud', null))
    );
  }
}
