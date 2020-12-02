import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';

@Component({
  selector: 'app-listado-actor',
  templateUrl: './listado-actor.component.html',
  styleUrls: ['./listado-actor.component.scss']
})
export class ListadoActorComponent implements OnInit {

  constructor() { }

  actorSeleccionado: Actor;

  ngOnInit(): void {
  }

  public recibirActor(actor: Actor){
    this.actorSeleccionado = actor;
  }


}
