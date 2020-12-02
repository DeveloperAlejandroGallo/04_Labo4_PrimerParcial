import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { ActoresService } from 'src/app/servicio/actores.service';

@Component({
  selector: 'app-tabla-actor',
  templateUrl: './tabla-actor.component.html',
  styleUrls: ['./tabla-actor.component.scss']
})
export class TablaActorComponent implements OnInit {

  constructor() { }
  @Output() actorOutput: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Input() listaActorInput = Array<Actor>();
  

  ngOnInit(): void {

  }


  public seleccionarActor(actor: Actor) {
    console.log('emitiendo actor:'+actor.nombre);
    // console.table(actor);
    this.actorOutput.emit(actor);
  }

}
