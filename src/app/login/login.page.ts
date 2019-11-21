import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario;
  pathimg = '../src/assets/shapes.svg';
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      console.log('estoy logueado ');
      this.route.navigate(['/']);
      //swal.fire('Informacion',  `ya esta logueado `, 'info');
    }
    this.usuario= new Usuario();
  }
  onLogin(){
  console.log( this.usuario );
  if (this.usuario.email === '' || this.usuario.psw === '') {
   // swal.fire('Error login', 'email o password vacias ', 'error');
  } else {
  this.authService.login(this.usuario).subscribe(response => {
    console.log(response);
    this.authService.guardarUsuario(response.access_token);
    this.authService.guardarToken(response.access_token);
    let usuario = this.authService.getusuario();
    this.route.navigate(['../tabs/tab1']);
  //  swal.fire('Login', `Hola ${usuario.username} , ya estas logueado`, 'success');
  }, err => {
     if (err.status === 400) {
    //  swal.fire('Error Login', 'email o contraeña incorrecta', 'error');
     }
  });
}
  }
}
