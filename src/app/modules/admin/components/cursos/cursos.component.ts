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
      img: [''],
      default_active_days: [''],
      hasExam: [''],
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

  //Crear nuevo curso
  nuevoCurso() {
    console.log(this.formNewCurso.value)
    this.session.newCurso(this.formNewCurso.value.title,
      this.formNewCurso.value.description,
      this.formNewCurso.value.img,
      this.formNewCurso.value.default_active_days,
      this.formNewCurso.value.hasExam).subscribe(
    (data: Data) => {
      //console.log(data, data['token'], localStorage.getItem('token'), this.session.userName, this.session.idUser);
      localStorage.setItem('token', data['token']);
      localStorage.setItem('userName', data['full_name']);
      localStorage.setItem('type', data['is_admin']);
      localStorage.setItem('id', data['id']);
      //console.log(localStorage.getItem('token'), localStorage.getItem('userName'), localStorage.getItem('idUser') );
      //if(data['is_admin'] == 0){
        //this.router.navigate(['/cmtemplate']);

      //} else if(data['is_admin'] == 1){
        //this.router.navigate(['/usuarios']);

        //console.log(this.helpers.cursos)
      //}
    },
  );
  }
}
