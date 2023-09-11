import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
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
  countCert: number = 0;
  pm: number = 1;
  pg: number = 1;
  idCertification: any;
  bf: any;
  active: any;
  allModules: any[];
  hasDiploma: boolean;
  logo: any;
  firma: any;
  agMat = 0;
  teachers: any;
  

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) { }

  ngOnInit(): void {
    Swal.close();
    if(localStorage.getItem('type') == '1'){
      this.searchUsers('nombre', 'saul');
    //console.log(localStorage.getItem('token'));
    this.helpers.type = localStorage.getItem('type');
    this.helpers.goTop();
    this.certifications();
    this.helpers.cursos = 1;
    this.startForm(1);
    console.log(this.view)
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonColor: '#015287',
      }).then((result) => {
        if(result.isConfirmed){
          this.route.navigate(['']);
        }
      });
    }
  }

  

  onClickTab(tab: string){
    console.log(this.p, this.pm, this.pg);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch(tab){
          case 'courses':
            this.p = 1;
            this.cview1 = 0;
            this.certifications();
            break;
          case 'mat':
            this.pm = 1;
            this.agMat = 0;
            this.allMaterias();
            break;
          case 'groups':
            this.pg = 1;
            this.view = 0;
            this.users();
            this.startForm(4);
            this.groups();
            break;
        }
      }
    });
    
    
  }

  getPage(page:any){
    console.log(page);
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
    } else if(id == 3){
      this.formNewMat = this.formBuilder.group({
        name: [''],
        teacher: [''],
      });
    } else if(id == 4){
      this.formSearch = this.formBuilder.group({
        filter: [''],
        search: [''],
        group: [''],
        users: [''],
      });
    }
  }

  init(event: any) {
    console.log(event, this.hasDiploma)
    if (this.hasDiploma == true) {
      this.startForm(3);

    }
  }

  certifications() {
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        this.countCert = this.certificaciones.length;
        //console.log(this.certificaciones);
        Swal.close();
      }
    );
  }
  
  //juntamos changeGroup y changeTeacher
  changeOption(type: any, search?:any) {
    console.log(type, this.teacherSelected, this.groupSelected);
    switch (type) {
      case 'group':

        break;
      case 'teacher':
        this.formNewMat.controls['teacher'].setValue(this.teacherSelected);
        break;
      case 'search':
        console.log(this.searchSelect)
        if(this.searchSelect == '1'){
          this.formSearch.controls['filter'].setValue('nombre');
        } else if(this.searchSelect == '2'){
          this.formSearch.controls['filter'].setValue('area');
        } else if(this.searchSelect == '3'){
          this.formSearch.controls['filter'].setValue('puesto');
        }
        console.log(this.formSearch.value, this.formSearch.value.filter);
        break;
    }

  }

  selectFile(event, type) {
    console.log(event.target.value)
    if (type == 'img') {
      console.log(event.target.files, event.target.files[0]);
      this.image = event.target.files[0];
      console.log(this.image, this.image.name);
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
    //console.log(this.formNewCurso.value)
    switch (kind) {
      case 'create':
        this.formData.append('title', this.formNewCurso.value.title);
        this.formData.append('description', this.formNewCurso.value.description);
        this.formData.append('img', this.image, this.image.name);
        //console.log(this.formData.getAll('image'), this.formData.getAll('title'), this.formData.getAll('description'));
        this.formData.append('default_active_days', this.formNewCurso.value.default_active_days);
        this.formData.append('hasExam', this.exam);

        //console.log(this.formData.getAll('hasExam'), this.formData.getAll('default_active_days'), this.formData.get);
        this.session.newCurso(this.formData, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);}
            Swal.fire({
              title: '¡Creado con exito!',
              text: 'El curso ha sido creado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            });
            this.certifications();
          }
        );
        break;
      case 'edit':
        console.log(this.image)
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
        console.log(this.materias);
        Swal.close();
      }
    );
  }
  //trae los grupos
  groups() {
    this.get.getGroups(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.group = data.grupos;
        console.log(this.group);
        Swal.close();
      }
    );
  }

  //trae los usuarios
  users() {
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data.users;
        Swal.close();
      }
    );
  }

  changeViewMat(id: any) {
    console.log(id);
    this.agMat = id;
    if(id == 1){
      this.startForm(3);
    this.get.getTeachers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.teachers = data;
        console.log(this.teachers)
      }
    );
    }
  }

  //cambia la vista de cursos 
  changeViewCourses(view: any, name?: any, id?: any) {
    console.log(view, name, id);
    switch (view) {
      case 'back':
        this.cview1 = 0;
        break;
      case 'editc':
        this.cview1 = 1;
        for (let item of this.certificaciones) {
          if (item.title == name) {
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
            console.log(item, this.formEdit.value, this.exam, this.bf, this.active);
          }
        }
    }
    /*if (view == 'editc') {
      this.cview1 = 1;
      for (let item of this.certificaciones) {
        if (item.title == name) {
          this.idCertification = item.idCertification;
          this, this.course = item.title;
          this.startForm(2);
          this.formEdit.controls['title'].setValue(item.title);
          this.formEdit.controls['description'].setValue(item.description);
          this.formEdit.controls['default_active_days'].setValue(item.default_active_days);
          this.exam = parseInt(item.hasExam);
          console.log(item, this.formEdit.value, this.exam);
        }
      }
    }*/
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
                console.log(data);
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
  changeViewGroups(id: any, type:any, user?: any, name?: any) {
    if(type == 'modiGroup'){
    console.log(id, user);
    this.chief = user;
    this.view = id;
    this.name = name;
    console.log(this.chief, this.view);
    this.groups(); 
  } else if(type == 'inicio'){
    this.view = id;
    this.chief = 0;
    this.name = '';
    console.log(this.chief, this.view);
    this.groups();
    this.startForm(4);
  }
  }

  //trae los modulos de una certificación
  modules(id: any) {
    console.log(id);
    this.get.getModules(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.allModules = data;
        console.log(this.allModules)
      }
    );
  }

  //trae el diploma de una certificación
  diploma(id: any) {
    console.log(id);
    this.get.getDiploma(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
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
      }

    );
  }

  //agrega los files a diploma
  diplomaFile(event, type) {
    console.log(event.target.value, type);
    let w, h, logo, firma;
    if (event.target.files !== 0) {
      console.log(event.target.files, event.target.files[0]);
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      img.src = _URL.createObjectURL(event.target.files[0]);
      img.onload = () => {
        w = img.width;
        h = img.height;
        console.log(w + ' ' + h);
        if (type == 'logo') {
          console.log(w, h);
          if (w <= 1200 && h <= 100) {
            this.logo = event.target.files[0];
            console.log(this.logo);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 1200x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        } else if (type == 'firma') {
          console.log(w, h);
          if (w <= 400 && h <= 100) {
            this.firma = event.target.files[0];
            console.log(this.firma);
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

      /*switch (type) {
        case 'logo':
          console.log(this.w, this.h);
          if (w <= 1200 || h <= 100) {
            this.logo = event.target.files[0];
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 1200x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
          break;
        case 'firma':
          if (w > 400 || h > 100) {
            this.image = event.target.files[0];
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'La imagen debe ser de un tamaño máximo de 400x100',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
      }*/

    }


      console.log(this.logo, this.firma);
  }

  //salva la configuración de los diplomas
  saveDiploma() {
    console.log(this.formDiploma.value, this.hasDiploma);
    console.log(this.logo);
    console.log(this.firma, this.idCertification);
    let diploma = new FormData();
   
    diploma.append('cursoId', this.idCertification);
    diploma.append('encargado', this.formDiploma.value.encargado);
    diploma.append('puesto', this.formDiploma.value.puesto);

    if (this.firma != undefined) {
      diploma.append('img', this.firma, this.firma.name);
    } else {
      diploma.append('img', this.firma);
    }

    if(this.hasDiploma == true){
      diploma.append('activado', '1');
    } else {
      diploma.append('activado', '0');
    }

    if(this.logo != undefined){
      diploma.append('logo', this.logo, this.logo.name);
    } else {
      diploma.append('logo', this.logo);
    }

    console.log(diploma.getAll('cursoId'), diploma.getAll('encargado'), diploma.getAll('puesto'), diploma.getAll('img'), diploma.getAll('activado'), diploma.getAll('logo'), diploma.get);
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
  addMat(){
    console.log(this.formNewMat.value);
    let materia= new FormData();
    materia.append('Nombre', this.formNewMat.value.name);
    materia.append('ProfesorID', this.formNewMat.value.teacher);
    console.log(materia.getAll('Name'), materia.getAll('ProfesorID'), materia.get);
    this.session.addMateria(materia, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);}
        Swal.fire({
          title: '¡Agregada con exito!',
          text: 'La materia ha sido agregada.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then ((result) => {
          if(result.isConfirmed){
            this.allMaterias();
            this.agMat = 0;
          }
        });
      }
    );
  }

  didModify(){
    console.log(this.text1);
    
    if(this.text1 != ''){
    this.formSearch.controls['search'].setValue(this.text1);
    console.log(this.formSearch.value);
    this.searchUsers(this.formSearch.value.filter, this.formSearch.value.search);
    }
    
  }

  searchUsers(filter:any, param:any){
    console.log(filter, param);
    let f = filter;
    let cad = param;
    let token = localStorage.getItem('token');
    console.log(f, cad);
    
      this.get.searchUsers(f, cad, token).subscribe(
        (data: any) => {
          console.log(data);
        }
      );
  }

  asignarGrupo(){
    let group = new FormData();
    group.append('usuario[]', this.groupSelected);
    //console.log(group.getAll('usuario[]'), group.get, this.chief);
    this.session.asignarGrupo(this.chief, group, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Agregado con exito!',
          text: 'El usuario ha sido agregado al grupo.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then ((result) => {
          if(result.isConfirmed){
            this.view = 0;
    this.chief = 0;
    this.name = '';
    //console.log(this.chief, this.view);
    this.groups();
    this.startForm(4);
          }
        });
      }
    );
  }
}
