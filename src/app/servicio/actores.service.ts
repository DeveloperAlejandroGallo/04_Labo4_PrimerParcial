import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Actor } from '../clase/actor';
import { Pais } from '../clase/pais';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  actoresLista;
  public actorActual: Actor;

  constructor(private fireActores:AngularFireDatabase, private http:HttpClient) {
    
    this.actoresLista= this.fireActores.object('actores').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));

   }

   crearActor(actor:Actor){
     return this.http.post(environment.firebase.databaseURL+"/actores.json",actor);
  }

  obtenerActores(){
    this.actoresLista= this.fireActores.object('actores').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
    return this.actoresLista;
  }

  obtenerActoresNyA(nombre:string, apellido:string){
    // Antes de devolver la info a la que me suscribo, paso por el map
    return this.http.get(environment.firebase.databaseURL+"/actores.json").pipe(map(resp=>{
      return this.filterNombreYApellido(resp,nombre,apellido)}));
  }

  public obtenerActoresPorProfile(pais:Pais){
    return this.http.get(environment.firebase.databaseURL+"/actores.json").pipe(map(resp=>{
      return this.filterPorPais(resp,pais)}));
  }
  
  public obtenerActoresBorrados(){
    return this.http.get(environment.firebase.databaseURL+"/actores.json").pipe(map(resp=>{
      return this.filterErased(resp)}));
  }


  obtenerActoresInactivos(state:boolean){
    return this.http.get(environment.firebase.databaseURL+"/actores.json").pipe(map(resp=>{
      return this.filterPorState(resp,state)}));
  }


  obtenerActorPorId(id:string){
    return this.http.get(environment.firebase.databaseURL+"/actores.json").pipe(map(resp=>{
      return this.filterPorId(resp,id)}));
  }

  modificarEstadoActor(id:string,state:boolean){
    let fechaBaja: string;
    let diaInfo = new Date();
    let mesStr: string;
    let mes = diaInfo.getMonth();
    mes = mes +1;
    mesStr = mes.toString();

    if(mes < 10)
     mesStr = '0' + mes.toString();


    fechaBaja = diaInfo.getDate().toString() + '/' + mesStr + '/' + diaInfo.getFullYear().toString();
    return this.http.patch(environment.firebase.databaseURL+"/actores/"+id+".json",{activo:state, fechaBaja:fechaBaja}).subscribe(resp=>{});    
  }


public modificarActor(id: string, actor: Actor) {
  return this.http.patch(environment.firebase.databaseURL+"/actores/"+id+".json",{
    nombre: actor.nombre,
    apellido: actor.apellido,
    sexo: actor.sexo,
    fechaDeNacimiento: actor.fechaDeNacimiento,
    nacionalidad: actor.nacionalidad
  }).subscribe(resp=>{});    
}  


public filterNombreYApellido(res: any, nombre: string, apellido: string) {
  let actores;
  let aux=null;
  actores=this.objecToArray(res);
    for (let index = 0; index < actores.length; index++) {
      const element = actores[index];
      if (element.nombre == nombre && element.apellido == apellido) {
        aux = element;
      }
    }
    return aux;
}

public filterPorState(res: any, state: boolean) {
  let actores;
  let aux=null;
  actores=this.objecToArray(res);
    for (let index = 0; index < actores.length; index++) {
      const element = actores[index];
      if (element.activo == state) {
        aux = element;
      }
    }
    return aux;
}


public filterPorId(res: any, id: string) {
  let actores;
  let aux=null;
  actores=this.objecToArray(res);
    for (let index = 0; index < actores.length; index++) {
      const element = actores[index];
      if (element.id == id) {
        aux = element;
      }
    }
    return aux;
}

public filterPorPais(res: any, pais: Pais) {
  let actores;
  let aux=[];
  actores=this.objecToArray(res);
    for (let index = 0; index < actores.length; index++) {
      const element = actores[index];
      // console.warn(element);
      if (element.pais.name == pais.name) {
        aux.push(element);
      }
    }
    return aux;  
}

public filterErased(res: any) {
  let actores;
  let aux=[];
  actores=this.objecToArray(res);
    for (let index = 0; index < actores.length; index++) {
      const element = actores[index];
      console.table(element);
      if (element.activo == false) {
        aux.push(element);
      }
    }
    return aux;  
}




/****Generic Function */

  private objecToArray( datos: Object ){
    const actores = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
          let actor: any = datos[key];
          actor.id=key;
          actores.push(actor);
    })
    return actores;
  }
}
