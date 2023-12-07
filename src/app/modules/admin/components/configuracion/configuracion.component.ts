import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { config } from 'rxjs';


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
        console.log(data)
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
        //console.log(this.formConfiguracion.value);

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
      configuracion.append('logo', this.logo, 'logo');
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
    console.log(configuracion.getAll('logo'))
    this.session.updateConfiguration(configuracion, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha actualizado la configuración.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        this.getConfiguration();
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
