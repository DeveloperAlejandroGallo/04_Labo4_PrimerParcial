import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { ActoresService } from 'src/app/servicio/actores.service';

@Component({
  selector: 'app-listado-actor',
  templateUrl: './listado-actor.component.html',
  styleUrls: ['./listado-actor.component.scss']
})
export class ListadoActorComponent implements OnInit {

  constructor(private actorServ: ActoresService) { }

  actorSeleccionado: Actor;
  listaActores = Array<Actor>();
  
  ngOnInit(): void {
    this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
      this.listaActores = actores;
      this.listaActores = this.listaActores.filter(act => act.activo == true);

    });

  }

  public recibirActor(actor: Actor){
    this.actorSeleccionado = actor;
  }


}
