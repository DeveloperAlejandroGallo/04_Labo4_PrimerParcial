import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { Pelicula } from 'src/app/clase/pelicula';
import { PeliculasService } from 'src/app/servicio/peliculas.service';


@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.scss']
})
export class TablaPeliculaComponent implements OnInit {

  constructor() { }


  @Input() listaPeliculasInput: Array<Pelicula> = new Array<Pelicula>();
  @Output() peliSeleccionadaOutput: EventEmitter<Pelicula> = new EventEmitter<Pelicula>(); 



  ngOnInit(): void {

    

  }



  public seleccionarPeli(peli: Pelicula) {
    this.peliSeleccionadaOutput.emit(peli);
  }

}


