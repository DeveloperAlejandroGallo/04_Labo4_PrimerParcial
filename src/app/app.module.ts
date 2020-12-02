import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ErrorComponent } from './componentes/error/error.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { AutenticarFirebaseService } from './servicio/autenticar-firebase.service';
import { StorageFirebaseService } from './servicio/storage-firebase.service';
import { SubirImagenComponent } from './componentes/subir-imagen/subir-imagen.component';
import { HttpClientModule } from '@angular/common/http';
import { CambiaColorDirective } from './directivas/cambia-color.directive';
import { UsuariosPipe } from './pipes/usuarios.pipe';
import { TablaPaisComponent } from './componentes/pais/tabla-pais/tabla-pais.component';
import { AltaActorComponent } from './componentes/actor/alta-actor/alta-actor.component';
import { TablaActorComponent } from './componentes/actor/tabla-actor/tabla-actor.component';
import { TablaPeliculaComponent } from './componentes/pelicula/tabla-pelicula/tabla-pelicula.component';
import { MenuPeliculaComponent } from './componentes/pelicula/menu-pelicula/menu-pelicula.component';
import { MenuActorComponent } from './componentes/actor/menu-actor/menu-actor.component';
import { MenuPaisComponent } from './componentes/pais/menu-pais/menu-pais.component';
import { AltaPeliculaComponent } from './componentes/pelicula/alta-pelicula/alta-pelicula.component';
import { AbmActorComponent } from './componentes/actor/abm-actor/abm-actor.component';
import { ListadoActorComponent } from './componentes/actor/listado-actor/listado-actor.component';
import { PeliculasActorComponent } from './componentes/actor/peliculas-actor/peliculas-actor.component';
import { PaisPeliculaComponent } from './componentes/actor/pais-pelicula/pais-pelicula.component';
import { DetalleActorComponent } from './componentes/actor/detalle-actor/detalle-actor.component';
import { DeshabilitarDirective } from './directivas/deshabilitar.directive';
import { AbmPeliculaComponent } from './componentes/pelicula/abm-pelicula/abm-pelicula.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    ErrorComponent,
    NavBarComponent,
    SubirImagenComponent,
    CambiaColorDirective,
    UsuariosPipe,
    TablaPaisComponent,
    AltaActorComponent,
    TablaActorComponent,
    TablaPeliculaComponent,
    MenuPeliculaComponent,
    MenuActorComponent,
    MenuPaisComponent,
    AltaPeliculaComponent,
    AbmActorComponent,
    ListadoActorComponent,
    PeliculasActorComponent,
    PaisPeliculaComponent,
    DetalleActorComponent,
    DeshabilitarDirective,
    AbmPeliculaComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AutenticarFirebaseService, StorageFirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
