import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../clase/usuario';

@Pipe({
  name: 'usuarios'
})
// Filtra usuarios por perfil, o estado. 
export class UsuariosPipe implements PipeTransform {

  constructor(){}

  transform(value: Array<Usuario>, ...args: unknown[]): Array<Usuario> {
   
    let listaUsr: Array<Usuario>;
    let tipo = args[0];

    switch(tipo){
      case 'Todos':
        listaUsr = value;
      break;
      case 'Alumno': case 'Profesor': case 'Administrador':
        listaUsr = value.filter(usr => usr.perfil == tipo);
        break;
      case 'Borrados':
        listaUsr = value.filter(usr => usr.activo == false);
      break;
    }

    return listaUsr;
  }
  
}
