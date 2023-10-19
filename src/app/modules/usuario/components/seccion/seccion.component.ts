import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  temasArr: any;
  certificaciones: any;
  test: boolean = false;
  arrFiles: any;
  nameFiles: any;
  showMedallas: boolean;

  constructor(public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

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
          this.helpers.nameTopicBackUp = '';
          if (this.helpers.nameModuleBackUp == undefined || this.helpers.idModuleBackUp == undefined || this.helpers.nameModuleBackUp == '') {
            this.helpers.nameModuleBackUp = localStorage.getItem('nameModule');
            this.helpers.idModuleBackUp = localStorage.getItem('idModule');
          }
          this.helpers.type = localStorage.getItem('type');
          this.session.curso = true;
          this.helpers.conferencias = true;
          //console.log(this.helpers.nameModuleBackUp)
          //console.log(localStorage.getItem('test'));
          if(localStorage.getItem('test') == 'true'){
            this.test = true;
          } 
          if(localStorage.getItem('finalizados')){
            this.showMedallas = true;
          } else {
            this.showMedallas = false;
          }
          this.certifications();
          this.temas();
          this.files();
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
          //console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cursos']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }
    }
  }

  certifications() {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
      }
    );
  }

  temas() {
    this.get.getTemas(this.helpers.idModuleBackUp, localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.temasArr = data;
      //console.log(this.temasArr)
      Swal.close();
    });
  }

  files(){
    this.get.getFiles(localStorage.getItem('idCertification'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.arrFiles = data.files;
this.nameFiles = data.files.files;
        //console.log(this.arrFiles, this.nameFiles);
        Swal.close();
      }
    );
  }

  goToTheme(id:any, name:any){
    //console.log(id);
    localStorage.setItem('idTopic', id);
    localStorage.setItem('nameTopic', name);
    this.route.navigate(['/temas']);
  }

  evaluacion(){
    localStorage.setItem('idModule', this.helpers.idModuleBackUp);
    localStorage.setItem('nameModule', this.helpers.nameModuleBackUp);
    this.route.navigate(['/test']);
  }
}
