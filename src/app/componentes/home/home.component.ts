import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clase/usuario';
import { AutenticarFirebaseService } from 'src/app/servicio/autenticar-firebase.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private autentica: AutenticarFirebaseService) { }

  usuario: Usuario = null;

  ngOnInit(): void {
  }

  public recibirUsuario(usr: Usuario) {
    // console.log('ingreso s recibir usr');
    this.usuario = usr;
  }

}
