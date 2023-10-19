import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  temasArr: any;
  finalizado = 0;
  arrFiles: any;
  nameFiles: any;


  constructor(public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '4') {
      Swal.fire({
        title: 'Cargando',
        text: 'Espere un momento por favor',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          this.helpers.nameModuleBackUp = '';
          if (this.helpers.idTopicBackUp == undefined || this.helpers.nameTopicBackUp == undefined || this.helpers.nameTopicBackUp == '') {
            this.helpers.nameTopicBackUp = localStorage.getItem('nameTopic');
            this.helpers.idTopicBackUp = localStorage.getItem('idTopic');
          }
          //console.log(localStorage.getItem('type'), localStorage.getItem('finalizados'));
          this.helpers.type = localStorage.getItem('type');
          this.session.curso = true
          //console.log(this.helpers.nameTopicBackUp, this.helpers.idTopicBackUp)
          this.checkFinalizado(localStorage.getItem('finalizados'));
          
          this.temas();
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

  checkFinalizado(arr:any) {
//console.log(arr);
    if (arr != null) {
      let arr2 = JSON.parse(arr);
      //console.log(arr2)
      for (let i = 0; i < arr2.length; i++) {
        //console.log(arr2[i], localStorage.getItem('idTopic'))
        if (arr2[i] == localStorage.getItem('idTopic')) {
          this.finalizado = 1;
        }
      }
    }
  }

  temas() {
    this.get.getTemas(localStorage.getItem('idModule'), localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.temasArr = data;
      //console.log(this.temasArr)
      Swal.close();
    });
  }

  temaFinalizado(idTopic: any) {
    if(localStorage.getItem('finalizados')){
    let arr = JSON.parse(localStorage.getItem('finalizados'));
    //console.log(idTopic, arr)
    arr.push(idTopic);
    //console.log(arr)
    localStorage.setItem('finalizados', JSON.stringify(arr));
    } else {
      let arr = [];
      //console.log(idTopic, arr)
    arr.push(idTopic);
    //console.log(arr)
    localStorage.setItem('finalizados', JSON.stringify(arr));
    }
    //console.log(this.helpers.finalizados, localStorage.getItem('finalizados'))
    Swal.fire({
      title: '¡Tema finalizado!',
      text: '¡Has finalizado este tema!',
      icon: 'success',
      confirmButtonColor: '#015287',
    }).then((result) => {
      //console.log(result)
      if (result.isConfirmed) {
        this.temasSeccion(localStorage.getItem('idModule'), localStorage.getItem('nameModule'));
      }
    });
  }

  public temasSeccion(id: any, name: any){
    this.helpers.idModuleBackUp = id;
    this.helpers.nameModuleBackUp = name;
    this.route.navigate(['/seccion']);
    this.session.curso = true;
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

}
