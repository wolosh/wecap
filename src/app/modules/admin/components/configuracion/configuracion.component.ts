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

  startForm(){
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
      constraseña: ['', [Validators.required]],
    });
  }

  getConfiguration(){
    this.get.getConfiguration(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data, data.colorText);
        if(data.boton1Color1 != ''){
          document.getElementById("button").style.backgroundColor = data.boton1Color1;
        }
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
          constraseña: data.password,
        });
        console.log(this.formConfiguracion.value);
      }
    );
  }

}
