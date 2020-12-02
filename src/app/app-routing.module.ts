import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoActorComponent } from './componentes/actor/listado-actor/listado-actor.component';
import { PaisPeliculaComponent } from './componentes/actor/pais-pelicula/pais-pelicula.component';
import { PeliculasActorComponent } from './componentes/actor/peliculas-actor/peliculas-actor.component';
import { AltaActorComponent } from './componentes/actor/alta-actor/alta-actor.component';
import { MenuActorComponent } from './componentes/actor/menu-actor/menu-actor.component';
import { ErrorComponent } from './componentes/error/error.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuPaisComponent } from './componentes/pais/menu-pais/menu-pais.component';
import { AltaPeliculaComponent } from './componentes/pelicula/alta-pelicula/alta-pelicula.component';
import { MenuPeliculaComponent } from './componentes/pelicula/menu-pelicula/menu-pelicula.component';
import { RegistroComponent } from './componentes/registro/registro.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {path: 'registro', component: RegistroComponent, data: {animation: 'registro'}},
  {path: 'error', component: ErrorComponent},
  {path: 'home', component: HomeComponent, data: {animation: 'home'}},
  {path: 'actores', component: MenuActorComponent},
  {path: 'peliculas', component: MenuPeliculaComponent},
  {path: 'paises', component: MenuPaisComponent},
  {path: 'actor/alta', component: AltaActorComponent},
  {path: 'actor/listado', component: ListadoActorComponent},
  {path: 'actor/peliculas', component: PeliculasActorComponent},
  {path: 'actor/paisPelicula', component: PaisPeliculaComponent},
  {path: 'pelicula/alta', component: AltaPeliculaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
