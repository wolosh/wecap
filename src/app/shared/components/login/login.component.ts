import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { last } from 'rxjs';
import { SessionService } from 'src/app/data/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  array = [
    2,
    3,
    4,
    4,
    5,
    9,
    7,
    8,
    6,
    10,
    4,
    5,
    10,
    10,
    8,
    4,
    6,
    4,
    10,
    1]

  constructor(private formBuilder: FormBuilder, private session: SessionService) { }

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
      console.log(data);
    },
  );
  }
  
}
