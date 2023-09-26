import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl,} from '@angular/forms';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.css']
})
export class ConferenciasComponent implements OnInit {
  conferencia: any[];
  allcursos: any;
  p: any;
  allConferencias: any;
  viewConf= 0;
  formConf: FormGroup;
  idConf: any;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder,private session: SessionService) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.cursos = 1;
    this.cursos();
  }

  getPage(page: any) {
    //console.log(page);
    this.p = page;
  }

  startForm(): void {
    //Metodo para inicializar el formulario
    this.formConf = this.formBuilder.group({
      title: [''],
      description: [''],
      fecha: [''],
      link: ['']
    });
  }
  //Llena cursos
  cursos(){
    //this.allcursos = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.allcursos = data;
        //console.log(this.allcursos);
      }
    );
  }
  //trae los temas de un modulo
  conferencias(id: any) {
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.allConferencias = data;
      }
    );
  }
  //cambia la vista a Temas
  changeViewConferencias(view: any, name?: any, id?: any) {
    switch (view) {
      case 'back':
        this.viewConf = 0;
        break;
      case 'editConf':
        this.viewConf = 1;
        //this.startForm(6);
        //console.log(this.allConferencias);
        for (let item of this.allConferencias) {
          if (item.titulo == name) {
            this.idConf = item.idVideoCon;
            console.log(this.idConf)
            /*this.startForm();
            this.formConf.controls['title'].setValue(item.title);
            this.formConf.controls['description'].setValue(item.descripcion);
            this.formConf.controls['fehca'].setValue(item.fecha);
            this.formConf.controls['link'].setValue(item.link);*/
          }
        }
    }
  }
}
