import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';


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
  fondo: any;
  certificado: any;

  constructor(private route: Router, private get: GetService, public helpers: HelpersService, private session: SessionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      this.getConfiguration();
      this.startForm();
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonColor: '#015287',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.helpers.type == '4') {
            this.route.navigate(['/cmtemplate']);
          } else if (localStorage.getItem('token') == null) {
            this.route.navigate(['']);
          }
        }
      });
    }
  }

  startForm() {
    this.formConfiguracion = this.formBuilder.group({
      colorText: ['', [Validators.required]],
      txt_sesionUsuario: ['', [Validators.required]],
      boton1: ['', [Validators.required]],
      boton2: ['', [Validators.required]],
      notificacionEmail: ['', [Validators.required]],
      col_head_foot: ['', [Validators.required]],
      isLike: ['', [Validators.required]],
      isComentario: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      twitter: ['', [Validators.required]],
      youtube: ['', [Validators.required]],
      host: ['', [Validators.required]],
      username: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
    });
  }

  getConfiguration() {
    this.get.getConfiguration(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data, data.colorText);

        this.formConfiguracion.patchValue({
          colorText: data.colorText,
          txt_sesionUsuario: data.txt_sesionUsuario,
          boton1: data.boton1Color1,
          boton2: data.boton1Color2,
          notificacionEmail: data.notificationEmail,
          col_head_foot: data.col_head_foot,
          isLike: data.isLike,
          isComentario: data.isComentario,
          facebook: data.red_facebook,
          instagram: data.red_instagram,
          twitter: data.red_twitter,
          youtube: data.red_youtube,
          host: data.host,
          username: data.username,
          contraseña: data.password,
        });
        console.log(this.formConfiguracion.value);

        var a = document.getElementsByClassName("bg-change");
        if (data.boton1Color1 != '' && data.boton1Color2 != '') {
          a.item(0).setAttribute("style", "background-color: " + data.boton1Color2);
          //a.item(1).setAttribute("style", "color: " + data.boton1Color1);
        }

        if (data.isLike == '1') this.like = true;
        if (data.isComentario == '1') this.coment = true;
      }
    );
  }

  changeActive(event: any, button: any) {
    console.log(event.target.value, event.target.checked, button);
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

    console.log(this.formConfiguracion.value);
  }

  prueba(){
    console.log(this.formConfiguracion.value, this.formConfiguracion.controls['boton1'].value);
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
                break;
              case 'certificado':
                this.certificado = event.target.files[0];
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

}
