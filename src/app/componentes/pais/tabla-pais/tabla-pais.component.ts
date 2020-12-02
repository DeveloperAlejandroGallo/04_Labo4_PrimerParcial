import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() alturaMax: string;
  @Input() listaPaisInput = Array<Pais>();



  ngOnInit(): void {


  }

  public seleccionarPais(pais: Pais) {
    this.paisOutput.emit(pais);
  }


}
