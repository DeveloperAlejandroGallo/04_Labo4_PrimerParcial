import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { ActoresService } from 'src/app/servicio/actores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-actor',
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.scss']
})
export class AltaActorComponent implements OnInit {

  constructor(private servActor: ActoresService) { }

  actor: Actor;
  pais: Pais;
  msg: string;


  ngOnInit(): void {
  }

  public recibirActor(actor: Actor) {
    this.actor = actor;
  }

  public recibirPais(pais: Pais) {
    this.pais = pais;
  }
 


}
