import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';

@Component({
  selector: 'app-alta-pelicula',
  templateUrl: './alta-pelicula.component.html',
  styleUrls: ['./alta-pelicula.component.scss']
})
export class AltaPeliculaComponent implements OnInit {

  constructor() { }

  // @Output() listaActorOutput: EventEmitter<Array<Actor>> = new EventEmitter<Array<Actor>>() ;
  // @Output() paisOutput: EventEmitter<Pais> = new EventEmitter<Pais>();

  listaActores: Array<Actor> = new Array<Actor>();
  pais: Pais;

  ngOnInit(): void {
  }


  public recibirActor(actor: Actor) {
    console.log('recibiendo actor'+actor.nombre);
    var encontrado = false;
    for(let i=0; i < this.listaActores.length;i++) {
      if(this.listaActores[i].id == actor.id) {
        encontrado = true;
        break;
      }
    }
    if(!encontrado) {
      console.log(this.listaActores);
      this.listaActores.push(actor);
    }
  }

  public recibirPais(pais: Pais) {
    this.pais = pais;
  }

  public recibirLimpieza(limpiar: boolean) {
    if(limpiar) {
      this.listaActores = [];
    }
  }

}
