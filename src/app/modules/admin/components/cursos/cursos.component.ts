import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,} from '@angular/forms';
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
  image: any;
  formData = new FormData();
  exam: any;
  materias: any;
  grupos: any[];
  user: any;
  chief: any;
  view = 0;
  name: any;
  group:any
  public groupSelected = '0';
  cview1 = 0;
  course = '';

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder,private session: SessionService) { }

  ngOnInit(): void {
    //console.log(localStorage.getItem('token'));
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

  startForm(id:any): void {
    //Metodo para inicializar el formulario
    if(id == 1){
    this.formNewCurso = this.formBuilder.group({
      title: [''],
      description: [''],
      //img: [''],
      default_active_days: [''],
      //hasExam: [''],
    });
  } else if(id == 2){
    this.formEdit = this.formBuilder.group({
      title: [''],
      description: [''],
      //img: [''],
      default_active_days: [''],
      //hasExam: [''],
    });
  }
  }

  certifications(){
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
      }
    );
  }

  changeGroup(){
    console.log(this.groupSelected)
  }
  
  selectFile(event, type) {
    console.log(event.target.value)
    if(type == 'img'){
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
  nuevoCurso() {
    //console.log(this.formNewCurso.value)
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
  }

  allMaterias(){
    this.materias = [];
    this.get.getMaterias(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.materias = data;
        //console.log(this.materias);
      }
    );
  }

  allGrupos(){
    this.grupos = [];
    this.get.getGroups(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.grupos = data.grupos;
        //console.log(this.materias);
      }
    );
  }

  change(id:any){
    if(id == 1){
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }

  //trae los grupos
  groups(){
    this.get.getGroups(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.group = data.grupos;
        console.log(this.group);
      }
    );
  }

  //trae los usuarios
  users(){
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data.users;
      }
    );
  }

  //cambia la vista de cursos 
  changeViewCourses(view:any, name:any, id?:any){
    console.log(view, name, id);
    if(view == 'editc'){
    this.cview1 = 1;
    for(let item of this.certificaciones){ 
     if(item.title == name){
      this,this.course = item.title;
      this.startForm(2);
      this.formEdit.controls['title'].setValue(item.title);
      this.formEdit.controls['description'].setValue(item.description);
      this.formEdit.controls['default_active_days'].setValue(item.default_active_days);
      console.log(item, this.formEdit.value);
     }
    }
  }
  }

  desactivateCourses(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#A6DAFC', 
      confirmButtonText: 'Si, desactivar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Desactivado!',
          'El curso ha sido desactivado.',
          'success'
        )
      }
    });
  }

  //cambia la vista de grupos
  changeView(id:any, user:any, name:any){
    console.log(id, user);
    this.chief = user;
    this.view = id;
    this.name = name;
    console.log(this.chief, this.view);
    this.groups();
  }
}
