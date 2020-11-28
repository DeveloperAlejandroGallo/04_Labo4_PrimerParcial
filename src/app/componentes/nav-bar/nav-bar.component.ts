import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clase/usuario';
import { AutenticarFirebaseService } from 'src/app/servicio/autenticar-firebase.service';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() usrActivoOutput: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  usuarioActivo;
  usuario: Usuario;

  constructor(private router:Router,
              public authService:AutenticarFirebaseService,
              private usuarioService: UsuariosService) {
  }
  
  ngOnInit(): void {
    this.authService.currentUser().then(resp=>{
      this.usuarioActivo=resp;
      console.log('usuarioActivo ' + this.usuarioActivo.email);
    
      this.usuarioService.getUsersByEmail(this.usuarioActivo.email).subscribe(ret => {
        this.usuario = ret;
        console.log('Usr: ');
        console.table(this.usuario);
        this.usrActivoOutput.emit(this.usuario);
      });
  
    });
  }

  cerrarSesion(){
    this.authService.cerrarSesion().then( resp =>{
      this.usuarioActivo=null;
      this.authService.estaLogueado = false;
      this.router.navigate(['/login']);
    });
  }



  
}
