import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarFirebaseService } from 'src/app/servicio/autenticar-firebase.service';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private usuarioService: UsuariosService,
              private autenticador: AutenticarFirebaseService) { }

  ngOnInit(): void {
  }

  msg: string;
  email: string;
  pass: string;

  public save(event): void
  {
    this.btnLogin();
  }

  public btnLogin(): void
  {
    // this.email = (document.getElementById('txtUsuario') as HTMLInputElement).value;
    // this.pass = (document.getElementById('txtpass') as HTMLInputElement).value;

    // console.log(this.email );
    // console.log(this.pass );

    if (this.pass !== '' && this.pass !== undefined) {
      this.autenticador
        .iniciarSesion(this.email, this.pass)
        .then((resp) => {
          this.autenticador.estaLogueado = true;
          this.usuarioService.getUsersByEmail(this.email).subscribe(resp => {
            this.autenticador.usuarioActual = resp
            // console.log('usr en servicio: '+ this.autenticador.usuarioActual.email);
            // console.log('usr en servicio: '+ this.autenticador.usuarioActual.foto);
          });
          // Swal.fire({
          //   title: 'Éxito',
          //   text: 'Bienvenid@ ' + this.email,
          //   icon: 'success'
          // });
          this.router.navigate(['/home'])
        })
        .catch((error) => {
          console.log(error.code);
          this.autenticador.estaLogueado = false;
          switch (error.code) {
            case 'auth/invalid-email':
              this.msg = 'Correo con formato incorrecto';
              break;
            case 'auth/wrong-password':
              this.msg = 'Clave incorrecta';
              break;
            case 'auth/user-not-found':
              this.msg = 'El usuario no existe.';
              // this.register();
              break;
            default:
              this.msg = error.message;
          }
          Swal.fire({
            title: 'Error',
            text: this.msg,
            icon: 'error'
          });

        });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese una clave',
        icon: 'warning'
      });
    }
  }



  public loguearUsuario(usr: string) {

    switch(usr) {
      case 'alumno':
        this.email = 'alumno@alumno.com';
        break;
      case 'profesor':
        this.email = 'profesor@profesor.com';
        break;
      case 'admin':
        this.email = 'admin@admin.com';
        break;
      case 'alumno2':
        this.email = 'ale@gallo.com';
        break;
      case 'profesor2':
        this.email = 'profe2@profe.com';
        break;
      case 'admin2':
        this.email = 'admin2@admin.com';
        break;
      }
      this.pass = '123456';

  }


  public registrarse() {
    this.router.navigate(['/registro']);
  }
}





