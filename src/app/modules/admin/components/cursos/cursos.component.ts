import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,} from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  certificaciones: any;
  formNewCurso: FormGroup;
  image: any;
  formData = new FormData();
  exam: any;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder,private session: SessionService) { }

  ngOnInit(): void {
    //console.log(localStorage.getItem('token'));
    this.certifications();
    this.startForm();
  }

  startForm(): void {
    //Metodo para inicializar el formulario
    this.formNewCurso = this.formBuilder.group({
      title: [''],
      description: [''],
      //img: [''],
      default_active_days: [''],
      //hasExam: [''],
    });
  }

  certifications(){
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
      }
    );
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
        //console.log(data);
        this.certifications();
      }
    );
    
  }
}
