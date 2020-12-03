import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';

@Component({
  selector: 'app-detalle-pais',
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent implements OnInit {

  constructor() { 
    console.log('Constructor:'+this.paisInput);
    
  }
  @Input() paisInput: Pais;
  @Input() seleccionableInput: boolean;
  @Output() paisOutput: EventEmitter<Pais> = new EventEmitter<Pais>();

  ngOnInit(): void {
     console.log('Init:'+this.paisInput);
    // console.log('Init:'+this.actorInput.nacionalidad);
  }

  public seleccionarPais() {
    this.paisOutput.emit(this.paisInput); //this is funny
  }


}
