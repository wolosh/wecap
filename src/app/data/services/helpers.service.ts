import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { Buffer } from 'buffer';
import { SessionService } from 'src/app/data/services/session.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  cursos = 0;
  //public domain = 'http://35.92.150.230/';
  public domain = '';
//public domainAmericargo ='https://ci.americargo.wecap.mx/'
  //public domain ='https://ci.alsainacademy.wecap.mx/'
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

  constructor(private route: Router, public session:SessionService) {
    if (this.domainPrueba.includes('americargo')) {
      this.domain = 'https://ci.americargo.wecap.mx/'
      console.log(this.domain)
      } else if (this.domainPrueba.includes('alsainacademy')) {
        this.domain = 'https://ci.alsainacademy.wecap.mx/'
        console.log(this.domain)
      } else {
        this.domain = 'https://ci.wecap.mx/'
        console.log(this.domain)
      }
   }

  public getName(){
    return localStorage.getItem('userName');
    //console.log(this.name)
  }

  goTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

 

  public showError(error: any, redirect?: any) {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {
      // Get client-side error
      /* console.log(error); */
      errorMessage = error.error.message.error;
      //si el error es un array de errores
    } else {
      // Get server-side error
      errorMessage = `${error.error.message.error}`;
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
          this.pauseTimer(this.interval);
          this.type = 0;
          localStorage.removeItem('userName');
          localStorage.clear();
          localStorage.removeItem('token');
          this.session.curso = false;
          this.conferencias = false;
          //redireccionamos a la pagina de inicio despues de 7 segundos
          this.route.navigate(['/']);
        }, 900);
      },
    });
  }

  public redirect(){
    this.route.navigate(['']);
  }




  /*public dataUrlToBlob(dataUrl: string): Blob {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = Buffer.from(dataUrl, 'base64').toString('ascii');

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
  }*/

  pauseTimer(interval: any) {
    clearInterval(interval);
  }

  /*public dataUrlToArrayBuffer(dataUrl) {
    const base64Data = dataUrl.split(',')[1];
    const binaryString = window.atob(base64Data);
    const length = binaryString.length;
    const arrayBuffer = new ArrayBuffer(length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return arrayBuffer;
  }
  /*public dataUrlToArrayBuffer(dataUrl) {
    // Extraer la parte de los datos codificados en base64 de la cadena Data URL
    const base64Data = dataUrl.split(',')[1];
    // Decodificar la cadena base64 a un ArrayBuffer
    const binaryString = window.atob(base64Data);
    const length = binaryString.length;
    const arrayBuffer = new ArrayBuffer(length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return arrayBuffer;
  }*/
  /*public base64ToFile(base64Data: string, fileName: string, mimeType: string): File {
    const buff = Buffer.from(base64Data, 'base64');
    return new File([buff], fileName, { type: mimeType });
  }*/
  /*public imageToBase64(imagePath: string): string | null {
    try {
      // Lee el archivo de imagen como un búfer (buffer)
      const buffer = fs.readFileSync(imagePath);

      // Convierte el búfer en una cadena base64
      const base64Data = buffer.toString('base64');
      const base64String = `data:image/jpeg;base64,${base64Data}`; // Reemplaza 'jpeg' con el tipo de imagen apropiado

      return base64String;
    } catch (error) {
      console.error(`Error al convertir la imagen en base64: ${error}`);
      return null;
    }
  }*/
}
