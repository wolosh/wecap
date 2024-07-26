import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UploadAdapter } from '../mail/my-upload-adapter';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { filterMenuClose } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  public Editor: any = ClassicEditor;
  data: any;
  change: number = 0;
  date: number = 2;
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
  pct: number = 1;
  countCert: number = 0;
  matCount: number = 0;
  temasCount: number = 0;
  pm: number = 1;
  pg: number = 1;
  pgm: number = 1;
  idCertification: any;
  bf: any;
  active: any;
  allModules: any[];
  hasDiploma: boolean;
  logo: any;
  logoBack: any;
  firma: any;
  firmaBack: any;
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
  public imgTemaDos: any;
  public imgTemaVDos: any;
  modulos: any;
  viewE: number;
  alltemas: any;
  idModulo: any;
  formModulo: FormGroup;
  infoModule: any;
  imgicon: any;
  viewTemasE: number = 0;
  formTemas: FormGroup;
  formTemasCol: FormGroup;
  idTema: any;
  color: any;
  imgIconoblob: any;
  imgTerminablob: any;
  imgScoreblob: any;
  imgTiempoblob: any;
  imgBlob: any;
  imgTemablob: any;
  activeM: any;
  imgIconoDos: any;
  imgTerminaDos: any;
  imgScoreDos: any;
  imgTiempoDos: any;
  filenameI: any;
  filetypeI: any;
  filenameT: any;
  filetypeT: any;
  filenameS: any;
  filetypeS: any;
  filenameD: any;
  filetypeD: any;
  icon: number = 0;
  terminar: number = 0;
  score: number = 0;
  tiempo: number = 0;
  tema: number = 0;
  allModulesLength: any;
  imgHeaderDos: any;
  imgHeader: any;
  header: any;
  isOrderChange: boolean;
  viewTemasCol: number = 0;
  public colSelected = '0';
  public colFinal: any;
  mostrar: any;
  sizecolumna: any;
  columnas: any;
  isEditCol: number = 0;
  idTopicC: any;
  idTemaC: any;
  allModulesL: any;
  columnText: any;
  userCount: any;
  show: number;
  sub: number;
  fileSend: any;
  public pass = '0';
  //variables para actualizar imagen
  //guarda la imagen en el evento
  imageChangedEvent: any = '';
  //mostrar la imagen en el cropper
  croppedImage: any = '';
  //mostrar el cropper
  showCropper = false;
  scale = 1;
  transform: ImageTransform = {};
  logoName = 'Ningun archivo seleccionado';
  firmaName = 'Ningun archivo seleccionado';
  isLogo = 0;
  cambioCol: string;
  valorCol: any;
  preCol = "d-none";
  relation: number;
  resizeWidth: number;
  resizeHeight: number;
  fileBack: any;
  videoBack: any;

  constructor(private sanitizer: DomSanitizer, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) { }

  ngOnInit(): void {
    //console.log(this.helpers.domainPrueba);
    //console.log(this.helpers.domain);
    //console.log(localStorage.getItem('type'))
    //console.log(this.helpers.view);
    Swal.close();
    //this.getColumnas(1)
    //si el tipo de usuario es 1
    if (localStorage.getItem('type') == '1') {
      this.helpers.loader();
      this.helpers.goTop();
      this.sizeColumna();
      //console.log(localStorage.getItem('type'))
      //console.log(this.searchArray)
      //console.log(localStorage.getItem('name'));
      this.helpers.type = localStorage.getItem('type');
      this.helpers.name = localStorage.getItem('name');
      this.helpers.goTop();
      this.certifications();
      //this.helpers.cursos = 1;
      this.startForm(1);
      //console.log(this.view)
    } else if (localStorage.getItem('type') == '4') { //si el tipo de usuario es 4
      this.route.navigate(['/cmtemplate']);
      //console.log(localStorage.getItem('type'))
      /*Swal.fire({
        title: '¡Error!',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonColor: '#015287',
      }).then((result) => {
        //console.log(result)
        if (result.isConfirmed) {
          if (localStorage.getItem('type') == '4') {
            this.route.navigate(['/cmtemplate']);
          } else {
            this.route.navigate(['/']);

          }
        }
      });*/
    } else { //si no es ninguno de los dos
      this.route.navigate(['/']);
    }
  }

  //función que cancela la carga de la imagen
  cancelUpload() {
    //limpiamos el crop
    this.cleanCropped();
    //cerramos el crop
    this.showCropper = false;
  }

  //funcion para subir la imagen al servidor
  cargarImagen(type: any, show?: any) {
    //console.log(this.croppedImage);
    //declara imageBlob que llama a la función dataUrlBlob y le pasa la imagen con base64
    //let imageBlob = this.helpers.dataUrlToBlob(this.croppedImage);
    let imageBlob = this.croppedImage;
    //declara el archivo que se va a subir
    let imageFile = new File([imageBlob], 'img', { type: 'image/png' });
    //declaramos un arreglo de archivos
    const fileArray: File[] = [];
    //agregamos el archivo al arreglo
    fileArray.push(imageFile);
    //mostramos una modal de carga
    /*Swal.fire({
      title: 'Subiendo imagen',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });*/
    //llamamos la función uploadFile que se encuentra en el servicio y le pasamos el arreglo de archivos
    if (show) {
      this.uploadFile(fileArray as unknown as FileList, type, show);
    } else {
      this.uploadFile(fileArray as unknown as FileList, type);
    }
    //limpiamos el crop
    this.cleanCropped();
    //cerramos el crop
    this.showCropper = false;
  }

  //función para limpiar el cropped
  cleanCropped() {
    //limpiamos la imagen del crop
    this.croppedImage = '';
    //limpiamos la imagen del evento
    this.imageChangedEvent = '';
  }

  //Evento para cargar la imagen del talento
  fileChangeEvent(event: any): void {
    //console.log(event);
    //si el archivo es diferente de vacio
    if (event.target.files.length > 0) {
      //muestra el loader
      /*Swal.fire({
        title: 'Cargando imagen',
        text: 'Espere por favor',
        allowOutsideClick: false,
        didOpen: () => {
          //se llama el loader
          Swal.showLoading();
          //canbiamos a verdadero para que se muestre el cropper
          this.showCropper = true;
          //asgnamos la imagen que viene en el evento al imageChangedEvent
          this.imageChangedEvent = event;
        },
      });*/
      //canbiamos a verdadero para que se muestre el cropper
      this.showCropper = true;
      //asgnamos la imagen que viene en el evento al imageChangedEvent
      this.imageChangedEvent = event;
    }
  }



  //función para actualizar formato de la imagen
  imageCropped(event: ImageCroppedEvent) {
    //console.log(event, event.base64);
    //Cuanda la imagen se recorta se le da formato base64
    this.croppedImage = event.blob;
    //console.log(this.croppedImage);
  }

  //función que carga la imagen
  imageLoaded() {
    //cerramos la ventana
    Swal.close();
  }

  //función para falla en carga de imagen
  loadImageFailed() {
    //mostramos el error
    Swal.fire({
      title: 'Error',
      text: 'No se pudo cargar la imagen',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

  //función para restablecer imagen
  resetImage() {
    //el valor de this.scale se le asigna 1
    this.scale = 1;
    //en transform se limpia
    this.transform = {};
  }

  //Función que llama profilePic de la api
  public uploadFile(files: FileList, type?: any, show?: any) {
    //si la longuitud de el arreglo de archivos es mayor a 0
    if (files.length === 0) {
      //se regresa
      return;
    }
    //si no es vacio se declara el archivo
    const fileToUpload = files[0];
    //console.log(fileToUpload, fileToUpload.size);

    //if (fileToUpload.size > 1000000) {
      if (fileToUpload.size > 524288) {
      Swal.fire({
        title: '¡Error!',
        text: 'La imagen es muy pesada, intenta con otra.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });

    } else {
      Swal.close();
      if (type == 'logo') {
        this.logo = fileToUpload;
        this.logoName = 'Imagen cargada correctamente';
      } else if (type == 'firma') {
        this.firma = fileToUpload;
        this.firmaName = 'Imagen cargada correctamente';
      } else if (type == 'boton') {
        switch (this.isLogo) {
          case 3:
            this.imgIcono = fileToUpload;
            this.imgIconoDos = fileToUpload;
            //console.log(this.imgIcono)
            if (show) {
              this.icon = 2;
              this.imgIconoDos = this.imgIconoDos;
              if (files.length > 0) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                  this.imgIconoDos = event.target.result;
                  //console.log(this.imgIconoDos)
                };
                reader.readAsDataURL(files[0])
              }
              
            }
            break;
          case 4:
            if (show) {
              this.tiempo = 2;
              this.imgTiempoDos = this.imgTiempoDos;
            }
            this.imgTiempo = fileToUpload;
            if (files.length > 0) {
              const reader = new FileReader();
              reader.onload = (event: any) => {
                this.imgTiempoDos = event.target.result;
                //this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo, this.imgTiempo.name);
              };
              reader.readAsDataURL(files[0]);
            }
            this.filenameD = this.imgTiempo.name;
            this.filetypeD = this.imgTiempo.type;
            break;
          case 5:
            if (show) {

              this.terminar = 2;
              this.imgTerminaDos = this.imgIconoDos;
        
            }
            //console.log(event.target.files)
            this.imgTermina = fileToUpload;
            if (files.length > 0) {
              const reader = new FileReader();
              reader.onload = (event: any) => {
                this.imgTerminaDos = event.target.result;
                //console.log(this.imgTerminaDos)
              };
              reader.readAsDataURL(files[0])
            }
            this.filenameT = this.imgTermina.name;
            this.filetypeT = this.imgTermina.type;
            break;
            case 6:
              if (show) {
                this.score = 2;
                this.imgScoreDos = this.imgIconoDos;
              }
              //console.log(event.target.files)
              this.imgScore = fileToUpload;
              if (files.length> 0) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                  this.imgScoreDos = event.target.result;
                };
                reader.readAsDataURL(files[0]);
              }
              this.filenameS = this.imgScore.name;
              this.filetypeS = this.imgScore.type;
            break;
            case 7:
              this.imgHeader = fileToUpload;
              //console.log(this.imgHeader)
                if (show) {
                  this.header = 2;
                  this.imgHeaderDos = this.imgHeaderDos;
                  //console.log(this.imgHeaderDos)
                }
                if (files.length > 0) {
                  const reader = new FileReader();
                  reader.onload = (event: any) => {
                    this.imgHeaderDos = event.target.result;
                    //console.log(this.imgHeaderDos)
                  };
                  reader.readAsDataURL(files[0])
                }
              break;
              case 8:
                /*if (show) {
                  //console.log(event.target.files[0])
                  this.fileSend = fileToUpload;
                  //console.log(this.fileSend)
                } else {
                  if (this.imgTemaDos != '') {
                    this.change = 1;
                  }*/
                  this.imgTema = fileToUpload
                  //console.log(this.imgTema)
                if (show) {
                  this.tema = 2;
                  this.imgTemaDos = this.imgTemaDos;
                  //console.log(this.imgTemaDos)
                }
                  
                  if (files.length > 0) {
                    const reader = new FileReader();
                    reader.onload = (event: any) => {
                      this.imgTemaDos = event.target.result;
                      //console.log(this.imgTemaDos)
                      //this.imgTema = this.helpers.dataUrlToFile(this.imgTema, this.imgTema.name);
                    };
                    reader.readAsDataURL(files[0])
                  }
                
                break;
        }

      }
      //console.log(this.logo, this.logoName)

      Swal.fire({
        title: '¡Éxito!',
        text: 'Se ha cargado la imagen.',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#015287',
      });
    }
    //se llama el servicio
    /*this.session
      .profilePic(localStorage.getItem('token'), fileToUpload)
      .subscribe(
        (response: any) => {
          //manda llamar info talento para recargar datos
          this.getInfoTalento();
        },
        (error: any) => {
          //si fracasa manda mensaje de error
          this.helpers.showError(error);
        }
      );*/
  }

  //funcion para aumentar zoom a la imagen
  zoomIn() {
    //al valor de this.scale se suma 0.1
    this.scale += 0.1;
    //en transform se le asigna el valor de this.scale para aumentar el zoom
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  //función para disminuir zoom de la imagen
  zoomOut() {
    //al valor de this.scale se le resta 0.1
    this.scale -= 0.1;
    //en transform se le asigna el valor de this.scale para disminuir el zoom
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }



  public drop(event: CdkDragDrop<any>, type: any) {
    //console.log(type)
    if (type == 'modules') {
      moveItemInArray(this.allModules, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.alltemas, event.previousIndex, event.currentIndex);
      //console.log(this.alltemas);
    }
    this.isOrderChange = true;
  }

  public updateOrder(type: any) {
    //console.log(type, this.idCertification)
    let json = {} as any;
    let newOrder = '';
    if (type == 'modules') {

      json.id_certification = this.idCertification;
      //se recorre el arreglo formar un string con los ids de los cursos separados por comas
      this.allModules.map((value: any, key: any) => {
        newOrder += value.idModule + ',';
      });
      //se elimina la ultima coma
      newOrder = newOrder.slice(0, -1);
      json['module_order'] = newOrder;
      //console.log(json);
      this.helpers.loader();
      this.session.orderModule(json, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.close();
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El orden ha sido actualizado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              //this.changeViewModulo('editm', this.idModulo)
              this.changeViewCourses('editc')
            }
          })
        }
      );
    } else {
      json.id_module = this.idModulo;
      //se recorre el arreglo formar un string con los ids de los cursos separados por comas
      this.alltemas.map((value: any, key: any) => {
        newOrder += value.idTopic + ',';
      });
      //se elimina la ultima coma
      newOrder = newOrder.slice(0, -1);
      json['topic_order'] = newOrder;
      //console.log(json);
      this.helpers.loader();
      this.session.orderTopic(json, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.close();
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El orden ha sido actualizado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeViewModulo('editm', this.idModulo)
            }
          })
        }
      );
    }
    //this.helpers.loader();
    /*this.register
      .editCourse(json, this.helpers.getToken())
      .subscribe((data: any) => {
        this.getInfo();
      });*/
    this.isOrderChange = false;
  }

  isLogoChange(type: any, id?: any) {
    switch (type) {
      case 'logo':
        this.resizeHeight = 200;
        this.resizeWidth = 400;
        this.relation = 400 / 200;
        this.isLogo = 1;
        break;
      case 'firma':
        this.isLogo = 2;
        break;
      case 'boton':
      //hacemos modal con cropper para subir imagen
        this.resizeHeight = 600;
        this.resizeWidth = 600;
        this.relation = 1 / 1;
        if (id) {
          this.isLogo = id;
        } else {
          this.isLogo = 3
        }
        //console.log(this.isLogo);
      break;
      case 'header':
        this.resizeHeight = 600;
        this.resizeWidth = 1200;
        this.relation = 16 / 2;
        this.isLogo = 7;
        break;
      break;
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
            this.formNewCurso.value.title = '';
            this.formNewCurso.value.description = '';
            this.exam = '';
            this.formNewCurso.value.default_active_days = '';
            this.formNewCurso.value.hasExam = '';
            this.date = 2;
            this.exam = '';
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
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(350)]],
        //img: [''],
        default_active_days_start: [''],
        default_active_days_end: [''],

        //hasExam: [''],
      });
    } else if (id == 2) {
      //console.log('entro')
      this.formEdit = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(350)]],
        img: [''],
        //default_active_days: [''],
        default_active_days_start: [''],
        default_active_days_end: [''],
        //hasExam: [''],
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
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(350)]],
        duracion: [''],
        score: [''],
        color: [''],
        url_video: [''],
      });
      Swal.close();
    }
    else if (id == 6) {
      this.formTemas = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(350)]],
        url_video: [''],
        file: [''],
        url_subtitulos: [''],
      });
    }
    else if (id == 7) {
      this.formTemasCol = this.formBuilder.group({
        title: [''],
        col: [''],
        contenido: [''],
      });
    } else if (id == 8) {
      this.formDiploma = this.formBuilder.group({
        cursoID: [''],
        encargado: [''],
        puesto: [''],
        firma: [''],
        activado: [''],
        logo: [''],
      });
    }
  }

  get titulo() {
    return this.formNewCurso.get('title');
  }
  get titulo2() {
    return this.formEdit.get('title');
  }
  get description() {
    return this.formNewCurso.get('description');
  }
  get description2() {
    return this.formEdit.get('description');
  }
  get description3() {
    return this.formModulo.get('description');
  }
  get description4() {
    return this.formTemas.get('description');
  }

  init(event: any) {
    //console.log(event, this.hasDiploma)
    if (this.hasDiploma == true) {
      this.startForm(3);
      Swal.fire({
        title: '¡Añade la información de tu Diploma!',
        text: 'Por favor asegurate de que toda la información del diploma se encuentre en orden antes de guardar.',
        icon: 'info',
        confirmButtonColor: '#015287',
      })
    }
  }

  certifications(name?: any) {
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        this.countCert = this.certificaciones.length;
        //console.log(this.certificaciones, this.countCert);
        if (name) {
          this.changeViewCourses('editc', name)
        }
        this.helpers.goTop();
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
      case 'col':
        this.formTemasCol.controls['col'].setValue(this.colSelected);
        //console.log(this.formTemasCol.value.col);
        this.valorCol = this.formTemasCol.value.col;
        this.cambioCol = "p-3 columnas col-" + this.valorCol;
        this.preCol = "preCol mb-3";
        break;
    }

  }

  changeActive(event: any, kind: any) {
    //console.log(this.date, event.target.value);
    if (kind == 'new') {
      switch (event.target.value) {
        case '0':
          this.date = 0;
          break;
        case '1':
          this.date = 1;
          break;
      }
    }
    //console.log(this.date)
    /*if(event.target.checked ){
      this.date = 1;
    } else {
      this.date = 0;
    }
  } else {
    console.log()
  }*/
  }

  changeShow(event: any, kind: any) {
    //console.log(this.date, event.target.value);
    if (kind == 'sub') {
      switch (event.target.value) {
        case '0':
          this.sub = 0;
          break;
        case '1':
          this.sub = 1;
          break;
      }
    } else if (kind == 'archivo') {
      switch (event.target.value) {
        case '0':
          this.show = 0;
          break;
        case '1':
          this.show = 1;
          break;
      }
    }
    //console.log(this.date)
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
        if (this.image != undefined) {
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
          send.delete('inicio');
          send.delete('fin');
          send.delete('secuencial');
        }
        //console.log( send.getAll('img'),  send.getAll('title'),  send.getAll('description'));
        send.append('inicio', this.formNewCurso.value.default_active_days_start);
        send.append('fin', this.formNewCurso.value.default_active_days_end);
        if (this.exam != '' || this.exam != undefined) {
          send.append('secuencial', this.exam);
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Selecciona el orden de visualización para tu curso.',
            icon: 'error',
            confirmButtonColor: '#015287',
          });
          send.delete('title');
          send.delete('description');
          send.delete('img');
          send.delete('inicio');
          send.delete('fin');
          send.delete('secuencial');
        }

        //console.log(send.getAll('inicio'), send.getAll('fin'))
        //console.log(send.getAll(''),send.getAll('secuencial'),  send.getAll('inicio'), send.getAll('fin'), send.get, send.getAll('img'));
        //console.log( send.getAll('img'))
        ////console.log( send.getAll('hasExam'),  send.getAll('default_active_days'),  send.get);
        this.session.newCurso(send, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            this.formNewCurso.reset();
            this.formNewCurso.value.title = '';
            this.formNewCurso.value.description = '';
            this.exam = '';
            this.date = 2;
            this.formNewCurso.value.default_active_days = '';
            this.formNewCurso.value.hasExam = '';
            Swal.fire({
              title: '¡Creado con exito!',
              text: 'El curso ha sido creado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.onClickTab('courses');
              }
            });
          }
        );
        break;
      case 'edit':
        //console.log(this.formEdit)
        this.formData.append('title', this.formEdit.value.title);
        this.formData.append('description', this.formEdit.value.description);
        this.formData.append('secuencial', this.exam);
        this.formData.append('inicio', this.formEdit.value.default_active_days_start);
        this.formData.append('fin', this.formEdit.value.default_active_days_end);
        if (this.image != undefined) {
          this.formData.append('img', this.image, this.image.name);
        } else {
          this.formData.append('img', this.formEdit.value.img);
        }
        ////console.log(this.formData.getAll('img'));
        //console.log(this.formData.getAll('inicio'), this.formData.getAll('fin'))
        //console.log(this.formData.getAll('title'), this.formData.getAll('description'), this.formData.getAll('img'), this.formData.getAll('default_active_days'), this.formData.getAll('secuencial'), this.formData.get);
        this.session.editCourse(id, this.formData, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Actualizado con exito!',
              text: 'El curso se ha actualizado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.certifications(this.formEdit.value.title);
                //this.changeViewCourses('editc', this.formEdit.value.title)
              }
            });

            //this.certifications();
          });
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
        this.matCount = data.length;
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
          this.userCount = data.users.length;
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
        this.date = 2;
        this.exam = '';
        break;
      case 'editc':
        //console.log('entro')
        this.pt = 1;
        this.p = 1;
        this.cview1 = 1;
        this.startForm(2);
        this.date = 2;
        this.exam = '';
        for (let item of this.certificaciones) {
          if (item.title == name) {
            //console.log(item, 'entro')
            ////console.log(item)
            this.idCertification = item.idCertification;
            //console.log(this.idCertification)
            this.modules(item.idCertification);
            this.diploma(item.idCertification);
            this.course = item.title;
            this.active = item.is_active;

            this.formEdit.controls['title'].setValue(item.title);
            this.formEdit.controls['description'].setValue(item.description);
            this.formEdit.controls['default_active_days_start'].setValue(item.inicio);
            //console.log(this.formEdit.controls['default_active_days_start'].value, item.inicio)
            this.formEdit.controls['default_active_days_end'].setValue(item.fin);
            this.formEdit.controls['img'].setValue(item.img);
            this.bf = item.img;
            this.exam = parseInt(item.secuencial);

            //console.log(item.inicio, item.fin)
            if (item.inicio != '0000-00-00' && item.fin != '0000-00-00') {
              this.date = 1;
            } else {
              this.date = 0;
            }
            //console.log(this.date)
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
        //console.log(data);
        this.allModulesL = data.length
        this.allModules = data;
        this.allModulesLength = data.length;
        //console.log(this.allModules)
        Swal.close();
      },
      (error: any) => {
        //console.log(error)
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
            this.pass = '0';
            this.imgIcono = '';
            this.imgHeader = '';
            this.imgTermina = '';
            this.imgScore = '';
            this.imgTiempo = '';
            this.imgIconoDos = '';
            this.imgHeaderDos = '';
            this.imgTerminaDos = '';
            this.imgScoreDos = '';
            this.imgTiempoDos = '';
            this.isNewModule = 0;
            this.viewE = 0;
            this.cview1 = 1;
            this.exam = 2;
            this.date = 2;
            this.modules(this.idCertification);
            break;
          case 'editm':
            //console.log(id)
            this.icon = 1;
            this.header = 1;
            this.terminar = 1;
            this.score = 1;
            this.tiempo = 1;
            this.change = 2
            this.imgIcono = '';
            this.imgTermina = '';
            this.imgScore = '';
            this.imgTiempo = '';
            this.imgIconoDos = '';
            this.imgHeaderDos = '';
            this.imgTerminaDos = '';
            this.imgScoreDos = '';
            this.imgTiempoDos = '';
            this.pt = 1;
            this.p = 1;
            this.pc = 1;
            this.isNewModule = 2;
            this.viewE = 1;
            this.cview1 = 2;
            this.viewTemasE = 2;
            this.startForm(5);
            this.get.getinfoModulo(id, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data)
                this.idModulo = data.idModule;
                this.temas(this.idModulo);
                this.formModulo.controls['title'].setValue(data.title);
                this.formModulo.controls['description'].setValue(data.description);
                this.formModulo.controls['duracion'].setValue(data.max_time);
                //this.formModulo.controls['score'].setValue(data.min_score);
                let change = Math.trunc(data.min_score);
                //console.log(change)
                this.pass = change.toString();
                //console.log(this.pass)
                this.exam = parseInt(data.hasExam);
                ////console.log(this.exam, data.hasExam)
                this.imgIcono = data.icon;
                this.imgHeader = data.imgHeader;
                this.imgTermina = data.medal_finish;
                this.imgScore = data.medal_perfect;
                this.imgTiempo = data.medal_time;
                this.imgIconoDos = data.icon;
                this.imgHeaderDos = data.imgHeader;///Checar
                this.imgTerminaDos = data.medal_finish;
                this.imgScoreDos = data.medal_perfect;
                this.imgTiempoDos = data.medal_time;
                console.log(this.imgIconoDos, this.imgTerminaDos, this.imgScoreDos, this.imgTiempoDos)
                this.formModulo.controls['color'].setValue(data.color_style);
                this.formModulo.controls['url_video'].setValue(data.url_video);

                this.activeM = data.is_active;
                Swal.close();
                this.helpers.goTop();
                // Codificar la URL a Base64
                /*const base64Data = Buffer.from(this.imgIcono).toString("base64");
                this.imgIcono = `data:image/jpeg;base64,${base64Data}`;
                console.log(this.imgIcono);*/
              }

            );
            break;
          case 'add':
            this.viewTemasE = 2;
            this.imgIcono = '';
            this.imgHeader = '';
            this.imgTermina = '';
            this.imgScore = '';
            this.imgTiempo = '';
            this.imgIconoDos = '';
            this.imgHeaderDos = '';
            this.imgTerminaDos = '';
            this.imgScoreDos = '';
            this.imgTiempoDos = '';
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
        //console.log(data);
        this.alltemas = data;
        this.temasCount = data.length;
        //console.log(this.alltemas)
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  //cambia la vista a Temas
  changeViewTemas(view: any, name?: any, tema?: any) {
    //console.log(tema)
    switch (view) {
      case 'back':
        this.imgTema = '';
        this.imgTemaV = '';
        this.imgTemaDos = '';
        this.imgTemaVDos = '';
        this.helpers.goTop();
        this.isNewTheme = 0;
        this.isEditCol = 0;
        this.viewTemasE = 2;
        this.viewE = 1;
        this.viewTemasCol = 3;
        break;
      case 'editT':
        this.imgTemaDos = '';
        this.imgTemaVDos = '';
        this.helpers.goTop();
        this.isNewTheme = 2;
        this.viewTemasE = 1;
        this.viewTemasCol = 0;
        this.cview1 = 2;
        this.viewE = 1;
        this.tema = 1;
        this.change = 2;
        this.startForm(6);
        for (let item of this.alltemas) {
          //console.log(this.alltemas)
          console.log(tema)
          if (item.title == tema || item.idTopic == tema) {
            //console.log(item, 'entro')
            this.idTema = item.idTopic;
            //this.startForm(6);
            //console.log(item.title)
            this.formTemas.controls['title'].setValue(item.title);
            this.formTemas.controls['description'].setValue(item.description);
            this.formTemas.controls['url_subtitulos'].setValue(item.url_subtitulos);
            this.formTemas.controls['file'].setValue(item.doc);
            this.formTemas.controls['url_video'].setValue(item.url_video);
            console.log(this.formTemas.value)
            this.imgTema = item.icon;
            this.imgTemaDos = item.icon;
            //console.log(this.imgTema, this.imgTemaDos)
            this.imgTemaVDos = item.icon_gold;
            this.active = item.is_active;
            //this.fileSend = item.doc;
            this.videoBack = item.url_video;
            this.fileBack = item.doc;
            //this.fileSend = item.doc;
            //console.log(this.active, this.imgTemaDos, this.imgTemaVDos)
          }
        }
        break;
      case 'add':
        this.imgTema = '';
        this.imgTemaV = '';
        this.imgTemaDos = '';
        this.imgTemaVDos = '';
        this.helpers.goTop();
        this.isNewTheme = 1;
        this.viewTemasE = 1;
        this.cview1 = 2;
        this.viewE = 1;
        this.startForm(6);
        break;
      case 'cols':
        this.helpers.loader();
        this.pct = 1;
        this.viewTemasCol = 1;
        this.viewTemasE = 3;
        //onsole.log(this.idTema);

        this.get.getCols(this.idTema, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            this.columnas = data;
            Swal.close();
          }
        );
        break;
      case 'col':
        this.viewTemasCol = 2;
        this.startForm(7);
        this.isEditCol = 2;
        //console.log(this.idTema);
        break;
      case 'editC':
        this.helpers.loader();
        this.helpers.goTop();
        this.viewTemasCol = 2;
        this.isEditCol = 1;
        this.sizeColumna
        this.startForm(7);
        for (let item of this.columnas) {
          //console.log(item)
          //console.log(name, tema)
          //console.log(item.idTopic_content)
          //console.log(this.columnas)
          if (item.idTopic_content == tema) {
            //this.idColumna = item.idTopic_content;
            //this.startForm(6);
            //console.log(item.idTopic_content)
            this.columnText = item;
            this.idTemaC = tema
            this.idTopicC = name
            this.formTemasCol.controls['title'].setValue(item.column_title);
            this.formTemasCol.controls['contenido'].setValue(item.content);
            this.formTemasCol.controls['col'].setValue(item.column_size);
            this.colFinal = item.content;
            //console.log(item.content)
            this.data = item.content;
            if (item.column_size.includes('1')) {
              this.colSelected = '1'
            } if (item.column_size.includes('2')) {
              this.colSelected = '2'
            } if (item.column_size.includes('3')) {
              this.colSelected = '3'
            } if (item.column_size.includes('4')) {
              this.colSelected = '4'
            } if (item.column_size.includes('5')) {
              this.colSelected = '5'
            } if (item.column_size.includes('6')) {
              this.colSelected = '6'
            } if (item.column_size.includes('7')) {
              this.colSelected = '7'
            } if (item.column_size.includes('8')) {
              this.colSelected = '8'
            } if (item.column_size.includes('9')) {
              this.colSelected = '9'
            } if (item.column_size.includes('10')) {
              this.colSelected = '10'
            } if (item.column_size.includes('11')) {
              this.colSelected = '11'
            } if (item.column_size.includes('12')) {
              this.colSelected = '12'
            }
            //this.colSelected = item.column_size;
            this.mostrar = parseInt(item.show_title);
            //console.log(this.mostrar)
            Swal.close();
          }
        }
        break;
      case 'eliminar':
        let id = tema
        //console.log(json)
        this.session.deleteCol(id, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Columna eliminada!',
              text: 'La columna se elimino correctamente.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              //console.log(result)
              if (result.isConfirmed) {
                this.changeViewTemas('cols', this.idTema);
              }
            });
          }
        );
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
    this.helpers.goTop();
    this.startForm(8);
    this.get.getDiploma(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log('entro')
        console.log(data);
        if (data != null) {
          if (data.activado == 1) {
            this.hasDiploma = true;
            this.formDiploma.controls['cursoID'].setValue(data.idCertification);
            this.formDiploma.controls['encargado'].setValue(data.encargado);
            this.formDiploma.controls['puesto'].setValue(data.puesto);
            this.formDiploma.controls['activado'].setValue(data.activado);
            this.formDiploma.controls['firma'].setValue(data.firma);
            this.formDiploma.controls['logo'].setValue(data.logo);
            this.firma = data.firma;
            this.logo = data.logo;
            this.logoBack = data.logo;
            this.logoName = data.logo;
            this.firmaBack = data.firma;
            this.firmaName = data.firma;
            //console.log(this.firmaBack, this.logoBack)
            /*if (data != null) {
              this.formDiploma.controls['cursoID'].setValue(data.idCertification);
              this.formDiploma.controls['encargado'].setValue(data.encargado);
              this.formDiploma.controls['puesto'].setValue(data.puesto);
              this.formDiploma.controls['activado'].setValue(data.activado);
              this.formDiploma.controls['firma'].setValue(data.firma);
            this.formDiploma.controls['logo'].setValue(data.logo);
              if (data.activado == 1)
                this.hasDiploma = true;*/
          } else {
            this.hasDiploma = false;
          }
        } else {
          this.hasDiploma = false;
          this.firma = '0';
          this.logo = '0';
          this.logoBack = '0';
          this.logoName = '0';
          this.firmaBack = '0';
          this.firmaName = '0';
        }

        //console.log(this.formDiploma.value, this.hasDiploma, this.firma, this.logo)
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
          //if (w <= 1200 && h <= 100) {
          this.logo = event.target.files[0];
          //console.log(this.logo);
          /*} else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 1200x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }*/
        } else if (type == 'firma') {
          //cosole.log(w, h);
          //if (w <= 400 && h <= 100) {
          this.firma = event.target.files[0];
          //console.log(this.firma);
          /*} else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 400x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }*/
        }

      }

    }


    //console.log(this.logo, this.firma);
  }

  //salva la configuración de los diplomas
  saveDiploma() {
    this.helpers.loader();
    //console.log(this.formDiploma.value, this.hasDiploma);
    //console.log(this.idCertification);
    //console.log(this.firma, this.idCertification, this.firmaBack, this.logoBack);
    //console.log(this.firma, this.firmaBack, this.logo, this.logoBack)
    if (this.firma === undefined || this.firma === null || this.firma === '' || this.logo === undefined || this.logo === null || this.logo === '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Tiener que seleccionar imagen de logo y firma para el diploma.',
        icon: 'error',
        confirmButtonColor: '#015287',
        showConfirmButton: true,
      });
    } else {

      let diploma = new FormData();

      diploma.append('cursoID', this.idCertification);
      diploma.append('encargado', this.formDiploma.value.encargado);
      diploma.append('puesto', this.formDiploma.value.puesto);

      if (this.firmaBack === this.firma) {
        diploma.append('firma', this.firmaBack);
        //console.log(diploma.getAll('firma'), 'la firma')

      } else {
        diploma.append('firma', this.firma, 'firmaDiploma' + this.idCertification + '.png');
        //console.log(diploma.getAll('firma'), 'la firma')
    }
      

      if (this.hasDiploma == true) {
        diploma.append('activado', '1');
      } else {
        diploma.append('activado', '0');
      }

      if (this.logoBack === this.logo) {
        diploma.append('logo', this.logoBack);
        //console.log(diploma.getAll('logo'), 'el logo')
      } else {
        diploma.append('logo', this.logo, 'logoDiploma' + this.idCertification + '.png');
        console.log(diploma.getAll('logo'), 'el logo')
        }
      

      console.log(diploma.getAll('cursoID'), diploma.getAll('encargado'), diploma.getAll('puesto'), diploma.getAll('firma'), diploma.getAll('activado'), diploma.getAll('logo'));
      ////console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);
      this.session.updateDiploma(diploma, localStorage.getItem('token')).subscribe(
        (data: any) => {
          Swal.close();
          //console.log(data);
          Swal.fire({
            title: '¡Actualizado con exito!',
            text: 'El diploma ha sido actualizado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              //console.log(this.formEdit.value)
              this.diploma(this.idCertification);
            }
          });

        }
      );
    }
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
    if (this.formSearch.value.filter == '') {
      this.formSearch.controls['filter'].setValue('nombre');
    }
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

  fileIcono(event, show?: any) {
    //console.log(event.target.files)
    this.imgIcono = event.target.files[0]
    if (show) {
      this.icon = 2;
      this.imgIconoDos = this.imgIconoDos;
    }
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgIconoDos = event.target.result;
        //console.log(this.imgIconoDos)
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameI = this.imgIcono.name;
    this.filetypeI = this.imgIcono.type;
  }
  fileHeader(event, show?: any) {
    this.imgHeader = event.target.files[0]
    if (show) {
      this.header = 2;
      this.imgHeaderDos = this.imgHeaderDos;
    }
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgHeaderDos = event.target.result;
        //console.log(this.imgHeaderDos)
      };
      reader.readAsDataURL(event.target.files[0])
    }
    /*this.filenameH = this.imgHeader.name;
    this.filetypeH = this.imgHeader.type;*/
  }
  fileTermina(event, act?: any) {
    if (act) {

      this.terminar = 2;
      this.imgTerminaDos = this.imgIconoDos;

    }
    //console.log(event.target.files)
    this.imgTermina = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTerminaDos = event.target.result;
        //console.log(this.imgTerminaDos)
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameT = this.imgTermina.name;
    this.filetypeT = this.imgTermina.type;
  }
  fileScore(event, change?: any) {
    if (change) {
      this.score = 2;
      this.imgScoreDos = this.imgIconoDos;

    }
    //console.log(event.target.files)
    this.imgScore = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgScoreDos = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameS = this.imgScore.name;
    this.filetypeS = this.imgScore.type;
  }
  fileTiempo(event, act?: any) {
    if (act) {
      this.tiempo = 2;
      this.imgScoreDos = this.imgIconoDos;
    }
    this.imgTiempo = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTiempoDos = event.target.result;
        //this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo, this.imgTiempo.name);
      };
      reader.readAsDataURL(event.target.files[0])
    }
    this.filenameD = this.imgTiempo.name;
    this.filetypeD = this.imgTiempo.type;
  }

  
  fileTema(event, file?: any) {
    if (file) {
      //console.log(event.target.files[0])
      
      this.fileSend = event.target.files[0];
    
      //console.log(this.fileSend)
    } else {
      if (this.imgTemaDos != '') {
        this.change = 1;
      }
      this.imgTema = event.target.files[0]
      if (event.target.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imgTemaDos = event.target.result;
          console.log(this.imgTemaDos)
          //this.imgTema = this.helpers.dataUrlToFile(this.imgTema, this.imgTema.name);
        };
        reader.readAsDataURL(event.target.files[0])
      }
    }
  }
  b64Blob(arg0: string[], type: any) {
    throw new Error('Method not implemented.');
  }
  fileTemaV(event) {
    if (this.imgTemaVDos != '') {
      this.change = 1;
    }
    this.imgTemaV = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgTemaVDos = event.target.result;
        //console.log(this.imgTemaVDos)
        //this.imgTemaV = this.helpers.dataUrlToFile(this.imgTemaV, this.imgTemaV.name);
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }

  addModulo() {
    //console.log(this.formModulo.value, this.imgIcono)
    if (this.formModulo.value.title == '' || this.formModulo.value.descripcion == '' || this.imgIcono == '' || this.imgHeader == '' || this.pass == '0') {
      Swal.fire({
        title: '¡Error!',
        text: 'Completa todos los campos obligatorios como titulo, descripción, examen, icono, cabecera y calificación minima.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      /*this.imgIcono = new File([this.imgIcono], this.filenameI, { type: this.filetypeI });
      this.imgTermina = new File([this.imgTermina], this.filenameT, { type: this.filetypeT });
      this.imgScore = new File([this.imgScore], this.filenameS, { type: this.filetypeS });
      this.imgTiempo = new File([this.imgTiempo], this.filenameD, { type: this.filetypeD });
      /*this.imgIcono = this.helpers.dataUrlToFile(this.imgIcono);
      this.imgTermina = this.helpers.dataUrlToFile(this.imgTermina);
      this.imgScore = this.helpers.dataUrlToFile(this.imgScore);
      this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo);*/

      let nameIcon = 'iconoModulo' + this.idModulo + '.jpeg';
      let terminaIcon = 'iconoTermina' + this.idModulo + '.png';
      let scorePerfecto = 'scoreMedalla' + this.idModulo + '.png';
      let medallaTiempo = 'medallaTiempo' + this.idModulo + '.png';
      let imagenHeader = 'imagenHeader' + this.idModulo + '.png';

      let modulo = new FormData();
      modulo.append('idCertification', this.idCertification);
      modulo.append('title', this.formModulo.value.title);
      modulo.append('description', this.formModulo.value.description);
      modulo.append('order_number', '1');
      modulo.append('is_active', '1');

      modulo.append('icon', this.imgIcono, nameIcon);
      modulo.append('imgHeader', this.imgHeader, imagenHeader);

      modulo.append('color_style', this.formModulo.value.color);
      if (this.formModulo.value.url_video != '') {
        modulo.append('url_video', this.formModulo.value.url_video);
      } else {
        modulo.append('url_video', '');
      }
      if (this.imgTermina != '') {
        modulo.append('medal_finish', this.imgTermina, terminaIcon);
      } else {
        modulo.append('medal_finish', '');
      }
      if (this.imgScore != '') {
        modulo.append('medal_perfect', this.imgScore, scorePerfecto);
      } else {
        modulo.append('medal_perfect', '');
      }
      if (this.imgTiempo != '') {
        modulo.append('medal_time', this.imgTiempo, medallaTiempo);
      } else {
        modulo.append('medal_time', '');
      }
      //modulo.append('medal_time',this.imgTiempo, this.imgTiempo.name);
      if (this.formModulo.value.max_time != '') {
        modulo.append('max_time', this.formModulo.value.duracion);
      } else {
        modulo.append('max_time', '');
      }
      modulo.append('min_score', this.pass);
      modulo.append('hasExam', this.exam);
      //console.log(modulo.getAll('hasExam'), modulo.getAll('default_active_days'), modulo.get);
      /*//console.log(modulo.getAll('icon'))
      console.log(modulo.getAll)
      console.log(modulo.get)
      console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
      modulo.getAll('description'), modulo.getAll('imgIcono'),
      modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
      modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
      modulo.getAll('score'), modulo.getAll('hasExam'));*/
      //console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);
      //console.log(modulo.getAll('icon'), modulo.getAll('medal_finish'), modulo.getAll('medal_perfect'), modulo.getAll('medal_time'))

      this.session.addModulo(this.idCertification, modulo, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Agregado con exito!',
            text: 'El módulo ha sido agregado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeViewModulo('back', this.idCertification)
            }
          });
          //this.modules(this.idCertification);
        }
      );
    }
  }

  saveModulo() {
    //console.log(this.imgIcono, this.imgHeader, this.imgTermina, this.imgScore, this.imgTiempo, this.pass);
    //console.log(this.imgIconoDos, this.imgHeaderDos, this.imgTerminaDos, this.imgScoreDos, this.imgTiempoDos, this.pass);
    //console.log(this.imgTerminaDos)
    //console.log(this.idModulo)
    //this.imgIcono = new File([this.imgIcono], this.filenameI, { type: this.filetypeI });
    //this.imgTermina = new File([this.imgTermina], this.filenameT, { type: this.filetypeT });
    //this.imgScore = new File([this.imgScore], this.filenameS, { type: this.filetypeS });
    //this.imgTiempo = new File([this.imgTiempo], this.filenameD, { type: this.filetypeD });
    /*this.imgIcono = this.helpers.dataUrlToFile(this.imgIcono);
    this.imgTermina = this.helpers.dataUrlToFile(this.imgTermina);
    this.imgScore = this.helpers.dataUrlToFile(this.imgScore);
    this.imgTiempo = this.helpers.dataUrlToFile(this.imgTiempo);*/
    //console.log(this.imgHeader.name)
    if (this.pass != '0') {
      let modulo = new FormData();
      modulo.append('idCertification', this.idCertification);
      modulo.append('title', this.formModulo.value.title);
      modulo.append('description', this.formModulo.value.description);
      /*if(this.imgIconoDos != undefined){
        modulo.append('icon', this.imgIconoDos);
      } else {
        modulo.append('icon', this.imgIcono, this.imgIcono.name);
      }*/

      let nameIcon = 'iconoModulo' + this.idModulo + '.jpeg';
      let terminaIcon = 'iconoTermina' + this.idModulo + '.png';
      let scorePerfecto = 'scoreMedalla' + this.idModulo + '.png';
      let medallaTiempo = 'medallaTiempo' + this.idModulo + '.png';
      let imagenHeader = 'imagenHeader' + this.idModulo + '.png';
      
      if (this.imgIconoDos === this.imgIcono) {
        modulo.append('icon', this.imgIconoDos);
        //console.log(modulo.getAll('icon'))

      } else {
        modulo.append('icon', this.imgIcono, nameIcon);
        //console.log(this.imgIcono, 'iconoModulo.png')
        //console.log(modulo.getAll('icon'))
      }
      /*if (this.imgIcono !== '' || this.imgIcono !== undefined) {
        console.log(this.imgIcono)
        modulo.append('icon', this.imgIcono, this.imgIcono.name);
      } else {
        console.log(this.imgIconoDos)
        modulo.append('icon', this.imgIconoDos);
      }*/
      modulo.append('color_style', this.formModulo.value.color);
      if (this.formModulo.value.url_video != '') modulo.append('url_video', this.formModulo.value.url_video);
      if (this.imgTerminaDos === this.imgTermina) {
        modulo.append('medal_finish', this.imgTerminaDos);
        //console.log(modulo.getAll('medal_finish'))

      } else {
        modulo.append('medal_finish', this.imgTermina, terminaIcon);
        //console.log(modulo.getAll('medal_finish'))
      }
      /*if (this.imgTermina != '' || this.imgTermina != undefined) {

        modulo.append('medal_finish', this.imgTermina, this.imgTermina.name);
        console.log(modulo.getAll('medal_finish'))
      } else {
        modulo.append('medal_finish', this.imgTerminaDos);
        console.log(modulo.getAll('medal_finish'))
      }*/
      /*if(this.imgTerminaDos != undefined){
        modulo.append('icon', this.imgTerminaDos);
      } else {
        modulo.append('icon', this.imgTermina, this.imgTermina.name);
      }*/
      /*if (this.imgScore != '' || this.imgScore != undefined) {
        modulo.append('medal_perfect', this.imgScore, this.imgScore.name);
      } else {
        modulo.append('medal_perfect', this.imgScoreDos);
      }*/
      //console.log(this.imgScoreDos, this.imgScore)
      if (this.imgScoreDos === this.imgScore) {
        modulo.append('medal_perfect', this.imgScoreDos);
        //console.log(modulo.getAll('medal_perfect'))

      } else {
        modulo.append('medal_perfect', this.imgScore, scorePerfecto);
        //console.log(modulo.getAll('medal_perfect'))
      }
      /*if(this.imgScoreDos != undefined){
        modulo.append('icon', this.imgScoreDos);
      } else {
        modulo.append('icon', this.imgScore, this.imgScore.name);
      }
      */
     //console.log(this.imgTiempoDos, this.imgTiempo)
      if (this.imgTiempoDos === this.imgTiempo) {
        modulo.append('medal_time', this.imgTiempoDos);
        //console.log(modulo.getAll('medal_time'))

      } else {
        modulo.append('medal_time', this.imgTiempo, medallaTiempo);
        //console.log(modulo.getAll('medal_time'))
      }
      /*if (this.imgTiempo != '' || this.imgTiempo != undefined) {
        modulo.append('medal_time', this.imgTiempo, this.imgTiempo.name);
      } else {
        modulo.append('medal_time', this.imgTiempoDos);
      }*/
      /*if(this.imgTiempoDos != undefined){
        modulo.append('icon', this.imgTiempoDos);
      } else {
        modulo.append('icon', this.imgTiempo, this.imgTiempo.name);
      }*/
      //modulo.append('medal_time',this.imgTiempo, this.imgTiempo.name);
      modulo.append('max_time', this.formModulo.value.duracion);
      modulo.append('min_score', this.pass);
      modulo.append('hasExam', this.exam);
      //console.log(this.imgHeaderDos, this.imgHeader)
      if (this.imgHeaderDos === this.imgHeader) {
        modulo.append('imgHeader', this.imgHeaderDos);
        //console.log(modulo.getAll('imgHeader'))

      } else {
        modulo.append('imgHeader', this.imgHeader, imagenHeader);
        //console.log(modulo.getAll('imgHeader'))
      }
      /*if (this.imgHeader != '' || this.imgHeader != undefined) {
        modulo.append('imgHeader', this.imgHeader, this.imgHeader.name);
      } else {
        modulo.append('imgHeader', this.imgHeaderDos);
      }
      /*if(this.imgHeaderDos != undefined){
        modulo.append('icon', this.imgHeaderDos);
      } else {
        modulo.append('icon', this.imgHeader, this.imgHeader.name);
      }*/
      /*console.log(modulo.getAll('icon'))
      console.log(modulo.getAll)
      console.log(modulo.get)
      console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
      modulo.getAll('description'), modulo.getAll('imgIcono'),
      modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
      modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
      modulo.getAll('score'), modulo.getAll('hasExam'));
      console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);*/
      //console.log(modulo.getAll('icon'), modulo.getAll('medal_finish'), modulo.getAll('medal_perfect'), modulo.getAll('medal_time'))

      this.session.updateModulo(this.idModulo, modulo, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Actualizado con exito!',
            text: 'El módulo ha sido actualizado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeViewModulo('back', this.idCertification)
            }
          });
          //this.modules(this.idCertification);
          //this.changeViewModulo('back', this.idCertification)
        }
      );
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que seleccionar una calificación minima aprobatoria para tu módulo',
        icon: 'error',
        confirmButtonColor: '#015287',

      });
    }
  }

  addTema() {
    //console.log(this.formTemas.value)
    //console.log(this.fileSend)
    let tema = new FormData();
    if (this.formTemas.value.title != '' && this.formTemas.value.description != '' && this.imgTema != undefined && this.imgTemaV != undefined) {
      this.helpers.loader();
      let nameIcon = 'iconTema' + this.idTema + '.jpeg';

      tema.append('idModule', this.idModulo);
      tema.append('title', this.formTemas.value.title);
      tema.append('description', this.formTemas.value.description);
      tema.append('order_number', '1');
      tema.append('is_active', '1');
      if (this.imgTema != '') {
        tema.append('icon', this.imgTema, nameIcon);
      } else {
        tema.append('icon', this.imgTemaDos);
      }

      //console.log(this.formTemas.value.url_video != '')
      if (this.formTemas.value.url_video != '') {
        tema.append('url_video', this.formTemas.value.url_video);
      } else {
        tema.append('url_video', 'null');
      }

      if (this.formTemas.value.url_subtitulos != '') tema.append('url_subtitulos', this.formTemas.value.url_subtitulos);
      if (this.imgTemaV != '') {
        tema.append('icon_gold', this.imgTemaV, this.imgTemaV);
      } else {
        tema.append('icon_gold', this.imgTemaVDos);
      }
      //console.log(this.fileSend)
      if (this.fileSend == 'null' || this.fileSend == undefined) {
        //console.log('no tiene archivo')
        tema.append('doc', 'null');
      } else {
        //console.log('tiene archivo')
        tema.append('doc', this.fileSend, this.fileSend.name);
      }
      /*if(this.fileSend != 'null' || this.fileSend != undefined){
        console.log('tiene archivo')
        tema.append('doc', this.fileSend, this.fileSend.name);
      } else {
        console.log('no tiene archivo')
        tema.append('doc', 'null');
      }*/
      /*console.log(modulo.getAll('icon'))
      console.log(modulo.getAll)
      console.log(modulo.get)
      console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
      modulo.getAll('description'), modulo.getAll('imgIcono'),
      modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
      modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
      modulo.getAll('score'), modulo.getAll('hasExam'));*/
      //console.log(tema.getAll('description'));

      this.session.addTema(tema, localStorage.getItem('token')).subscribe(
        (data: any) => {
          Swal.close();
          //console.log(data);
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
    //console.log(this.imgTema, this.imgTemaV, this.imgTemaDos, this.imgTemaVDos, this.fileSend)
    /*this.imgTema = this.helpers.dataUrlToFile(this.imgTema /*, this.imgTema.name);
    this.imgTemaV = this.helpers.dataUrlToFile(this.imgTemaV /*, this.imgTemaV.name);*/
    //console.log(this.imgIcono, this.imgTermina, this.imgScore, this.imgTiempo, this.idCertification)
    console.log(this.formTemas.value, this.fileSend, this.imgTema, this.imgTemaDos, this.imgTemaV, this.imgTemaVDos)
    this.helpers.loader();
    //console.log(this.fileSend, this.fileBack, this.videoBack, this.formTemas.value.url_video)
    if (this.fileSend != null) {
      this.fileBack = null;
      this.videoBack = null;
      this.formTemas.value.url_video = null;
      console.log('entro 1')
    } else if (this.formTemas.value.url_video != 'null') {
      console.log(this.formTemas.value.url_video)
      this.fileSend = null;
      this.fileBack = null;
      console.log('entro 2')
    }
    console.log(this.fileSend, this.fileBack, this.videoBack, this.formTemas.value.url_video)

    let nameIcon = 'iconTema' + this.idTema + '.jpeg'; //nombre que s eenviara en la imagen del tema
    //console.log(nameIcon)
    
    let tema = new FormData();
    tema.append('idModule', this.idModulo);
    // console.log(tema.getAll('idModule'));
    tema.append('title', this.formTemas.value.title);
    //console.log(tema.getAll('title'));
    tema.append('description', this.formTemas.value.description);
    //console.log(tema.getAll('description'));
    tema.append('order_number', '1');
    //console.log(tema.getAll('order_number'));
    tema.append('is_active', '1');
    //.log(tema.getAll('is_active'));
    //console.log(this.imgTemaDos, this.imgTema)
    if (this.imgTemaDos === this.imgTema) {
      tema.append('icon', this.imgTemaDos);
      //console.log(tema.getAll('icon'));
    } else {
      tema.append('icon', this.imgTema, nameIcon);
      //console.log(tema.getAll('icon'));
    }

    /*if(this.formTemas.value.url_video != null){ 
    tema.append('url_video', this.formTemas.value.url_video);
    } else {
      tema.append('url_video', this.videoBack);
    }*/
    tema.append('url_video', this.formTemas.value.url_video);
    //console.log(tema.getAll('url_video'));
    tema.append('url_subtitulos', this.formTemas.value.url_subtitulos);
    //.log(tema.getAll('url_subtitulos'));

    /*if (this.formTemas.value.file === this.fileSend) {
      tema.append('doc', this.formTemas.value.file);
      //console.log(tema.getAll('doc'));
    } else {
      tema.append('doc', this.fileSend, this.fileSend.name);
      //console.log(tema.getAll('doc'));
    }*/
    //console.log(this.fileSend)
    if (this.fileSend != null) {
      tema.append('doc', this.fileSend, this.fileSend.name);
    } else {
      tema.append('doc', this.fileBack);
    }

    console.log(tema.getAll('icon'), tema.getAll('icon_gold'), tema.getAll('url_video'), tema.getAll('doc'))
    //console.log(tema.getAll('description'),tema.getAll('url_video'),tema.getAll('url_subtitulos'),tema.getAll('doc'));
    //.log(this.idModulo)
    /*console.log(modulo.getAll('idCertification'), modulo.getAll('title'),
    modulo.getAll('description'), modulo.getAll('imgIcono'),
    modulo.getAll('color'),modulo.getAll('imgTermina'),modulo.getAll('imgScore'),
    modulo.getAll('imgTiempo'),modulo.getAll('duracion'),
    modulo.getAll('score'), modulo.getAll('hasExam'));*/
    //console.log(tema.getAll('doc'));
    console.log();
    this.session.updateTemas(this.idTema, tema, localStorage.getItem('token')).subscribe(
      (data: any) => {
        Swal.close();
        //console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El tema ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if (result.isConfirmed) {
            this.temas(this.idModulo);
            this.changeViewTemas('back', this.idModulo)
          }
        });
        //this.modules(this.idCertification);
      }, error => {
        //console.log(error);
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
            //console.log(data);
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

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      //console.log(btoa(loader.file));
      //console.log(new UploadAdapter(loader));
      return new UploadAdapter(loader);
    };
  }

  //trae los columnas de un modulo
  sizeColumna() {
    this.get.getsizeCol(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.sizecolumna = data;
      }
    );
  }
  radioMostrar(event) {
    switch (event.target.value) {
      case '0':
        this.mostrar = '0';
        //this.formData.append('hasExam', '0');
        break;
      case '1':
        this.mostrar = '1';
        //this.formData.append('hasExam', '1');
        break;
    }
  }

  addTemasCol() {
    //console.log(this.formTemasCol.value.contenido, this.colFinal, this.data)
    let temacol = {
      idTopic: this.idTema,
      content: this.formTemasCol.value.contenido,
      column_size: this.formTemasCol.value.col,
      column_title: this.formTemasCol.value.title,
      show_title: this.mostrar
    };
    //console.log(temacol)
    this.session.addCol(temacol, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'La columna se añadio.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.formTemasCol.reset();
            this.mostrar = '0';
            this.changeViewTemas('cols', this.idTema);

          }
        });
        //this.modules(this.idCertification);
        /*this.temas(this.idModulo);*/

      }
    );
  }

  saveCol() {
    //console.log(this.formTemasCol.value.contenido, this.data, this.colFinal)
    //console.log(this.colFinal)
    this.data = this.colFinal
    //console.log(this.data)
    let temaCol = {
      idTopic_content: this.idTemaC,
      idTopic: this.idTopicC,
      content: this.data,
      column_size: this.formTemasCol.value.col,
      column_title: this.formTemasCol.value.title,
      show_title: this.mostrar
    }
    //console.log(temaCol)
    this.session.updateCol(temaCol, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'La columna ha sido actualizada.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.changeViewTemas('cols', this.idTema);
          }
        });
      }
    );
  }
}
