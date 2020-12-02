import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pais } from 'src/app/clase/pais';
import { PaisesService } from 'src/app/servicio/paises.service';

@Component({
  selector: 'app-tabla-pais',
  templateUrl: './tabla-pais.component.html',
  styleUrls: ['./tabla-pais.component.scss']
})
export class TablaPaisComponent implements OnInit {

  constructor(private paisServ: PaisesService) { }

  @Output() paisOutput: EventEmitter<Pais> = new EventEmitter<Pais>();

  paisListado: Array<Pais>;


  ngOnInit(): void {

    this.paisServ.leerPaises().subscribe((paises: Array<Pais>) => {
      this.paisListado = paises;
      console.table(paises);
    }, err => {
      console.error('Error al leer los paises: ' + err);
    });
  }

  public seleccionarPais(pais: Pais) {
    this.paisOutput.emit(pais);
  }


}
