import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  togglePassword: boolean; //Fin CheckBox para mostrar contraseña

  constructor(private formBuilder: FormBuilder, private session: SessionService, private router: Router, private helpers: HelpersService) { }

  ngOnInit(): void {
    this.startForm();
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
    console.log(this.formLogin.value)
    Swal.fire({
      title: 'Iniciando Sesión...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
        this.session.login(this.formLogin.value.email, this.formLogin.value.password).subscribe(
          (data: Data) => {

            //console.log(data, data['token'], localStorage.getItem('token'), this.session.userName, this.session.idUser);
            localStorage.setItem('token', data['token']);
            localStorage.setItem('userName', data['full_name']);
            if(data['is_admin'] == 0){
              localStorage.setItem('type', '4');
            } else {
            localStorage.setItem('type', data['is_admin']);
            }
            localStorage.setItem('id', data['id']);
            console.log(localStorage.getItem('type'))
            this.helpers.type = localStorage.getItem('type');
            console.log(localStorage.getItem('type'), this.helpers.type)
            //console.log(localStorage.getItem('token'), localStorage.getItem('userName'), localStorage.getItem('idUser') );
            if (data['is_admin'] == 0) {
              this.router.navigate(['/cmtemplate']);

            } else if (data['is_admin'] == 1) {
              this.router.navigate(['/cursos']);

              console.log(this.helpers.cursos)
            }
          }, (e: any) => {
            console.log(e.error.error);
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
