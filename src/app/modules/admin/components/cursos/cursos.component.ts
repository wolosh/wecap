import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

isNewModule: number = 0;
isNewTheme: number = 0;
  objUsers = [] as any;
  showArr = [] as any;
  showLength = 0;
  searchActive = false;
  certificaciones: any;
  formNewCurso: FormGroup;
  formEdit: FormGroup;
  formDiploma: FormGroup;
  formNewMat: FormGroup;
  formSearch: FormGroup;
  image: any;
  formData = new FormData();
  exam: any;
  w: any;
  h: any;
  materias: any;
  grupos: any[];
  user: any;
  chief: any;
  view = 0;
  name: any;
  group: any
  public groupSelected = '0';
  public teacherSelected = '0';
  public searchSelect = '0';
  public text1 = '';
  cview1 = 0;
  course = '';
  p: number = 1;
  pt: number = 1;
  pc: number = 1;
  countCert: number = 0;
  pm: number = 1;
  pg: number = 1;
  pgm: number = 1;
  idCertification: any;
  bf: any;
  active: any;
  allModules: any[];
  hasDiploma: boolean;
  logo: any;
  firma: any;
  agMat = 0;
  teachers: any;
  searchArray: any[];
  length = 0;
  public imgIcono: any;
  public imgTermina: any;
  public imgScore: any;
  public imgTiempo: any;
  public imgTema: any;
  public imgTemaV: any;
  modulos: any;
  viewE: number;
  alltemas: any;
  idModulo: any;
  formModulo: FormGroup;
  infoModule: any;
  imgicon: any;
  viewTemasE: number;
  formTemas: FormGroup;
  idTema: any;
  color: any;
  imgIconoblob: any;
  imgTerminablob: any;
  imgScoreblob: any;
  imgTiempoblob: any;
  imgBlob: any;
  imgTemablob: any;
  activeM: any;


  constructor(private sanitizer: DomSanitizer, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) { }

  ngOnInit(): void {
    this.helpers.goTop();
    Swal.close();
    if (localStorage.getItem('type') == '1') {

      //console.log(this.searchArray)
      //console.log(localStorage.getItem('name'));
      this.helpers.type = localStorage.getItem('type');
      this.helpers.name = localStorage.getItem('name');
      this.helpers.goTop();
      this.certifications();
      //this.helpers.cursos = 1;
      this.startForm(1);
      //console.log(this.view)
    } else {
      if (localStorage.getItem('type') == '4') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cmtemplate']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }
    }
  }



  onClickTab(tab: string) {
    //console.log(this.p, this.pm, this.pg);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (tab) {
          case 'courses':
            this.p = 1;
            this.cview1 = 0;
            this.imgIcono = '';
            this.imgTermina = '';
            this.imgScore = '';
            this.imgTiempo = '';
            this.isNewModule = 0;
            this.viewE = 0;
            this.isNewTheme = 0;
        this.viewTemasE = 0;
            this.certifications();
            break;
          case 'mat':
            this.pm = 1;
            this.agMat = 0;
            this.allMaterias();
            break;
          case 'groups':
            /*this.pg = 1;
            this.pgm = 1;
            this.view = 0;*/
            this.erase();
            this.users('modify');
            this.startForm(4);
            this.groups();
            break;
        }
      }
    });


  }

  erase() {
    this.searchSelect = '0';
    this.objUsers = [];
    this.text1 = '';
    this.view = 0;
    this.chief = 0;
    this.name = '';
    this.pgm = 1;
    this.pg = 1;
    this.groupSelected = '0';
    this.showLength = 0;
    this.showArr = [];
    this.length = 0;
    this.searchArray = [];
    //console.log(this.chief, this.view);
  }

  getPage(page: any) {
    //console.log(page);
    this.p = page;
  }

  startForm(id: any): void {
    //Metodo para inicializar el formulario
    if (id == 1) {
      this.formNewCurso = this.formBuilder.group({
        title: [''],
        description: [''],
        //img: [''],
        default_active_days: [''],
        //hasExam: [''],
      });
    } else if (id == 2) {
      this.formEdit = this.formBuilder.group({
        title: [''],
        description: [''],
        //img: [''],
        default_active_days: [''],
        //hasExam: [''],
      });

      this.formDiploma = this.formBuilder.group({
        cursoID: [''],
        encargado: [''],
        puesto: [''],
        activado: [''],
      });
    } else if (id == 3) {
      this.formNewMat = this.formBuilder.group({
        name: [''],
        teacher: [''],
      });
    } else if (id == 4) {
      this.formSearch = this.formBuilder.group({
        filter: [''],
        search: [''],
        group: [''],
        users: [''],
      });
    } else if (id == 5) {
      this.formModulo = this.formBuilder.group({
        cursoId: [''],
        title: [''],
        descripcion: [''],
        duracion: [''],
        score: [''],
        color: [''],
        url_video: [''],
      });
      Swal.close();
    }
    else if (id == 6) {
      this.formTemas = this.formBuilder.group({
        title: [''],
        description: [''],
        url_video: [''],
        url_subtitulos: [''],
      });
    }
  }

  init(event: any) {
    //console.log(event, this.hasDiploma)
    if (this.hasDiploma == true) {
      this.startForm(3);

    }
  }

  certifications() {
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        this.countCert = this.certificaciones.length;
        //console.log(this.certificaciones);
        Swal.close();
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  //juntamos changeGroup y changeTeacher
  changeOption(type: any, search?: any) {
    //console.log(type, this.teacherSelected, this.groupSelected);
    switch (type) {
      case 'teacher':
        this.formNewMat.controls['teacher'].setValue(this.teacherSelected);
        break;
      case 'search':
        //console.log(this.searchSelect)
        if (this.searchSelect == '1') {
          this.formSearch.controls['filter'].setValue('nombre');
        } else if (this.searchSelect == '2') {
          this.formSearch.controls['filter'].setValue('area');
        } else if (this.searchSelect == '3') {
          this.formSearch.controls['filter'].setValue('puesto');
        }
        //console.log(this.formSearch.value, this.formSearch.value.filter);
        break;

    }

  }

  selectFile(event, type) {
    //console.log(event.target.value)
    if (type == 'img') {
      //console.log(event.target.files, event.target.files[0]);
      this.image = event.target.files[0];
      //console.log(this.image, this.image.name);
    } else {
      switch (event.target.value) {
        case '0':
          this.exam = '0';
          //this.formData.append('hasExam', '0');
          break;
        case '1':
          this.exam = '1';
          //this.formData.append('hasExam', '1');
          break;
      }
    }
  }

  //Crear nuevo curso
  saveCourse(kind: any, id?: any) {
    let send = new FormData();
    //console.log(this.formNewCurso.value, this.image, this.exam)
    switch (kind) {
      case 'create':
        send.append('title', this.formNewCurso.value.title);
        send.append('description', this.formNewCurso.value.description);
        if(this.image != undefined){
          //console.log(this.image)
        send.append('img', this.image, this.image.name);
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Selecciona una imagen.',
            icon: 'error',
            confirmButtonColor: '#015287',
          });
          send.delete('title');
          send.delete('description');
          send.delete('img');
          send.delete('default_active_days');
          send.delete('hasExam');
        }
        //console.log( send.getAll('img'),  send.getAll('title'),  send.getAll('description'));
        send.append('default_active_days', this.formNewCurso.value.default_active_days);
        send.append('hasExam', this.exam);

        //console.log( send.getAll('hasExam'),  send.getAll('default_active_days'),  send.get);
        this.session.newCurso(send, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Creado con exito!',
              text: 'El curso ha sido creado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            });
            this.certifications();
            this.formNewCurso.value.title = '';
            this.formNewCurso.value.description = '';
            this.exam = '';
            this.formNewCurso.value.default_active_days = '';
            this.formNewCurso.value.hasExam = '';
          }
        );
        break;
      case 'edit':
        //console.log(this.image)
        this.formData.append('title', this.formEdit.value.title);
        this.formData.append('description', this.formEdit.value.description);
        this.formData.append('hasExam', this.exam);
        this.formData.append('default_active_days', this.formEdit.value.default_active_days);
        if (this.image != undefined) {
          this.formData.append('img', this.image, this.image.name);
        } else {
          this.formData.append('img', this.image);
        }
        //console.log(this.formData.getAll('image'), this.formData.getAll('title'), this.formData.getAll('description'));
        this.session.editCourse(id, this.formData, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);}
            Swal.fire({
              title: '¡Actualizado con exito!',
              text: 'El curso ha actualizado creado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            });
            this.certifications();
          }
        );
        break;
    }
  }

  allMaterias() {
    this.materias = [];
    this.get.getMaterias(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.materias = data;
        //console.log(this.materias);
        Swal.close();
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }
  //trae los grupos
  groups() {
    this.get.getGroups(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.group = data.grupos;
        //console.log(this.group);
        Swal.close();
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  //trae los usuarios
  users(type: any) {
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if (type == 'modify') {
          this.user = data.users;
        } else if (type == 'show') {
          this.searchArray = data.users;
          this.length = data.users.length;
          //console.log(this.searchArray, this.length)
        }
        Swal.close();
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  changeViewMat(id: any) {
    //console.log(id);
    this.agMat = id;
    if (id == 1) {
      this.startForm(3);
      this.get.getTeachers(localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          this.teachers = data;
          //console.log(this.teachers)
        },
        (error: any) => {
          this.helpers.logout();
        }
      );
    }
  }

  //cambia la vista de cursos
  changeViewCourses(view: any, name?: any, id?: any) {
    //console.log(view, name, id);
    switch (view) {
      case 'back':
        this.pt = 1;
        this.p = 1;
        this.cview1 = 0;
        break;
      case 'editc':
        this.pt = 1;
        this.p = 1;
        this.cview1 = 1;
        for (let item of this.certificaciones) {
          if (item.title == name) {
            //console.log(item.idCertification)
            this.idCertification = item.idCertification;
            this.modules(item.idCertification);
            this.diploma(item.idCertification);
            this.course = item.title;
            this.active = item.is_active;
            this.startForm(2);
            this.formEdit.controls['title'].setValue(item.title);
            this.formEdit.controls['description'].setValue(item.description);
            this.formEdit.controls['default_active_days'].setValue(item.default_active_days);
            this.bf = item.img;
            this.exam = parseInt(item.hasExam);
            //console.log(item, this.formEdit.value, this.exam, this.bf, this.active);
          }
        }
        break;
    }

  }

  //cambia el status de los cursos
  statusCourses(set: any) {
    let formData = new FormData();
    formData.append('is_active', set);
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#A6DAFC',
      confirmButtonText: '¡Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Actualizando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.session.statusCourse(this.idCertification, formData, localStorage.getItem('token')).subscribe(
              (data: any) => {
                //console.log(data);
                this.cview1 = 0;
                Swal.fire({
                  title: '¡Actualizado!',
                  text: 'El status ha sido actualizado.',
                  icon: 'success',
                  confirmButtonColor: '#015287',
                });
                this.certifications();
              }
            );
          }
        })
      }
    });
  }

  //cambia la vista de grupos
  changeViewGroups(id: any, type: any, user?: any, name?: any) {
    if (type == 'modiGroup') {
      this.objUsers = [];
      //console.log(id, user);
      this.chief = user;
      this.view = id;
      this.name = name;
      //console.log(this.chief, this.view);
      this.groups();
    } else if (type == 'inicio') {
      this.objUsers = []
      this.view = id;
      this.chief = 0;
      this.name = '';
      //console.log(this.chief, this.view);
      this.groups();
      this.startForm(4);
    }
  }

  //trae los modulos de una certificación
  modules(id: any) {
    //console.log(id);
    this.get.getModules(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.allModules = data;
        //console.log(this.allModules)
        Swal.close();
      }, 
      (error: any) => {
        this.helpers.logout();
      }
    );
  }
  //cambia la vista a Modulo
  changeViewModulo(view: any, id?: any, name?: any) {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (view) {
          case 'back':
            this.imgIcono = '';
            this.imgTermina = '';
            this.imgScore = '';
            this.imgTiempo = '';
            this.isNewModule = 0;
            this.viewE = 0;
            this.cview1 = 1;
            this.modules(this.idCertification);
            break;
          case 'editm':
            this.imgIcono = '';
            this.imgTermina = '';
            this.imgScore = '';
            this.imgTiempo = '';
            this.pt = 1;
            this.p = 1;
            this.pc = 1;
            this.isNewModule = 2;
            this.viewE = 1;
            this.cview1 = 2;
            this.startForm(5);
            this.get.getinfoModulo(id, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data)
                this.idModulo = data.idModule;
                this.temas(this.idModulo);
                this.formModulo.controls['title'].setValue(data.title);
                this.formModulo.controls['descripcion'].setValue(data.description);
                this.formModulo.controls['duracion'].setValue(data.max_time);
                this.formModulo.controls['score'].setValue(data.min_score);
                this.exam = parseInt(data.hasExam);
                this.imgIcono = data.icon;
                /*this.imgIcono = this.sanitizer.bypassSecurityTrustUrl(data.icon);
                console.timeLog(this.imgIcono)*/
                this.imgTermina = data.medal_finish;
                this.imgScore = data.medal_perfect;
                this.imgTiempo = data.medal_time;
                console.log(this.imgIcono, this.imgTermina, this.imgScore, this.imgTiempo)
                this.formModulo.controls['color'].setValue(data.color_style);
                this.formModulo.controls['url_video'].setValue(data.url_video);
                this.activeM = data.is_active;
                Swal.close();
    
                // Codificar la URL a Base64
                /*const base64Data = Buffer.from(this.imgIcono).toString("base64");
                this.imgIcono = `data:image/jpeg;base64,${base64Data}`;
                console.log(this.imgIcono);*/
              }
            );
            break;
            case 'add':
              this.imgIcono = '';
              this.imgTermina = '';
              this.imgScore = '';
              this.imgTiempo = '';
              this.p = 1;
              this.pc = 1;
              this.pt = 1;
              this.isNewModule = 1;
              this.viewE = 1;
            this.cview1 = 2;
            this.startForm(5);
              break;
        }
      }
    });
    //console.log(id)
    
  }

  //trae los temas de un modulo
  temas(id: any) {
    this.get.getTemas(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.alltemas = data;
        //console.log(this.alltemas)
      }, 
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  //cambia la vista a Temas
  changeViewTemas(view: any, name?: any, tema?: any) {
    //console.log(name)
    switch (view) {
      case 'back':
        this.imgTema = '';
        this.imgTemaV = '';
        this.helpers.goTop();
        this.isNewTheme = 0;
        this.viewTemasE = 0;
        this.viewE = 1;
        break;
      case 'editT':

        this.helpers.goTop();
        this.isNewTheme = 2;
        this.viewTemasE = 1;
        this.cview1 = 2;
        this.viewE = 2;
        this.startForm(6);
        for (let item of this.alltemas) {
          console.log(item)
          if (item.title == tema) {
            this.idTema = item.idTopic;
            //this.startForm(6);
            //console.log(item.title)
            this.formTemas.controls['title'].setValue(item.title);
            this.formTemas.controls['description'].setValue(item.description);
            this.formTemas.controls['url_video'].setValue(item.url_video);
            this.formTemas.controls['url_subtitulos'].setValue(item.url_subtitulos);
            //console.log(this.formTemas.value)
            this.imgTema = item.icon;
            this.imgTemaV = item.icon_gold;
            this.active = item.is_active;
            //console.log(this.active)
          }
        }
        break;
        case 'add':
          this.imgTema = '';
        this.imgTemaV = '';
          this.helpers.goTop();
          this.isNewTheme = 1;
        this.viewTemasE = 1;
        this.cview1 = 2;
        this.viewE = 2;
        this.startForm(6);
        break;
    }
  }

  status(status: any) {
    let form = new FormData();
    form.append('is_active', status);
    //console.log(form)
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Puedes revertir el cambio mas tarde.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.session.changeStatusTema(this.idTema, form, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Cambiado!',
              text: 'El tema ha sido cambiado de estado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changeViewTemas('back');
              }
            });
          }
        );
      }
    })
  }

  //trae el diploma de una certificación
  diploma(id: any) {
    //console.log(id);
    this.get.getDiploma(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if (data != null) {
          this.formDiploma.controls['cursoID'].setValue(data.idCertification);
          this.formDiploma.controls['encargado'].setValue(data.encargado);
          this.formDiploma.controls['puesto'].setValue(data.puesto);
          this.formDiploma.controls['activado'].setValue(data.activado);
          if (data.activado == 1)
            this.hasDiploma = true;
        } else {
          this.hasDiploma = false;
        }
      }, 
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  //agrega los files a diploma
  diplomaFile(event, type) {
    //(event.target.value, type);
    let w, h, logo, firma;
    if (event.target.files !== 0) {
      //console.log(event.target.files, event.target.files[0]);
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      img.src = _URL.createObjectURL(event.target.files[0]);
      img.onload = () => {
        w = img.width;
        h = img.height;
        //console.log(w + ' ' + h);
        if (type == 'logo') {
          //console.log(w, h);
          if (w <= 1200 && h <= 100) {
            this.logo = event.target.files[0];
            //console.log(this.logo);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 1200x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        } else if (type == 'firma') {
          //cosole.log(w, h);
          if (w <= 400 && h <= 100) {
            this.firma = event.target.files[0];
            //console.log(this.firma);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 400x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        }

      }

    }


    //console.log(this.logo, this.firma);
  }

  //salva la configuración de los diplomas
  saveDiploma() {
    //console.log(this.formDiploma.value, this.hasDiploma);
    //console.log(this.logo);
    //console.log(this.firma, this.idCertification);
    let diploma = new FormData();

    diploma.append('cursoId', this.idCertification);
    diploma.append('encargado', this.formDiploma.value.encargado);
    diploma.append('puesto', this.formDiploma.value.puesto);

    if (this.firma != undefined) {
      diploma.append('img', this.firma, this.firma.name);
    } else {
      diploma.append('img', this.firma);
    }

    if (this.hasDiploma == true) {
      diploma.append('activado', '1');
    } else {
      diploma.append('activado', '0');
    }

    if (this.logo != undefined) {
      diploma.append('logo', this.logo, this.logo.name);
    } else {
      diploma.append('logo', this.logo);
    }

    //console.log(diploma.getAll('cursoId'), diploma.getAll('encargado'), diploma.getAll('puesto'), diploma.getAll('img'), diploma.getAll('activado'), diploma.getAll('logo'), diploma.get);
    //console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);
    this.session.updateDiploma(diploma, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);}
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El diploma ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        this.certifications();
      }
    );
  }

  //agrega las materias
  addMat() {
    //console.log(this.formNewMat.value);
    let materia = new FormData();
    materia.append('Nombre', this.formNewMat.value.name);
    materia.append('ProfesorID', this.formNewMat.value.teacher);
    //console.log(materia.getAll('Name'), materia.getAll('ProfesorID'), materia.get);
    this.session.addMateria(materia, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);}
        Swal.fire({
          title: '¡Agregada con exito!',
          text: 'La materia ha sido agregada.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if (result.isConfirmed) {
            this.allMaterias();
            this.agMat = 0;
          }
        });
      }
    );
  }

  didModify() {
    //console.log(this.text1);

    if (this.text1 != '') {
      if (this.text1.length > 1) {
        this.formSearch.controls['search'].setValue(this.text1);
        //console.log(this.formSearch.value);
        this.searchUsers('search', this.formSearch.value.filter, this.formSearch.value.search);
      } else {
        this.searchArray = [];
        this.length = 0;
      }
    }


  }

  searchUsers(kind: any, filter?: any, param?: any) {
    //console.log(filter, param);
    this.pgm = 1;
    if (kind == 'search') {
      let f = filter;
      let cad = param;
      let token = localStorage.getItem('token');
      //console.log(f, cad);

      this.get.searchUsers(f, cad, token).subscribe(
        (data: any) => {
          //console.log(data);
          this.length = data.usuarios.length;
          this.searchArray = data.usuarios;
        }, 
        (error: any) => {
          this.helpers.logout();
        }
      );
    } else if (kind == 'show') {
      Swal.fire({
        title: 'Cargando...',
        html: 'Espera un momento por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.pg = 1;
          this.pgm = 1;
          this.text1 = '';
          this.searchSelect = '0'
          this.users(kind);
        }
      });
    }
  }

  asignarGrupo() {
    if (this.groupSelected == '0') {
      Swal.fire({
        title: '¡Error!',
        text: 'Selecciona un grupo.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }
    //console.log(this.groupSelected, this.chief);
    let group = new FormData();
    if (this.objUsers.length == 0) {
      group.append('usuario[]', this.chief);
    } else {
      this.objUsers.forEach(element => {
        group.append('usuario[]', element);
      });
    }
    //console.log(this.objUsers);
    //let group = new FormData();
    //group.append('usuario[]', this.objUsers);

    //group.append('usuario[]', this.groupSelected);
    //console.log(group.getAll('usuario[]'), group.get, this.groupSelected);
    this.session.asignarGrupo(this.groupSelected, group, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Agregado con exito!',
          text: 'El usuario ha sido agregado al grupo.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if (result.isConfirmed) {
            this.onClickTab('groups')
            /*this.objUsers = [];
            this.view = 0;
            this.chief = 0;
            this.name = '';
            //console.log(this.chief, this.view);
            this.users('modify');
            this.groups();
            this.startForm(4);*/
          }
        });
      }
    );
  }

  changeValue(event: any) {
    //console.log(event.target.value);
    if (event.target.checked) {
      //console.log(event.target.checked);
      this.objUsers.push(event.target.value);

      //console.log(this.objUsers)
    } else {
      //console.log(event.target.checked);
      this.objUsers.splice(this.objUsers.indexOf(event.target.value), 1);
      //console.log(this.objUsers)
    }
    this.showUsers(event.target.value);
  }

  showUsers(array: any) {
    //console.log(array);
    this.searchArray.forEach(element => {
      if (element.idUser == array) {
        if (this.showArr.includes(element)) {
          //console.log(this.showArr.indexOf(element));
          this.showArr.splice(this.showArr.indexOf(element), 1);
        } else {
          this.showArr.push(element);
        }
      }
    })
    this.showLength = this.showArr.length;
    /*if(this.showArr.includes(array)){
      console.log(this.showArr.indexOf(array));
      this.showArr.splice(this.showArr.indexOf(array), 1);
    } else {
      this.searchArray.forEach(element => {
        if(element.idUser == array){
          this.showArr.push(element);
        }
      });
    }*/
    //console.log(this.showArr);
  }
  /*convertEventResultToFile(event: ProgressEvent<FileReader>, fileName: string, mimeType: string): File | null {
    const result = event.target.result;
    //console.log(result)
    if (result instanceof ArrayBuffer) {
      const buff = Buffer.from(result);
      console.log(buff)
      return new File([buff], fileName, { type: mimeType });
    }
    return null;
  }*/
  //Guardar imagen
  filenameI: any;
  filetypeI: any;
  filenameT: any;
  filetypeT: any;
  filenameS: any;
  filetypeS: any;
  filenameD: any;
  filetypeD: any;
  fileIcono(event, show?: any) {
    this.imgIcono = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgIcono = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameI = this.imgIcono.name;
    this.filetypeI = this.imgIcono.type;
  }
  fileTermina(event) {
    this.imgTermina = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTermina = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameT = this.imgTermina.name;
    this.filetypeT = this.imgTermina.type;
  }
  fileScore(event) {
    this.imgScore = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgScore = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameS = this.imgScore.name;
    this.filetypeS = this.imgScore.type;
  }
  fileTiempo(event) {
    this.imgTiempo = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTiempo = event.target.result;
        //this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo, this.imgTiempo.name);
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameD = this.imgTiempo.name;
    this.filetypeD = this.imgTiempo.type;
  }
  fileTema(event) {
    this.imgTema = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTema = event.target.result;
        //this.imgTema = this.helpers.dataUrlToFile(this.imgTema, this.imgTema.name);
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }
  fileTemaV(event) {
    this.imgTemaV = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTemaV = event.target.result;
        //this.imgTemaV = this.helpers.dataUrlToFile(this.imgTemaV, this.imgTemaV.name);
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }

  addModulo(){
    console.log(this.formModulo.value)
    if(this.formModulo.value.title == '' || this.formModulo.value.descripcion == '' || this.formModulo.value.color == '' || this.formModulo.value.url_video == '' || this.imgIcono == undefined){
      Swal.fire({
        title: '¡Error!',
        text: 'Completa todos los campos obligatorios como titulo, descripción, examen, icono y color.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
    this.imgIcono = new File([this.imgIcono], this.filenameI, { type: this.filetypeI });
    this.imgTermina = new File([this.imgTermina], this.filenameT, { type: this.filetypeT });
    this.imgScore = new File([this.imgScore], this.filenameS, { type: this.filetypeS });
    this.imgTiempo = new File([this.imgTiempo], this.filenameD, { type: this.filetypeD });
    /*this.imgIcono = this.helpers.dataUrlToFile(this.imgIcono);
    this.imgTermina = this.helpers.dataUrlToFile(this.imgTermina);
    this.imgScore = this.helpers.dataUrlToFile(this.imgScore);
    this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo);*/

    let modulo = new FormData();
    modulo.append('idCertification', this.idCertification);
    modulo.append('title', this.formModulo.value.title);
    modulo.append('description', this.formModulo.value.descripcion);
    modulo.append('order_number', '1');
    modulo.append('is_active', '1');
    if (this.imgIcono != undefined) {
      modulo.append('icon', this.imgIcono, /*this.imgIcono.name*/);
    } else {
      modulo.append('icon', this.imgIcono);
    }
    modulo.append('color_style', this.formModulo.value.color);
    modulo.append('url_video', this.formModulo.value.url_video);
    if (this.imgTermina != undefined) {
      modulo.append('medal_finish', this.imgTermina, /*this.imgTermina.name*/);
    } else {
      modulo.append('medal_finish', this.imgTermina);
    }
    if (this.imgScore != undefined) {
      modulo.append('medal_perfect', this.imgScore, /*this.imgScore.name*/);
    } else {
      modulo.append('medal_perfect', this.imgScore);
    }
    if (this.imgTiempo != undefined) {
      modulo.append('medal_time', this.imgTiempo, /*this.imgTiempo.name*/);
    } else {
      modulo.append('medal_time', this.imgTiempo);
    }
    //modulo.append('medal_time',this.imgTiempo, this.imgTiempo.name);
    modulo.append('max_time', this.formModulo.value.duracion);
    modulo.append('min_score', this.formModulo.value.score);
    modulo.append('hasExam', this.exam);
    console.log(modulo.getAll('hasExam'), modulo.getAll('default_active_days'), modulo.get);
    /*console.log(modulo.getAll('icon'))
    console.log(modulo.getAll)
    console.log(modulo.get)
    console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
    modulo.getAll('description'), modulo.getAll('imgIcono'),
    modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
    modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
    modulo.getAll('score'), modulo.getAll('hasExam'));*/
    console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);
    console.log(modulo.getAll('icon'), modulo.getAll('medal_finish'), modulo.getAll('medal_perfect'), modulo.getAll('medal_time'))

    this.session.addModulo(this.idCertification, modulo, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Agregado con exito!',
          text: 'El módulo ha sido agregado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        //this.modules(this.idCertification);
        this.changeViewModulo('back', this.idCertification)
      }
    );
  }
}

  saveModulo() {
    console.log(this.imgIcono)
    this.imgIcono = new File([this.imgIcono], this.filenameI, { type: this.filetypeI });
    this.imgTermina = new File([this.imgTermina], this.filenameT, { type: this.filetypeT });
    this.imgScore = new File([this.imgScore], this.filenameS, { type: this.filetypeS });
    this.imgTiempo = new File([this.imgTiempo], this.filenameD, { type: this.filetypeD });
    /*this.imgIcono = this.helpers.dataUrlToFile(this.imgIcono);
    this.imgTermina = this.helpers.dataUrlToFile(this.imgTermina);
    this.imgScore = this.helpers.dataUrlToFile(this.imgScore);
    this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo);*/

    let modulo = new FormData();
    modulo.append('idCertification', this.idCertification);
    modulo.append('title', this.formModulo.value.title);
    modulo.append('description', this.formModulo.value.descripcion);
    if (this.imgIcono != undefined) {
      modulo.append('icon', this.imgIcono, /*this.imgIcono.name*/);
    } else {
      modulo.append('icon', this.imgIcono);
    }
    modulo.append('color_style', this.formModulo.value.color);
    modulo.append('url_video', this.formModulo.value.url_video);
    if (this.imgTermina != undefined) {
      modulo.append('medal_finish', this.imgTermina, /*this.imgTermina.name*/);
    } else {
      modulo.append('medal_finish', this.imgTermina);
    }
    if (this.imgScore != undefined) {
      modulo.append('medal_perfect', this.imgScore, /*this.imgScore.name*/);
    } else {
      modulo.append('medal_perfect', this.imgScore);
    }
    if (this.imgTiempo != undefined) {
      modulo.append('medal_time', this.imgTiempo, /*this.imgTiempo.name*/);
    } else {
      modulo.append('medal_time', this.imgTiempo);
    }
    //modulo.append('medal_time',this.imgTiempo, this.imgTiempo.name);
    modulo.append('max_time', this.formModulo.value.duracion);
    modulo.append('min_score', this.formModulo.value.score);
    modulo.append('hasExam', this.exam);
    /*console.log(modulo.getAll('icon'))
    console.log(modulo.getAll)
    console.log(modulo.get)
    console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
    modulo.getAll('description'), modulo.getAll('imgIcono'),
    modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
    modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
    modulo.getAll('score'), modulo.getAll('hasExam'));
    console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);*/
    console.log(modulo.getAll('icon'), modulo.getAll('medal_finish'), modulo.getAll('medal_perfect'), modulo.getAll('medal_time'))

    this.session.updateModulo(this.idCertification, modulo, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El módulo ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if(result.isConfirmed){
            this.changeViewModulo('back', this.idCertification)
          }
        });
        //this.modules(this.idCertification);
        //this.changeViewModulo('back', this.idCertification)
      }
    );
  }

  addTema(){
    console.log(this.formTemas.value)
    let tema = new FormData();
    if(this.formTemas.value.title != '' && this.formTemas.value.description != '' && this.formTemas.value.url_video != '' && this.imgTema != undefined && this.imgTemaV != undefined){
    tema.append('idModule', this.idModulo);
    tema.append('title', this.formTemas.value.title);
    tema.append('description', this.formTemas.value.description);
    tema.append('order_number', '1');
    tema.append('is_active', '1');
    if (this.imgTema != undefined) {
      tema.append('icon', this.imgTema);
    } else {
      tema.append('icon', this.imgTema);
    }
    tema.append('url_video', this.formTemas.value.url_video);
    if(this.formTemas.value.url_subtitulos != '') tema.append('url_subtitulos', this.formTemas.value.url_subtitulos);
    if (this.imgTemaV != undefined) {
      tema.append('icon_gold', this.imgTemaV,);
    } else {
      tema.append('icon_gold', this.imgTemaV);
    }
    /*console.log(modulo.getAll('icon'))
    console.log(modulo.getAll)
    console.log(modulo.get)
    console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
    modulo.getAll('description'), modulo.getAll('imgIcono'),
    modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
    modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
    modulo.getAll('score'), modulo.getAll('hasExam'));*/
    console.log(tema.getAll('description'));

    this.session.addTema(tema, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Agregado con exito!',
          text: 'El tema ha sido agregado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        //this.modules(this.idCertification);
        this.temas(this.idModulo);
        this.changeViewTemas('back', this.idModulo)
      }
    );
  } else {
    Swal.fire({
      title: '¡Error!',
      text: 'Completa todos los campos obligatorios como titulo, descripción, iconos y video.',
      icon: 'error',
      confirmButtonColor: '#015287',
    });
  }
  }

  saveTemas() {
    /*this.imgTema = this.helpers.dataUrlToFile(this.imgTema /*, this.imgTema.name);
    this.imgTemaV = this.helpers.dataUrlToFile(this.imgTemaV /*, this.imgTemaV.name);*/
    //console.log(this.imgIcono, this.imgTermina, this.imgScore, this.imgTiempo, this.idCertification)
    let tema = new FormData();
    tema.append('idModule', this.idModulo);
    tema.append('title', this.formTemas.value.title);
    tema.append('description', this.formTemas.value.description);
    //tema.append('order_number', '5');
    tema.append('is_active', this.formTemas.value.status);
    if (this.imgTema != undefined) {
      tema.append('icon', this.imgTema);
    } else {
      tema.append('icon', this.imgTema);
    }
    tema.append('url_video', this.formTemas.value.url_video);
    tema.append('url_subtitulos', this.formTemas.value.url_subtitulos);
    if (this.imgTemaV != undefined) {
      tema.append('icon_gold', this.imgTemaV,);
    } else {
      tema.append('icon_gold', this.imgTemaV);
    }
    /*console.log(modulo.getAll('icon'))
    console.log(modulo.getAll)
    console.log(modulo.get)
    console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
    modulo.getAll('description'), modulo.getAll('imgIcono'),
    modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
    modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
    modulo.getAll('score'), modulo.getAll('hasExam'));*/
    console.log(tema.getAll('description'));
    this.session.updateTemas(this.idModulo, tema, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El módulo ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        //this.modules(this.idCertification);
        this.temas(this.idModulo);
        this.changeViewTemas('back', this.idModulo)
      }
    );
  }
  deleteTema() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.session.deleteTema(this.idTema, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data);
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.temas(this.idModulo);
                this.changeViewTemas('back', this.idModulo)
              }
            });
          }
        );
      }
    })
  }

  //cambia el status de los modulo
  statusModulos(set: any) {
    let formData = new FormData();
    formData.append('is_active', set);
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#A6DAFC',
      confirmButtonText: '¡Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Actualizando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.session.statusModulo(this.idModulo, formData, localStorage.getItem('token')).subscribe(
              (data: any) => {
                //console.log(data);
                this.cview1 = 0;
                Swal.fire({
                  title: '¡Actualizado!',
                  text: 'El status ha sido actualizado.',
                  icon: 'success',
                  confirmButtonColor: '#015287',
                });
                this.changeViewModulo('editm', this.idModulo);
              }
            );
          }
        })
      }
    });
  }
}
