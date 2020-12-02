import { NgSwitchDefault } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { ActoresService } from 'src/app/servicio/actores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.scss']
})
export class DetalleActorComponent implements OnInit {

  constructor(private actServ:ActoresService) { }
  @Input() actorInput: Actor;
  @Input() bajaInput: boolean;

  ngOnInit(): void {
  }
  public eliminarActor() {
    this.actServ.modificarEstadoActor(this.actorInput.id, false);
    Swal.fire({
      title: 'Baja',
      text: `${this.actorInput.sexo == 'M' ? 'El Actor' : 'La Actriz'} ${this.actorInput.nombre}, ${this.actorInput.apellido} a sido dado de baja`,
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  }
}
