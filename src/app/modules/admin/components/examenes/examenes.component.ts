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
  n: number = 0;
  //duplicar pregunta Examenes
  public clone(): void {
    const question = document.querySelectorAll('.pregunta');
    const opcion = document.querySelector('.opcion') as HTMLDivElement;
    var first = question[0];
    const clonequestion = first.cloneNode(true) as HTMLDivElement;
    this.n++;
    clonequestion.setAttribute("id", "question"+this.n);
    opcion.setAttribute("id", "opcion"+this.n);
    document.querySelector(".editor").appendChild(clonequestion);
    const buttonclone = document.querySelectorAll('.clone');
    const buttonremove = document.querySelectorAll('.remove');
    buttonclone.forEach(btnC => {
      btnC.addEventListener('click', this.cloneOpcion)
    });
    buttonremove.forEach(btnR => {
      btnR.addEventListener('click', this.remove)
    });
  }
  //duplicar opcion Examenes

  public cloneOpcion(): void {
    var question =document.querySelectorAll('.opcion')
    //this.j++;
    //console.log(this.j)
    for(var i=0;i<question.length;i++)
    {
      question[i].addEventListener("click", function()
      {
        var idquestion= document.getElementById(this.id);
        //console.log(idquestion);
        const cloneopcion = idquestion.cloneNode(true) as HTMLDivElement;
        cloneopcion.setAttribute("id", "opcion"+i++);
        console.log(cloneopcion)
        /*document.getElementById(this.id).appendChild(cloneopcion);
        const buttonclone = document.querySelectorAll('.clone');
        const buttonremove = document.querySelectorAll('.remove');
        buttonclone.forEach(btnC => {
          btnC.addEventListener('click', this.cloneOpcion)
        });
        buttonremove.forEach(btnR => {
          btnR.addEventListener('click', this.remove)
        });*/
        //const opcion = document.querySelector(".pregunta");
        //opcion.id = idquestion;
        //const opcion = document.querySelector("#idquestion");
        //console.log(opcion)
        //console.log(idquestion.nativeElement);
      });
    }

  }

  //remove opcion Examenes
  public remove(): void {
    var test =document.querySelectorAll('.opcion')
    for(var i=0;i<test.length;i++)
    {
      test[i].addEventListener("click", function()
      {
        var removeid= document.getElementById(this.id);
        //removeid.remove();
        console.log(removeid)
      });
    }
  }
}
