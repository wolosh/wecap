import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class UploadAdapter {
  constructor(private loader: any) {}
  upload() {
    //const token = localStorage.getItem('token');
    return this.loader.file.then((file: any) => {
      return new Promise((resolve, reject) => {
        // Lógica de carga de imágenes aquí
        // Puedes usar servicios Angular para interactuar con tu backend
        // Asegúrate de manejar las respuestas del servidor adecuadamente
        // Ejemplo básico de carga
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://ci.capitaltalento.com/API/img', true);
        //xhr.setRequestHeader('X-CSRF-TOKEN', token);
        const formData = new FormData();
        formData.append('img', file);
        xhr.send(formData);

        xhr.onload = () => {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            resolve({ default: response.img });
            //resolve({ default: response });
          } else {
            reject('Error al cargar la imagen');
          }
        };

        xhr.onerror = () => {
          reject('Error al cargar la imagen');
        };
      });
    });
  }
    /*private loader;
    constructor(loader: any) {
      this.loader = loader;
      console.log(this.readThis(loader.file));
    }
  
    public upload(): Promise<any> {
      //"data:image/png;base64,"+ btoa(binaryString) 
      return this.readThis(this.loader.file);
    }
  
    readThis(file: File): Promise<string> {
        console.log(file)
        let imagePromise: Promise<string> = new Promise((resolve, reject) => {
            var myReader: FileReader = new FileReader();
            myReader.onloadend = (e) => {
                let image = myReader.result;
                console.log(image);
                resolve("data:image/png;base64," + image);
            }
            myReader.readAsDataURL(file);
        });
        return imagePromise;
    }*/
  
  }