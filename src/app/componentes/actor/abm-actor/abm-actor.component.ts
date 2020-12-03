import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/clase/actor';
import { Pais } from 'src/app/clase/pais';
import { ActoresService } from 'src/app/servicio/actores.service';
import { StorageFirebaseService } from 'src/app/servicio/storage-firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-actor',
  templateUrl: './abm-actor.component.html',
  styleUrls: ['./abm-actor.component.scss']
})
export class AbmActorComponent implements OnInit {

  constructor(private servActor: ActoresService,
              private fireStorage: StorageFirebaseService) {
                this.abmInput = 'a';
               }

  @Input() nacionalidadInput: Pais;
  @Input() actorInput: Actor = new Actor('','','',new Date(),true);
  @Input() abmInput: string; //a: alta - b: baja - m: modificacion - v: visualizacion
  @Output() actorOutput: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Output() limpiarNacionalidadInputOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

  actor: Actor;
  //--------
  // nombre: string;
  // apellido: string;
  // sexo: string;
  // fechaDeNacimiento: Date;
  // // nacionalidad: Pais;
  // activo: boolean;
  msg: string;
  

  foto: string = '';
  publicURL: string;
  ngOnInit(): void {

    // this.nacionalidadInput.flag = '../../../assets/imagenes/flags.png'; 

    // if(this.actorInput != undefined) {
    //   this.nombre = this.actorInput.nombre;
    //   this.apellido = this.actorInput.apellido;
    //   this.sexo = this.actorInput.sexo;
    //   this.fechaDeNacimiento = this.actorInput.fechaDeNacimiento;
    //   this.nacionalidadInput = this.actorInput.nacionalidad;
    //   this.foto = this.actorInput.foto;
    // }
  }


  public crearActor() {

    if(this.datosValidos()) {

      let refImg;

      let actorMetaData = {
        nombre: this.actorInput.nombre,
        apellido: this.actorInput.apellido
      };
  
      this.fireStorage.uploadFile(this.actorInput.nombre+'_'+this.actorInput.apellido , this.foto, actorMetaData).then(resp => {
        refImg = this.fireStorage.linkToPublicFile(this.actorInput.nombre+'_'+this.actorInput.apellido);
        refImg.getDownloadURL().subscribe((URL) => {
          this.publicURL = URL;

          this.actor = new Actor(this.actorInput.nombre, this.actorInput.apellido, this.actorInput.sexo, this.actorInput.fechaDeNacimiento, true, this.nacionalidadInput,this.publicURL);
          this.servActor.crearActor(this.actor).subscribe(ret => {
            Swal.fire({
              title: 'Exito',
              text: `${this.actorInput.sexo == 'M' ? 'El Actor' : 'La Actriz'} ${this.actorInput.nombre}, ${this.actorInput.apellido} creado con éxito`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
            this.LimpiarCampos();
          });
        });
      }).catch(error => { console.log("Error al subir foto" + error) });

    }
    else {
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: 'error'
      });
    }

  }


  public modificarActor() {
    if(this.datosValidos()) {
      
      let nac: Pais = this.actorInput.nacionalidad;
      console.log('nacionalidadInput: ' + this.nacionalidadInput);
      if(this.nacionalidadInput != (null && undefined)) {
        console.log('nacionalidadInput en if: ' + this.nacionalidadInput);
        nac = this.nacionalidadInput;
        this.actorInput.nacionalidad = nac;
      }

      this.actor = new Actor(this.actorInput.nombre, this.actorInput.apellido, this.actorInput.sexo, this.actorInput.fechaDeNacimiento, true,nac);
      this.servActor.modificarActor(this.actorInput.id, this.actor);
      Swal.fire({
        title: 'Exito',
        text: `${this.actorInput.sexo == 'M' ? 'El Actor' : 'La Actriz'} ${this.actorInput.nombre}, ${this.actorInput.apellido} modificado con éxito`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      this.limpiarNacionalidadInputOutput.emit(true);
    }    
    else {
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: 'error'
      });
    }
  }


  /**
   * bajaActor
   */
  public bajaActor() {
    this.servActor.modificarEstadoActor(this.actorInput.id, false);
    Swal.fire({
      title: 'Baja',
      text: `${this.actorInput.sexo == 'M' ? 'El Actor' : 'La Actriz'} ${this.actorInput.nombre}, ${this.actorInput.apellido} a sido dado de baja`,
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  }

  public imgUpload(img) {
    this.foto = img;
  }

  public LimpiarCampos() {
    this.actorInput.nombre = '';
    this.actorInput.apellido = ''; 
    this.actorInput.sexo = ''; 
    this.actorInput.fechaDeNacimiento = null;
    this.actorInput.foto = '';
    this.actorInput.nacionalidad.name = '';
    this.actorInput.nacionalidad.flag = '';
    this.nacionalidadInput.name = '';
    this.nacionalidadInput.flag = '';

  }

  public noEsEditable() {
    return this.esBaja() || this.esVisualizacion();
  }

  public esAlta() {
    return this.abmInput == 'a';
  }
  public esBaja() {
    return this.abmInput == 'b';
  }
  public esModificacion() {
    return this.abmInput == 'm';
  }
  public esVisualizacion() {
    return this.abmInput == 'v';
  }


  public tieneNacionalidadInput() {
    return this.nacionalidadInput != (null && undefined);
  }


  public accion():string {
    let accion: string;

    switch (this.abmInput) {
      case 'a':
        accion = 'Alta';
        break;
      case 'b':
        accion = 'Baja';
        break;
      case 'v':
        accion = 'Detalle';
        break;
      case 'm':
        accion = 'Modificación';
        break;
    }

    return accion;
  }

  public datosValidos():boolean {

    this.msg = 'Faltan los datos: '

    if(this.actorInput.nombre == '') {
      this.msg += 'Nombre, ';
    }
    if(this.actorInput.apellido == '') {
      this.msg += 'Apellido, ';
    }
    if(this.actorInput.sexo == '') {
      this.msg += 'Sexo, ';
    }
    if(this.actorInput.fechaDeNacimiento == (null || undefined)) {
      this.msg += 'Fecha De Nacimiento, ';
    } 
    if(!this.esAlta() && this.actorInput.nacionalidad == (null || undefined)) {
      this.msg += 'Nacionalidad, ';
    }
    if(this.esAlta() && this.nacionalidadInput == (null || undefined)) {
      this.msg += 'Nacionalidad, ';
    }
    if(this.actorInput.foto == ('' || null || undefined)) {
      this.msg += 'Foto, ';
    }

    if(this.msg == 'Faltan los datos: '){
      this.msg = '';
      return true;
    }
    else {
      this.msg = this.msg.slice(0,  -2);
      return false;
    }
  }

}
