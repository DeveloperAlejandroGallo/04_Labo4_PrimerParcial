import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { Pelicula } from 'src/app/clase/pelicula';
import { PeliculasService } from 'src/app/servicio/peliculas.service';
import Swal from 'sweetalert2';
import { NumericLiteral } from 'typescript';

@Component({
  selector: 'app-abm-pelicula',
  templateUrl: './abm-pelicula.component.html',
  styleUrls: ['./abm-pelicula.component.scss']
})
export class AbmPeliculaComponent implements OnInit {

  constructor(private ps: PeliculasService) { }

  @Input() abmInput: string;
  @Input() listaActoresInput: Array<Actor>;// = new Array<Actor>();
  @Input() paisInput: Pais;
  @Output() limpiarListaActoresOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
  msg: string;

  nombre: string;
  anio: number;
  // actores: Array<Actor>;
  // pais: Pais; 
  director: string;
  genero: string;
  // activo: boolean;
  // foto?: string;
  // id?: string;
  
  ngOnInit(): void {
  }

  public check(){
    console.log(this.listaActoresInput);
  }
  
  public crearPelicula() {
    if(this.datosValidos()) {
      let pelicula: Pelicula = new Pelicula(this.nombre,this.anio, this.listaActoresInput,this.paisInput,this.director,this.genero,true);
      this.ps.crearPelicula(pelicula).subscribe(ret => {
        Swal.fire({
          title: 'Exito',
          text: `Película ${this.nombre} creada con éxito`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.LimpiarCampos();
      })
    }
    else {
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: 'error'
      });
    }
  }

  public datosValidos():boolean {

    this.msg = 'Faltan los datos: '

    if(this.nombre == '') {
      this.msg += 'Nombre, ';
    }
    if(isNaN(this.anio) || this.anio == 0) {
      this.msg += 'Año, ';
    }
    if(this.genero == '') {
      this.msg += 'Género, ';
    }
    if(this.director == '') {
      this.msg += 'Director, ';
    }
    if(this.listaActoresInput.length == 0) {
      this.msg += 'Actores, ';
    }
    if(this.paisInput == (null || undefined)) {
      this.msg += 'Pais, ';
    }
    if(this.msg == 'Faltan los datos: '){
      this.msg = '';
      return true;
    }
    else {
      this.msg = this.msg.slice(0,  -2);
      return false;
    }
  }

  public LimpiarCampos() {
    this.nombre ='';
    this.anio =0;
    this.director ='';
    this.genero ='';
    this.limpiarListaActoresOutput.emit(true);
    // this.listaActoresInput = new Array<Actor>();
    // this.paisInput.flag = '';
    // this.paisInput.name = '';
    // this.paisInput = null;

  }


  public noEsEditable() {
    return this.esBaja() || this.esVisualizacion();
  }

  public esAlta() {
    return this.abmInput == 'a';
  }
  public esBaja() {
    return this.abmInput == 'b';
  }
  public esModificacion() {
    return this.abmInput == 'm';
  }
  public esVisualizacion() {
    return this.abmInput == 'v';
  }

  public accion():string {
    let accion: string;

    switch (this.abmInput) {
      case 'a':
        accion = 'Alta';
        break;
      case 'b':
        accion = 'Baja';
        break;
      case 'v':
        accion = 'Detalle';
        break;
      case 'm':
        accion = 'Modificación';
        break;
    }

    return accion;
  }


}
