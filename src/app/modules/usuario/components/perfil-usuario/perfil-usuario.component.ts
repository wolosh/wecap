import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  name = localStorage.getItem('userName');
  allConferencias: any;
  id: string;
  allPerfil: any;

  constructor(public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.conferencias(localStorage.getItem('idCertification'))
    //this.helpers.conferencias = true;
    this.id = localStorage.getItem('id');
    this.perfil(this.id)
  }


  conferencias(id:any) {
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.allConferencias = data;
        //console.log(this.allConferencias)
      }
    );
  }

  perfil(id: any) {
    //console.log(id)
    this.get.getPerfil(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data.area);
        this.allPerfil = data;
      }
    );
  }
}
