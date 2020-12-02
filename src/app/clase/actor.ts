import { Pais } from './pais';

export class Actor {
    public nombre: string;
    public apellido: string;
    public sexo: string;
    public fechaDeNacimiento: Date;
    public activo: boolean;
    public nacionalidad?: Pais;
    public foto?: string;
    public fechaBaja?: Date;
    public id?: string;

  constructor(nombre: string,apellido: string,sexo: string,fechaDeNacimiento: Date,
              activo: boolean,nacionalidad?: Pais, foto?: string, fechaBaja?: Date, id?: string){
      this.nombre = nombre;
      this.apellido = apellido;
      this.sexo = sexo;
      this.fechaDeNacimiento = fechaDeNacimiento;
      this.nacionalidad = nacionalidad;
      this.activo = activo;
      this.foto = foto;
      this.fechaBaja = fechaBaja;
      this.id = id;
  }

}
