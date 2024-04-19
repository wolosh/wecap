import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';





@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css'],
  providers: [ToolbarService, EditService, PageService]
})
export class ExamenesComponent implements OnInit {
  //n:number=0;
  /*formModal = this.formBuilder.group({
    titulo: ([''],[Validators.required]),
    title: [''],
    duracion: [''],
    fechaInicio: [''],
    fechaFinal: [''],
  });*/
  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public pageSettings: Object;
  public editparams: Object;

  jsonPrueba = {
    idForm: '',
    img: '',
  }
  arrayPrueba = [] as any;
  seeQuestions = [] as any;

  json = {
    idEval_question: '',
    pregunta: '',
    is_active: 0,
    respuestas: []
  }

  //Modal para crear Examen
  formModal = new FormGroup({
    title: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),
  });

  //Modal para editar opción de una pregunta
  formModalEdit = new FormGroup({
    option: new FormControl('', Validators.required),
    is_correct: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  });

  lastId: number = 0;
  userCount: number = 0;
  modLength = 0;
  backAnswer: any;
  backDataAnswer: any;
  backQuestion: any;
  questionAnswers = [] as any;
  editQuestion = 0;
  cloneOption: number = 0;
  usersArr: any;
  searchArray: any;
  modules: any;
  length = 0;
  asignature = 0;
  diagnostic = 0;
  exam = 0;
  //INICIO VARIABLES PAGINACIÓN
  pas: number = 1;
  pquit: number = 1;
  psc: number = 1;
  pca: number = 1;
  pdiag: number = 1;
  pexam: number = 1;
  pexamEdit: number = 1;
  pe: number = 1;
  //TERMINA VARIABLES PAGINACIÓN
  public searchSelect = '0';
  public certificationSelected = '0';
  formSearch: FormGroup;
  formAbiertas: FormGroup;
  public text1 = '';
  public dateSelected = '';
  n: number = 0;
  nameUser = '';
  certificaciones: any;
  objUsers = [] as any;
  showArr = [] as any;
  examModule = [] as any;
  optionsProv = [] as any;
  usersModule = [] as any;
  showLength = 0;
  idUser: any;
  userCourses: any;
  userCL: number = 0;
  questions = [] as any;
  userAL: number = 0;
  userId: any;
  moduloTitle: any;
  respaldo: any;
  allThemes: boolean = false;
  public durationSelected = '0';
  isCorrect: number;

  allDiagnostico: any;
  respaldo1: any;
  certificacionID: any;
  none = 0;
  backupDiagnostic = '';
  public options = '';
  new = 0;
  public selectedOption = 2;
  public selectedSearch = 2;
  backId: any;
  image: any;
  onImage = 0;
  error = 0;
  question: any;
  title: any;
  titleC: any;
  allModules: any;
  idModulo: any;
  alltemas: any;
  idModuloT: any;
  idTema: any;
  showModulesThemes = [] as any;
  public selectedThemes: any = [];
  public backThemes: any = [];
  countCert: any;
  diagLength: any;
  searchAdd: any;
  //examQuestion = [] as any;
  formulario: FormGroup;
  idOption: any;
  backOpenQuestions = [] as any;
  imgPre: any;
  imgOpcion: any;



  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) {

  }

  ngOnInit(): void {
    //console.log(this.helpers.domainPrueba);

        this.data = this.examModule;
    //this.data = orderDetails;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal'};
        this.toolbar = ['Add', 'Edit', 'Delete'];
        //this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '150px' }};


    console.log(localStorage.getItem('type'))

    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.loader();
      this.helpers.type = localStorage.getItem('type');
      this.users('asignature');
      this.startForm(1);
      this.certifications();
      this.crearFormulario();
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
            this.route.navigate(['/']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }
    }
    this.helpers.cursos = 1;
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      experienciaLaboral: this.formBuilder.array([])
    });
  }

  get experienciaLaboral(): FormArray {
    return this.formulario.get('experienciaLaboral') as FormArray;
  }

  anadirExperienciaLaboral() {
    this.idOption = '';
    const trabajo = this.formBuilder.group({
      empresa: new FormControl(''),
      puesto: new FormControl(''),
      descripcion: new FormControl('')
    });

    this.experienciaLaboral.push(trabajo);
  }

  borrarTrabajo(indice: number) {
    this.experienciaLaboral.removeAt(indice);
  }

  getPage(page: any) {
    this.pe = page;
  }

  editCourse(curso: any, action: any) {
    //console.log(this.userId, curso, action, this.dateSelected);
    let data = new FormData();
    if (action == 'editar') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'La fecha de expiración será modificada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#015287',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, modificar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          data.append('idCurso', curso);
          data.append('idUser', this.userId);
          data.append('finish_date', this.dateSelected);

          this.session.editarExpiracion(data, localStorage.getItem('token')).subscribe(
            (data: any) => {
              //console.log(data);
              Swal.fire({
                title: '¡Modificado con exito!',
                text: 'La fecha ha sido ha sido modificada con exito.',
                icon: 'success',
                confirmButtonColor: '#015287',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.changeAsignature(0);
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
      })
    } else if (action == 'quitar') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El usuario será eliminado del curso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#015287',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          data.append('idCurso', curso);
          data.append('idUser', this.userId);

          this.session.quitarCurso(data, localStorage.getItem('token')).subscribe(
            (data: any) => {
              //console.log(data);
              Swal.fire({
                title: '¡Modificado con exito!',
                text: 'El usuario ha sido eliminado del curso.',
                icon: 'success',
                confirmButtonColor: '#015287',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.changeAsignature(0);
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
      });
    }
  }



  onClickTab(tab: string) {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (tab) {
          case 'asignature':
            this.pdiag = 1;
            this.pexam = 1;
            this.pexamEdit = 1;
            this.pas = 1;
            this.pquit = 1;
            //this.asingnature = 0;
            this.erase();
            this.startForm(1);
            this.users('asignature');
            break;
          case 'diagnostic':
            this.pdiag = 1;
            this.pexam = 1;
            this.pexamEdit = 1;
            this.pas = 1;
            this.pquit = 1;
            this.psc = 1;
            this.questions = [];
            this.optionsProv = [];
            this.diagnostic = 0;
            this.cloneOption = 0;
            this.certifications();
            break;
          case 'test':
            this.editQuestion = 0;
            this.pdiag = 1;
            this.pexam = 1;
            this.pexamEdit = 1;
            this.pas = 1;
            this.pquit = 1;
            this.examModule = [];
            this.optionsProv = [];
            this.exam = 0;
            this.cloneOption = 0;
            this.certifications();
        }
      }
    });
  }

  goCourses() {
    console.log(localStorage.getItem('type'))
    this.route.navigate(['/cmtemplate']);
  }

  changeExam(id: any, certificacion?: any, name?: any, question?: any) {
    this.examModule = [];
    this.questionAnswers = [];
    this.optionsProv = [];
    //console.log(id, certificacion, name, question);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.moduloTitle = name;
        this.exam = id;
        //console.log(this.exam);
        if (id == 1) {
          this.respaldo1 = certificacion;
        } else
          if (id == 2) {
            this.respaldo = certificacion;
          }
        //console.log(certificacion)
        switch (id) {
          case 0:
            this.onClickTab('test');
            break;
          case 1:
            console.log(id, certificacion, this.respaldo1);
            this.get.getModules(this.respaldo1, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data);
                this.modules = data;
                this.modLength = data.length;
                console.log(this.modLength);
                Swal.close();
              }
            );
            break;
          case 2:
            this.editQuestion = 0;
            this.cloneOption = 0;
            this.certificacionID = certificacion;
            //console.log(id, certificacion, this.respaldo, this.certificacionID);
            this.get.getExamModule(certificacion, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data);
                /*if (data.preguntas.length == 0) {
                  this.none = 1;
                } else {
                  this.none = 2;
                  this.examModule = data.preguntas;
                }*/
                if (data == null || data.message) {
                  console.log(data)
                  this.none = 0;
                  //console.log(this.none)
                } else {
                  console.log(data);
                  if (data.preguntas.length == 0) {
                    //console.log('no tiene preguntas')
                    this.none = 1;
                    //console.log(this.none)
                  } else {
                    //console.log('si tiene preguntas')
                    this.none = 2;
                    //console.log(this.none)
                    //this.questions = data;
                    this.examModule = data.preguntas;
                    this.modLength = data.preguntas.length;
                    console.log(this.examModule, this.modLength);
                    this.examModule.forEach(element => {
                      this.tipo = element.respuestas;
                    });
                    //this.tipo = data.preguntas.respuestas;
                    //console.log(data, data.preguntas);
                    //console.log(this.tipo)
                  }
                }
                //console.log(this.none);
                Swal.close();
              }
            );
            break;
          case 3:
            this.cloneOption = 0;
            this.moduloTitle = name;
            this.idModulo = certificacion;
            console.log(id, certificacion, this.respaldo, this.idModulo);
            this.get.getCursantesModulo(certificacion, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data)
                Swal.close();
                this.usersModule = data.usuarios;
                //console.log(this.usersModule)
              }
            );
            break;
          case 4:
            this.exam = 4;
            this.startForm(2);
            Swal.close();
            break;
          case 5:
            this.exam = 5;
            this.startForm(2);
            Swal.close();
            break;
          case 6:
            //console.log('Case')
            this.nameUser = name;
            this.exam = 6;
            this.startForm(2);
            console.log(this.idModulo, certificacion);
            //console.log(id, certificacion, question, name, this.respaldo, this.idModulo, this.seeQuestions)
            this.get.getPreguntasPendientes(this.idModulo, certificacion, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data);
                this.backOpenQuestions = data;
                this.seeQuestions = data.respuestas;
                this.seeQuestions.forEach(element => {
                  element.correcto=0;
                });
                //console.log(this.seeQuestions, this.backOpenQuestions)
              }
            );
            /*this.get.getExamModule(certificacion, localStorage.getItem('token')).subscribe(
              (data: any) => {
                //console.log(data)
                for (const [key, value] of Object.entries(data)) {
                  //console.log(value)
                  const info = [...[value]];
                  //console.log(info)
                  for (let i of info) {
                    for (const [key, value] of Object.entries(i)) {
                      //console.log(value.question)
                      if (value.idEval_question == question) {
                        //console.log(value.question)
                        this.formAbiertas.controls['question'].setValue(value.question);
                        this.formAbiertas.controls['respuestas'].setValue(value.respuesta);
                      }
                    }
                  }
                }
              });*/
            Swal.close();
            break;
          case 7: //editar pregunta
            this.backAnswer = question;
            this.editQuestion = 1;
            //console.log(certificacion, question, this.editQuestion)
            this.get.questionInfo(question, localStorage.getItem('token')).subscribe(
              (data: any) => {
                //console.log(data);
                this.startForm(2);
                this.backDataAnswer = data;
                this.formAbiertas.controls['question'].setValue(data.question);
                //console.log(data);
                if (data.respuestas) {
                  this.exam = 5;
                  //console.log(data.respuestas)
                  this.questionAnswers = data.respuestas;
                  //console.log(this.questionAnswers)
                } else {
                  this.exam = 4;
                }
                Swal.close();
              }
            );
            break;
        }
      }
    });
  }

  editAnswers(id: any, chance: number, question: any, option?: any, correct?: any, img?: any) {
    //console.log(id, option, correct, img);
    switch (chance) {
      case 1:
        this.backAnswer = id;
        this.backQuestion = question;
        this.formModalEdit.controls['option'].setValue(option);
        //console.log(this.formModalEdit.value)
        this.selectedOption = correct;
        //console.log(this.selectedOption);
        if (img != '') {
          this.onImage = 1;
          //console.log('esta vacio')
        } else {
          //console.log('no esta vacio')
          this.onImage = 0;
        }
        break;
      case 2:
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            //console.log(this.formModalEdit.value, this.selectedOption, this.onImage, this.image, this.backAnswer);
            if (this.formModalEdit.value.option == '' || this.formModalEdit.value.option == null) {
              Swal.fire({
                title: '¡Error!',
                text: 'Debes ingresar una opción.',
                icon: 'error',
                confirmButtonColor: '#015287',
              });
            } else {
              this.questionAnswers.map((item: any) => {
                //console.log(item)
                if (item.idEval_option == this.backAnswer) {
                  item.option = this.formModalEdit.value.option;
                  item.is_correct = this.selectedSearch.toString();
                  item.img = this.image;
                }
                //console.log(item);

              });
              //console.log(this.questionAnswers);
              Swal.fire({
                title: '¡Modificado con exito!',
                text: 'La opción ha sido modificada con exito.',
                icon: 'success',
                confirmButtonColor: '#015287',
              })
            }
          }
        });

    }

  }

  updateExamenes(ID?: any) {
    //console.log(ID, this.examModule, this.certificacionID);
    let json = {
      idModulo: this.certificacionID,
      preguntas: JSON.stringify(this.examModule)
    }

    this.session.updatePreguntasExamen(json, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
      }
    );

    //console.log(json);
  }

  startForm(form: any): void {
    //Metodo para inicializar el formulario
    if (form == 1) {
      this.formSearch = this.formBuilder.group({
        filter: [''],
        search: [''],
        group: [''],
        users: [''],
      });
    } else if (form == 2) {
      this.formAbiertas = this.formBuilder.group({
        question: [''],
        respuesta: [''],
      });
    }

  }

  //trae los usuarios
  users(type: any) {
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if (type == 'asignature') {
          this.usersArr = data.users;
          this.userCount = data.users.length;
          this.pas = 1;
          //console.log(this.usersArr)
          Swal.close();
        } else if (type == 'show') {
          this.searchSelect = '';
          this.searchArray = data.users;
          this.searchAdd = data.users.length;
          this.length = data.users.length;
          //console.log(this.searchArray, this.length)
        }
        Swal.close();
      }
    );
  }

  certifications() {
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        this.countCert = this.certificaciones.length;
        Swal.close();
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  changeAsignature(id: any, user?: any) {
    //console.log(id, user)
    if (user) this.userId = user;
    switch (id) {
      case 0:
        this.asignature = 0;
        this.erase();
        this.users('asignature');
        break;
      case 1:
        this.asignature = 1;
        console.log(user)
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.usersArr.forEach(element => {
              console.log(element, user)
              if(element.idUser == user){
                console.log(element);
                this.nameUser = element.full_name;
              }
            })
            this.get.getUserCourses(user, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data, data.length);
                this.userCourses = data;
                this.userCL = data.length;
                Swal.close();
                //console.log(this.userCourses, this.userCL);
              }
            );

          }
        });
        break;
      case 2:
        console.log(user)
        this.asignature = 2;
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.get.getUserCourses(user, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data, data.length);
                this.userCourses = data;
                this.userAL = data.length;
                Swal.close();
                //console.log(this.userCourses, this.userAL);
              }
            );

          }
        });
    }

    //console.log(this.idUser)
  }

  changeDiagnostic(id: any, diagnostico?: any, question?: any) {
    //console.log(id, diagnostico, question)
    //this.question = question;
    //console.log(this.question)
    if (this.backupDiagnostic == '') this.backupDiagnostic = diagnostico;
    //console.log(this.backupDiagnostic)
    switch (id) {
      case 0:
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.backupDiagnostic = '';
            this.diagnostic = 0;
            this.certifications();
          }
        });
        break;
      case 1:
        this.diagnostic = 1;
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.get.getDiagnostico(diagnostico, localStorage.getItem('token')).subscribe(
              (data: any) => {
                //console.log(data);
                if (data == null || data.message) {
                  //console.log(data)
                  this.none = 0;
                } else {
                  //console.log(data);
                  if (data.preguntas.length == 0) {
                    //console.log('no tiene preguntas')
                    this.none = 1;
                  } else {
                    //console.log('si tiene preguntas')
                    this.none = 2;
                    //this.questions = data;
                    this.questions = data.preguntas;
                    this.diagLength = data.length;
                    //console.log(data);
                  }
                }
                /*console.log(data, JSON.parse(data.formulario));
                this.questions = JSON.parse(data.formulario);*/
                //console.log(this.questions);
                Swal.close();
              }
            );
          }
        });
        break;
      case 2:
        this.diagnostic = 2;
        this.startForm(2);
        break;
      case 3:
        this.diagnostic = 3;
        this.startForm(2);
        break;
      case 4:
        this.diagnostic = 4;
        this.startForm(2);
        //console.log(this.question)
        this.questions.forEach(element => {
          if (element.idPregunta == question) {
            //console.log(element)
            this.formAbiertas.controls['question'].setValue(element.pregunta);
          }
        });
        break;
    }
  }

  removeEditQuestion(option: any) {
    console.log(this.questionAnswers, option);
    this.questionAnswers.forEach(element => {
      if (element.idEval_option == option) {
        this.questionAnswers.splice(this.questionAnswers.indexOf(element), 1);
      }
    });
    console.log(this.questionAnswers);
  }

  removeQuestion(id: any, action: any, type?: any) {
    console.log(id);
    console.log(this.optionsProv);
    console.log(type)
    if (type) {
      //console.log(type);
      this.optionsProv.forEach(element => {
        console.log(element);
        console.log(element, element.opcion, id);
        if (element.opcion == id) {
          console.log(element);
          this.optionsProv.splice(this.optionsProv.indexOf(element), 1);
        }
      });
      console.log(this.optionsProv);
    } else {
      if (action == 'diagnostic') {
        this.session.deleteQuestionDiagnostico(id, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Eliminado con exito!',
              text: 'La pregunta ha sido eliminada con exito.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changeDiagnostic(1, this.backupDiagnostic);
              }
            });
          }
        );
      } else if (action == 'exam') {
        this.session.deleteQuestionExam(id, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Eliminado con exito!',
              text: 'La pregunta ha sido eliminada con exito.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changeExam(2, this.certificacionID);
              }
            });
          }
        );
      }
    }
  }

  //actualiza las preguntas de un examen
  updateQuestionsExam(question: any) {
    console.log(this.examModule, this.certificacionID, this.backDataAnswer)
    /*console.log(this.formulario.getRawValue(), this.arrayPrueba)
    this.formulario.getRawValue().experienciaLaboral.forEach((element: any) => {
      console.log(element);
    });*/

    if (this.formAbiertas.value.question == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes agregar una pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      let json = {
        idModulo: this.certificacionID,
        preguntas: []
      }

      if (this.examModule.length == 0) {
        if (question == 'open') {
          json.preguntas.push({
            //idEval_question: this.examModule.length + 1,
            idEval_question: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: []
          });
        } else if (question == 'close') {

          /*this.formulario.getRawValue().experienciaLaboral.forEach((element: any, index) => {
            console.log(element, index);
            this.arrayPrueba.forEach((element2: any, index2: any) => {
              console.log(element2, index2);
              if(index == element2.idForm){
                console.log(element, element2)
                console.log(element.empresa, element.puesto, element.descripcion)
              }
            });*/
            /*this.optionsProv.push({
              //idEval_option: i + 1,
              idEval_option: '',
              opcion: this.options,
              correcta: this.selectedOption,
              img: ''
            })*/
          //});
          json.preguntas.push({
            //idEval_question: this.examModule.length + 1,
            idEval_question: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: this.optionsProv
          });
        }
        console.log(json)
      } else {
        this.examModule.forEach(element => {
          this.backId = parseInt(element.idEval_question); //guarda el ultimo id de la pregunta en el arreglo
          //console.log(parseInt(element.idEval_question), this.backId);
          //if(question == 'open'){
          json.preguntas.push({
            idEval_question: element.idEval_question,
            pregunta: element.question,
            is_active: element.is_active,
            respuestas: element.respuestas
          });
        });
        if (question == 'open') {
          json.preguntas.push({
            //idEval_question: this.backId + 1,
            idEval_question: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: []
          });
        } else if (question == 'close') {
          json.preguntas.push({
            //idEval_question: this.backId + 1,
            idEval_question: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: this.optionsProv
          });
        }

        console.log(json)
      }
console.log(json)
      let change = JSON.stringify(json);
      //console.log(change);
      this.session.updatePreguntasExamen(json, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Modificado con exito!',
            text: 'La pregunta se agrego con exito.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeExam(2, this.certificacionID);
            }
          });
        }
      );
      //console.log(json)
    }
  }

  //actualiza las preguntas de un diagnostico
  updateQuestions(question: any) {
    //console.log(this.questions);
    if (this.formAbiertas.value.question == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes agregar una pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      let json = {
        idCurso: this.backupDiagnostic,
        preguntas: []
      }
      //console.log(json)

      if (this.questions.length === 0) {
        if (question == 'open') {
          json.preguntas.push({
            //idPregunta: this.questions.length + 1,
            idPregunta: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: []
          });
        } else if (question == 'close') {
          json.preguntas.push({
            //idPregunta: this.questions.length + 1,
            idPregunta: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: this.optionsProv
          });
        }
        //console.log(json)
      } else {
        this.questions.forEach(element => {
          this.backId = parseInt(element.idPregunta); //guarda el ultimo id de la pregunta en el arreglo
          //console.log(parseInt(element.idPregunta), this.backId);
          //if(question == 'open'){
          json.preguntas.push({
            idPregunta: element.idPregunta,
            //idPregunta: '',
            pregunta: element.pregunta,
            is_active: element.activo,
            respuestas: element.opciones
          });
          /*} else if(question == 'close'){
            json.preguntas.push({
              idPregunta: element.idPregunta,
              pregunta: element.pregunta,
              is_active: 1,
              respuestas: element.opciones
            });
          }*/
        });
        if (question == 'open') {
          json.preguntas.push({
            //idPregunta: this.backId + 1,
            idPregunta: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: []
          });
        } else if (question == 'close') {
          json.preguntas.push({
            //idPregunta: this.backId + 1,
            idPregunta: '',
            pregunta: this.formAbiertas.value.question,
            is_active: 1,
            respuestas: this.optionsProv
          });
        }

        //console.log(json)
      }

      /*if (question == 'open') {
        json.preguntas.push({
          idPregunta: '1',
          pregunta: this.formAbiertas.value.question,
          is_active: 1,
          respuestas: []
        });
        /*json['preguntas'] = [{
          idPregunta: '1',
          pregunta: this.formAbiertas.value.question,
          is_active: 1,
          respuestas: []
        }];*/
      /*} else if (question == 'close') {
        console.log(this.optionsProv)
        json.preguntas.push({
          idPregunta: '1',
          pregunta: this.formAbiertas.value.question,
          is_active: 1,
          respuestas: this.optionsProv
        });
        /*json['preguntas'] = [{
          idPregunta: '1',
          pregunta: this.formAbiertas.value.question,
          is_active: 1,
          respuestas: this.optionsProv
        }];*/
      //}
      //console.log(json);

      let change = JSON.stringify(json);
      //console.log(change);
      this.session.updatePreguntasDiagnostico(json, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Modificado con exito!',
            text: 'La pregunta se agrego con exito.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeDiagnostic(1, this.backupDiagnostic);
            }
          });
        }
      );
    }

  }

  createExam(id: any, name?: any) {
    //console.log(id, name, this.durationSelected);
    //console.log(this.formModal.value);
    this.formModal.controls['duracion'].setValue(this.durationSelected);
    if (this.formModal.valid) {
      this.error = 0;
      let formData = new FormData();
      formData.append('idModulo', id);
      formData.append('title', this.formModal.value.title);
      formData.append('duracion', this.formModal.value.duracion);
      //formData.append('duracion', this.durationSelected);
      formData.append('fechaInicio', this.formModal.value.fechaInicio);
      formData.append('fechaFinal', this.formModal.value.fechaFinal);

      //console.log(formData.getAll('idModulo'), formData.getAll('title'), formData.getAll('duracion'), formData.getAll('fechaInicio'), formData.getAll('fechaFinal'));

      this.session.updateCreateExamen(formData, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Creado con exito!',
            text: 'El examen ha sido creado con exito, ahora puedes comenzar a agregar preguntas en los botones de la parte superior.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeExam(2, id);
              this.formModal.reset();
            }
          });
        }
      );
    } else {
      this.error = 1;
    }

    /*let nameModule = 'Examen Módulo:' + ' ' + name;
    console.log(nameModule);
    let formData = new FormData();
    formData.append('idModulo', id);
    formData.append('title', nameModule);

    console.log(`Hola ${id} ${name}`)*/

  }

  createDiagnostic(id: any) {
    //console.log(id);
    let formData = new FormData();
    formData.append('idCurso', id);
    formData.append('title', 'diagnostico');
    this.session.updateDiagnostico(formData, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Creado con exito!',
          text: 'El diagnostico ha sido creado con exito, ahora puedes comenzar a agregar preguntas en los botones de la parte superior.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if (result.isConfirmed) {
            this.changeDiagnostic(1, id);
          }
        });
      }
    );
  }



  changeSearch() {
    //console.log(this.searchSelect);
    switch (this.searchSelect) {
      case '1':
        this.formSearch.controls['filter'].setValue('nombre');
        break;
      case '2':
        this.formSearch.controls['filter'].setValue('area');
        break;
      case '3':
        this.formSearch.controls['filter'].setValue('puesto');
        break;
    }
    //console.log(this.formSearch.value, this.formSearch.value.filter);

  }

  didModify() {
    //console.log(this.text1, this.formSearch.value.filter, this.formSearch.value.search);

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
    ////console.log(filter, param);
    this.psc = 1;
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
          this.pas = 0;
          this.pquit = 0;
          this.psc = 1;
          this.text1 = '';
          this.searchSelect = '0'
          this.users(kind);
        }
      });
    }
  }



  changeCertificacion(event: any, kind: any, mod?:any) {
    console.log(event.target.value, kind, this.allThemes, mod);
    let json = {
      idModule: event.target.value,
      title: '',
      temas: []
    }
    switch (kind) {
      case 'module':
        this.showModulesThemes.forEach(element => {
          if (element.idModule == event.target.value) {
            json.title = element.title;
            console.log(element, json);
            if (event.target.checked) {

              for (let theme of element.temas) {
                console.log(theme)
                Object.keys(json).forEach(key => {
                  console.log(key)

                })
                this.selectedThemes.push(theme.idTopic);
                json.temas.push(theme.idTopic);
              }
              //json.temas.push(this.selectedThemes);
              this.backThemes.push(json);
              console.log(json);
              console.log(this.backThemes);
              console.log(this.selectedThemes);

            } else {
              this.backThemes.forEach(element => {
                if (element.idModule == event.target.value) {
                  this.backThemes.splice(this.backThemes.indexOf(element), 1);
                  console.log(element.temas)
                  element.temas.forEach(element => {
                    this.selectedThemes.forEach(element2 => {
                      if (element == element2) {
                        this.selectedThemes.splice(this.selectedThemes.indexOf(element2), 1);
                      }
                    });
                  });
                }
              });
              console.log(this.backThemes);
              //this.selectedThemes = [];
            }
          }
        });
        break;
      case 'tema':
        if (this.selectedThemes.includes(event.target.value)) {
          this.selectedThemes.splice(this.selectedThemes.indexOf(event.target.value), 1);
          for(let obj of this.backThemes){
            if(obj.idModule == mod){
              obj.temas.splice(obj.temas.indexOf(event.target.value), 1);
            }
          }
          console.group(this.selectedThemes, this.backThemes);
        } else {
          this.selectedThemes.push(event.target.value);
          this.backThemes.forEach(element => {
            if(element.idModule == mod){
              element.temas.push(event.target.value);
            }
          })
          console.group(this.selectedThemes, this.backThemes);
        }
    }
    console.log(this.selectedThemes);
    /*if(kind == 'module'){
      this.selectedThemes = [];

      this.showModulesThemes.forEach(element => {
        if(element.idModule == event.target.value){
          console.log(element);
          if(!this.allThemes){

            for(let theme of element.temas){
              this.selectedThemes.push(theme.idTema);
            }

          } else {
            this.selectedThemes = [];
          }
        }
      });
    } else if()*/
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

  asignarCerti(){
    console.log(this.backThemes, this.objUsers, this.certificationSelected)
    if(this.objUsers.length == 0){
      Swal.fire({
        title: '¡Error!',
        text: 'Selecciona al menos un usuario.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else if(this.backThemes.length == 0){
      Swal.fire({
        title: '¡Error!',
        text: 'Selecciona al menos un curso con un módulo y sus temas.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {


    let json = {
      idUser: this.objUsers,
      modules: []
    }
    let certificacion = {
      idCertification: this.certificationSelected,
      idModule: '',
      temas: []
    }
    for(let element of this.backThemes){
      console.log(element)
      json.modules.push({idCertificacion: this.certificationSelected, idModule: element.idModule, temas: element.temas});
    };
    console.log(json);

    this.session.asignaTemas(json, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Agregado con exito!',
          text: 'Curso(s) asignado(s).',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if (result.isConfirmed) {
            this.onClickTab('asignature')
          }
        });
      }
    );
    }


  }

  asignarCertificacion() {
    //console.log(this.certificationSelected);
    if (this.certificationSelected == '0') {
      Swal.fire({
        title: '¡Error!',
        text: 'Selecciona un curso.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      //console.log(this.certificationSelected);
      let curso = new FormData();
      curso.append('idCurso', this.certificationSelected);
      /*if(this.objUsers.length == 0){
        group.append('usuario[]', this.chief);
      } else {*/
      this.objUsers.forEach(element => {
        //console.log(element)
        curso.append('idUser[]', element);
      });
      //}
      //console.log(this.objUsers);
      //let group = new FormData();
      //group.append('usuario[]', this.objUsers);

      //group.append('usuario[]', this.groupSelected);
      //console.log(curso.getAll('usuario[]'), curso.get, this.certificationSelected);
      this.session.asignarCurso(curso, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Agregado con exito!',
            text: 'El usuario ha sido agregado al grupo.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.onClickTab('asignature')
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
  }

  erase() {
    this.searchSelect = '0';
    this.objUsers = [];
    this.text1 = '';
    this.asignature = 0;
    this.certificationSelected = '0';
    this.showLength = 0;
    this.showArr = [];
    this.length = 0;
    this.searchArray = [];
    this.dateSelected = '';
    this.userId = '';
    this.userCourses = [];
    this.pas = 1;
    this.pquit = 1;
    this.pdiag = 1;
    this.psc = 1;
    //console.log(this.chief, this.view);
  }

  addEditExam() {
    //console.log(this.certificacionID, this.backAnswer, this.cloneOption, this.formAbiertas.value.question, this.options, this.selectedOption);
    let img = this.onImage != 0 ? this.image : '';
    if (this.selectedOption == 2) {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que seleccionar si la opción es la respuesta correcta o incorrecta a tu pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else if (this.options == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que completar la información de la opción anterior para poder agregar una nueva.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      this.questionAnswers.push({
        //idEval_option: this.optionsProv.length + 1,
        idEval_option: '',
        idEval_question: this.backAnswer,
        option: this.options,
        is_correct: this.selectedOption,
        idModule: this.certificacionID,
        img: img,

      });

      //console.log(this.optionsProv)
      this.options = '';
      this.selectedOption = 2;
      this.image = '';
      this.onImage = 0;
      //console.log(this.questionAnswers)
    }
  }

  public cursoSelected() {
    this.selectedThemes = [];
    this.backThemes = [];
    this.showModulesThemes = [];
    if (this.certificationSelected != '') {
      //console.log(this.certificationSelected);
      this.helpers.loader();
      for (let item of this.certificaciones) {
        if (item.idCertification == this.certificationSelected) {
          this.titleC = item.title;
          this.get.getModules(item.idCertification, localStorage.getItem('token')).subscribe(
            (data: any) => {
              /*this.allModules = data;
              console.log(this.allModules);*/
              for (let item of data) {
                console.log(item)

                this.get.getinfoModulo(item.idModule, localStorage.getItem('token')).subscribe(
                  (data: any) => {
                    console.log(data)
                    this.showModulesThemes.push(data);
                    console.log(this.showModulesThemes)
                  }
                );
              }
              Swal.close();
              /*for (let item of this.allModules) {
                this.idModulo = item.idModule;
                console.log(this.idModulo);
                this.get.getTemas(this.idModulo, localStorage.getItem('token')).subscribe(
                  (data: any) => {
                    this.alltemas = data;
                    console.log(this.alltemas.idModule)
                    for (let item of this.alltemas) {
                      this.idModuloT = item.idModule;
                      this.idTema = item.idTopic;
                      console.log(this.idModulo)
                      if (this.idModulo == this.idModuloT){
                        console.log(item)
                      }
                    }

                  },
                  (error: any) => {
                    this.helpers.logout();
                  }
                );
              }*/
              Swal.close();
            },
            (error: any) => {
              this.helpers.logout();
            }
          );
        }
      }
    }
  }

  public updateQuestion(type: any) {
    //console.log(this.backDataAnswer, this.certificacionID, this.backAnswer, this.cloneOption, this.formAbiertas.value.question, this.options, this.selectedOption);
    this.json.idEval_question = this.backDataAnswer.idEval_question;
    this.json.pregunta = this.formAbiertas.value.question;
    this.json.is_active = 1;
    if (type == 'close') {
      this.json.respuestas = this.questionAnswers
    }
    console.log(this.json)

    this.session.updatePregunta(this.json, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Modificado con exito!',
          text: 'La pregunta ha sido modificada con exito.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          if (result.isConfirmed) {
            this.changeExam(2, this.certificacionID);
            this.editQuestion = 0;
          }
        });
      }
    );

    //console.log(this.json);
  }

  public cloneOpcionExam() {
    //console.log(this.cloneOption, this.formAbiertas.value.question, this.options, this.selectedOption);
    let i;
    let img = this.onImage != 0 ? this.image : null;
    //console.log(img)
    if (this.selectedOption == 2) {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que seleccionar si la opción es la respuesta correcta o incorrecta a tu pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else if (this.options == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que completar la información de la opción anterior para poder agregar una nueva.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      //console.log(this.optionsProv);
      if (this.optionsProv.length == 0) {
        this.optionsProv.push({
          //idEval_option: this.optionsProv.length + 1,
          idEval_option: '',
          opcion: this.options,
          correcta: this.selectedOption,
          img: img
        });
      } else {
        this.optionsProv.forEach(element => {
          i = element.idEval_option;
        })
        this.optionsProv.push({
          //idEval_option: i + 1,
          idEval_option: '',
          opcion: this.options,
          correcta: this.selectedOption,
          img: img
        })
      }

      //console.log(this.optionsProv)
      this.options = '';
      this.selectedOption = 2;
      this.new = this.optionsProv.length;
      this.image = '';
      this.onImage = 0;
      //console.log(this.new)
    }
  }

  onKey(event: any) {
    console.log(event.target.value);
    if(event.target.value == ''){
      this.lastId = 0;
    } else {
      this.lastId = this.lastId + 1;
    }
  }

  cambio() {
    //console.log(this.options)
    if (this.options != '') {
      //console.log(this.options)
    }
  }

  //duplicar pregunta Examenes
  public clone(): void {
    //console.log(this.cloneOption, this.formAbiertas.value.question)
    let id = this.cloneOption + 1;
    this.cloneOption = id;
    //console.log(this.cloneOption)
    const question = document.querySelectorAll('.pregunta');
    const opcion = document.querySelector('.opcion') as HTMLDivElement;
    var first = question[0];
    const clonequestion = first.cloneNode(true) as HTMLDivElement;
    this.n++;
    clonequestion.setAttribute("id", "pregunta" + this.n);
    //opcion.setAttribute("id", "opcion"+this.n);
    document.querySelector(".editor").appendChild(clonequestion);
    const buttonclone = document.querySelectorAll('.clone');
    const buttonremove = document.querySelectorAll('.remove');
    buttonclone.forEach(btnC => {
      //console.log(btnC);
      btnC.addEventListener('click', this.cloneOpcion)
    });
    buttonremove.forEach(btnR => {
      btnR.addEventListener('click', this.remove)
    });
  }
  //i = 0;
  //duplicar opcion Examenes
  public cloneOpcion() {
    //console.log(this.cloneOption, this.formAbiertas.value.question, this.options, this.selectedOption);
    let i;
    let img = this.onImage != 0 ? this.image : null;
    //console.log(img)
    if (this.selectedOption == 2) {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que seleccionar si la opción es la respuesta correcta o incorrecta a tu pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else if (this.options == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que completar la información de la opción anterior para poder agregar una nueva.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      if (this.optionsProv.length == 0) {
        this.optionsProv.push({
          //idOpcion: this.optionsProv.length + 1,
          idOpcion: '',
          opcion: this.options,
          correcta: this.selectedOption,
          img: img
        });
      } else {
        this.optionsProv.forEach(element => {
          i = element.idOpcion;
        })
        this.optionsProv.push({
          //idOpcion: i + 1,
          idOpcion: '',
          opcion: this.options,
          correcta: this.selectedOption,
          img: img
        })
      }
      //console.log(this.optionsProv)
      this.options = '';
      this.selectedOption = 2;
      this.new = this.optionsProv.length;
      this.image = '';
      this.onImage = 0;
      //console.log(this.new)
    }
    /*if(this.options != ''){
      this.optionsProv.push({
          idOpcion: this.optionsProv.length + 1,
        opcion: this.options,
        correcta: this.selectedOption,

    });
      console.log(this.optionsProv)
      this.options = '';
      this.selectedOption = 2;
      this.new = this.optionsProv.length;
      console.log(this.new)
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Tienes que completar la información de la opción anterior para poder agregar una nueva.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }*/
    /* const opcion = document.querySelectorAll('.opcion');
     var first = opcion[0];
     const cloneopcion = first.cloneNode(true) as HTMLDivElement;
     this.i++;
     cloneopcion.setAttribute("id", "opcion" + this.i);
     document.querySelector(".pregunta").appendChild(cloneopcion);
     const buttonremove = document.querySelectorAll('.remove');
     buttonremove.forEach(btn => {
       btn.addEventListener('click', this.removeOpcion)
     });*/
    /*var pregunta =document.querySelector('.opcion');
    const cloneopcion = pregunta.cloneNode(true) as HTMLDivElement;
    document.querySelector('.pregunta').appendChild(cloneopcion);
    //const buttonclone = document.querySelectorAll('.clone');
    const buttonclone = Array.from(document.getElementsByClassName('clone'));
    const buttonremove = document.querySelectorAll('.remove');
    buttonclone.forEach(btnC => {
      console.log(btnC)
      btnC.addEventListener('click', this.cloneOpcion)
    });
    buttonremove.forEach(btnR => {
      btnR.addEventListener('click',this.removeOpcion)
    });
    /*for(var i=0;i<pregunta.length;i++)
    {
      pregunta[i].addEventListener("click", function($event)
      {
        console.log(this.id);
        //console.log(pregunta.length)
        //var preguntaid= document.getElementById(this.id);
        //console.log(preguntaid.nodeValue);
        //var opcion =preguntaid.querySelectorAll('.opcion');
        /*for(var i=0;i<opcion.length;i++){
          console.log(opcion[i])
          /*const opcionclon = opcion[i].cloneNode(true) as HTMLDivElement;
          document.getElementById(this.id).appendChild(opcionclon);
        }*/

    /*var primerTitulo = opcion[0] as HTMLDivElement;
    console.log(primerTitulo)
    //var first = opcion[0];
    //console.log(first)
    /*const cloneopcion = primerTitulo.cloneNode(true) as HTMLDivElement;
    document.getElementById(this.id).appendChild(cloneopcion);
    //console.log(opcion)
    /*for(var i=0;i<opcion.length;i++)
    {
      opcion[i].dventListener("click", function($event)
      {
        //n++;
        var removeid= document.getElementById(this.id);
        console.log(removeid)
        /*const cloneopcion = removeid.cloneNode(true) as HTMLDivElement;
        cloneopcion.setAttribute("id", "opcion");
        document.getElementById(this.id).appendChild(cloneopcion);
      });
    }
    $event.preventDefault();
  });
}*/
    //console.log("Clonado");
    /*const opcion = document.querySelectorAll('.opcion');
    console.log(opcion)
    opcion.addEventListener("click", function() {
        //console.log(opcion);
        //event.preventDefault();
    });
    /*const opcion = document.querySelector('.opcion') as HTMLDivElement;
    //let j = 0;
    //console.log(opcion);
    opcion.click = function() {
      console.log(opcion);
      //this.j++;
      /*const cloneopcion = opcion.cloneNode(true) as HTMLDivElement;
      //cloneopcion.setAttribute("id", "opcion"+this.j);
      document.querySelector(".pregunta").appendChild(cloneopcion);
      const buttonclone = document.querySelectorAll('.clone');
      const buttonremove = document.querySelectorAll('.remove');
      //console.log(buttonclone)
      //console.log(buttonremove)
      buttonclone.forEach(btnC => {
        console.log(btnC);
        btnC.addEventListener('click', function cloneOpcion(){

        })
      });
      buttonremove.forEach(btnR => {
        btnR.addEventListener('click',function remove(){})
      });
      //event.preventDefault();
    }*/
    /*var question =document.querySelectorAll('.opcion')
    //console.log(question)
    for(var i=0;i<question.length;i++)
    {
      question[i].addEventListener("click", function()
      {
        var idquestion= document.getElementById(this.id);
        console.log(idquestion);
        //var first = idquestion[0];
        //console.log(first);
        /*const cloneopcion = first.cloneNode(true) as HTMLDivElement;
        cloneopcion.setAttribute("id", "opcion"+i++);
        document.querySelector(".pregunta").appendChild(cloneopcion);
        //console.log(cloneopcion)
      });
    }*/

  }

  selectFile(event, id?:any) {
    console.log(event.target.value, id)
    var files = event.target.files;
    var file = files[0];
    this.onImage = 1;
    this.idOption = id;

    this.jsonPrueba.idForm = this.idOption;
    console.log(this.jsonPrueba)

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handleFile.bind(this);

      reader.readAsBinaryString(file)
      //console.log(file)
    }

    //console.log(file)

    //console.log(event.target.files, event.target.files[0]);
    //this.image = event.target.files[0];
    /*let me = this;
 let file = event.target.files[0];
 let reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = function () {
   //me.modelvalue = reader.result;
   console.log(reader.result);
    me.image = reader.result;
    console.log(me.image);

 };
 reader.onerror = function (error) {
   console.log('Error: ', error);
 };*/

  }

  handleFile(event) {
    var binaryString = event.target.result;
    this.image = window.btoa(binaryString);
    this.experienciaLaboral.controls[this.idOption].patchValue(this.image);
    this.jsonPrueba.img = this.image;
    this.arrayPrueba.push({idForm: this.idOption, img: this.image});
    console.log(this.formulario.getRawValue(), this.image, this.arrayPrueba)
    //console.log(this.image, window.btoa(binaryString));
  }

  /*changeOption(questionId: number, value: number) {
    const question = this.seeQuestions.find(q => q.idQuestion === questionId);
    if (question) {
      // Si el valor ya está en la lista de respuestas correctas, lo eliminamos
      if (question.correcto && question.correcto.includes(value)) {
        question.correcto = question.correcto.filter(v => v !== value);
      } else {
        // Si no está en la lista, lo agregamos
        if (!question.correcto) {
          question.correcto = [];
        }
        question.correcto.push(value);
      }
    }
  }*/

  changeOption(event) {
    //console.log(type, this.teacherSelected, this.groupSelected);
    //console.log(this.isCorrect);
    console.log(event)
    this.seeQuestions.forEach(element => {
      if(element.idQuestion == event){
        console.log(event)
        element.correcto = this.isCorrect;
        console.log(element)
      }
      console.log(this.seeQuestions)
    });
  }
  changeOptionexam(event, pregunta:any) {
    //console.log(type, this.teacherSelected, this.groupSelected);
    console.log(event, pregunta);
    this.seeQuestions.forEach(element => {
      if(element.idQuestion == event){
        //console.log(pregunta.target.checked)
        if(pregunta == 1){
          element.correcto = 1;
          this.isCorrect = 1;
        }
        else{
          element.correcto = 0;
          this.isCorrect = 0;
        }
        console.log(element)
      }
      console.log(this.seeQuestions)
    });
  }

  public remove(): void { }
  //remove opcion Examenes
  public removeOpcion(): void {
    var test = document.querySelectorAll('.opcion')
    for (var i = 0; i < test.length; i++) {
      test[i].addEventListener("click", function () {
        var removeid = document.getElementById(this.id);
        removeid.remove();
      });
    }
  }

  //save score open questions
  saveScore() {
    console.log(this.isCorrect, this.backOpenQuestions, this.seeQuestions)
    if(this.isCorrect == 0 || this.isCorrect == 1){
      this.backOpenQuestions.respuestas = this.seeQuestions;
      console.log(this.backOpenQuestions)
      this.session.saveScore(this.backOpenQuestions, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          Swal.fire({
            title: '¡Guardado con exito!',
            text: 'La calificación ha sido guardada con exito.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.isCorrect = 2;
              this.changeExam(1, this.idModulo);
            }
          });
        }
      );
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Selecciona si la respuesta es correcta o incorrecta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }
  }


  //Nuevo de examenes
  filaSeleccionada: number | null = null;
  agregarNuevaFila: boolean = false;
  mostrarOpciones: boolean = false;
  nuevaPregunta: any = {};
  tipo: any = {};
  nuevaFilaOpcion: boolean = false;
  nuevaOpcion: any = {};

  imagenPregunta(event) {
    this.imgPre = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgPre = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }
  imagenOpcion(event) {
    this.imgOpcion = event.target.files[0]
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgOpcion = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }

  agregarFila() {
    this.agregarNuevaFila = true;
    this.imgPre = '';
    this.nuevaPregunta = {}; // Reinicia los datos del formulario
  }
  agregarFilaOpcion() {
    this.nuevaFilaOpcion = true;
    this.imgOpcion = '';
    this.nuevaOpcion = {}; // Reinicia los datos del formulario
  }

  cancelarAgregarFila() {
    this.agregarNuevaFila = false;
  }

  guardarNuevaFila() {
    this.examModule.push(this.nuevaPregunta);
    this.cancelarAgregarFila();
  }

  editarFila(pregunta: any, id: any) {
    pregunta.editando = true;
    this.tipo = pregunta.respuestas
    if(this.tipo != 0){
      this.tipo.forEach(element => {
        if(element.idEval_question == id){
          this.mostrarOpciones = true;
        }
      })
    }
  }

  guardarCambios(pregunta: any) {
    pregunta.editando = false;
  }

  cancelarEdicion(pregunta: any) {
    pregunta.editando = false;
    this.mostrarOpciones = false;
  }

  /*removeQuestion(idEval_question: number, tipo: string) {
    this.sesion.delete(`http://tu-backend.com/api/eliminarPregunta/${idEval_question}?tipo=${tipo}`)
      .subscribe(() => {
        this.cargarDatosIniciales();
      });
  }*/
}
