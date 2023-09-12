import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  //n:number=0;

  constructor(private get: GetService, public helpers: HelpersService) {

  }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.cursos = 1;
  }


  /*public events(){
    let node = document.querySelector('.pregunta');
    const agregar = document.querySelector('#agregar');
    console.log(node);
    //this.agregar.addEventListener('click', this.cloneOpcion);
  }*/


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
    /*const node = document.querySelector('.pregunta');
    const clone = node.cloneNode(true);
    document.querySelector(".editor").appendChild(clone);
    //newDiv.appendChild(node);*/
    this.n++
    const divrow = document.createElement("div");//Row Pregunta
    divrow.classList.add('row', 'mb-3', 'row-question-'+this.n);
    const divcol = document.createElement("div");//Columna Pregunta
    divcol.classList.add('col-12','col-md-10', 'col-question-'+this.n);
    const question = document.createElement("label");//Label Pregunta
    question.textContent = 'Pregunta';
    question.classList.add('text13', 'txt-blue', 'mb-2', 'mt-3');
    const questioninput = document.createElement("input");//Input Pregunta
    questioninput.classList.add('input3');
    questioninput.type='text';

    const rowbutton = document.createElement("div");//Row button
    rowbutton.classList.add('row', 'mb-3', 'row-button-'+this.n);
    const colbutton = document.createElement("div");//col button
    colbutton.classList.add('col-4', 'col-button-'+this.n);

    const rowoption = document.createElement("div");//Row Opcion
    rowoption.classList.add('row', 'mt-3', 'row-option-'+this.n);
    const coloption = document.createElement("div");//Col Opcion
    coloption.classList.add('col-12', 'col-option-'+this.n);
    const formoption = document.createElement("div");//Formcheck Opcion
    formoption.classList.add('form-check', 'mb-3', 'formcheck-'+this.n);
    const labeloption = document.createElement("label");//Label Opcion
    labeloption.classList.add('text13', 'txt-blue');
    labeloption.textContent = 'Opción';
    const inputoption = document.createElement("input");//Input Opcion
    inputoption.classList.add('form-check-input');
    inputoption.type='radio';
    const colinput = document.createElement("div");//Col Input
    colinput.classList.add('col-3', 'col-input-'+this.n);
    const inputname = document.createElement("input");//Input Nombre
    inputname.classList.add('input5');
    inputname.type='text';
    const colfile = document.createElement("div");//Col Input file
    colfile.classList.add('col-4', 'col-file-'+this.n);
    const inputfile = document.createElement("input");//Input File
    inputfile.classList.add('file');
    inputfile.type='file';
    const buttonclone = document.createElement("button");//Button clone
    buttonclone.classList.add('boton2', 'btnclone-'+this.n);
    const imgclone = document.createElement("img");//img clone
    imgclone.src='assets/img/agregapreg.svg';
    buttonclone.addEventListener('click', this.cloneOpcion);
    const buttonremove = document.createElement("button");//Button remove
    buttonremove.classList.add('boton2', 'btnremove-'+this.n);
    const imgremove = document.createElement("img");//img remove
    imgremove.src='assets/img/quitarpreg.svg';
    buttonremove.addEventListener('click', this.remove);
    document.querySelector(".pregunta").appendChild(divrow);
    document.querySelector(".row-question-"+this.n).appendChild(divcol);
    document.querySelector(".col-question-"+this.n).appendChild(question);
    document.querySelector(".col-question-"+this.n).appendChild(questioninput);
    document.querySelector(".pregunta").appendChild(rowbutton);
    document.querySelector(".row-button-"+this.n).appendChild(colbutton);
    document.querySelector(".col-button-"+this.n).appendChild(buttonclone);
    document.querySelector(".col-button-"+this.n).appendChild(buttonremove);
    document.querySelector(".pregunta").appendChild(rowoption);
    document.querySelector(".row-option-"+this.n).appendChild(coloption);
    document.querySelector(".col-option-"+this.n).appendChild(formoption);
    document.querySelector(".formcheck-"+this.n).appendChild(labeloption);
    document.querySelector(".formcheck-"+this.n).appendChild(inputoption);
    document.querySelector(".row-option-"+this.n).appendChild(colinput);
    document.querySelector(".col-input-"+this.n).appendChild(inputname);
    document.querySelector(".row-option-"+this.n).appendChild(colfile);
    document.querySelector(".col-file-"+this.n).appendChild(inputfile);
    document.querySelector(".btnclone-"+this.n).appendChild(imgclone);
    document.querySelector(".btnremove-"+this.n).appendChild(imgremove);
  }
  //duplicar opcion
   n: number = 0;
  public cloneOpcion(): void {
    /*const opcion = document.querySelector('.row-option-'+this.n);
    console.log(opcion);
    /*const cloneopcion = opcion.cloneNode(true);
    document.querySelector(".opcion").appendChild(cloneopcion);*/
    this.n++;
    const rowoption = document.createElement("div");//Row Opcion
    rowoption.classList.add('row', 'mt-3', 'row-option-'+this.n, 'opcion');
    const coloption = document.createElement("div");//Col Opcion
    coloption.classList.add('col-12', 'col-option-'+this.n);
    const formoption = document.createElement("div");//Formcheck Opcion
    formoption.classList.add('form-check', 'mb-3', 'formcheck-'+this.n);
    const labeloption = document.createElement("label");//Label Opcion
    labeloption.classList.add('text13', 'txt-blue');
    labeloption.textContent = 'Opción';
    const inputoption = document.createElement("input");//Input Opcion
    inputoption.classList.add('form-check-input');
    inputoption.type='radio';
    const colinput = document.createElement("div");//Col Input
    colinput.classList.add('col-3', 'col-input-'+this.n);
    const inputname = document.createElement("input");//Input Nombre
    inputname.classList.add('input5');
    inputname.type='text';
    const colfile = document.createElement("div");//Col Input file
    colfile.classList.add('col-4', 'col-file-'+this.n);
    const inputfile = document.createElement("input");//Input File
    inputfile.classList.add('file');
    inputfile.type='file';
    const buttonclone = document.createElement("button");//Button clone
    buttonclone.classList.add('boton2', 'btnclone-'+this.n, 'agregar');
    const imgclone = document.createElement("img");//img clone
    imgclone.src='assets/img/agregapreg.svg';
    buttonclone.addEventListener('click', this.cloneOpcion);
    const buttonremove = document.createElement("button");//Button remove
    buttonremove.classList.add('boton2', 'btnremove-'+this.n);
    const imgremove = document.createElement("img");//img remove
    imgremove.src='assets/img/quitarpreg.svg';
    buttonremove.addEventListener('click', this.remove);
    document.querySelector(".pregunta").appendChild(rowoption);
    document.querySelector(".row-option-"+this.n).appendChild(coloption);
    document.querySelector(".col-option-"+this.n).appendChild(formoption);
    document.querySelector(".formcheck-"+this.n).appendChild(labeloption);
    document.querySelector(".formcheck-"+this.n).appendChild(inputoption);
    document.querySelector(".row-option-"+this.n).appendChild(colinput);
    document.querySelector(".col-input-"+this.n).appendChild(inputname);
    document.querySelector(".row-option-"+this.n).appendChild(colfile);
    document.querySelector(".col-file-"+this.n).appendChild(inputfile);
    document.querySelector(".col-file-"+this.n).appendChild(buttonclone);
    document.querySelector(".col-file-"+this.n).appendChild(buttonremove);
    /*document.querySelector(".btnclone-"+this.n).appendChild(imgclone);
    document.querySelector(".btnremove-"+this.n).appendChild(imgremove);*/
    //console.log(this.n);
    /*console.log(coloption)
    console.log(colinput)*/
  }

   //remove opcion
  public remove(): void {
    const node = document.querySelector(".pregunta");
    const opcion = document.querySelector(".opcion");
    node.removeChild(opcion);
  }
}
