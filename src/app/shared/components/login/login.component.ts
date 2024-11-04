import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { GetService } from 'src/app/data/services/get.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //private config: {version: string};;
  formLogin: FormGroup;
  togglePassword: boolean; //Fin CheckBox para mostrar contraseña
  logo: string;

  constructor(private httpClient: HttpClient, private get: GetService,private formBuilder: FormBuilder, private session: SessionService, private router: Router, public helpers: HelpersService) { }

  ngOnInit(): void {
    /*this.config = require("src/assets/config.json");
    console.log(this.config.version);

    const headers = new HttpHeaders().set('Cache-Control', 'no-cache').set('Pragma', 'no-cache');
    this.httpClient
      .get<{ version: string }>("/assets/config.json", {headers})
      .subscribe(config => {
        console.log(config.version);
       if (config.version !== this.config.version) {
          location.reload(); 
        }
      });*/
  

    this.helpers.goTop();
    this.helpers.pauseTimer(this.helpers.n);
      this.helpers.pauseTimer(this.helpers.interval);
    if(this.helpers.count != 0 && this.helpers.finalizado != 2){
      //console.log('si es diferente');
      this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.count, localStorage.getItem('token'), this.helpers.finalizado);
      this.helpers.pauseTimer(this.helpers.n);
      this.helpers.pauseTimer(this.helpers.interval);
    }
    if(!localStorage.getItem('token')){
    this.startForm();
    } else{
      if(localStorage.getItem('type') == '4'){
        this.router.navigate(['/cmtemplate']);
      } else if(localStorage.getItem('type') == '1'){
        this.router.navigate(['/cursos']);
      }
    }
    //this.logo = localStorage.getItem('logo');
  }

  getLogo(){
    return this.helpers.domain + 'media/logo.png'
  }

  startForm(): void {
    //Metodo para inicializar el formulario
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  //CheckBox para mostrar contraseña
  showPassword(event) {
    if (event.target.checked) {
      this.togglePassword = true;
    } else {
      this.togglePassword = false;
    }
  }

  //inicio de sesión básico
  normalLogin() {
    this.helpers.pauseTimer(this.helpers.interval);
    this.helpers.pauseTimer(this.helpers.n);
    //console.log(this.formLogin.value)
    Swal.fire({
      title: 'Iniciando Sesión...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
        this.session.login(this.formLogin.value.email, this.formLogin.value.password).subscribe(
          (data: Data) => {
            console.log(data)
            //console.log(data, data['token'], localStorage.getItem('token'), this.session.userName, this.session.idUser);
            localStorage.setItem('token', data['token']);
            localStorage.setItem('userName', data['full_name']);
                      // Guardar idUser si está en la respuesta
          if (data['id']) {
            localStorage.setItem('idUser', data['id']); 
          }
            //console.log(localStorage.getItem('userName'))
            if(data['is_admin'] == 0){
              localStorage.setItem('type', '4');
            } else {
              localStorage.setItem('type', data['is_admin']);
            }
            this.helpers.type = localStorage.getItem('type');
            //this.helpers.name = localStorage.getItem('userName');
            localStorage.setItem('id', data['id']);
            //console.log(localStorage.getItem('type'))
            //console.log(localStorage.getItem('type'), this.helpers.type)
            //console.log(localStorage.getItem('token'), localStorage.getItem('userName'), localStorage.getItem('idUser') );
            if (data['is_admin'] == 0) {
              this.router.navigate(['/cmtemplate']);
              //console.log(localStorage.getItem('userName'))

            } else if (data['is_admin'] == 1) {
              this.router.navigate(['/cursos']);
              //console.log(this.helpers.cursos)
              //console.log(localStorage.getItem('userName'))
            }
          }, (e: any) => {
            //console.log(e.error);
            Swal.fire({
              icon: 'error',
              title: 'Ups',
              text: e.error.error,
              confirmButtonColor: '#1c4a83',
            });
          }
        );
      }
    });
  }

}
