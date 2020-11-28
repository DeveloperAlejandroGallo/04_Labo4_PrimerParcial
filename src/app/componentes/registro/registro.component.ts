import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";
import { StorageFirebaseService } from 'src/app/servicio/storage-firebase.service';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { AutenticarFirebaseService } from 'src/app/servicio/autenticar-firebase.service';
import { Usuario } from 'src/app/clase/usuario';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router,
    private fireAuth: AutenticarFirebaseService,
    private fireStorage: StorageFirebaseService,
    private userService: UsuariosService) { }

  public usuario: Usuario;
  public msg: string;
  public publicURL;
  public usrActivo;
  public adminActivo;

  public myRecaptcha: boolean = false;

  public email: string;
  public clave: string;
  public nombre: string;
  public apellido: string;
  public imagen: string;
  public perfil: string; // Profesional - Paciente - Administrador
  public activo: boolean;



  ngOnInit(): void {
    // this.user = new User();
    console.log('Ingreso a registry');
    // this.image1 = '../../../assets/images/icons/avatar_female1.png';
    // this.image2 = '../../../assets/images/icons/avatar_male1.png';

    // this.perfil = "Alumno";

    // this.fireAuth.currentUser().then(resp => {

    //   this.usrActivo = resp;

    //   this.userService.getUsersByEmail(this.usrActivo.email).subscribe(res => {
    //     if (res.perfil == "Administrador")
    //       this.adminActivo = true;
    //   });
    // }).catch(err => { console.log('Error al obtener current user: ' + err) });


  }

  // // reCaptcha
  // onScriptLoad() {
  //   console.log("Load captcha");
  // }

  // onScriptError() {
  //   console.log("Error captcha");
  // }

  // resolved(captchaResponse: string, res) {
  //   console.log(`Resolved response token: ${captchaResponse}`);
  // }




  public registrar() {
    // this.fireAuth.register(this.user);

    if (this.incompleteFields())
      return;

    this.fireAuth.registrarCuenta(this.email, this.clave).then(res => {
      console.log(res);
      res.user.sendEmailVerification({
        handleCodeInApp: true,
        url: environment.urlVerify
      })
      Swal.fire({
        title: 'Éxito',
        text: 'Registro exitoso. Bienvenid@ ' + this.nombre,
        icon: 'success'
      });
    }).catch(error => {
      console.log(error);
      switch (error.code) {
        case 'auth/weak-password':
          this.msg = 'La clave debe poseer al menos 6 caracteres';
          break;
        case 'auth/email-already-in-use':
          this.msg = 'Correo ya registrado';
          break;
        case 'auth/invalid-email':
          this.msg = 'Correo con formato inv\u00E1lido';
          break;
        case 'auth/argument-error':
          if (error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')
            this.msg = 'Correo con debe ser una cadena v\u00E1lida';
          else
            this.msg = 'La constrase\u00F1a debe ser una cadena v\u00E1lida';
          break;
        case 'auth/argument-error':
          this.msg = 'Correo con debe ser una cadena v\u00E1lida';
          break;
        default:
          this.msg = 'Error en registro';
      }
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: 'error'
      });
      return;
    });

    let refImg;

    let userMetaData = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      perfil: this.perfil
    };

    this.fireStorage.uploadFile(this.email , this.imagen, userMetaData).then(resp => {
      refImg = this.fireStorage.linkToPublicFile(this.email);
      console.log("refImg1" + refImg);
      refImg.getDownloadURL().subscribe((URL) => {
        console.log("link publico : " + URL);
        this.publicURL = URL;

          this.usuario = new Usuario(this.nombre, this.apellido, this.email, this.clave,this.perfil, this.publicURL, true);

          this.userService.createUser(this.usuario).subscribe((res: any) => {
            console.log('User Registered - Type: ' + this.perfil)
            this.CleanFields();
          });
      });
    }).catch(error => { console.log("Error al subir foto" + error) });

  }

  private CleanFields() {
    this.usuario= null;
    
    this.publicURL = '';

    this.email= '';
    this.clave = '';
    this.nombre = '';
    this.imagen = '';
    this.apellido='';
    this.perfil=''; // Profesor - Alumno - Administrador

    this.msg = '';
  }

  private incompleteFields() {

    if (this.perfil == ('' || undefined)) {
      this.msg = 'Debe seleccionar un tipo de usuario.'
      return true;
    }
    if (this.nombre == ('' || undefined)) {
      this.msg = 'Por favor ingrese su nombre completo.'
      return true;
    }
    if (this.email == ('' || undefined)) {
      this.msg = 'Porf favor ingrese un correo v\u00E1lido.'
      return true;
    }
    if (this.clave == ('' || undefined) || this.clave.length < 6) {
      this.msg = 'Debe ingresar una clave de 6 digitos.'
      return true;
    }
    if (this.imagen == ('' || undefined)) {
      this.msg = 'Debe ingresar una imagen';
    }

    return false;
  }

  public volver() {
    this.router.navigate(['/login']);
  }

  public assignImg(src: string) {
    console.log('img cliequeada ' + src)

  }

  public imgUpload(img) {
    this.imagen = img;
  }

}
