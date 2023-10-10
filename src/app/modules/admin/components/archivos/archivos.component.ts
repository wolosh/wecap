import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  medias: any;
  formuploadMedia: FormGroup;
  formData = new FormData();
  image: any[] = [];
  formArchivos: FormGroup;
  viewFiles = 0;
  mediaLength = 0;
  filesArr: any;
  cloneIn = 0;
  file: any[] = [];
  f: object = {};
  p: any;
  viewEdit= 1;
  idArch: any;
  formEdit: FormGroup;
  urls: any;
  notificarCargaCompleta: any;

  constructor(private route: Router, private get: GetService, public helpers: HelpersService, private session: SessionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      //console.log(localStorage.getItem('token'));
      this.files();
      //this.startForm(1);
      //this.allMedia();
      this.helpers.cursos = 1;
      //this.startForm(1);
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonColor: '#015287',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.helpers.type == '4') {
            this.route.navigate(['/cmtemplate']);
          } else if (localStorage.getItem('token') == null) {
            this.route.navigate(['']);
          }
        }
      });
    }
  }


  getPage(page: any) {
    this.p = page;
  }


  files() {
    this.get.getFiles(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        if (data.message == 'Consulta correcta') {
          console.log(data.files);
          if (data.files.description != null) {
            this.formArchivos.controls['descripcion'].setValue(data.files.description);
            this.formData.append("descripcion", data.files.description);
          }
          console.log(this.formArchivos.value);
          this.filesArr = data.files.files;
          console.log(this.filesArr)
          this.filesArr.forEach((value) => {
            console.log(value);
            this.file.push({[value.name]: value.url});
          });
          console.log(this.file);
        }
      }
    );
  }

  selectFiles(event: any, type: any, name?: any, url?: any) {
    console.log(event.target.files, type, name, url, this.cloneIn, this.file);
    if(type == 'archivo'){

    }
    console.log(this.file);
  }

  onClickTab(type: any) {
    console.log(type)
    switch (type) {
      case 'files':
        this.file = [];
        this.startForm(1);
        this.files();
        break;
      case 'media':
        this.viewFiles = 1;
        this.allMedia();
        this.startForm(2);
        break;
    }
  }

  allMedia() {
    this.medias = [];
    this.get.getMedia(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        //this.startForm(2);
        this.medias = data.media;
        console.log(this.medias);
        this.mediaLength = this.medias.length;
        console.log(this.mediaLength);
      }
    );
  }

  change(id: any) {
    if (id == 1) {
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }

  startForm(id: any): void {
    if (id == 1) {
      //Metodo para inicializar el formulario
      this.formArchivos = this.formBuilder.group({
        descripcion: [''],
        name: [''],
        url: [''],
        files: ['']
      })
    } else if (id == 2) {
      //Metodo para inicializar el formulario
      this.formuploadMedia = this.formBuilder.group({
        img: ['']
      });
    }
  }

  selectFile(event) {
    if (event.target.files) {
      //this.img = event.target.files[0]
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
          if (this.urls.length == filesAmount) {
            this.notificarCargaCompleta.next();
          }
        };
      }
    }
  }

  //Crear nuevo curso
  subirMedia() {
    this.image.forEach((value) => {
      this.formData.append("img[]", value);
      //this.formData.append("img[]", value, value.name);
      //formData.append("fieldName", JSON.stringify(testObject));
    });
    console.log(this.formData.getAll('img[]'));
    //console.log(this.formData.getAll('img[]'));
    /*this.formData.append('img',this.image);
    console.log(this.formData.getAll('image'));
    //console.log(this.formData.append('img', this.image));*/
    //console.log(this.formData);
    this.session.uploadMedia(this.formData, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        //this.allMedia();
      }
    );
  }
  i = 0;
  //Clone archivos
  public cloneArchivos(): void {
    /*console.log(this.cloneIn)
    let c = this.cloneIn + 1;
    console.log(c)
    this.cloneIn = c;
    console.log(this.cloneIn)*/
    const opcion = document.querySelectorAll('.cloneArchivos');
    var first = opcion[0];
    const cloneopcion = first.cloneNode(true) as HTMLDivElement;
    this.i++;
    cloneopcion.setAttribute("id", "archivo" + this.i);
    document.querySelector(".archivos").appendChild(cloneopcion);
    const buttonclone = document.querySelectorAll('.removeArchivos');
    buttonclone.forEach(btn => {
      btn.addEventListener('click', this.removeArchivos)
    });
  }
  public removeArchivos(): void {
    console.log(this.formArchivos.value);
    var test = document.querySelectorAll('.cloneArchivos')
    console.log(test)
    for (var i = 0; i < test.length; i++) {
      test[i].addEventListener("click", function () {
        var removeid = document.getElementById(this.id);
        removeid.remove();
      });
    }
  }
  //Clone multimedia
  public clone(): void {
    const opcion = document.querySelectorAll('.clone');
    var first = opcion[0];
    const cloneopcion = first.cloneNode(true) as HTMLDivElement;
    this.i++;
    cloneopcion.setAttribute("id", "multimedia" + this.i);
    document.querySelector(".multimedia").appendChild(cloneopcion);
    const buttonclone = document.querySelectorAll('.remove');
    buttonclone.forEach(btn => {
      btn.addEventListener('click', this.remove)
    });
  }
  public remove(): void {
    var test = document.querySelectorAll('.clone')
    for (var i = 0; i < test.length; i++) {
      test[i].addEventListener("click", function () {
        var removeid = document.getElementById(this.id);
        removeid.remove();
      });
    }
  }
  changeViewArchivos(view: any, name?: any, id?:any ) {
    //console.log(view, name, id);
    switch (view) {
      case 'back':
        this.viewEdit = 0;
        break;
      case 'editArch':
        this.viewEdit = 2;
        //this.promos;
        for (let item of this.filesArr) {
          console.log(item)
          if (item.name == name) {
            this.idArch = item.idTopic;
            this.startForm(1);
            //console.log(this.alltemas)
            this.formArchivos.controls['name'].setValue(item.name);
            this.formArchivos.controls['url'].setValue(item.url);
          }
        }
    }
  }
}
//cambia la vista a Temas

/*const buttons = Array.from(document.getElementsByClassName('btn'));

buttons.forEach(btn => {
  btn.addEventListener('click', function handleClick(event) {
    console.log('button clicked');
    console.log(event);
    console.log(event.target);
  });
});*/
