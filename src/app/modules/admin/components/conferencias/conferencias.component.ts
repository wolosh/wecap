import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
  viewConf = 0;
  formConf: FormGroup;
  idConf: any;
  //title= '';
  prueba: any[];
  title = 'form-array';
  nombreCertificacion = '';
  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["titulo", "descripcion", "fecha", "link"]

  titulo = new FormControl('')
  descripcion = new FormControl('')
  fecha = new FormControl('')
  link = new FormControl('')
  dataSource: any;
  viewNew: number;
  backId: any;



  constructor(private get: GetService, private route: Router, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private _fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (localStorage.getItem('type') == '1') {

      //console.log(this.searchArray)
      //console.log(localStorage.getItem('token'));
      this.helpers.type = localStorage.getItem('type');
      this.helpers.name = localStorage.getItem('name');
      this.helpers.goTop();
      this.getCertifications();
      //this.conferencias();
      this.fg = this._fb.group({
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: this.fecha,
        link: this.link,
        promos: this._fb.array([])
      });
    } else {
      if (localStorage.getItem('type') == '4') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cmtemplate']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }
    }
  }


  getCertifications() {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.allcursos = data;
        console.log(this.allcursos);
      }
    );
  }

  getConferencias(id: any) {
    console.log(id);
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.allConferencias = data;
        console.log(this.allConferencias);
      }
    );
  }

  startForm() {
    this.formConf = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      link: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  addConferencia() {
    console.log(this.formConf.value, this.backId);

    if (this.formConf.valid) {
      if (this.formConf.value.descripcion.length < 10) {
        Swal.fire({
          title: '¡Error!',
          text: 'La descripción debe tener al menos 10 caracteres.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
      } else {
        let conferencia = new FormData();
        console.log(this.formConf.value);

        conferencia.append('titulo', this.formConf.value.titulo);
        conferencia.append('descripcion', this.formConf.value.descripcion);
        conferencia.append('link', this.formConf.value.link);
        conferencia.append('fecha', this.formConf.value.fecha);

        console.log(conferencia.getAll('titulo'), conferencia.getAll('descripcion'), conferencia.getAll('link'), conferencia.getAll('fecha'));
        this.session.addConferencia(this.backId, conferencia, localStorage.getItem('token')).subscribe(
          (data: any) => {
            console.log(data);
            Swal.fire({
              title: '¡Listo!',
              text: 'Conferencia agregada correctamente.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              console.log(result)
              if (result.isConfirmed) {
                this.changeViewConferencias('back');
              }
            });
          }
        );
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }
  }

  //cambia la vista a Temas
  changeViewConferencias(view: any, name?: any, id?: any) {

    console.log(view, name, id);
    this.nombreCertificacion = name;
    switch (view) {
      case 'back':
        this.viewConf = 0;
        break;
      case 'verConf':
        this.backId = id;
        this.viewConf = 1;
        this.getConferencias(id);
        break;
      case 'newConf':
        this.viewConf = 2;
        this.startForm();
      //this.promos;


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
