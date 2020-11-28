import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {path: 'registro', component: RegistroComponent, data: {animation: 'registro'}},
  {path: 'error', component: ErrorComponent},
  {path: 'home', component: HomeComponent, 
      data: {animation: 'home'}},
  // {path: 'admin', component: AdminMenuComponent, canActivate: [AdministradorGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'error'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
