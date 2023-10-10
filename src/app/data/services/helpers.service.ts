import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  cursos = 0;
  public domain = 'http://35.92.150.230/';
  type:any;
  section = '';

  constructor(private route: Router) { }

  goTop(){
    document.body.scrollTop = 0;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
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
          this.type = 0;
          localStorage.clear();
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          localStorage.removeItem('type');
          localStorage.removeItem('id');
          //redireccionamos a la pagina de inicio despues de 7 segundos
          this.route.navigate(['/']);
        }, 900);
      },
    });
  }
  public dataUrlToBlob(dataUrl: string): Blob {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = Buffer.from(dataUrl, 'base64').toString('utf-8');
    // separate out the mime component
    const blob = new Blob([byteString], { type: 'application/octet-stream' });
    return blob;
  }
}
