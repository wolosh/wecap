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
  arrFiles: any;
  facebook: any;
  instagram: any;
  twitter: any;
  youtube: any;
  archivos = false;
  constructor(private session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    /*if(localStorage.getItem('token') == null){
      window.location.href = '/login';
    } else if(localStorage.getItem('type') == '0'){
      ////console.log('Usuario');
    }*/
    if (localStorage.getItem('type') == '4') {
      this.helpers.goTop();
      Swal.fire({
        title: 'Cargando',
        text: 'Espere un momento por favor',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          ////console.log(localStorage.getItem('type'));
          this.helpers.type = localStorage.getItem('type');
          this.profile();
          this.certifications();
          this.helpers.cursos = 1;
          this.session.curso = false;
          if(this.session.cursos == 1){
            this.changeViewCourses(1);
          } else if(this.session.cursos == 2){
            this.changeViewCourses(2, this.session.idCertification);
          }
          this.helpers.conferencias = false;
          this.helpers.pauseTimer(this.helpers.interval);
        }
      });
    } else {
      if (localStorage.getItem('type') == '1') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          ////console.log(result)
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
        ////console.log(data);
        this.email = data;
        ////console.log(this.email);
        this.certifications();
      }
    );
  }

  changeViewCourses(view: any, id?: any) {
    ////console.log(view, id);
    if(id){
      this.session.idCertification = id;
      //console.log(this.session.idCertification);
    }
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
            localStorage.setItem('idCertification', id);
            //this.helpers.conferencias = true;

            this.session.archivos = true;
            this.helpers.conferencias = true;
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
        ////console.log(this.certificaciones);
        Swal.close();
      }
    );
  }

  modules(id: any) {
    this.get.getModules(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.modulesCertifications = data;
        //console.log(this.modulesCertifications);
        this.files(id);
      }
    );
  }

  files(id: any) {
    this.get.getFiles(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        ////console.log(data);
        this.arrFiles = data.files;
        //////console.log(this.arrFiles);
        Swal.close();
      }
    );
  }

  verTemas(idModulo: any, nameMod: any){
    this.route.navigate(['/seccion', idModulo]).then(() => {
      this.helpers.conferencias = true;
    });
  }

  /*verTemas(idMod: any, nameMod: any) {
    localStorage.setItem('idModule', idMod);
    localStorage.setItem('nameModule', nameMod);
    this.helpers.idModuleBackUp = idMod;
    this.helpers.nameModuleBackUp = nameMod;
    this.helpers.conferencias = true;
    //////console.log(this.helpers.idModuleBackUp, this.helpers.nameModuleBackUp);
    this.route.navigate(['/seccion']);
  }*/

  change(id: any) {
    if (id == 1) {
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }
}
