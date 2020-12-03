import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-pelicula',
  templateUrl: './menu-pelicula.component.html',
  styleUrls: ['./menu-pelicula.component.scss']
})
export class MenuPeliculaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public altaPelicula() {
    this.router.navigate(['/pelicula/alta']);
  }

    public detallePeliculas(){
      this.router.navigate(['/pelicula/detalles']);
    }

}
