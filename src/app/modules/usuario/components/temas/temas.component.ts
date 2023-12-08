import {
  Component, OnInit, ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  @ViewChild('playerContainer') playerContainer: ElementRef;

  //id del quid

  temasArr: any;
  finalizado = 0;
  arrFiles: any;
  nameFiles: any;
  public video: any;
  allConferencias: any;
  startDate = '';
  nameTopic = '';
  idTopic: any;
  medalla: any;
  chanceTow: any;
  idModule: string;
  comentario: string;
  like: string;


  constructor(private hostElement: ElementRef, private activeRoute: ActivatedRoute, private dom: DomSanitizer, public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) {
    this.activeRoute.params.subscribe((params) => {
      console.log(params);
      this.idTopic = params['idTopic'];
      this.idModule = localStorage.getItem('idModule');
      console.log(this.idTopic)
    });
  }

  ngOnInit(): void {
    //this.session.configuracion();
    this.comentario = localStorage.getItem('isComentario');
    this.like = localStorage.getItem('isLike');
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
            //this.helpers.nameTopicBackUp = localStorage.getItem('nameTopic');
            //this.helpers.idTopicBackUp = localStorage.getItem('idTopic');
          }
          //console.log(localStorage.getItem('type'), localStorage.getItem('finalizados'));
          this.helpers.type = localStorage.getItem('type');
          this.session.curso = true
          //console.log(this.helpers.nameTopicBackUp, this.helpers.idTopicBackUp)
          //this.checkFinalizado(localStorage.getItem('finalizados'));
          //this.getTemas();
          this.checkTheme(this.idTopic);
          this.tema(this.idTopic);
          this.conferencias(localStorage.getItem('idCertification'))
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

  /*checkFinalizado(arr: any) {
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
  }*/

  tema(id: any) {
    //console.log(localStorage.getItem('idModule'), localStorage.getItem('token'));
    this.get.getOnlyTema(id, localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      this.helpers.nameTopicBackUp = data.title;
      this.nameTopic = data.title;
      console.log(this.nameTopic)
      this.temasArr = data;
      console.log(this.temasArr)
      this.medalla = data.icon_gold;
      if (data.url_video.includes('youtube') || data.url_video.includes('youtu.be')) {
        let regExp  = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
        let match = data.url_video.match(regExp);
        console.log(match, match[0], match[1])
        //let youID = (match.length && match[2].length == 11) ? match[1] : "" //asignamos video url embed
        //console.log(youID)
        this.video = "https://www.youtube.com/embed/" + match[1];
        console.log(this.video)
        this.chanceTow = this.dom.bypassSecurityTrustResourceUrl(this.video);
        this.swalClosed();
      } else if(data.url_video.includes('vimeo') ){
        let regExp = /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:watch\?v=)?(.+)/;
        let match = data.url_video.match(regExp);
        console.log(match)
        this.video = "https://player.vimeo.com/video/"+match[1]+"?byline=08portrait=0"
        console.log(this.video)
        this.chanceTow = this.dom.bypassSecurityTrustResourceUrl(this.video);
        this.swalClosed();
      }
      let date = new Date();
      this.startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    });
    /*this.get.getTemas(localStorage.getItem('idModule'), localStorage.getItem('token')).subscribe((data: any) => {
      ////console.log(data)
      this.temasArr = data;
      console.log(this.temasArr)
      ////console.log(this.temasArr)
      Swal.close();
    });*/
  }

  getembenurl(video: any)
  {
    this.chanceTow = this.dom.bypassSecurityTrustResourceUrl(video);
    //return this.dom.bypassSecurityTrustResourceUrl(this.video);
  }

  swalClosed(){
    setTimeout(() => {
      Swal.close();
     }, 8000);
  }



  getTemas() {
    console.log(localStorage.getItem('idModulo'), localStorage.getItem('token'))
    this.get.getTemas(localStorage.getItem('idModulo'), localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      for (let mod of data) {
        console.log(mod)
        if (mod.idModule == this.idTopic) {
          this.nameTopic = mod.title;
        }
      }
      console.log(this.nameTopic)
      ////console.log(this.temasArr)
      Swal.close();
    });
  }

  temaFinalizado(idTopic: any) {
    console.log(idTopic, 'finalizado')
    let tema = new FormData();
    let date = new Date();

    console.log(date)

    tema.append('idTema', this.idTopic);
    tema.append('inicio', this.startDate);
    tema.append('fin', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());


    console.log(tema.get('idTema'), tema.get('inicio'), tema.get('fin'))

    this.session.saveTheme(tema, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Tema finalizado!',
          text: '¡Has finalizado este tema!',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          this.route.navigate(['/seccion', this.idTopic]);
          //console.log(result)
          /*if (result.isConfirmed) {
            this.temasSeccion(localStorage.getItem('idModule'), localStorage.getItem('nameModule'));
          }*/
        });
      }
    );
    /*if (localStorage.getItem('finalizados')) {
      let arr = JSON.parse(localStorage.getItem('finalizados'));
      ////console.log(idTopic, arr)
      arr.push(idTopic);
      ////console.log(arr)
      localStorage.setItem('finalizados', JSON.stringify(arr));
    } else {
      let arr = [];
      ////console.log(idTopic, arr)
      arr.push(idTopic);
      ////console.log(arr)
      localStorage.setItem('finalizados', JSON.stringify(arr));
    }
    ////console.log(this.helpers.finalizados, localStorage.getItem('finalizados'))
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
    });*/
  }

  public temasSeccion(id: any, name: any) {
    console.log(this.idModule,id, name)
    //his.helpers.idModuleBackUp = this.idModule;
    //this.helpers.nameModuleBackUp = name;
    this.route.navigate(['/seccion', id]);
    this.session.curso = true;
  }

  files() {
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

  conferencias(id: any) {
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data)
        this.allConferencias = data;
        console.log(this.allConferencias)
      }
    );
  }

  checkTheme(id: any) {
    console.log(id)
    this.get.checkTheme(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data)
        if (data.finalizado == true) {
          this.finalizado = 1;
          this.helpers.nameTopicBackUp = this.nameTopic + ' - Finalizado'
          console.log(this.helpers.nameTopicBackUp)
        } else {
          this.finalizado = 0;
          this.helpers.nameTopicBackUp = this.nameTopic
        }
        this.tema(id);
      }
    );
  }

}
