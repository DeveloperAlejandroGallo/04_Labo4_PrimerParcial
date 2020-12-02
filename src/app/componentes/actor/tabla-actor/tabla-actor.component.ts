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

  constructor(private actorServ: ActoresService) { 
        //     this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
        //   this.actoresListado = actores;
        //   this.actoresListado = this.actoresListado.filter(act => act.activo == true);

        //   //Para filtrar por pais
        //   if(this.paisInput != (null && undefined)) {
        //     this.actoresListado = this.actoresListado.filter(a => a.nacionalidad.name == this.paisInput.name);
        //   } 
        // });
  }
  @Output() actorOutput: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Input() paisInput: Pais; //si viene un pais se filtra por ahi
  actoresListado: Array<Actor>;

  ngOnInit(): void {
        this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
          this.actoresListado = actores;
          this.actoresListado = this.actoresListado.filter(act => act.activo == true);

          //Para filtrar por pais
          if(this.paisInput != (null && undefined)) {
            this.actoresListado = this.actoresListado.filter(a => a.nacionalidad.name == this.paisInput.name);
          } 
        });
  }


  public seleccionarActor(actor: Actor) {
    console.log('emitiendo actor:'+actor.nombre);
    // console.table(actor);
    this.actorOutput.emit(actor);
  }

}
