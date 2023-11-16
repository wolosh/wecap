import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  allConferencias: any;
  idModule: any;
  finalizado = 0;
  nameModule = '';
  idExamBackUp: any;
  showModal = false;

  constructor( private activeRoute: ActivatedRoute, public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) {
    this.activeRoute.params.subscribe((params) => {
      //console.log(params);
      this.idModule = params['idModule'];
      //console.log(this.idModule)
    });
   }

  ngOnInit(): void {
    //console.log(localStorage.getItem('idCertification'));
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
            //this.helpers.nameModuleBackUp = localStorage.getItem('nameModule');
            this.helpers.idModuleBackUp = this.idModule;
          }
          
          this.helpers.type = localStorage.getItem('type');
          this.session.curso = true;
          this.helpers.conferencias = true;
          //console.log(this.helpers.type, this.session.curso)
          ////console.log(localStorage.getItem('test'));
          /*if(localStorage.getItem('test') == 'true'){
            this.test = true;
          }
          if(localStorage.getItem('finalizados')){
            this.showMedallas = true;
          } else {
            this.showMedallas = false;
          }*/
          this.certifications();
          this.temas();
          this.files();
          this.checkFinalizado()
          this.conferencias(localStorage.getItem('idCertification'));
          this.getModules(localStorage.getItem('idCertification'));
          this.getInfoExam(this.idModule);
          this.getMedallas(this.idModule);
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

  checkFinalizado() {
    this.get.checkModule(this.idModule, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if(data.finalizado == true){
          this.finalizado = 1;
          this.helpers.nameModuleBackUp = this.nameModule + ' - Finalizado'
        } else {
          this.finalizado = 0;
          this.helpers.nameModuleBackUp  = this.nameModule
        }
        //console.log(data);
      }
    );
  }

  getMedallas(id:any){
    this.get.medallas(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if(data.length > 0){
          this.showMedallas = true;
        } else {
          this.showMedallas = false;
        }
        
      }
    );
  }

  getModules(id:any) {
    this.get.getModules(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        for(let mod of data){
          //console.log(mod)
          if(mod.idModule == this.idModule){
            this.nameModule = mod.title;
            localStorage.setItem('idModulo', mod.idModule);
          }
        }
        //console.log(this.nameModule)
        ////console.log(this.temasArr);
      }
    );
  }

  certifications() {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        ////console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
      }
    );
  }

  temas() {
    this.get.getTemas(this.idModule, localStorage.getItem('token')).subscribe((data: any) => {
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

  goToTheme(idTopic:any, name:any){
    //console.log(id);
    this.route.navigate(['/temas', idTopic]).then(() => {
      //this.helpers.conferencias = true;
    }); 
    //localStorage.setItem('idTopic', id);
    //localStorage.setItem('nameTopic', name);
    //console.log(localStorage.getItem('idTopic'), localStorage.getItem('nameTopic'));
    //this.route.navigate(['/temas']);
  }

  evaluacion(){
    if(this.showModal == true){
      Swal.fire({
        title: '¡Error!',
        text: 'Aún no tienes asignado un exámen para este modulo, continua con los temas o regresa mas tarde.',
        icon: 'error',
        confirmButtonColor: '#015287',
      })
    } else {
    this.route.navigate(['/test', this.idExamBackUp]).then(() => {
      this.helpers.conferencias = true;
      localStorage.setItem('idModule', this.helpers.idModuleBackUp);
    localStorage.setItem('nameModule', this.helpers.nameModuleBackUp);
    }); 
  }
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

  getInfoExam(id: any) {
    this.test = false;
    //console.log(id);
    this.get.getInfoExamen(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if(data.message == 'No se encontro examen para el modulo indicado'){
          this.test = false;
          this.showModal = true;
        } else {

        this.idExamBackUp = data.idExamen;
        //console.log(this.idExamBackUp)
        this.get.getCalificacion(data.idExamen, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data.calificacion);
            if(parseInt(data.calificacion) > 0){
              this.test = true;
            } else {
              this.test = false;
            }
            ////console.log(parseInt(data.calificacion));
            //console.log(this.test)
          }
        );
        }

      }
    );
  }
}
