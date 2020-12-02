import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pais } from '../clase/pais';
import { Pelicula } from '../clase/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  peliculasLista;
  public peliculaActual: Pelicula;

  constructor(private firePeliculas:AngularFireDatabase, private http:HttpClient) {
    
    this.peliculasLista= this.firePeliculas.object('peliculas').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));

   }

   crearPelicula(pelicula:Pelicula){
     return this.http.post(environment.firebase.databaseURL+"/peliculas.json",pelicula);
  }

  obtenerPeliculas(){
    this.peliculasLista= this.firePeliculas.object('peliculas').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
    return this.peliculasLista;
  }

  obtenerPeliculasNyA(nombre:string, apellido:string){
    // Antes de devolver la info a la que me suscribo, paso por el map
    return this.http.get(environment.firebase.databaseURL+"/peliculas.json").pipe(map(resp=>{
      return this.filterNombreYApellido(resp,nombre,apellido)}));
  }

  public obtenerPeliculasPorPais(pais:Pais){
    return this.http.get(environment.firebase.databaseURL+"/peliculas.json").pipe(map(resp=>{
      return this.filterPorPais(resp,pais)}));
  }
  
  public obtenerPeliculasBorrados(){
    return this.http.get(environment.firebase.databaseURL+"/peliculas.json").pipe(map(resp=>{
      return this.filterErased(resp)}));
  }


  obtenerPeliculasInactivos(state:boolean){
    return this.http.get(environment.firebase.databaseURL+"/peliculas.json").pipe(map(resp=>{
      return this.filterPorState(resp,state)}));
  }


  obtenerPeliculaPorId(id:string){
    return this.http.get(environment.firebase.databaseURL+"/peliculas.json").pipe(map(resp=>{
      return this.filterPorId(resp,id)}));
  }

  modificarEstadoPelicula(id:string,state:boolean){
    let fechaBaja: string;
    let diaInfo = new Date();
    let mesStr: string;
    let mes = diaInfo.getMonth();
    mes = mes +1;
    mesStr = mes.toString();

    if(mes < 10)
     mesStr = '0' + mes.toString();


    fechaBaja = diaInfo.getDate().toString() + '/' + mesStr + '/' + diaInfo.getFullYear().toString();
    return this.http.patch(environment.firebase.databaseURL+"/peliculas/"+id+".json",{activo:state, fechaBaja:fechaBaja}).subscribe(resp=>{
    });    
  }


public filterNombreYApellido(res: any, nombre: string, apellido: string) {
  let peliculas;
  let aux=null;
  peliculas=this.objecToArray(res);
    for (let index = 0; index < peliculas.length; index++) {
      const element = peliculas[index];
      if (element.nombre == nombre && element.apellido == apellido) {
        aux = element;
      }
    }
    return aux;
}

public filterPorState(res: any, state: boolean) {
  let peliculas;
  let aux=null;
  peliculas=this.objecToArray(res);
    for (let index = 0; index < peliculas.length; index++) {
      const element = peliculas[index];
      if (element.activo == state) {
        aux = element;
      }
    }
    return aux;
}


public filterPorId(res: any, id: string) {
  let peliculas;
  let aux=null;
  peliculas=this.objecToArray(res);
    for (let index = 0; index < peliculas.length; index++) {
      const element = peliculas[index];
      if (element.id == id) {
        aux = element;
      }
    }
    return aux;
}

public filterPorPais(res: any, pais: Pais) {
  let peliculas;
  let aux=[];
  peliculas=this.objecToArray(res);
    for (let index = 0; index < peliculas.length; index++) {
      const element = peliculas[index];
      // console.warn(element);
      if (element.pais.name == pais.name ) {
        aux.push(element);
      }
    }
    return aux;  
}

public filterErased(res: any) {
  let peliculas;
  let aux=[];
  peliculas=this.objecToArray(res);
    for (let index = 0; index < peliculas.length; index++) {
      const element = peliculas[index];
      console.table(element);
      if (element.activo == false) {
        aux.push(element);
      }
    }
    return aux;  
}
public filterPorSpeciality(res: any, spec: string) {
  console.log('filterPorSpeciality:' + spec);
  let peliculas;
  let aux=[];
  peliculas=this.objecToArray(res);
    for (let index = 0; index < peliculas.length; index++) {
       const element = peliculas[index];
      // console.log('element '+index+ ':' +element);      
      if (element.speciality == spec) {
        aux.push(element);
      }
    }
    return aux;
}



/****Generic Function */

  private objecToArray( datos: Object ){
    const peliculas = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
          let pelicula: any = datos[key];
          pelicula.id=key;
          peliculas.push(pelicula);
    })
    return peliculas;
  }
}
