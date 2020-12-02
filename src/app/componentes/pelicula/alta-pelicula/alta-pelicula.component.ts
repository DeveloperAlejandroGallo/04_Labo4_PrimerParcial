import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { ActoresService } from 'src/app/servicio/actores.service';
import { PaisesService } from 'src/app/servicio/paises.service';

@Component({
  selector: 'app-alta-pelicula',
  templateUrl: './alta-pelicula.component.html',
  styleUrls: ['./alta-pelicula.component.scss']
})
export class AltaPeliculaComponent implements OnInit {

  constructor(private actorServ: ActoresService,
              private paisServ: PaisesService) { }

  // @Output() listaActorOutput: EventEmitter<Array<Actor>> = new EventEmitter<Array<Actor>>() ;
  // @Output() paisOutput: EventEmitter<Pais> = new EventEmitter<Pais>();

  listaActoresSeleccionados: Array<Actor> = new Array<Actor>();
  listaActores = Array<Actor>();
  listaPaises = Array<Pais>();
  pais: Pais;

  ngOnInit(): void {
    this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
      this.listaActores = actores;
      this.listaActores = this.listaActores.filter(act => act.activo == true);

    });

    this.paisServ.leerPaises().subscribe((paises: Array<Pais>)=>{
      this.listaPaises = paises;
    });

  }


  public recibirActor(actor: Actor) {
    console.log('recibiendo actor'+actor.nombre);
    var encontrado = false;
    for(let i=0; i < this.listaActoresSeleccionados.length;i++) {
      if(this.listaActoresSeleccionados[i].id == actor.id) {
        encontrado = true;
        break;
      }
    }
    if(!encontrado) {
      console.log(this.listaActoresSeleccionados);
      this.listaActoresSeleccionados.push(actor);
    }
  }

  public recibirPais(pais: Pais) {
    this.pais = pais;
  }

  public recibirLimpieza(limpiar: boolean) {
    if(limpiar) {
      this.listaActoresSeleccionados = [];
    }
  }

}
