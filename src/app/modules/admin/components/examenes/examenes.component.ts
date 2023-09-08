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
    const newDiv = document.createElement("input");
    document.body.appendChild(newDiv);
       /*newDiv.appendChild(node);*/

  }
  //duplicar opcion
  public cloneOpcion(): void {
    const agregar = document.querySelector(".agregar");
    //console.log(agregar)
    agregar.addEventListener("click", this.cloneOpcion);
    const opcion = document.querySelector(".opcion");
    const clone = opcion.cloneNode(true);
    document.querySelector(".opcion").appendChild(clone);
  }
   //remove opcion
   public remove(): void {
    const node = document.getElementById("opcion");
    node.removeChild(node);
  }
}
