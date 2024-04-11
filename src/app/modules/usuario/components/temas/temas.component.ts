import {
  Component, OnInit, ElementRef,
  HostListener,
  ViewChild,
  ChangeDetectorRef
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
  cols: any;
  userLike: boolean;
  showLike: any;
  coment = '';
  comentArr: any;
  description = '';
  doc = '';
  pdfSrc: string = '';
  //page = 0;
  totalPages: number;
  page: number = 1;
  isLoaded: boolean = false;
  hasFile: number = 0;
  videoShow: number = 0;

  unloadEvent = function (e) {
    var confirmationMessage = "Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?";


    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome etc.
};
  idUltimoTema: string;
  idExamBackUp: string;
  todosFinalizados: boolean;

  constructor(private hostElement: ElementRef, private activeRoute: ActivatedRoute, private dom: DomSanitizer, public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) {
    this.activeRoute.params.subscribe((params) => {
      //console.log(params);
      this.idTopic = params['idTopic'];
    });


  }

  ngOnInit(): void {
    //this.session.configuracion();
    window.addEventListener("beforeunload", this.unloadEvent);
    //console.log(this.idModule)
    if (localStorage.getItem('type') == '4') {
      Swal.fire({
        title: 'Cargando',
        text: 'Espere un momento por favor',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
           //window.onbeforeunload = this.helpers.confirmExit;
    this.helpers.name = localStorage.getItem('userName');
    //console.log(this.helpers.name)
    this.comentario = localStorage.getItem('isComentario');
    this.like = localStorage.getItem('isLike');
    this.helpers.goTop();
    //console.log(this.helpers.idModuleBackUp, localStorage.getItem('idModule'))
    this.idModule = localStorage.getItem('idModule');
          this.helpers.nameModuleBackUp = '';
          if (this.helpers.idTopicBackUp == undefined || this.helpers.nameTopicBackUp == undefined || this.helpers.nameTopicBackUp == '') {
            //this.helpers.nameTopicBackUp = localStorage.getItem('nameTopic');
            //this.helpers.idTopicBackUp = localStorage.getItem('idTopic');
          }
          //console.log(localStorage.getItem('type'), localStorage.getItem('finalizados'));
          this.helpers.type = localStorage.getItem('type');
          this.session.curso = true
          this.getConferencias(localStorage.getItem('idCertification'));
          //console.log(this.helpers.nameTopicBackUp, this.helpers.idTopicBackUp)
          //this.checkFinalizado(localStorage.getItem('finalizados'));
          //this.getTemas();
          this.checkTheme(this.idTopic);
          this.tema(this.idTopic);
          this.conferencias(localStorage.getItem('idCertification'))
          this.files(localStorage.getItem('idCertification'))
          setInterval( this.checkFocus, 200 );
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
  };

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

  checkFocus(){
    ChangeDetectorRef.prototype.detectChanges = function () {
      console.log('detectado');

    };
    /*if(document.hasFocus() == false){
      console.log('no hay foco')
    } else {
      console.log('hay foco');
    }*/
  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  colsFromTopic(id) {
    //console.log(id);
    this.get.getCols(id, localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.cols = data;
    });
  }



  tema(id: any) {
    //console.log(this.idUltimoTema)

    //console.log(localStorage.getItem('idModule'), localStorage.getItem('token'));
    this.get.getOnlyTema(id, localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      if (data.like != null) {
        this.userLike = true;
        //console.log(data.like.tipo);
        this.showLike = data.like.tipo;
        //console.log(this.showLike, this.userLike);
      } else {
        this.userLike = false;
      }
      this.helpers.nameTopicBackUp = data.title;
      this.nameTopic = data.title;
      //console.log(this.nameTopic)
      this.temasArr = data;
      //console.log(this.temasArr)
      this.medalla = data.icon_gold;
      this.colsFromTopic(data.idTopic);
      this.getComentarios(data.idTopic);
      this.idTopic = data.idTopic;
      this.helpers.idTopicBackUp = data.idTopic;
      let date = new Date();
      this.startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.helpers.startDate = this.startDate;
      console.log(this.startDate, this.helpers.startDate)
      if (data.url_video == '' || data.url_video == 'null') {
        this.videoShow = 0;
        //console.log(this.video)
      } else {
        this.videoShow = 1;

        if (data.url_video.includes('youtube') || data.url_video.includes('youtu.be')) {
          let regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
          let match = data.url_video.match(regExp);
          //console.log(match, match[0], match[1])
          //let youID = (match.length && match[2].length == 11) ? match[1] : "" //asignamos video url embed
          //console.log(youID)
          this.video = "https://www.youtube.com/embed/" + match[1];
          //console.log(this.video)
          this.chanceTow = this.dom.bypassSecurityTrustResourceUrl(this.video);
          this.swalClosed();
        } else if (data.url_video.includes('vimeo')) {
          let regExp = /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:watch\?v=)?(.+)/;
          let match = data.url_video.match(regExp);
          //console.log(match)
          this.video = "https://player.vimeo.com/video/" + match[1] + "?byline=08portrait=0"
          //console.log(this.video)
          this.chanceTow = this.dom.bypassSecurityTrustResourceUrl(this.video);
          this.swalClosed();
        }
        //console.log(this.video)
      }
      if (data.doc == '' || data.doc == 'null') {
        //console.log(data.doc)
        this.hasFile = 0;
        //console.log(this.hasFile)
      } else {
        //this.hasFile = 1;

        if (data.doc.includes('.pdf')) {
          //console.log(data.doc)
          //this.pdfSrc = 'google';
          this.hasFile = 1;
          //this.pdfSrc = this.helpers.domain + 'media/temas/docs/' + data.doc;

        } else if (data.doc.includes('.ppt') || data.doc.includes('.pptx')) {
          //console.log(data.doc)
          this.hasFile = 2;
          //this.pdfSrc = 'office';
          //this.doc = this.helpers.domain + 'media/temas/docs/' + data.doc;
          //console.log(this.doc)

        }
        this.doc = this.helpers.domain + 'media/temas/docs/' + data.doc;
        this.swalClosed();

      }

    });
    /*this.get.getTemas(localStorage.getItem('idModule'), localStorage.getItem('token')).subscribe((data: any) => {
      ////console.log(data)
      this.temasArr = data;
      console.log(this.temasArr)
      ////console.log(this.temasArr)
      Swal.close();
    });*/
  }

  async getUrl(id:any){
    let url2 = await fetch(id, {
      //mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (res) {

      let response = res;
      //console.log(response)

    }).catch(function () {
      //console.log("error");
    });
//console.log(url2)
  }


  getembenurl(video: any) {
    this.chanceTow = this.dom.bypassSecurityTrustResourceUrl(video);
    //return this.dom.bypassSecurityTrustResourceUrl(this.video);
  }

  swalClosed() {
    setTimeout(() => {
      Swal.close();
    }, 4000);
  }



  getTemas() {
    //console.log(localStorage.getItem('idModulo'), localStorage.getItem('token'))
    this.get.getTemas(localStorage.getItem('idModulo'), localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      for (let mod of data) {
        //console.log(mod)
        if (mod.idModule == this.idTopic) {
          this.nameTopic = mod.title;
        }
      }
      //console.log(this.nameTopic)
      //////console.log(this.temasArr)
      Swal.close();
    });
  }

  temaFinalizado(idTopic: any) {
    this.idUltimoTema =localStorage.getItem('idUltimoTema');
    this.idExamBackUp =localStorage.getItem('idExamBackUp');
    //console.log(idTopic, 'finalizado')
    let tema = new FormData();
    let date = new Date();
    //console.log(date)
    tema.append('idTema', this.idTopic);
    tema.append('inicio', this.startDate);
    tema.append('fin', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    tema.append('finalizado', '1');

    //console.log(tema.get('idTema'), tema.get('inicio'), tema.get('fin'))

    this.session.saveTheme(tema, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Tema finalizado!',
          text: '¡Has finalizado este tema!',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if(this.idTopic == this.idUltimoTema){
            //console.log('Es el ultimo tema')
            this.get.getTemas(localStorage.getItem('idModulo'), localStorage.getItem('token')).subscribe((data: any) => {
              for (let mod of data) {
                //console.log(mod)
                if (mod.finalizado == 0) { // Si un tema no está finalizado
                  this.todosFinalizados = false; // Cambiar la variable a false
                  //console.log(this.todosFinalizados)
                  break; // No es necesario continuar verificando los otros temas
                }else{
                  Swal.fire({
                    title: '¡Esta a punto de comenzar la evaluación!',
                    //text: '¿Deseas realizarla?',
                    html: "Si lo rechazas o sales, te contara como un intento.<br> ¿Deseas realizarla?  ",
                    icon: 'success',
                    confirmButtonColor: '#015287',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: `Cancelar`
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.route.navigate(['/test', this.idExamBackUp]).then(() => {
                        this.helpers.conferencias = true;
                        localStorage.setItem('idModule', this.helpers.idModuleBackUp);
                        localStorage.setItem('nameModule', this.helpers.nameModuleBackUp);
                      });
                    }
                  });
                }
              }
            });
          }else {
            this.route.navigate(['/seccion', this.idModule]);
          }
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
    //console.log(this.idModule, id, name)
    //his.helpers.idModuleBackUp = this.idModule;
    //this.helpers.nameModuleBackUp = name;
    this.helpers.idTopicBackUp = this.idTopic;
    this.helpers.endTheme( this.idTopic, this.startDate, localStorage.getItem('token'));
    //this.helpers.endTheme( this.idTopic, this.startDate, localStorage.getItem('token'));
    this.route.navigate(['/seccion', this.idModule]);
    //this.session.curso = true;
  }

  temasLike(id: any, like: any) {
    //console.log(id, like)
    if (like == 1) {
      this.showLike = 1;
    } else {
      this.showLike = 2;
    }
    let json = {
      "idTopic": id,
      "tipo": like
    }

    //console.log(json)

    this.session.topicLike(json, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.userLike = true;
      }
    );
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

  files(id: any) {
    this.get.getFiles(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data.message);
        if(data.message == 'No encontrado'){
          console.log(data.message)

        } else {
        this.description = data.files.description
        this.arrFiles = data.files.files;
        }
        //////console.log(this.arrFiles);
        Swal.close();
      }
    );
  }

  conferencias(id: any) {
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.allConferencias = data;
        //console.log(this.allConferencias)

      }
    );
  }

  checkTheme(id: any) {
    //console.log(id)
    this.get.checkTheme(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data)
        if (data.finalizado == true) {
          this.finalizado = 1;
          this.helpers.nameTopicBackUp = this.nameTopic + ' - Finalizado'
          //console.log(this.helpers.nameTopicBackUp)
        } else {
          this.finalizado = 0;
          this.helpers.nameTopicBackUp = this.nameTopic
        }
        this.tema(id);
      }
    );
  }

  saveComent() {
    //console.log(this.coment)

    let json = {
      "idTopic": parseInt(this.idTopic),
      "comentario": this.coment
    }
    //console.log(json);

    this.session.addComentario(json, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Comentario agregado!',
          text: '¡Tu comentario ha sido agregado!',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.getComentarios(this.idTopic);
            this.coment = '';
            //this.tema(this.idTopic);

            //this.tema(this.idTopic);
          }
        });
      }
    );
  }

  getComentarios(id: any) {
    this.get.getComentarios(this.idTopic, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        //this.tema(this.idTopic);
        this.comentArr = data;
        //console.log(this.comentArr)
      }
    );
  }

}
