export class Usuario {
    nombre: string;
    apellido: string;
    email: string;
    clave: string;
    perfil: string;
    foto: string;
    activo: boolean;
    id?: string;
    fechaBaja?: string;

    constructor(nombre: string, apellido: string, email: string, clave: string, perfil: string, foto: string, activo:boolean) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.clave = clave;
        this.perfil = perfil;
        this.foto = foto;
        this.activo = activo;
    }



}
