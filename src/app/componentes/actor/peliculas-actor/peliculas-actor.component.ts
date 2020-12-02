import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { Pelicula } from 'src/app/clase/pelicula';
import { ActoresService } from 'src/app/servicio/actores.service';
import { PeliculasService } from 'src/app/servicio/peliculas.service';

@Component({
  selector: 'app-peliculas-actor',
  templateUrl: './peliculas-actor.component.html',
  styleUrls: ['./peliculas-actor.component.scss']
})
export class PeliculasActorComponent implements OnInit {

  constructor(private peliServ: PeliculasService,
    private actorServ: ActoresService) { }


  listaPeliculas: Array<Pelicula> = new Array<Pelicula>();
  listaPeliculasAux: Array<Pelicula> = new Array<Pelicula>();
  listaActores = Array<Actor>();

  actorSeleccionado: Actor;
  paisSeleccionado: Pais;


  ngOnInit(): void {
    this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
      this.listaActores = actores;
      this.listaActores = this.listaActores.filter(act => act.activo == true);

    });
  }


  public recibirActor(actor: Actor) {
    this.actorSeleccionado = actor;
    this.paisSeleccionado = actor.nacionalidad;
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
    });
  }

}
