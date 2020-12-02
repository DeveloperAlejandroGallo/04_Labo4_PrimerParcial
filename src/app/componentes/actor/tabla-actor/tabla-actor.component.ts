import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { ActoresService } from 'src/app/servicio/actores.service';

@Component({
  selector: 'app-tabla-actor',
  templateUrl: './tabla-actor.component.html',
  styleUrls: ['./tabla-actor.component.scss']
})
export class TablaActorComponent implements OnInit {

  constructor(private actorServ: ActoresService) { }
  @Output() actorOutput: EventEmitter<Actor> = new EventEmitter<Actor>();

  actoresListado: Array<Actor>;

  ngOnInit(): void {
        this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
          this.actoresListado = actores;
          this.actoresListado = this.actoresListado.filter(act => act.activo == true)
        });
  }


  public seleccionarActor(actor: Actor) {
    console.log('emitiendo actor:'+actor.nombre);
    // console.table(actor);
    this.actorOutput.emit(actor);
  }

}
