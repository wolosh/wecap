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
  certificaciones: any;
  formNewCurso: FormGroup;
  formEdit: FormGroup;
  formDiploma: FormGroup;
  image: any;
  formData = new FormData();
  exam: any;
  materias: any;
  grupos: any[];
  user: any;
  chief: any;
  view = 0;
  name: any;
  group: any
  public groupSelected = '0';
  cview1 = 0;
  course = '';
  p: number = 1;
  idCertification: any;
  bf: any;
  active: any;
  allModules: any[];
  hasDiploma: boolean;
  logo: any;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService) { }

  ngOnInit(): void {
    Swal.close();
    //console.log(localStorage.getItem('token'));
    this.helpers.type = localStorage.getItem('type');
    this.helpers.goTop();
    this.certifications();
    this.allMaterias();
    this.allGrupos();
    this.helpers.cursos = 1;
    this.startForm(1);
    //this.groups();
    this.users();
    console.log(this.view)
  }

  startForm(id: any): void {
    /*switch(id){
      case 1:
        this.formNewCurso = this.formBuilder.group({
          title: [''],
          description: [''],
          //img: [''],
          default_active_days: [''],
          //hasExam: [''],
        });
      break;
      case 2:
        this.formEdit = this.formBuilder.group({
          title: [''],
          description: [''],
          //img: [''],
          default_active_days: [''],
          //hasExam: [''],
        });
        break;
      case 3:
        this.formDiploma = this.formBuilder.group({
          cursoID: [''],
          encargado: [''],
          puesto: [''],
          activado: [''],
        });
    }*/
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
        //console.log(this.certificaciones);
      }
    );
  }

  changeGroup() {
    console.log(this.groupSelected)
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
              title: '¡Creado con exito!',
              text: 'El curso ha sido creado.',
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
      }
    );
  }

  allGrupos() {
    this.grupos = [];
    this.get.getGroups(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.grupos = data.grupos;
        //console.log(this.materias);
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
      }
    );
  }

  //trae los usuarios
  users() {
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data.users;
      }
    );
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
  changeView(id: any, user: any, name: any) {
    console.log(id, user);
    this.chief = user;
    this.view = id;
    this.name = name;
    console.log(this.chief, this.view);
    this.groups();
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
          if (data.activado == 1)
            this.hasDiploma = true;
        } else {
          this.hasDiploma = false;
        }
        this.formDiploma.controls['cursoID'].setValue(data.idCertification);
        this.formDiploma.controls['encargado'].setValue(data.encargado);
        this.formDiploma.controls['puesto'].setValue(data.puesto);
        this.formDiploma.controls['activado'].setValue(data.activado);
      }

    );
  }

  diplomaFile(event, type) {
    console.log(event.target.value, type);
    let w, h;
    if (event.target.files !== 0) {
      console.log(event.target.files, event.target.files[0]);
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      img.src = _URL.createObjectURL(event.target.files[0]);
      img.onload = function () {
        w = img.width;
        h = img.height;
        console.log(w + ' ' + h);
      }
    }

    switch (type) {
      case 'logo':
        if(w > 1200 || h > 100){
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
        if(w > 400 || h > 100){
          this.image = event.target.files[0];  
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
