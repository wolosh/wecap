import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,} from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit  {
  medias: any;
  formuploadMedia: FormGroup;
  formData = new FormData();
  image:any[]=[];

  constructor(private get: GetService,public helpers: HelpersService,private session: SessionService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.helpers.goTop();
    //console.log(localStorage.getItem('token'));
    this.allMedia();
    this.helpers.cursos = 1;
    this.startForm();
  }

  allMedia(){
    this.medias = [];
    this.get.getMedia(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.medias = data.media;
        //console.log(this.medias);
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

  startForm(): void {
    //Metodo para inicializar el formulario
    this.formuploadMedia = this.formBuilder.group({
      img: ['']
    });
  }

  selectFile(event) {
    //console.log(event.target.value)
    //console.log(event.target.files, event.target.files[0]);
    //this.image = event.target.files[0];
    //console.log(this.image, this.image.name);
    //this.image = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.image.push(event.target.files[i]);
    }
  }

  //Crear nuevo curso
  subirMedia() {
    this.image.forEach((value) => {
      //this.formData.append("img[]", value);
      this.formData.append("img[]", value, value.name);
      //formData.append("fieldName", JSON.stringify(testObject));
    });
    //console.log(this.formData.getAll('img'));
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
    const opcion = document.querySelectorAll('.cloneArchivos');
    var first = opcion[0];
    const cloneopcion = first.cloneNode(true) as HTMLDivElement;
    this.i++;
    cloneopcion.setAttribute("id", "archivo"+this.i);
    document.querySelector(".archivos").appendChild(cloneopcion);
    const buttonclone = document.querySelectorAll('.removeArchivos');
    buttonclone.forEach(btn => {
      btn.addEventListener('click', this.removeArchivos)
    });
  }
  public removeArchivos(): void {
    var test =document.querySelectorAll('.cloneArchivos')
    console.log(test)
    for(var i=0;i<test.length;i++)
    {
      test[i].addEventListener("click", function()
      {
        var removeid= document.getElementById(this.id);
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
    cloneopcion.setAttribute("id", "multimedia"+this.i);
    document.querySelector(".multimedia").appendChild(cloneopcion);
    const buttonclone = document.querySelectorAll('.remove');
    buttonclone.forEach(btn => {
      btn.addEventListener('click', this.remove)
    });
  }
  public remove(): void {
    var test =document.querySelectorAll('.clone')
    for(var i=0;i<test.length;i++)
    {
      test[i].addEventListener("click", function()
      {
        var removeid= document.getElementById(this.id);
        removeid.remove();
      });
    }
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
