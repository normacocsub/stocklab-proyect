import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { LoginService } from './../services/login.service';
import { Usuario } from './../stocklab/models/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  usuario: Usuario;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.usuario = new Usuario;
  }

  login() {
    this.loginService.login(this.usuario.password, this.usuario.user);
    if (sessionStorage.getItem('login')) {
      window.location.reload();
    }
  }
}
