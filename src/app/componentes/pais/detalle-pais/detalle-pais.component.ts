import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';

@Component({
  selector: 'app-detalle-pais',
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent implements OnInit {

  constructor() { 
    // console.log('Constructor:'+this.paisInput);
    console.log('Constructor:'+this.actorInput);
  }
  @Input() paisInput: Pais;
  @Input() actorInput: Actor;

  ngOnInit(): void {
    // console.log('Init:'+this.paisInput);
    console.log('Init:'+this.actorInput.nacionalidad);
  }

}
