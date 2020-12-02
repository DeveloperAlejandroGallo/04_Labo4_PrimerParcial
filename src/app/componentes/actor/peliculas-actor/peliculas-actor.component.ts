import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pelicula } from 'src/app/clase/pelicula';
import { PeliculasService } from 'src/app/servicio/peliculas.service';

@Component({
  selector: 'app-peliculas-actor',
  templateUrl: './peliculas-actor.component.html',
  styleUrls: ['./peliculas-actor.component.scss']
})
export class PeliculasActorComponent implements OnInit {

  constructor(private peliServ: PeliculasService) { }
  
  @Output() listaPeliculasOutput: EventEmitter<Array<Pelicula>> = new EventEmitter<Array<Pelicula>>();
  
  listaPeliculas: Array<Pelicula> = new Array<Pelicula>();
  listaPeliculasAux: Array<Pelicula> = new Array<Pelicula>();


  actorSeleccionado: Actor;


  ngOnInit(): void {
  }


  public recibirActor(actor: Actor) {
    this.actorSeleccionado = actor;
    this.listaPeliculas = [];
    
    this.peliServ.obtenerPeliculas().subscribe((pelis: Array<Pelicula>) => {
      this.listaPeliculasAux = pelis;
      if (actor != (null && undefined)) {
        for (let i = 0; i < this.listaPeliculasAux.length; i++) {
          for (let j = 0; j < this.listaPeliculasAux[i].actores.length; j++) {
            if (this.listaPeliculasAux[i].actores[j].id == actor.id) {

              this.listaPeliculas.push(this.listaPeliculasAux[i]);
            }
          }
        }
        console.table(this.listaPeliculas);
      }
      this.listaPeliculasOutput.emit(this.listaPeliculas);
    });
  }

}
