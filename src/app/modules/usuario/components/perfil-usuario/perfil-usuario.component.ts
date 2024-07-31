import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  certificaciones: any;
  modulos: number;
  public cursoSelected = '0';
  public moduloSelected = '0';
  modulesCertifications: any;
  temasArr: any;
  temas: number;
  visto: any;
  description = '';
  arrFiles: any;
  userId: any;
  timeInTheme: any;
  times = [];
  urlDiploma = '0';

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
          //console.log(this.helpers.count, this.helpers.finalizado)
          if(this.helpers.count != 0 && this.helpers.finalizado != 2){
            //console.log('si es diferente');
            this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.count, localStorage.getItem('token'), this.helpers.finalizado);
            this.helpers.pauseTimer(this.helpers.n);
            this.helpers.pauseTimer(this.helpers.interval);
          }
          /*if(this.helpers.count != 0){
            console.log(this.helpers.idTopicBackUp,this.helpers.startDate)
            this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.startDate, localStorage.getItem('token'));
          }*/
          ////console.log(localStorage.getItem('type'));
          this.helpers.pauseTimer(this.helpers.interval);
          this.helpers.type = localStorage.getItem('type');
          this.helpers.goTop();
          //this.conferencias(localStorage.getItem('idCertification'))
          //this.helpers.conferencias = true;
          this.id = localStorage.getItem('id');
          this.perfil(this.id)
          this.certifications()
          this.files(localStorage.getItem('idCertification'))
          this.getConferencias(localStorage.getItem('idCertification'));
        }
      });
    } else if (localStorage.getItem('type')  == '1') {
      this.route.navigate(['/cursos']);
      /*if (localStorage.getItem('type')  == '1') {
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
      }*/
    } else {
      this.route.navigate(['/']);
    }

  }

  certifications() {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
        Swal.close();
      }
    );
  }

  /*conferencias(id:any) {
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.allConferencias = data;
        //console.log(this.allConferencias)
      }
    );
  }*/

  perfil(id: any) {
    //console.log(id)
    this.get.getPerfil(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data, data.idUser);
        this.userId = data.idUser;
        this.allPerfil = data;
        //console.log()
      }
    );
  }

  getConferencias(idModulo: any) {
    this.get.getConferencias(idModulo, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.helpers.conferencias = true;
        this.allConferencias = data;
        //console.log(this.allConferencias);
      }
    );
  }

  files(id: any) {
    this.get.getFiles(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data.message);
        if (data.message == 'No encontrado') {
          //console.log(data.message)

        } else {
          this.session.archivos = true;
          this.description = data.files.description
          this.arrFiles = data.files.files;
        }
        //////console.log(this.arrFiles);
        Swal.close();
      }
    );
  }

  changeOption(type: any) {
    //console.log(type, this.cursoSelected, this.userId);
    this.helpers.loader();
    switch (type) {
      case 'curso':
        this.helpers.goTop();
        this.get.getModules(this.cursoSelected, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data);
            let note = 0;
            this.modulesCertifications = data;
            for(let module of this.modulesCertifications){
              console.log(module.calificacion)
              if(module.calificacion != '' && module.calificacion != 'N/A'){
                note++;
                //console.log(note)
              }
            }
            //console.log(note)
            if(note == parseInt(this.modulesCertifications.length)){
              //console.log(note, this.modulesCertifications.length)
              this.diploma(this.userId, this.cursoSelected);
            } else {
              //console.log(note, this.modulesCertifications.length)
              this.urlDiploma = '1'
            }
            //this.diploma(this.userId, this.cursoSelected);
            //console.log(this.modulesCertifications);
            //this.files(id);
          }
        );
        this.modulos = 1;
        Swal.close();
        break;
      case 'modulo':
        //console.log(this.userId);
        this.times = [];
        this.get.getTemas(this.moduloSelected, localStorage.getItem('token')).subscribe((data: any) => {
          //console.log(data)
          if(data.length == 0){
            this.temas = 0;
          } else {
          for(let tema of data){
            //console.log(tema.idTopic)
            this.get.getUserTime(tema.idTopic, this.userId, localStorage.getItem('token')).subscribe((data: any) => {
              //console.log(data);
              this.times.push(data);
              //console.log(this.times);
            });
          }
          //console.log(this.times);
          this.temasArr = data;
          //console.log(this.temasArr)
          for(let tema of this.temasArr){
            if(tema.idTopic){
              this.get.getTemaVisto(tema.idTopic, localStorage.getItem('token')).subscribe((data: any) => {
                //console.log(data)
                this.visto = data.finalizado;
                //console.log(this.visto)
                Swal.close();
              });
            }
          }
          /*for (let index = 0; index < this.temasArr.length; index++) {
            const element = this.temasArr[index];
            if (element.idTopic) {
              this.get.getTemaVisto(element.idTopic, localStorage.getItem('token')).subscribe((data: any) => {
                //console.log(data)
                this.visto = data.finalizado;
                //console.log(this.visto)
                Swal.close();
              });
            }
          }*/
            this.temas = 1;
        }
          Swal.close();
        });
        //this.temas = 1;
      
        break;

    }

  }

  //trae el diploma del usuario
  diploma(user:any, course:any){
    //console.log(user, course);
    this.get.getUserDiploma(user, course, localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data);
      if(data.code == 400){
        if(data.message == 'No se ha finalizado el modulo')
        {
          this.urlDiploma = '1';
          /*Swal.fire({
            title: '¡Error!',
            text: 'No has finalizado el curso, termina el curso para obtener tu diploma.',
            icon: 'error',
            confirmButtonColor: '#015287',
          });*/
        } else {
          this.urlDiploma = '2';
        
        /*Swal.fire({
          title: '¡Error!',
          text: 'No se ha encontrado el diploma, termina el curso o regresa mas tarde para obtenerlo.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });*/
      }
      } else {
        this.urlDiploma = this.helpers.domain + data.url;
        //window.open(this.urlDiploma, '_blank');
      }
      Swal.close();
      //console.log(this.urlDiploma);
    });
  }

  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }
}
