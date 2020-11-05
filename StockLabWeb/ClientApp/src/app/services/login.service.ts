import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './../stocklab/models/usuario';
import { HandleHttpErrorService } from './../@base/handle-http-error.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  Url: string;
  usuario: Usuario;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string,
    private handleErrorService: HandleHttpErrorService, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('login')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.Url = baseurl;
  }

  login(password: string, usuario: string) {

    this.usuario = new Usuario;
    if(password == "admin" && usuario == "admin"){
      this.usuario.password = password;
      this.usuario.user = usuario;
      sessionStorage.setItem('login',JSON.stringify(this.usuario));
      this.currentUserSubject.next(this.usuario);
      this.route.navigate(['/Home']);
    }
    else{
      alert("Contraseña incorrecta");
    }
  }
  

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

}
