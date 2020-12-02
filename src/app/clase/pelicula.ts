import { Actor } from './actor';
import { Pais } from './pais';

export class Pelicula {
    nombre: string;
    anio: number;
    actores: Array<Actor>;
    pais: Pais;
    director: string;
    genero: string;
    activo: boolean;
    foto?: string;
    id?: string;

    constructor(nombre: string, anio: number, actores: Array<Actor>, pais: Pais, director: string,
        genero: string, activo: boolean, foto?: string, id?: string,) {
        this.nombre = nombre;
        this.anio = anio;
        this.actores = actores;
        this.pais = pais;
        this.director = director;
        this.genero = genero;
        this.activo = activo;
        this.foto = foto;
        this.id = id;
    }

}
