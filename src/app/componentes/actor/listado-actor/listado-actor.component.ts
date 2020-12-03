import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { ActoresService } from 'src/app/servicio/actores.service';
import { PaisesService } from 'src/app/servicio/paises.service';

@Component({
  selector: 'app-listado-actor',
  templateUrl: './listado-actor.component.html',
  styleUrls: ['./listado-actor.component.scss']
})
export class ListadoActorComponent implements OnInit {

  constructor(private actorServ: ActoresService,
              private paisServ: PaisesService) { }

  actorSeleccionado: Actor;
  listaActores = Array<Actor>();
  paisSeleccionado: Pais;
  listaPaises = Array<Pais>();

  ngOnInit(): void {
    this.actorServ.obtenerActores().subscribe((actores: Array<Actor>) => {
      this.listaActores = actores;
      this.listaActores = this.listaActores.filter(act => act.activo == true);

    });

    this.paisServ.leerPaises().subscribe((paises: Array<Pais>) => {
      this.listaPaises = paises;
    }, err => {
      console.error('Error al leer los paises: ' + err);
    });

  }

  public recibirLimpiarNacionalidad(limpiar: boolean) {
    if(limpiar) {
      this.paisSeleccionado = null;
    }
  }

  public recibirActor(actor: Actor){
    this.actorSeleccionado = actor;
  }

  public recibirPais(pais: Pais) {
    this.paisSeleccionado = pais;
  }

}
