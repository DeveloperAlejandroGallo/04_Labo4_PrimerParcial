import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from 'src/app/clase/pais';

@Component({
  selector: 'app-menu-actor',
  templateUrl: './menu-actor.component.html',
  styleUrls: ['./menu-actor.component.scss']
})
export class MenuActorComponent implements OnInit {

  constructor(private router: Router) { }

  pais: Pais;


  ngOnInit(): void {
  }


  public recibirPais(pais: Pais) {
    this.pais = pais;
  }

  public altaActorClick(){
    this.router.navigate(['/actor/alta']);
  }

  public modificaActoresClick() {
    this.router.navigate(['/actor/listado']);
  }

  public listaPaisesActoresClick() {
    this.router.navigate(['actor/peliculas']);
  }

}
