import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  //n:number=0;
  cloneOption: number = 0;
  usersArr: any;
  searchArray: any;
  modules: any;
  length = 0;
  asignature = 0;
  diagnostic = 0;
  exam = 0;
  pas: number = 1;
  pquit: number = 1;
  psc: number = 1;
  pdiag: number = 1;
  pexam: number = 1;
  public searchSelect = '0';
  public certificationSelected = '0';
  formSearch: FormGroup;
  public text1 = '';
  public dateSelected = '';
  n: number = 0;
  certificaciones: any;
  objUsers = [] as any;
  showArr = [] as any;
  examModule = [] as any;
  showLength = 0;
  idUser: any;
  userCourses: any;
  userCL: number = 0;
  questions: any;
  userAL: number = 0;
  userId: any;
  moduloTitle: any;
  respaldo: any;
  pe: any;
  respaldo1: any;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) {

  }

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      this.users('asignature');
      this.startForm();
      this.certifications();
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonColor: '#015287',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.helpers.type == '4') {
            this.route.navigate(['/cmtemplate']);
          } else if (localStorage.getItem('token') == null) {
            this.route.navigate(['']);
          }
        }
      });
    }
    this.helpers.cursos = 1;
  }

  getPage(page: any) {
    this.pe = page;
  } 

  editCourse(curso: any, action: any) {
    console.log(this.userId, curso, action, this.dateSelected);
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
              console.log(data);
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
              console.log(data);
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
            //this.asingnature = 0;
            this.erase();
            this.startForm();
            this.users('asignature');
            break;
          case 'diagnostic':
            this.diagnostic = 0;
            this.cloneOption = 0;
            this.certifications();
            break;
          case 'test':
            this.exam = 0;
            this.cloneOption = 0;
            this.certifications();
        }
      }
    });
  }

  changeExam(id: any, certificacion?: any, name?:any) {
    console.log(id, certificacion);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

    this.exam = id;
    console.log(this.exam);
    if(id == 1){
      this.respaldo1 = certificacion;
    } else
    if(id == 2){
    this.respaldo = certificacion;
    }
    switch (id) {
      case 0:
        this.onClickTab('test');
        break;
      case 1:
            console.log(id, certificacion);
            this.get.getModules(this.respaldo1, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data);
                this.modules = data;
                Swal.close();
              }
            );
        
        break;
      case 2:
        this.cloneOption = 0;
        console.log(id, certificacion, this.respaldo);
        this.get.getExamModule(certificacion, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data.respuestas);
            this.examModule = data;
            console.log(this.examModule);
            Swal.close();
          }
        );
      break;
      case 3:
        this.cloneOption = 0;
        this.moduloTitle = name;
        console.log(id, certificacion, this.respaldo);
        this.get.getCursantesModulo(certificacion, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data)
            Swal.close();
          }
        );
    }
  }});
  }

  startForm(): void {
    //Metodo para inicializar el formulario

    this.formSearch = this.formBuilder.group({
      filter: [''],
      search: [''],
      group: [''],
      users: [''],
    });

  }

  //trae los usuarios
  users(type: any) {
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if (type == 'asignature') {
          this.usersArr = data.users;
          this.pas = 1;
          console.log(this.usersArr)
        } else if (type == 'show') {
          this.searchSelect = '';
          this.searchArray = data.users;
          this.length = data.users.length;
          console.log(this.searchArray, this.length)
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
        //this.countCert = this.certificaciones.length;
        console.log(this.certificaciones);
        Swal.close();
      }
    );
  }

  changeAsignature(id: any, user?: any) {
    console.log(id, user)
    if (user) this.userId = user;
    switch (id) {
      case 0:
        this.asignature = 0;
        this.erase();
        this.users('asignature');
        break;
      case 1:
        this.asignature = 1;
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
                this.userCL = data.length;
                Swal.close();
                console.log(this.userCourses, this.userCL);
              }
            );

          }
        });
        break;
      case 2:
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
                console.log(this.userCourses, this.userAL);
              }
            );

          }
        });
    }

    console.log(this.idUser)
  }

  changeDiagnostic(id: any, diagnostic?: any) {
    console.log(id, diagnostic)
    switch (id) {
      case 0:
        this.diagnostic = 0;
        this.certifications();
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
            this.get.getDiagnostico(diagnostic, localStorage.getItem('token')).subscribe(
              (data: any) => {
                console.log(data);
                /*console.log(data, JSON.parse(data.formulario));
                this.questions = JSON.parse(data.formulario);
                console.log(this.questions);*/
                Swal.close();
              }
            );

          }
        });
        break;
    }
  }

  changeSearch() {
    console.log(this.searchSelect);
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
    console.log(this.formSearch.value, this.formSearch.value.filter);

  }

  didModify() {
    console.log(this.text1);

    if (this.text1 != '') {
      if (this.text1.length > 1) {
        this.formSearch.controls['search'].setValue(this.text1);
        console.log(this.formSearch.value);
        this.searchUsers('search', this.formSearch.value.filter, this.formSearch.value.search);
      } else {
        this.searchArray = [];
        this.length = 0;
      }
    }


  }

  searchUsers(kind: any, filter?: any, param?: any) {
    //console.log(filter, param);
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

  changeValue(event: any) {
    //console.log(event.target.value);
    if (event.target.checked) {
      //console.log(event.target.checked);
      this.objUsers.push(event.target.value);

      console.log(this.objUsers)
    } else {
      //console.log(event.target.checked);
      this.objUsers.splice(this.objUsers.indexOf(event.target.value), 1);
      console.log(this.objUsers)
    }
    this.showUsers(event.target.value);
  }

  showUsers(array: any) {
    console.log(array);
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
    console.log(this.showArr);
  }

  asignarCertificacion() {
    console.log(this.certificationSelected);
    if (this.certificationSelected == '0') {
      Swal.fire({
        title: '¡Error!',
        text: 'Selecciona un curso.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }
    //console.log(this.groupSelected, this.chief);
    let curso = new FormData();
    curso.append('idCurso', this.certificationSelected);
    /*if(this.objUsers.length == 0){
      group.append('usuario[]', this.chief);
    } else {*/
    this.objUsers.forEach(element => {
      curso.append('idUser[]', element);
    });
    //}
    console.log(this.objUsers);
    //let group = new FormData();
    //group.append('usuario[]', this.objUsers);

    //group.append('usuario[]', this.groupSelected);
    console.log(curso.getAll('usuario[]'), curso.get, this.certificationSelected);
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




  /*public events(){
    let node = document.querySelector('.pregunta');
    const agregar = document.querySelector('#agregar');
    console.log(node);
    //this.agregar.addEventListener('click', this.cloneOpcion);
  }*/


  change(id: any) {
    if (id == 1) {
      this.helpers.cursos = 1;
    } if (id == 2) {
      this.helpers.cursos = 2;
    } else {
      this.helpers.cursos = 3;
    }
  }

  //duplicar pregunta Examenes
  public clone(): void {
     console.log(this.cloneOption)
    let id = this.cloneOption + 1;
    this.cloneOption = id;
    console.log(this.cloneOption)
    const question = document.querySelectorAll('.pregunta');
    const opcion = document.querySelector('.opcion') as HTMLDivElement;
    var first = question[0];
    const clonequestion = first.cloneNode(true) as HTMLDivElement;
    this.n++;
    clonequestion.setAttribute("id", "pregunta"+this.n);
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
  //duplicar opcion Examenes
  //var n: number = 0
  public cloneOpcion() {
    //this.n++;
    var pregunta =document.querySelectorAll('.pregunta');
    //console.log(this.n);
    for(var i=0;i<pregunta.length;i++)
    {
      pregunta[i].addEventListener("click", function($event)
      {
        //console.log(this.id);
        //console.log(pregunta.length)
        var preguntaid= document.getElementById(this.id);
        //console.log(preguntaid.nodeValue);
        var opcion =preguntaid.querySelectorAll('.opcion');
        for(var i=0;i<opcion.length;i++){
          console.log(opcion[i])
          /*const opcionclon = opcion[i].cloneNode(true) as HTMLDivElement;
          document.getElementById(this.id).appendChild(opcionclon);*/
        }

        /*var primerTitulo = opcion[0] as HTMLDivElement;
        console.log(primerTitulo)
        //var first = opcion[0];
        //console.log(first)
        /*const cloneopcion = primerTitulo.cloneNode(true) as HTMLDivElement;
        document.getElementById(this.id).appendChild(cloneopcion);
        //console.log(opcion)
        /*for(var i=0;i<opcion.length;i++)
        {
          opcion[i].addEventListener("click", function($event)
          {
            //n++;
            var removeid= document.getElementById(this.id);
            console.log(removeid)
            /*const cloneopcion = removeid.cloneNode(true) as HTMLDivElement;
            cloneopcion.setAttribute("id", "opcion");
            document.getElementById(this.id).appendChild(cloneopcion);
          });
        }*/
        $event.preventDefault();
      });
    }
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
  //remove opcion Examenes
  public remove(): void {
    var test = document.querySelectorAll('.opcion')
    for (var i = 0; i < test.length; i++) {
      test[i].addEventListener("click", function () {
        var removeid = document.getElementById(this.id);
        //removeid.remove();
        console.log(removeid)
      });
    }
  }
  //Clone pregunta abierta
  public cloneAbierta(): void {
   const question = document.querySelectorAll('.abierta');
   var first = question[0];
   console.log(first);
   const clonequestion = first.cloneNode(true) as HTMLDivElement;
   document.querySelector(".editor").appendChild(clonequestion);
 }
}
