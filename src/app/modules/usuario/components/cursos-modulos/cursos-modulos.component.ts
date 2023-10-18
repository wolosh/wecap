import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cursos-modulos',
  templateUrl: './cursos-modulos.component.html',
  styleUrls: ['./cursos-modulos.component.css']
})
export class CursosModulosComponent implements OnInit {
  slides = [
    { image: 'assets/img/carousel1.svg', text: 'Corporativo' },
    { image: 'assets/img/carousel2.svg', text: 'Promocional' },
    { image: 'assets/img/carousel3.svg', text: 'Documental' },
    { image: 'assets/img/carousel4.svg', text: 'Animación' }
  ];
  showIndicator = false;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;
  email: any;
  certificaciones: any;
  modulesCertifications: any;
  cursos = 1;
  certificationBackup: any;
  constructor(private session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    /*if(localStorage.getItem('token') == null){
      window.location.href = '/login';
    } else if(localStorage.getItem('type') == '0'){
      console.log('Usuario');
    }*/
    if (localStorage.getItem('type') == '4') {
      console.log(localStorage.getItem('type'));
      this.helpers.type = localStorage.getItem('type');
      this.profile();
      this.certifications();
      this.helpers.cursos = 1;
    } else {
      if (localStorage.getItem('type') == '1') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cursos']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }
    }
  }

  profile() {
    this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.email = data;
        console.log(this.email);
        this.certifications();
      }
    );
  }

  changeViewCourses(view: any, id?: any) {
    console.log(view, id);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (view) {
          case 1:
            this.cursos = 1;
            this.certifications();
            break;
          case 2:
            this.cursos = 2;
            this.modules(id);
            break;
        }
      }
    });
  }

  certifications() {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        console.log(this.certificaciones);
        Swal.close();
      }
    );
  }

  modules(id:any){
    this.get.getModules(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.modulesCertifications = data;
        console.log(this.modulesCertifications);
        this.files(id);
      }
    );
  }

  files(id:any){
    this.get.getFiles(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.close();
      }
    );
  }

  verTemas(idMod:any){
    this.route.navigate(['/temas']).then(() => {
      window.location.reload();
      this.helpers.idModuleBackUp = idMod;
    });          
  }

  change(id: any) {
    if (id == 1) {
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }

}
