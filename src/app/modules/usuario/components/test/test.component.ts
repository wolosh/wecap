import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  examBack: any;
  send = {
    id: '',
    respuestas: []
  }
  question = {
    idEval_question: '',
    pregunta: '',
    respuestas: ''
  };
  opCount = 0;
  answers = 0;
  valido: boolean = false;
  timeLeft: number; //variabe timer
  interval: any;
  hoursDisplay: number;
  minutesDisplay: number;
  secondsDisplay: number;
  init: any;
  public open = '';
  public text1 = '';
  public text2 = '';
  public text3 = '';
  arrFiles: any;
  nameFiles: any;
  allConferencias: any;
  nameExam: any;
  questionsExam: any;
  formExam: FormGroup;
  objResp = {} as any;
  idExamBackUp: any;
  score: any;
  count: number = 0;
  answersBackup = [] as any;
  tiempo: number;
  calFinal: any;
  minScore: any;

  constructor(private activeRoute: ActivatedRoute, public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) {
    this.activeRoute.params.subscribe((params) => {
      //console.log(params);
      this.idExamBackUp = params['idTest'];
      //console.log(this.idExamBackUp)
    });
  }

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
          this.helpers.nameTopicBackUp = '';
          if (this.helpers.nameModuleBackUp == undefined || this.helpers.idModuleBackUp == undefined || this.helpers.nameModuleBackUp == '') {
            this.helpers.nameModuleBackUp = localStorage.getItem('nameModule');
            this.helpers.idModuleBackUp = localStorage.getItem('idModule');
          }
          this.helpers.type = localStorage.getItem('type');
          this.session.curso = true;

          ////console.log(this.helpers.nameModuleBackUp);
          ////console.log(localStorage.getItem('test'));
          /*if (localStorage.getItem('test') == 'true') {
            this.valido = true;
          } else {
            this.valido = false;
          }*/
          //this.certifications();
          //this.temas();
          //Swal.close();
          this.getInfoExam(localStorage.getItem('idModule'))
          this.conferencias(localStorage.getItem('idCertification'))
          //this.startTimer();
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

  starForm() {
    this.formExam = new FormGroup({});
  }

  /*getInfoExam(id: any) {
    this.valido = false;
    //console.log(id);
    this.get.getInfoExamen(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        if(data.message == 'No se encontro examen para el modulo indicado'){
          Swal.fire({
            title: '¡Error!',
            text: 'Aun no tienes un examen asignado para este test, continua con los temas o regresa mas tarde.',
            icon: 'error',
            confirmButtonColor: '#015287',
          }).then((result) => {
            ////console.log(result)
            if (result.isConfirmed) {
              this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
            }
          });
        } else {
        this.timeLeft = data.duracion;
        this.nameExam = data.title;
        this.questionsExam = data.preguntas;
        this.examBack = this.questionsExam.length;
        this.questionsExam.forEach((element: any, index) => {
          console.log(element, index);
          if (index == 0) {
            this.init = element;
          }
        })
        console.log(this.nameExam, this.questionsExam, this.init)
        this.get.getCalificacion(this.idExamBackUp, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data);
            //console.log(parseInt(data.calificacion));
            if (parseInt(data.calificacion) > 0) {
              Swal.close();
              this.valido = true;
              this.score = parseInt(data.calificacion);
            } else if (parseInt(data.calificacion) == 0) {
              this.valido = false;
              let start = new FormData();
              start.append('idExamen', this.idExamBackUp);
              //console.log(start.get('idExamen'));
              this.session.iniciaExamen(start, localStorage.getItem('token')).subscribe(
                (data: any) => {
                  this.idExamBackUp = data.id;
                  ////console.log(data);
                  this.startTimer();
                }
              );
            }
            ////console.log(this.valido)
          },(error: any) => {
            this.helpers.logout();
          }
        );

        }
      },(error: any) => {
        this.helpers.logout();
      }
    );
  }*/

  getInfoExam(id: any) {
    let segundos = 0;
    this.valido = false;
    console.log(id);
    this.get.getInfoExamen(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        let score = data.min_score;
        console.log(score);
        this.idExamBackUp = data.idExamen;
        console.log(this.idExamBackUp);
        //this.tiempo = data.duracion * 60;
         segundos = (data.duracion * 60) * data.preguntas.length;
        //console.log(data.preguntas.length)
        this.timeLeft = segundos;
        //console.log(this.timeLeft, segundos)
        this.nameExam = data.title;
        this.questionsExam = data.preguntas;
        this.minScore = data.min_score;
        //console.log(this.nameExam, this.questionsExam, this.timeLeft, segundos)
        this.get.getCalificacion(data.idExamen, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data);
            //console.log(parseInt(data.calificacion));
            if (parseInt(data.calificacion) >= score) {
            console.log(score)
              Swal.close();
              //console.log(data)
              this.valido = true;
              this.score = parseInt(data.calificacion);
            } else if (parseInt(data.calificacion) < score) {
              this.valido = false;
              let start = new FormData();
              start.append('idExamen', this.idExamBackUp);
              console.log(start.get('idExamen'));
              this.session.iniciaExamen(start, localStorage.getItem('token')).subscribe(
                (data: any) => {
                  console.log(data)
                  this.idExamBackUp = data.id;
                  console.log(this.idExamBackUp);
                  ////console.log(data);
                  this.startTimer();
                }
              );
            }
            ////console.log(this.valido)
          }
        );


      }
    );
  }



  startTimer() {

    setTimeout(() => {
      Swal.close();
    }, 800);
    this.interval = setInterval(() => {
      this.helpers.interval = this.interval;
      if (this.timeLeft > 0) {
        this.timeLeft--;
        //this.transform(this.timeLeft);
        this.secondsToTime(this.timeLeft);
      } else if (this.timeLeft === 0) {
        this.helpers.pauseTimer(this.interval);
        Swal.fire({
          title: '¡Tiempo!',
          text: 'Se termino el tiempo de aplicación.',
          icon: 'info',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //////console.log(result)
          if (result.isConfirmed) {
            this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
            this.valido = false;
            localStorage.setItem('test', this.valido.toString());
          }
        });
      }
    }, 1000);
  }

   secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    //console.log(hours, minutes, seconds);
    this.hoursDisplay = hours;
    this.minutesDisplay = minutes;
    this.secondsDisplay = seconds;


    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}


  /*transform(value: number, args?: any) {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;

    this.minutesDisplay = minutes;
    this.secondsDisplay = seconds;
    if (minutes < 10 && seconds < 10) {
      return '0' + minutes + ' : 0' + seconds;
    } else if (minutes < 10 && seconds > 10) {
      return '0' + minutes + ' : ' + seconds;
    } else if (minutes > 10 && seconds < 10) {
      return minutes + ' : 0' + seconds;
    } else {
      return minutes + ' : ' + seconds;
    }
  }*/



  public temasSeccion(id: any, name: any) {
    this.helpers.pauseTimer(this.interval);
    this.helpers.idModuleBackUp = id;
    this.helpers.nameModuleBackUp = name;
    this.route.navigate(['/seccion', id]).then(() => {
      this.helpers.conferencias = true;
    });
    this.session.curso = true;
  }

  changeOption(event: any, question: any) {
    //console.log(event.target.value, question);
    //if (!this.objResp[question]) this.objResp[question] = [];

    //this.opCount++;
    if(this.objResp.hasOwnProperty(question)){
      console.log('existe', question)
      if(this.objResp[question].includes(event.target.value)){
        console.log('existe', question, event.target.value)
        if(this.objResp[question].length == 1){
          console.log('no hay nada', this.objResp[question])
          delete this.objResp[question];
        } else {
        this.objResp[question] = this.objResp[question].filter((item) => item !== event.target.value);
        }
      } else {
      this.objResp[question].push(event.target.value);
      }
    } else {
    this.objResp[question] = [event.target.value];
    }


    console.log(this.objResp)
  }

  /*changeOption() {
    ////console.log(this.text1, this.text2, this.text3);

  }*/

  /*saveAnswer(id: any, pregunta: any) {
    console.log(this.examBack, this.count);
    console.log(this.objResp)

    if (this.init.respuestas == 0) {
      if (this.open != '') {
        console.log(this.open, 'abierta');
        this.question.respuestas = this.open;
        this.send.respuestas.push({ idEval_question: id, respuesta: this.open });
        console.log(this.send)
        console.log(this.examBack, this.count);
      this.question.idEval_question = id;
      this.question.pregunta = pregunta;
      console.log(this.question, this.questionsExam, this.init);

      this.questionsExam.forEach((element, index) => {
        console.log(element, index, this.questionsExam);
        if (element.idEval_question == id) {
          console.log(element, 'encontrado');
          this.questionsExam.splice(index, 1);
        }
        console.log(this.questionsExam)
      });
      } else {
        console.log('no hay respuesta abierta')
        Swal.fire({
          title: '¡Error!',
          text: 'Debes responder la pregunta.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
      }
    } else if(this.init.respuestas == 0){
      if (this.opCount != 0){
        console.log(this.objResp, 'cerrada');
        this.question.respuestas = this.objResp;
        Object.keys(this.objResp).forEach((key, index) => {
          ////console.log(key, index, this.objResp[key]);
          this.send.respuestas.push({ idEval_question: key, respuesta: this.objResp[key] });
        });
        console.log(this.send)
        console.log(this.examBack, this.count);
      this.question.idEval_question = id;
      this.question.pregunta = pregunta;
      console.log(this.question, this.questionsExam, this.init);

      this.questionsExam.forEach((element, index) => {
        console.log(element, index, this.questionsExam);
        if (element.idEval_question == id) {
          console.log(element, 'encontrado');
          this.questionsExam.splice(index, 1);
        }
        console.log(this.questionsExam)
      });
      } else {
        console.log('no hay opcion seleccionada')
        Swal.fire({
          title: '¡Error!',
          text: 'Debes responder la pregunta.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
      }
    }


    /*if (this.open == '') {
      console.log('no hay respuesta abierta')
      Swal.fire({
        title: '¡Error!',
        text: 'Debes responder la pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });

    } else if (this.opCount == 0) {
      console.log('no hay opcion seleccionada')
      Swal.fire({
        title: '¡Error!',
        text: 'Debes responder la pregunta.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      if (this.open != '') {
        console.log(this.open, 'abierta');
        this.question.respuestas = this.open;
        this.send.respuestas.push({ idEval_question: id, respuesta: this.open });
        console.log(this.send)
      } else if (this.opCount == 1) {
        console.log(this.objResp, 'cerrada');
        this.question.respuestas = this.objResp;
        Object.keys(this.objResp).forEach((key, index) => {
          ////console.log(key, index, this.objResp[key]);
          this.send.respuestas.push({ idEval_question: key, respuesta: this.objResp[key] });
        });
        console.log(this.send)
      }
      console.log(this.examBack, this.count);
      this.question.idEval_question = id;
      this.question.pregunta = pregunta;
      console.log(this.question, this.questionsExam, this.init);

      this.questionsExam.forEach((element, index) => {
        console.log(element, index, this.questionsExam);
        if (element.idEval_question == id) {
          console.log(element, 'encontrado');
          this.questionsExam.splice(index, 1);
        }
        console.log(this.questionsExam)
      });

      if (this.count != this.examBack) {
        this.questionsExam.forEach((element: any, index) => {
          console.log(element, index);
          if (index == 0) {
            this.init = element;
          }
        });
      } else {
        this.saveTest();
      }

      console.log(this.questionsExam, this.init);

      this.answersBackup.push(this.question);
      this.count = this.answersBackup.length + 1;
      console.log(this.answersBackup);

      this.count = this.count + 1;
      this.open = '';
      this.opCount = 0;
    }

  }*/

  onKey(event, id){
    console.log(event.target.value, id);
    if(event.target.value == '') {
      delete this.objResp[id];
    } else {
    this.objResp[id] = [event.target.value];
    }
    console.log(this.objResp);
  }
  saveTest() {

    console.log(this.idExamBackUp, this.objResp, Object.keys(this.objResp).length, this.questionsExam.length);

    if (Object.keys(this.objResp).length < this.questionsExam.length) {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes responder todas las preguntas.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      let send = {
        id: this.idExamBackUp,
        respuestas: []
      }

      Object.keys(this.objResp).forEach((key, index) => {
        ////console.log(key, index, this.objResp[key]);
        send.respuestas.push({ idEval_question: key, respuesta: this.objResp[key] });
      });
      console.log(send)
      this.session.calificaExamen(send, localStorage.getItem('token')).subscribe(
        (data: any) => {
          console.log(data);
          //this.calFinal = data.calificacion;
          this.valido =  true;
          
          //console.log(this.calFinal)
          localStorage.setItem('test', this.valido.toString());
          if(data.calificacion == 'Pendiente de calificacion'){
            Swal.fire({
              title: '¡Listo!',
              text: 'Se guardo tu test, pronto uno de los administradores calificara tus respuestas.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
              }
            
            })
          } else if(data.calificacion >= this.minScore){
            Swal.fire({
              title: '¡Felicidades!',
              text: 'Aprobaste el test',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
              }
            });
          } else {
            Swal.fire({
              title: 'Lo sentimos...',
              text: 'No obtuviste la calificación minima aprobatoria',
              icon: 'info',
              showCancelButton: false,
              confirmButtonColor: '#015287',
              confirmButtonText: 'Entendido'
            }).then((result) => {
              if (result.isConfirmed) {
                this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
              }
            });
          }
          //this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
         /* Swal.fire({
            title: '¡Listo!',
            text: 'Se guardo tu test, pronto uno de los administradores calificara tus respuestas.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            //////console.log(result)
            if (result.isConfirmed) {
              this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
              this.valido = true;
              localStorage.setItem('test', this.valido.toString());
            }
          });*/
        }
      );

      ////console.log(send);
    }

    /*if (this.text1 == '' || this.text2 == '' || this.text3 == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes responder todas las preguntas.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      Swal.fire({
        title: '¡Listo!',
        text: 'Se guardo tu test, pronto uno de los administradores calificara tus respuestas.',
        icon: 'success',
        confirmButtonColor: '#015287',
      }).then((result) => {
        //////console.log(result)
        if (result.isConfirmed) {
          this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
          this.valido = true;
          localStorage.setItem('test', this.valido.toString());

        }
      });
    }*/
  }

  /*saveTest() {
    if (this.text1 == '' || this.text2 == '' || this.text3 == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes responder todas las preguntas.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {
      Swal.fire({
        title: '¡Listo!',
        text: 'Se guardo tu test, pronto uno de los administradores calificara tus respuestas.',
        icon: 'success',
        confirmButtonColor: '#015287',
      }).then((result) => {
        //////console.log(result)
        if (result.isConfirmed) {
          this.temasSeccion(this.helpers.idModuleBackUp, this.helpers.nameTopicBackUp);
          this.valido = true;
          localStorage.setItem('test', this.valido.toString());

        }
      });
    }
  }*/




  files() {
    this.get.getFiles(localStorage.getItem('idCertification'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        ////console.log(data);
        this.arrFiles = data.files;
        this.nameFiles = data.files.files;
        ////console.log(this.arrFiles, this.nameFiles);
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
      }, (error: any) => {
        this.helpers.logout();
      }
    );
  }

  didModify() {
    //console.log(this.open);
    /*if (this.text1 != '') {
      if (this.text1.length > 1) {
        this.formSearch.controls['search'].setValue(this.text1);
        //console.log(this.formSearch.value);
        this.searchUsers('search', this.formSearch.value.filter, this.formSearch.value.search);
      } else {
        this.searchArray = [];
        this.length = 0;
      }
    }*/
  }
}
