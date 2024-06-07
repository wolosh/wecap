import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  formConfiguracion: FormGroup;
  colorText: any;
  color = '#015287'
  boton1Color1: any;
  like = false;
  coment = false;
  logo: any;
  logoName = 'Ningun archivo seleccionado';
  logoBack = '';
  fondo: any;
  certificado: any;

   //variables para actualizar imagen
  //guarda la imagen en el evento
  imageChangedEvent: any = '';
  //mostrar la imagen en el cropper
  croppedImage: any = '';
  //mostrar el cropper
  showCropper = false;
  scale = 1;
  transform: ImageTransform = {};

  constructor(private route: Router, private get: GetService, public helpers: HelpersService, private session: SessionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.helpers.goTop();
    
    if (localStorage.getItem('type') == '1') {
      this.helpers.loader();
      this.helpers.goTop();
      this.helpers.type = localStorage.getItem('type');
      this.getConfiguration();
      this.startForm();
    } else {
      if (localStorage.getItem('type') == '4') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cmtemplate']);
          }
        });
      } else if(localStorage.getItem('token') == null){
        this.route.navigate(['/']);
      }
    }
  }

  //función que cancela la carga de la imagen
  cancelUpload() {
    //limpiamos el crop
    this.cleanCropped();
    //cerramos el crop
    this.showCropper = false;
  }

  //funcion para subir la imagen al servidor
  cargarImagen() {
    //console.log(this.croppedImage);
    //declara imageBlob que llama a la función dataUrlBlob y le pasa la imagen con base64
    //let imageBlob = this.helpers.dataUrlToBlob(this.croppedImage);
    let imageBlob = this.croppedImage;
    //declara el archivo que se va a subir
    let imageFile = new File([imageBlob], 'img', { type: 'image/png' });
    //declaramos un arreglo de archivos
    const fileArray: File[] = [];
    //agregamos el archivo al arreglo
    fileArray.push(imageFile);
    //mostramos una modal de carga
    /*Swal.fire({
      title: 'Subiendo imagen',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });*/
    //llamamos la función uploadFile que se encuentra en el servicio y le pasamos el arreglo de archivos
    this.uploadFile(fileArray as unknown as FileList);
    //limpiamos el crop
    this.cleanCropped();
    //cerramos el crop
    this.showCropper = false;
  }

  //función para limpiar el cropped
  cleanCropped() {
    //limpiamos la imagen del crop
    this.croppedImage = '';
    //limpiamos la imagen del evento
    this.imageChangedEvent = '';
  }

  //Evento para cargar la imagen del talento
  fileChangeEvent(event: any): void {
    //console.log(event);
    //si el archivo es diferente de vacio
    if (event.target.files.length > 0) {
      //muestra el loader
      /*Swal.fire({
        title: 'Cargando imagen',
        text: 'Espere por favor',
        allowOutsideClick: false,
        didOpen: () => {
          //se llama el loader
          Swal.showLoading();
          //canbiamos a verdadero para que se muestre el cropper
          this.showCropper = true;
          //asgnamos la imagen que viene en el evento al imageChangedEvent
          this.imageChangedEvent = event;
        },
      });*/
        //canbiamos a verdadero para que se muestre el cropper
        this.showCropper = true;
        //asgnamos la imagen que viene en el evento al imageChangedEvent
        this.imageChangedEvent = event;
    }
  }



  //función para actualizar formato de la imagen
  imageCropped(event: ImageCroppedEvent) {
    //console.log(event, event.base64);
    //Cuanda la imagen se recorta se le da formato base64
    this.croppedImage = event.blob;
    //console.log(this.croppedImage);
  }

  //función que carga la imagen
  imageLoaded() {
    //cerramos la ventana 
    Swal.close();
  }

  //función para falla en carga de imagen 
  loadImageFailed() {
    //mostramos el error 
    Swal.fire({
      title: 'Error',
      text: 'No se pudo cargar la imagen',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

  //función para restablecer imagen 
  resetImage() {
    //el valor de this.scale se le asigna 1
    this.scale = 1;
    //en transform se limpia
    this.transform = {};
  }

  //Función que llama profilePic de la api
  public uploadFile(files: FileList) {
    //si la longuitud de el arreglo de archivos es mayor a 0
    if (files.length === 0) {
      //se regresa
      return;
    }
    //si no es vacio se declara el archivo
    const fileToUpload = files[0];
    //console.log(fileToUpload, fileToUpload.size);

    if(fileToUpload.size > 524288){
      Swal.fire({
        title: '¡Error!',
        text: 'La imagen nes muy pesada, intenta con otra.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
      
   } else {
    Swal.close();
    this.logo = fileToUpload;
    this.logoName = 'Imagen cargada correctamente';
    //console.log(this.logo, this.logoName)
    
    Swal.fire({
      title: '¡Éxito!',
      text: 'Se ha cargado la imagen.',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#015287',
    });
   }
    //se llama el servicio
    /*this.session
      .profilePic(localStorage.getItem('token'), fileToUpload)
      .subscribe(
        (response: any) => {
          //manda llamar info talento para recargar datos
          this.getInfoTalento();
        },
        (error: any) => {
          //si fracasa manda mensaje de error
          this.helpers.showError(error);
        }
      );*/
  }

  //funcion para aumentar zoom a la imagen 
  zoomIn() {
    //al valor de this.scale se suma 0.1
    this.scale += 0.1;
    //en transform se le asigna el valor de this.scale para aumentar el zoom
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  //función para disminuir zoom de la imagen 
  zoomOut() {
    //al valor de this.scale se le resta 0.1
    this.scale -= 0.1;
    //en transform se le asigna el valor de this.scale para disminuir el zoom
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }


  startForm() {
    this.formConfiguracion = this.formBuilder.group({
      colorText: ['', [Validators.required]],
      txt_sesionUsuario: ['', [Validators.required]],
      boton1Color1: ['', [Validators.required]],
      boton1Color2: ['', [Validators.required]],
      notificacionEmail: ['', [Validators.required]],
      col_head_foot: ['', [Validators.required]],
      isLike: ['', [Validators.required]],
      isComentario: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      twitter: ['', [Validators.required]],
      tiktok: ['', [Validators.required]],
      youtube: ['', [Validators.required]],
      host: ['', [Validators.required]],
      username: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
    });
  }


  getConfiguration() {
    
    this.get.getConfiguration(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.formConfiguracion.patchValue({
          colorText: data.colorText,
          txt_sesionUsuario: data.txt_sesionUsuario,
          boton1Color1: data.boton1Color1,
          boton1Color2: data.boton1Color2,
          notificacionEmail: data.notificationEmail,
          col_head_foot: data.col_head_foot,
          isLike: data.isLike,
          isComentario: data.isComentario,
          facebook: data.red_facebook,
          instagram: data.red_instagram,
          twitter: data.red_twitter,
          tiktok: data.red_tiktok,
          youtube: data.red_youtube,
          host: data.host,
          username: data.username,
          contraseña: data.password,
        });
        this.logoBack = data.logo;
        //console.log(data.isLike);
        if (data.isLike == '1') this.like = true;
        if (data.isComentario == '1') this.coment = true;
        var a = document.getElementsByClassName("bg-change");
        /*if (data.boton1Color1 != '' && data.boton1Color2 != '') {
          a.item(0).setAttribute("style", "background-color: " + data.boton1Color2);
          //a.item(1).setAttribute("style", "color: " + data.boton1Color1);
        }*/
        this.helpers.goTop();
        Swal.close();
      }
    );
  }

  changeActive(event: any, button: any) {
    //console.log(event.target.value, event.target.checked, button);
    switch (button) {
      case 'like':
        let l: boolean;
        if (event.target.checked) {
          this.formConfiguracion.patchValue({
            isLike: '1',
          });
          this.like = true;
        } else {
          this.formConfiguracion.patchValue({
            isLike: '0',
          });
          this.like = false;
        }
        break;
      case 'comentario':
        if (event.target.checked) {
          this.formConfiguracion.patchValue({
            isComentario: '1',
          });
          this.coment = true;
        } else {
          this.formConfiguracion.patchValue({
            isComentario: '0',
          });
          this.coment = false;
        }
        break;
    }

    //console.log(this.formConfiguracion.value);
  }

  prueba(){
    //console.log(this.formConfiguracion.value, this.formConfiguracion.controls['boton1'].value);
  }

  personalizarFile(event, type) {
    //(event.target.value, type);
    let w, h, logo, firma;
    if (event.target.files !== 0) {
      //console.log(event.target.files, event.target.files[0]);
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      img.src = _URL.createObjectURL(event.target.files[0]);
      img.onload = () => {
        w = img.width;
        h = img.height;
        //console.log(w + ' ' + h);
        if (type == 'logo') {
          //console.log(w, h);
          if (w <= 380 && h <= 65) {
            this.logo = event.target.files[0];
            //console.log(this.logo);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 380x65, es necesario que cambies el archivo.',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        } else if (type == 'fondo' || type == 'certificado') {
          //cosole.log(w, h);
          if (w <= 1920 && h <= 1280) {
            switch(type){
              case 'fondo':
                this.fondo = event.target.files[0];
                //console.log(this.fondo);
                break;
              case 'certificado':
                this.certificado = event.target.files[0];
                //console.log(this.certificado);
                break;
            }
            //console.log(this.firma);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 1920x1280, es necesario que cambies el archivo.',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        } /*else if (type == 'certificado') {
          //cosole.log(w, h);
          if (w <= 1920 && h <= 1280) {
            this.certificado = event.target.files[0];
            //console.log(this.firma);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 1920x1280, es necesario que cambies el archivo.',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        }*/

      }

    }


    //console.log(this.logo, this.firma);
  }

  saveConfiguration(){
    let configuracion = new FormData();
    //console.log(this.formConfiguracion.value, this.logo, this.fondo, this.certificado);
    if(this.logo != undefined){
      configuracion.append('logo', this.logo, 'logo.png');
    }
    if(this.fondo != undefined){
      configuracion.append('fondo', this.fondo, this.fondo.name);
    }
    if(this.certificado != undefined){
      configuracion.append('certificado', this.certificado, this.certificado.name);
    }
    configuracion.append('colorText', this.formConfiguracion.controls['colorText'].value);
    configuracion.append('txt_sesionUsuario', this.formConfiguracion.controls['txt_sesionUsuario'].value);
    configuracion.append('boton1Color1', this.formConfiguracion.controls['boton1Color1'].value);
    configuracion.append('boton1Color2', this.formConfiguracion.controls['boton1Color2'].value);
    configuracion.append('notificationEmail', this.formConfiguracion.controls['notificacionEmail'].value);
    configuracion.append('col_head_foot', this.formConfiguracion.controls['col_head_foot'].value);
    configuracion.append('isLike', this.formConfiguracion.controls['isLike'].value);
    configuracion.append('isComentario', this.formConfiguracion.controls['isComentario'].value);
    configuracion.append('red_facebook', this.formConfiguracion.controls['facebook'].value);
    configuracion.append('red_instagram', this.formConfiguracion.controls['instagram'].value);
    configuracion.append('red_twitter', this.formConfiguracion.controls['twitter'].value);
    configuracion.append('red_youtube', this.formConfiguracion.controls['youtube'].value);
    configuracion.append('red_tiktok', this.formConfiguracion.controls['tiktok'].value);
    configuracion.append('host', this.formConfiguracion.controls['host'].value);
    configuracion.append('username', this.formConfiguracion.controls['username'].value);
    configuracion.append('password', this.formConfiguracion.controls['contraseña'].value);
    //console.log(configuracion.getAll('logo'), configuracion.getAll('fondo'), configuracion.getAll('certificado'));
    //console.log(configuracion.getAll('isLike'),configuracion.getAll('isComentario'))
    this.session.updateConfiguration(configuracion, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha actualizado la configuración.',
          icon: 'success',
          confirmButtonColor: '#015287',
          didClose: () => {
            window.location.reload();
          }
        });
        
        
      }, (error: any) => {
        //console.log(error);
        Swal.fire({
          title: '¡Error!',
          text: 'No se ha podido actualizar la configuración.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
      }
    );
  }

}
