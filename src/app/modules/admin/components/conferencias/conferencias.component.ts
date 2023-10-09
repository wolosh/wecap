import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl,FormArray} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'

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
  //title= '';
  prueba: any[];
  title = 'form-array';

  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["titulo", "descripcion", "fecha", "link"]

  titulo = new FormControl('')
  descripcion = new FormControl('')
  fecha = new FormControl('')
  link = new FormControl('')
  dataSource: any;
  viewNew: number;



  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder,private session: SessionService, private _fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.cursos = 1;
    this.cursos();
    //this.conferencias();
    this.fg = this._fb.group({
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha: this.fecha,
      link: this.link,
      promos: this._fb.array([])
    });
  }

  getPage(page: any) {
    this.p = page;
  }

  /*startForm(): void {
    //Metodo para inicializar el formulario
    this.formConf = this.formBuilder.group({
      title: [''],
      description: [''],
      fecha: [''],
      link: ['']
    });
  }*/
  //Llena cursos
  cursos(){
    //this.allcursos = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.allcursos = data;
        //console.log(this.allcursos);
        console.log(data);
        this.conferencia = data;
        console.log(this.conferencia);
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

  /*change(id: any) {
    if (id == 2) {
      this.viewConf = 2;
    }
  }*/

  //cambia la vista a Temas
  changeViewConferencias(view: any, name?: any, id=2 ) {
    console.log(view, name, id);
    switch (view) {
      case 'back':
        this.viewConf = 0;
        break;
      case 'newConf':
        this.viewConf = 2;
        break;
      case 'editConf':
        this.viewConf = 1;
        //this.promos;
        this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //this.addLesson('llamar',data);
            /*this.dataSourcePacks = new MatTableDataSource(data);
            console.log(this.dataSourcePacks)*/
            this.allConferencias=data
            /*for (let item of data) {
              this.fg.controls['titulo'].setValue(item.titulo);
              this.fg.controls['descripcion'].setValue(item.descripcion);
              this.fg.controls['fecha'].setValue(item.fecha);
              this.fg.controls['link'].setValue(item.link);
              //this.title=item.titulo
            }
            console.log(this.fg.value)*/
          }
        );
    }
  }
  /*public clone(): void {
    console.log(this.title)
    this.title = this.formConf.controls['title'].value;
    console.log(this.title)
    /*if(this.title = thi.form){
      //this.prueba.push(this.title);
      console.log(this.title)
    }
    const box = document.getElementById('conferencias');
    const row = document.createElement('div');
    row.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col-12');
    const title = document.createElement('input');
    title.classList.add('input3', 'mb-3');
    title.setAttribute("placeholder", "Título conferencia");
    title.setAttribute("formControlName", "title");
    title.setAttribute("ngModel", "title");
    const description = document.createElement('input');
    description.classList.add('input3', 'mb-3');
    description.setAttribute("placeholder", "Descripción");
    description.setAttribute("formControlName", "description");
    const fecha = document.createElement('input');
    fecha.classList.add('input3', 'mb-3');
    fecha.setAttribute("placeholder", "Fecha");
    fecha.setAttribute("formControlName", "fecha");
    const link = document.createElement('input');
    link.classList.add('input3', 'mb-3');
    link.setAttribute("placeholder", "Link");
    link.setAttribute("formControlName", "link");
    const hr = document.createElement('hr');
    hr.classList.add('hr-gris','mt-4','mb-4');
    box.appendChild(row);
    row.appendChild(col);
    col.appendChild(title);
    col.appendChild(description);
    col.appendChild(fecha);
    col.appendChild(link);
    col.appendChild(hr);
    //this.startForm();
    //console.log(this.formConf.value)
  }*/

  ///Duplicar new
  get promos() {
    return this.fg.controls["promos"] as FormArray;
  };

  addLesson(): void {
    const lessonForm = this._fb.group({
      titulo: [''],
      descripcion: [''],
      fecha: [''],
      link: ['']
    });
    /*if(type){
      this.promos.push(array);
    }else{
      this.promos.push(lessonForm);
    }*/
    //console.log(this.promos)
    this.promos.push(lessonForm);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);
    //console.log(this.dataSourcePacks)
    this.cd.detectChanges();
  };
  deleteLesson(lessonIndex: number): void {
    this.promos.removeAt(lessonIndex);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);
  };
  onSubmit() {
    //console.log(this.promos)
    console.log(this.promos.value)
    //console.log(this.dataSourcePacks)
  }
}
