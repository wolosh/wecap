import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {

  constructor(private get: GetService, public helpers: HelpersService) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.cursos = 1;
  }

  change(id:any){
    if(id == 1){
      this.helpers.cursos = 1;
    } if (id == 2){
      this.helpers.cursos = 2;
    } else {
      this.helpers.cursos = 3;
    }
  }
  //duplicar pregunta
  public clone(): void {
    /*const node = document.querySelector('.pregunta');*/
    /*const clone = node.cloneNode(true);
    document.querySelector(".editor").appendChild(clone);*/
    /*newDiv.appendChild(node);*/
    const divrow = document.createElement("div");//Row Pregunta
    divrow.classList.add('row', 'mb-3', 'row-question');
    const divcol = document.createElement("div");//Columna Pregunta
    divcol.classList.add('col-12','col-md-10', 'col-question');
    const question = document.createElement("label");//Label Pregunta
    question.textContent = 'Pregunta';
    question.classList.add('text13', 'txt-blue', 'mb-2', 'mt-3');
    const questioninput = document.createElement("input");//Input Pregunta
    questioninput.classList.add('input3');
    questioninput.type='text';

    const rowoption = document.createElement("div");//Row Opcion
    rowoption.classList.add('row', 'mt-3', 'row-option');
    const coloption = document.createElement("div");//Col Opcion
    coloption.classList.add('col-12', 'col-option');
    const formoption = document.createElement("div");//Formcheck Opcion
    formoption.classList.add('form-check', 'mb-3', 'formcheck');
    const labeloption = document.createElement("label");//Label Opcion
    labeloption.classList.add('text13', 'txt-blue');
    labeloption.textContent = 'Opción';
    const inputoption = document.createElement("input");//Input Opcion
    inputoption.classList.add('form-check-input');
    inputoption.type='radio';
    const colinput = document.createElement("div");//Col Input
    colinput.classList.add('col-3', 'col-input');
    const inputname = document.createElement("input");//Input Nombre
    inputname.classList.add('input5');
    inputname.type='text';
    const colfile = document.createElement("div");//Col Input file
    colfile.classList.add('col-4', 'col-file');
    const inputfile = document.createElement("input");//Input File
    inputfile.classList.add('file');
    inputfile.type='file';
    const buttonclone = document.createElement("button");//Button clone
    buttonclone.classList.add('boton2', 'btnclone');
    const imgclone = document.createElement("img");//img clone
    imgclone.src='assets/img/agregapreg.svg';
    buttonclone.addEventListener('click', this.cloneOpcion);
    const buttonremove = document.createElement("button");//Button remove
    buttonremove.classList.add('boton2', 'btnremove');
    const imgremove = document.createElement("img");//img remove
    imgremove.src='assets/img/quitarpreg.svg';
    //buttonremove.addEventListener('click', this.remove);
    document.querySelector(".pregunta").appendChild(divrow);
    document.querySelector(".row-question").appendChild(divcol);
    document.querySelector(".col-question").appendChild(question);
    document.querySelector(".col-question").appendChild(questioninput);
    document.querySelector(".pregunta").appendChild(rowoption);
    document.querySelector(".row-option").appendChild(coloption);
    document.querySelector(".col-option").appendChild(formoption);
    document.querySelector(".formcheck").appendChild(labeloption);
    document.querySelector(".formcheck").appendChild(inputoption);
    document.querySelector(".row-option").appendChild(colinput);
    document.querySelector(".col-input").appendChild(inputname);
    document.querySelector(".row-option").appendChild(colfile);
    document.querySelector(".col-file").appendChild(inputfile);
    document.querySelector(".col-file").appendChild(buttonclone);
    document.querySelector(".col-file").appendChild(buttonremove);
    document.querySelector(".btnclone").appendChild(imgclone);
    document.querySelector(".btnremove").appendChild(imgremove);
  }
  //duplicar opcion
  public cloneOpcion(): void {
    let n = 0;
    ++n;
    const rowoption = document.createElement("div");//Row Opcion
    rowoption.classList.add('row', 'mt-3', 'row-option');
    const coloption = document.createElement("div");//Col Opcion
    coloption.classList.add('col-12', 'col-option-'+n);
    console.log(coloption)
    const formoption = document.createElement("div");//Formcheck Opcion
    formoption.classList.add('form-check', 'mb-3', 'formcheck-'+n);
    const labeloption = document.createElement("label");//Label Opcion
    labeloption.classList.add('text13', 'txt-blue');
    labeloption.textContent = 'Opción';
    const inputoption = document.createElement("input");//Input Opcion
    inputoption.classList.add('form-check-input');
    inputoption.type='radio';
    const colinput = document.createElement("div");//Col Input
    colinput.classList.add('col-3', 'col-input-'+n);
    const inputname = document.createElement("input");//Input Nombre
    inputname.classList.add('input5');
    inputname.type='text';
    const colfile = document.createElement("div");//Col Input file
    colfile.classList.add('col-4', 'col-file-'+n);
    const inputfile = document.createElement("input");//Input File
    inputfile.classList.add('file');
    inputfile.type='file';
    const buttonclone = document.createElement("button");//Button clone
    buttonclone.classList.add('boton2', 'btnclone-'+n);
    const imgclone = document.createElement("img");//img clone
    imgclone.src='assets/img/agregapreg.svg';
    buttonclone.addEventListener('click', this.cloneOpcion);
    const buttonremove = document.createElement("button");//Button remove
    buttonremove.classList.add('boton2', 'btnremove-'+n);
    const imgremove = document.createElement("img");//img remove
    imgremove.src='assets/img/quitarpreg.svg';
    //buttonremove.addEventListener('click', this.remove);
    document.querySelector(".pregunta").appendChild(rowoption);
    document.querySelector(".row-option").appendChild(coloption);
    document.querySelector(".col-option-"+n).appendChild(formoption);
    document.querySelector(".formcheck-"+n).appendChild(labeloption);
    document.querySelector(".formcheck-"+n).appendChild(inputoption);
    document.querySelector(".row-option").appendChild(colinput);
    document.querySelector(".col-input-"+n).appendChild(inputname);
    document.querySelector(".row-option").appendChild(colfile);
    document.querySelector(".col-file-"+n).appendChild(inputfile);
    document.querySelector(".col-file-"+n).appendChild(buttonclone);
    document.querySelector(".col-file-"+n).appendChild(buttonremove);
    document.querySelector(".btnclone-"+n).appendChild(imgclone);
    document.querySelector(".btnremove-"+n).appendChild(imgremove);

    /*const agregar = document.querySelector(".agregar");
    agregar.addEventListener("click", this.cloneOpcion);
    const opcion = document.querySelector(".opcion");
    const clone = opcion.cloneNode(true);
    document.querySelector(".opcion").appendChild(clone);*/
  }

   //remove opcion
  public remove(): void {
    const node = document.getElementById("opcion");
    node.removeChild(node);
  }
}
