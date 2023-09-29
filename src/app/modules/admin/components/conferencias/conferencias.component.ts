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
    //this.conferencias();
  }

  getPage(page: any) {
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
  conferencias(id=2) {
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.allConferencias = data;
        //console.log(this.conferencias)
      }
    );
  }

  //cambia la vista a Temas
  changeViewConferencias(view: any, name?: any, id=2 ) {
    //console.log(view, name, id);
    switch (view) {
      case 'back':
        this.viewConf = 0;
        break;
      case 'editConf':
        this.viewConf = 1;
        this.startForm();
        this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
          (data: any) => {
            for (let item of data) {
              this.formConf.controls['title'].setValue(item.titulo);
              this.formConf.controls['description'].setValue(item.descripcion);
              this.formConf.controls['fecha'].setValue(item.fecha);
              this.formConf.controls['link'].setValue(item.link);
            }
          }
        );
    }
  }
  i = 0;
  public clone(): void {
    const opcion = document.querySelectorAll('.clone');
    //console.log(opcion)
    var first = opcion[0];
    const cloneopcion = first.cloneNode(true) as HTMLDivElement;
    /*this.i++;
    cloneopcion.setAttribute("id", "conferencia" + this.i);*/
    document.querySelector(".conferencias").appendChild(cloneopcion);
  }
}
