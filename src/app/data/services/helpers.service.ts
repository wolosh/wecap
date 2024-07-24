import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { SessionService } from 'src/app/data/services/session.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  cursos = 0;
  //public domain = 'http://35.92.150.230/';
  //public domain = 'https://ci.wecap.mx/';
  //public domain ='https://ci.americargo.wecap.mx/'
  //public domain ='https://ci.alsainacademy.wecap.mx/'
  public domain = '';
  public domainPrueba = document.location.origin;



  type: any = '0';
  public cuenta = '';
  name:any;
  section = '';
  idModuleBackUp:any;
  nameModuleBackUp:any;
  idTopicBackUp:any;
  nameTopicBackUp:any;
  interval:any;
  public finalizados = [] as any;
  public conferencias = false;
  view: any;
  startDate = '';
  message = "You have not filled out the form.";
  count: number = 0;
  finalizado: number = 2;
  n: any;
  company = '';

  constructor(private route: Router, public session:SessionService) {
    if (this.domainPrueba.includes('americargo')) { //si la url contiene americargo
      this.domain = 'https://ci.americargo.wecap.mx/'
      this.company = 'Americargo'
      console.log(this.domain)
      } else if (this.domainPrueba.includes('alsainacademy')) { //si la url contiene alsainacademy
        this.domain = 'https://ci.alsainacademy.wecap.mx/'
        this.company = 'Alsain Academy'
        console.log(this.domain)
      } else if(this.domainPrueba.includes('unitrade')) { //si la url contiene unitrade
        this.domain = 'https://ci.unitrade.wecap.mx/'
        this.company = 'Unitrade'
        console.log(this.domain)
      } else if(this.domainPrueba.includes('joga')) { //si la url contiene joga
        this.domain = 'https://ci.joga.wecap.mx/'
        this.company = 'Joga'
        console.log(this.domain)
      } else if(this.domainPrueba.includes('cybershield')) { //si la url contiene cybershield
        this.domain = 'https://ci.cybershield.wecap.mx/'
        this.company = 'Cybershield'
        console.log(this.domain)
      } else { //si no contiene ninguna de las anteriores
        this.domain = 'https://ci.wecap.mx/'
        this.company = 'Wecap'
        console.log(this.domain)

      }
   }

   //función para convertir una imagen
  public dataUrlToBlob(dataUrl: string): Blob {
    console.log(dataUrl)
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataUrl.split(',')[1]);
    
    // separate out the mime component
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    const ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ia], { type: mimeString });
    return blob;
  }

  //función para confirmar que se quiere salir de la página
  public confirmExit(){
      return Swal.fire({ //se muestra un alert con un mensaje de confirmación
        title: '¿Estás seguro?',
        text: 'Si sales de la página perderás tu progreso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#015287',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        //console.log(result)
        if (result.isConfirmed) { //si se presiona el botón de salir
          this.endTheme(this.idTopicBackUp, this.startDate, localStorage.getItem('token')); //se finaliza el tema
      }
    });
  }

  //funcion para obtener el nombre del usuario 
  public getName(){ 
    return localStorage.getItem('userName');
    //console.log(this.name)
  }

  //funcion para mandar al usuario al inicio de la pagina
  goTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }


  //funcion para mostrar un mensaje de error
  public showError(error: any, redirect?: any) {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) { //si el error es una instancia de HttpErrorResponse
      // Get client-side error
      /* console.log(error); */
      errorMessage = error.error.message.error; //se obtiene el mensaje de error
      //si el error es un array de errores
    } else {
      // Get server-side error
      errorMessage = `${error.error.message.error}`; //se obtiene el mensaje de error
    }
    //si redirect existe se redirige a la pagina que le pasemos cuando presionamos ok del swalalert
    if (redirect) { 
      return Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate([redirect]);
        }
      });
    } else {
      //si no existe se muestra el mensaje de error
      return Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  //funcion para mostrar un mensaje de éxito
  public loader() {
    //se muestra el loader
    Swal.fire({
      title: 'Espere por favor',
      text: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        //y se agrega una animación de carga
        Swal.showLoading();
      },
    });
  }

  //funcion para finalizar un tema
  public endTheme(idTheme:any, segundos:any, token:any, end?:any){
    this.pauseTimer(this.interval);
    this.pauseTimer(this.n);
    let tema = new FormData();
    let date = new Date();

    //console.log(date);
    //console.log(segundos, end);

    tema.append('idTema', idTheme);
    //tema.append('inicio', '2021-01-01 13:10:00');
    //tema.append('fin', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    tema.append('segundos', segundos);
    tema.append('finalizado', end);

    //console.log(tema.get('idTema'), tema.get('segundos'), tema.get('finalizado'))

    this.session.saveTheme(tema, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.startDate = '';
        this.finalizado = 2;
        this.count = 0;
      }
    );
  }

  //función para cerrar la sesión del usuario
  public logout() {
    Swal.fire({
      title: 'Cerrando Sesión',
      html: '¡Vuelve pronto!',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.close();
          //cerramos la sesion
          if(this.startDate != ''){
            console.log(this.idTopicBackUp,this.startDate)
            this.endTheme(this.idTopicBackUp, this.startDate, localStorage.getItem('token'));
          }
          this.pauseTimer(this.interval);
          this.pauseTimer(this.n);
          this.type = 0;
          localStorage.removeItem('userName');
          localStorage.clear();
          localStorage.removeItem('token');
          localStorage.removeItem('type');
          localStorage.removeItem('isLike');
          localStorage.removeItem('isComentario');         
          this.session.curso = false;
          this.conferencias = false;
          this.session.configuracion();
          //redireccionamos a la pagina de inicio despues de 7 segundos
          this.route.navigate(['/']);
        }, 900);
      },
    });
  }

  
  //funcion para redirigir a la pagina de inicio
  public redirect(){
    this.route.navigate(['']);
  }

    //funcion para limpiar intervalos
  pauseTimer(interval: any) {
    clearInterval(interval);
  }
}
