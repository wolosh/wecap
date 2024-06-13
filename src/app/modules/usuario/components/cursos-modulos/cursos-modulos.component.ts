import { Component, OnInit, HostListener, ChangeDetectorRef  } from '@angular/core';
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
  width: number; 
  showIndicator = false;
  itemsPerSlide: number;
  singleSlideOffset = true;
  noWrap = true;
  email: any;
  certificaciones: any;
  modulesCertifications = [] as any;
  cursos = 1;
  certificationBackup: any;
  arrFiles = [] as any;
  facebook: any;
  instagram: any;
  twitter: any;
  youtube: any;
  archivos = false;
  finalizado: any;
  idModulo: any;
  medallas: any;
  tipo: any;
  medalla: any;
  description = '';
  allConferencias: any;
  image: any;
  constructor(private cdr: ChangeDetectorRef, private session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.onResize({ target: { innerWidth: window.innerWidth } });
    //this.adjustItemsPerSlide(window.innerWidth);
    //this.changeItemsPerSlide();
    //console.log(this.helpers.view);
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
          if(this.helpers.startDate != ''){
            console.log(this.helpers.idTopicBackUp,this.helpers.startDate)
            this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.startDate, localStorage.getItem('token'));
          }
          ////console.log(localStorage.getItem('type'));
          this.helpers.type = localStorage.getItem('type');
          this.profile();
          this.certifications();
          this.getFiles();
          this.helpers.cursos = 1;
          this.session.curso = false;
          //console.log(this.session.cursos)
          if(this.session.cursos == 1){
            this.changeViewCourses(1);
          } else if(this.session.cursos == 2){
            this.changeViewCourses(2, this.session.idCertification);
          }
          this.helpers.conferencias = false;
          this.helpers.pauseTimer(this.helpers.interval);
        }
      });
    } else if (localStorage.getItem('type') != '4') {
      this.route.navigate(['/cursos']);
      /*if (localStorage.getItem('type') != '4') {
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

 
  /*@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.width = event.target.innerWidth;
    if (this.width < 600) { // Móvil
      this.itemsPerSlide = 1;
      console.log("Movil",this.width, this.itemsPerSlide)
    } else if (this.width < 1200) { // Tablet
      this.itemsPerSlide = 2;
      console.log("Tablet",this.width, this.itemsPerSlide)
    } else { // Web
      this.itemsPerSlide = 3;
      console.log("Web",this.width, this.itemsPerSlide)
    }
	}*/

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.width = event.target.innerWidth;
    if (this.width < 600) { // Móvil
      this.itemsPerSlide = 1;
      console.log("Movil",this.width, this.itemsPerSlide)
    } else if (this.width < 1200) { // Tablet
      this.itemsPerSlide = 2;
      console.log("Tablet",this.width, this.itemsPerSlide)
    } else { // Web
      this.itemsPerSlide = 3;
      console.log("Web",this.width, this.itemsPerSlide)
    }
    this.cdr.detectChanges();
  }

  /*@HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustItemsPerSlide(event.target.innerWidth);
  }

  adjustItemsPerSlide(width: number): void {
    if (width < 600) { // Móvil
      this.itemsPerSlide = 1;
    } else if (width < 1200) { // Tablet
      this.itemsPerSlide = 2;
    } else { // Web
      this.itemsPerSlide = 3;
    }
  }*/

  changeViewCourses(view: any, id?: any) {
    //console.log(view, id);
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
            //console.log(this.certificaciones)
            this.certifications(id);
            this.cursos = 2;
            /*this.certificaciones.forEach(element => {
              //console.log(element.idCertification, id);
              if(element.idCertification == id){
                this.helpers.view = element.secuencial;
                localStorage.setItem('view', element.secuencial);
              }
              //console.log(this.helpers.view, localStorage.getItem('view'))
            });
            this.modules(id);
            localStorage.setItem('idCertification', id);
            //this.helpers.conferencias = true;

            this.session.archivos = true;
            this.helpers.conferencias = true;
            break;*/
        }
      }
    });
  }

  certifications(recharge?:any) {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
        if(recharge){
          this.certificaciones.forEach(element => {
            //console.log(element.idCertification, recharge);
            //console.log(element.idCertification);
            if(element.idCertification == recharge){
              //console.log(element.secuencial);
              if(element.secuencial == 2){
                this.helpers.view = 0;
              } else {
              this.helpers.view = element.secuencial;
              localStorage.setItem('view', element.secuencial);
              }
            }
            //console.log(this.helpers.view, localStorage.getItem('view'))
          });
          this.modules(recharge);
          localStorage.setItem('idCertification', recharge);
          //this.helpers.conferencias = true;

          this.session.archivos = true;
          this.helpers.conferencias = true;
        }
        Swal.close();
      }
    );
  }

  getFiles(){
    this.get.getMedia(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
      }
    );
  }

  modules(id: any) {
    this.get.getModules(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        this.modulesCertifications = []
        console.log(this.helpers.view, this.cursos, data, data.icon, data.finalizado);


        //this.modulesCertifications = data;
        //console.log(this.modulesCertifications.finalizado);
        for (let item of data) {
          console.log(item)
          this.modulesCertifications.push(item);
          console.log(this.modulesCertifications)
          this.finalizado = item.finalizado
          console.log()
          this.idModulo = item.idModule;
          this.get.medallas(this.idModulo, localStorage.getItem('token')).subscribe(
            (data: any) => {
              this.medallas=data;
              for (let item of this.medallas) {
                this.tipo = item.tipo
                /*if(this.tipo == 'medal_perfect' ){
                  this.medalla == item.img

                } else if(this.tipo == 'medal_perfect' ){
                  this.medalla == item.img
                }
                else if(this.tipo == 'medal_perfect' ){
                  this.medalla == item.img
                }*/
              }

              /*if(this.finalizado == '1' ){

          }*/
              /*if (data.length > 0) {
                this.showMedallas = true;
              } else {
                this.showMedallas = false;
              }*/

            }
          );
          //console.log(this.finalizado)
          /*if(this.finalizado == '1' ){

          }*/
        }
        this.files(id);
        this.getConferencias(localStorage.getItem('idCertification'));
      }
    );
  }

  /*getMedallas(id: any) {
    this.get.medallas(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        /*if (data.length > 0) {
          this.showMedallas = true;
        } else {
          this.showMedallas = false;
        }

      }
    );
  }*/

  files(id: any) {
    this.get.getFiles(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data.message, data);
        if(data.message == 'No encontrado'){
          console.log(data.message)

        } else {
        this.description = data.files.description
       Object.keys(data.files.files).forEach((key) => {
        console.log(data.files.files[key], key);
        this.arrFiles.push(data.files.files[key])
       });
        console.log(this.arrFiles)
        }
        //////console.log(this.arrFiles);
        Swal.close();
      }
    );
  }

  moduleUniversal(id: any, name: any) {
    this.route.navigate(['/seccion', id]).then(() => {
      this.helpers.conferencias = true;
    });
  }

  verTemas(idModulo: any, nameMod: any){
    //console.log(this.helpers.view)
    //console.log(idModulo, this.modulesCertifications);
    let c;
    this.modulesCertifications.forEach((element, index) => {
      //console.log(element, element.idModule, index)
      if (element.idModule == idModulo) {
        c = index;
        //console.log(c, (c-1))
        if(c == 0){
          //console.log('es el primero')
          this. moduleUniversal(idModulo, nameMod);
          //console.log(c)
        } else {
          //console.log(c)
          if (this.modulesCertifications[c - 1].finalizado == '1') {
            //console.log('es el otro', this.modulesCertifications[c - 1])
            this. moduleUniversal(idModulo, nameMod);
          } else {
            //console.log(c)
            Swal.fire({
              title: '¡Error!',
              text: 'Aún no has finalizado el módulo anterior, continua con el módulo o regresa mas tarde.',
              icon: 'error',
              confirmButtonColor: '#015287',
            })
          }
        }
      }
    });

    /*this.route.navigate(['/seccion', idModulo]).then(() => {
      this.helpers.conferencias = true;
    });*/
  }

  getConferencias(idModulo: any) {
    this.get.getConferencias(idModulo, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.helpers.conferencias = true;
        this.allConferencias = data;
      }
    );
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
