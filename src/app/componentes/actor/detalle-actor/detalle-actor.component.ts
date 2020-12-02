import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.scss']
})
export class DetalleActorComponent implements OnInit {

  constructor() { }
  @Input() actorInput: Actor;

  ngOnInit(): void {
  }

}
