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
  file: any;
  f: object = {};
  p: number = 1;
  pg: number = 1;
  viewEdit = 0;
  idArch: any;
  formEdit: FormGroup;
  urls: any;
  notificarCargaCompleta: any;
  //mostrar editar about
  showDescription = false;
  description: any;

  constructor(private route: Router, private get: GetService, public helpers: HelpersService, private session: SessionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      //console.log(localStorage.getItem('token'));
      this.files();
      this.startForm(1);
      //this.allMedia();
      this.helpers.cursos = 1;
      //this.startForm(1);
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


  getPage(page: any) {
    this.p = page;
  }


  files() {
    console.log(localStorage.getItem('id'), localStorage.getItem('token'));
    this.get.getFiles(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        if (data.message == 'Consulta correcta') {
          console.log(data.files);
          if (data.files.description != null) {
            this.showDescription = false;
            this.description = data.files.description;
            this.formArchivos.controls['descripcion'].setValue(data.files.description);
            this.formData.append("descripcion", data.files.description);
          } else {
            this.showDescription = true
            this.formArchivos.controls['descripcion'].setValue('Agrega una descripción para los usuarios');
          }
          console.log(this.formArchivos.value);
          this.filesArr = data.files.files;
          console.log(this.filesArr)
          /*this.filesArr.forEach((value) => {
            console.log(value);
            this.file.push({[value.name]: value.url});
          });
          console.log(this.file);*/
          Swal.close();
        }
      }
    );
  }

  selectFiles(event: any, type: any, name?: any, url?: any) {
    console.log(event.target.files, type, name, url, this.cloneIn, this.file);
    console.log(event.target.files[0])
    if (type == 'archivo') {
      this.file = event.target.files[0];
    } else if (type == 'media') {
      this.file = event.target.files[0];
    }
    console.log(this.file);
  }

  onClickTab(type: any) {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        console.log(type)
        this.filesArr = [];
        switch (type) {
          case 'files':
            this.viewEdit = 0;
            this.startForm(1);
            this.files();
            break;
          case 'media':
            this.pg = 1;
            this.viewFiles = 1;
            this.allMedia();
            this.startForm(2);
            break;
        }
      }
    });

  }

  allMedia() {
    this.medias = [];
    this.get.getMedia(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        //this.startForm(2);
        this.medias = data.media;
        console.log(this.medias);
        this.mediaLength = this.medias.length;
        console.log(this.mediaLength);
        Swal.close();
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
    console.log(this.file)
    let media = new FormData();
    if (this.file != undefined) {
      media.append('files[]', this.file, this.file.name);
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes agregar un archivo',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }

    console.log(media.getAll('files[]'))

    this.session.uploadMedia(media, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        //this.allMedia();
        Swal.fire({
          title: '¡Archivo guardado!',
          text: 'El archivo se agrego correctamente.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.onClickTab('media');
          }
        });
      }
    );
  }

  removeMedia(media: any) {
    console.log(media);
    let json = JSON.stringify({
      media: media
    })

    console.log(json);


    this.session.deleteMedia(json, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Archivo eliminado!',
          text: 'El archivo se elimino correctamente.',
          icon: 'success',
          confirmButtonColor: '#015287',
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.onClickTab('media');
          }
        });
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

  changeViewArchivos(view: any, name?: any, id?: any) {
    //console.log(view, name, id);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (view) {
          case 'back':
            this.viewEdit = 0;
            this.startForm(1);
            this.files();
            break;
          case 'añadir':
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
            Swal.close();
        }
      }
    });
  }

  changeViewMultimedia(view: any, name?: any) {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (view) {
          case 'back':
            this.viewFiles = 1;
            this.startForm(2);
            this.files();
            break;
          case 'añadir':
            this.viewFiles = 2;
            //this.promos;
            setTimeout(() => {
              Swal.close();
            }, 500);
        }
      }
    });
  }

  updateDescription(update: any) {
    console.log(this.formArchivos.controls['descripcion'].value, this.file);

    let files = new FormData();
    if (this.formArchivos.controls['descripcion'].value != '') {
      files.append('descripcion', this.formArchivos.controls['descripcion'].value);
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes agregar una descripción',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }

    this.session.updateFiles(1, files, localStorage.getItem('token')).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        if (data.message == 'Consulta correcta') {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'Se agrego correctamente.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
              this.changeViewArchivos('back');
            }
          });
        }
      }
    );
  }

  updateFiles(update: any) {
    console.log(this.formArchivos.controls['descripcion'].value, this.file);

    let files = new FormData();

    if (this.formArchivos.controls['name'].value == '') {
      Swal.fire({
        title: '¡Error!',
        text: 'Debes agregar un nombre',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else {

      if (this.file != undefined) {
        files.append('files[]', this.file, this.formArchivos.controls['name'].value);
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'Debes agregar un archivo',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
      }
    }

    this.session.updateFiles(1, files, localStorage.getItem('token')).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        if (data.message == 'Consulta correcta') {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'Se agrego correctamente.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
              this.changeViewArchivos('back');
            }
          });
        }
      }
    );


    /*Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (update == 'description') {
          if (this.formArchivos.controls['descripcion'].value != '') {
            files.append('descripcion', this.formArchivos.controls['descripcion'].value);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Debes agregar una descripción',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        } else if (update == 'files') {
          console.log(this.filesArr.length)
          if (this.file != undefined) {
            files.append('files[]', this.file, this.formArchivos.controls['name'].value);
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Debes agregar un archivo',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        }
        console.log(files.getAll('files[]'), files.getAll('descripcion'));
      }
    });

    this.session.updateFiles(1, files, localStorage.getItem('token')).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        if (data.message == 'Consulta correcta') {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'Se agrego correctamente.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
              this.changeViewArchivos('back');
            }
          });
        }
      }
    );*/
  }
}



/*const buttons = Array.from(document.getElementsByClassName('btn'));

buttons.forEach(btn => {
  btn.addEventListener('click', function handleClick(event) {
    console.log('button clicked');
    console.log(event);
    console.log(event.target);
  });
});*/

