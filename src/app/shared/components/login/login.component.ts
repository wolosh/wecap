import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { last } from 'rxjs';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

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

  //inicio de sesión básico
  normalLogin() {
    console.log(this.formLogin.value)
  this.session.login(this.formLogin.value.email, this.formLogin.value.password).subscribe(
    (data: Data) => {
      //console.log(data, data['token'], localStorage.getItem('token'), this.session.userName, this.session.idUser);
      localStorage.setItem('token', data['token']);
      localStorage.setItem('userName', data['full_name']);
      localStorage.setItem('type', data['is_admin']);
      localStorage.setItem('id', data['id']);
      //console.log(localStorage.getItem('token'), localStorage.getItem('userName'), localStorage.getItem('idUser') );
      if(data['is_admin'] == 0){
        this.router.navigate(['/cmtemplate']); 
      
      } else if(data['is_admin'] == 1){
        this.router.navigate(['/usuarios']); 
      
        console.log(this.helpers.cursos)
      }
    },
  );
  }
  
}
