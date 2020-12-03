import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { Pelicula } from 'src/app/clase/pelicula';
import { ActoresService } from 'src/app/servicio/actores.service';
import { PeliculasService } from 'src/app/servicio/peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {

  constructor(private actorServ: ActoresService,
              private peliServ: PeliculasService) { }
  listaActores = Array<Actor>();
  listaPeliculas = Array<Pelicula>();
  actorSeleccionado: Actor;
  peliculaSeleccionada: Pelicula;
  paisSeleccionado: Pais;


  ngOnInit(): void {
    this.peliServ.obtenerPeliculas().subscribe((pelis: Array<Pelicula>) => {
      this.listaPeliculas = pelis;
        console.table(this.listaPeliculas);
    });
  }

  public recibirPelicula(peli: Pelicula) {
    this.peliculaSeleccionada = peli;
    this.paisSeleccionado = null;
    this.actorSeleccionado = null;
  }


  public recibirActor(actor: Actor) {
    this.actorSeleccionado = actor;
  }

  public recibirPais(pais: Pais) {
    this.paisSeleccionado = pais;
    this.listaActores = [];
    

    this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
      this.listaActores = actores;
      this.listaActores = this.listaActores.filter(act => act.activo == true && act.nacionalidad.name == pais.name);
    });


  }
}
