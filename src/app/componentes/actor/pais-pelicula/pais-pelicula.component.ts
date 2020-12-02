import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { Pelicula } from 'src/app/clase/pelicula';
import { ActoresService } from 'src/app/servicio/actores.service';
import { PaisesService } from 'src/app/servicio/paises.service';
import { PeliculasService } from 'src/app/servicio/peliculas.service';

@Component({
  selector: 'app-pais-pelicula',
  templateUrl: './pais-pelicula.component.html',
  styleUrls: ['./pais-pelicula.component.scss']
})
export class PaisPeliculaComponent implements OnInit {

  constructor(private peliServ: PeliculasService,
              private actorServ: ActoresService,
              private paisServ: PaisesService)
               { }

  paisSeleccionado: Pais;
  listaPeliculas = Array<Pelicula>();
  listaActores = Array<Actor>();
  listaPaises = Array<Pais>();

  ngOnInit(): void {
    this.paisServ.leerPaises().subscribe((paises: Array<Pais>)=>{
      this.listaPaises = paises;
    })
  }

  public recibirPais(pais: Pais) {
    this.listaPeliculas = [];
    this.listaActores = [];
    this.paisSeleccionado =  pais;

    this.peliServ.obtenerPeliculasPorPais(pais).subscribe((pelis: Array<Pelicula>) => {
      this.listaPeliculas = pelis;
        console.table(this.listaPeliculas);
    });

    this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
      this.listaActores = actores;
      this.listaActores = this.listaActores.filter(act => act.activo == true && act.nacionalidad.name == pais.name);
    });


  }


}
