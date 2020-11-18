import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private router: Router) {
    if(this.loginService.currentUserValue){
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.usuario = new Usuario;
    this.returnUrl= this.route.snapshot.queryParams['returnUrl']||'/';
  }

  login() {
    this.loginService.login(this.usuario.password,this.usuario.user)
    .pipe(first())
    .subscribe(data =>{
      this.router.navigate([this.returnUrl]);
      
    }),
    error =>{
      console.log(error.error);
    };
    window.location.reload();
  }
}
