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
  isNew = 0;
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
  confeCount: any;
  confeCountInfo: any;
  startDate = '';



  constructor(private get: GetService, private route: Router, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private _fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.helpers.goTop();

    if (localStorage.getItem('type') == '1') {
      this.helpers.loader();
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
    } else if (localStorage.getItem('type') == '4'){
      this.route.navigate(['/cmtemplate']);
      /*if (localStorage.getItem('type') == '4') {
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
      }*/
    } else {
      this.route.navigate(['/']);
    }
  }

  onClickTab() {
    //console.log(this.p, this.pm, this.pg);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.changeViewConferencias('back');
      }
    });
  }


  getCertifications() {
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.allcursos = data;
        this.confeCount = data.length;
        //console.log(this.allcursos);
        Swal.close();
      }
    );
  }

  getConferencias(id: any) {
    //console.log(id);
    this.get.getConferencias(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.allConferencias = data;
        this.confeCountInfo = data.length;
        //console.log(this.allConferencias);
        Swal.close();
      }
    );
  }

  startForm() {
    this.formConf = this.formBuilder.group({
      titulo: ['', [Validators.required,Validators.minLength(5)]],
      descripcion: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      link: ['', [Validators.required,Validators.minLength(5)]],
      fecha: ['', [Validators.required,Validators.minLength(5)]],
    });
    Swal.close();
  }

  get inputTitle() {
    return this.formConf.get('titulo');
  }
  get inputDes() {
    return this.formConf.get('descripcion');
  }
  get inputLink() {
    return this.formConf.get('link');
  }
  get inputFecha() {
    return this.formConf.get('fecha');
  }

  addConferencia() {
    //console.log(this.formConf.value, this.backId);

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
        //console.log(this.formConf.value);

        conferencia.append('titulo', this.formConf.value.titulo);
        conferencia.append('descripcion', this.formConf.value.descripcion);
        conferencia.append('link', this.formConf.value.link);
        conferencia.append('fecha', this.formConf.value.fecha);

        //console.log(conferencia.getAll('titulo'), conferencia.getAll('descripcion'), conferencia.getAll('link'), conferencia.getAll('fecha'));
        this.session.addConferencia(this.backId, conferencia, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Listo!',
              text: 'Conferencia agregada correctamente.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              //console.log(result)
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

  editConferencias(id:any){
    console.log(this.formConf.value, this.idConf);

    if(this.formConf.value.titulo == '' || this.formConf.value.descripcion == '' || this.formConf.value.link == '' || this.formConf.value.fecha == ''){
      Swal.fire({
        title: '¡Error!',
        text: 'Faltan campos por llenar, por favor completa la información.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {

      this.helpers.loader();
    let conferencia = new FormData();
    conferencia.append('titulo', this.formConf.value.titulo);
    conferencia.append('descripcion', this.formConf.value.descripcion);
    conferencia.append('link', this.formConf.value.link);
    conferencia.append('fecha', this.formConf.value.fecha);

    console.log(conferencia.getAll('titulo'), conferencia.getAll('descripcion'), conferencia.getAll('link'), conferencia.getAll('fecha'));

    this.session.editConferencia(this.idConf, conferencia, localStorage.getItem('token')).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        Swal.fire({
          title: '¡Listo!',
          text: 'Conferencia actualizada.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.changeViewConferencias('verConf', '', this.backId);
          }
        });
      }
    );
    }
  }

  //cambia la vista a Temas
  changeViewConferencias(view: any, name?: any, id?: any) {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        //console.log(view, name, id);
    this.nombreCertificacion = name;
    switch (view) {
      case 'back':
        this.viewConf = 0;
        this.getCertifications();
        break;
      case 'verConf':
        this.backId = id;
        this.viewConf = 1;
        this.getConferencias(id);
        break;
      case 'newConf':
        this.viewConf = 2;
        this.startForm();
        this.isNew = 1;
      //this.promos;
      break;
      case 'editConf':
        this.idConf = id;
        this.viewConf = 2;
        this.isNew = 2;
        this.startForm();
        console.log(id, this.idConf, this.allConferencias)

        for(let conferencia of this.allConferencias){
          if(conferencia.idVideoCon == id){
            console.log(conferencia)
            this.formConf.controls['titulo'].setValue(conferencia.titulo);
            this.formConf.controls['descripcion'].setValue(conferencia.descripcion);
            this.formConf.controls['link'].setValue(conferencia.link);
            this.formConf.controls['fecha'].setValue(conferencia.fecha);
            this.startDate = conferencia.fecha;
            console.log(this.formConf.value)
          }
        }
    }
      }
      });

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
    //console.log(this.promos.value)
    //console.log(this.dataSourcePacks)
  }
}
