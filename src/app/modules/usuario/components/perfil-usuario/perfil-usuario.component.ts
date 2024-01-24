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
          if(this.helpers.startDate != ''){
            console.log(this.helpers.idTopicBackUp,this.helpers.startDate)
            this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.startDate, localStorage.getItem('token'));
          }
          ////console.log(localStorage.getItem('type'));
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
    } else {
      if (localStorage.getItem('type')  == '1') {
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
        console.log(data);
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
        console.log(this.allConferencias);
      }
    );
  }

  files(id: any) {
    this.get.getFiles(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data.message);
        if (data.message == 'No encontrado') {
          console.log(data.message)

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
    //console.log(type, this.cursoSelected);
    switch (type) {
      case 'curso':
        this.get.getModules(this.cursoSelected, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            this.modulesCertifications = data;
            console.log(this.modulesCertifications);
            //this.files(id);
          }
        );
        this.modulos = 1;
        break;
      case 'modulo':
        this.get.getTemas(this.moduloSelected, localStorage.getItem('token')).subscribe((data: any) => {
          console.log(data)
          this.temasArr = data;
          //console.log(this.temasArr)
          for(let tema of this.temasArr){
            if(tema.idTopic){
              this.get.getTemaVisto(tema.idTopic, localStorage.getItem('token')).subscribe((data: any) => {
                console.log(data)
                this.visto = data.finalizado;
                console.log(this.visto)
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
          Swal.close();
        });
        this.temas = 1;
        break;

    }

  }
}
