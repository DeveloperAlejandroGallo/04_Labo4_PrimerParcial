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
