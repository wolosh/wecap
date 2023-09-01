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
    /*const txtquestion = document.querySelector('.txtquestion');//pregunta
    const question = document.querySelector('.question');//input pregunta
    const opcion = document.querySelector('.opcion');//input radio opcion
    /*const inputopcion = document.querySelector('.inputopcion');//input opcion
    const inputopcion = document.querySelector('.inputopcion');//boton imagen
    const inputopcion = document.querySelector('.inputopcion');//boton agregar opcion
    const inputopcion = document.querySelector('.inputopcion');//boton quitar opcion*/

    const node = document.querySelector("pregunta");
    const clone = node.cloneNode(true);
    document.body.appendChild(clone);

    /*const clone = txtquestion.cloneNode(true);
    document.querySelector('.pregunta').appendChild(clone);*/
  }
}
