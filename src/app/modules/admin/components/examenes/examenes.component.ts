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
    clonequestion.setAttribute("id", "pregunta"+this.n);
    //opcion.setAttribute("id", "opcion"+this.n);
    document.querySelector(".editor").appendChild(clonequestion);
    const buttonclone = document.querySelectorAll('.clone');
    const buttonremove = document.querySelectorAll('.remove');
    buttonclone.forEach(btnC => {
      //console.log(btnC);
      btnC.addEventListener('click', this.cloneOpcion)
    });
    buttonremove.forEach(btnR => {
      btnR.addEventListener('click', this.remove)
    });
  }
  //duplicar opcion Examenes
  //var n: number = 0
  public cloneOpcion() {
    //this.n++;
    var pregunta =document.querySelectorAll('.pregunta');
    //console.log(this.n);
    for(var i=0;i<pregunta.length;i++)
    {
      pregunta[i].addEventListener("click", function($event)
      {
        //console.log(this.id);
        //console.log(pregunta.length)
        var preguntaid= document.getElementById(this.id);
        //console.log(preguntaid.nodeValue);
        var opcion =preguntaid.querySelectorAll('.opcion');
        for(var i=0;i<opcion.length;i++){
          console.log(opcion[i])
          /*const opcionclon = opcion[i].cloneNode(true) as HTMLDivElement;
          document.getElementById(this.id).appendChild(opcionclon);*/
        }

        /*var primerTitulo = opcion[0] as HTMLDivElement;
        console.log(primerTitulo)
        //var first = opcion[0];
        //console.log(first)
        /*const cloneopcion = primerTitulo.cloneNode(true) as HTMLDivElement;
        document.getElementById(this.id).appendChild(cloneopcion);
        //console.log(opcion)
        /*for(var i=0;i<opcion.length;i++)
        {
          opcion[i].addEventListener("click", function($event)
          {
            //n++;
            var removeid= document.getElementById(this.id);
            console.log(removeid)
            /*const cloneopcion = removeid.cloneNode(true) as HTMLDivElement;
            cloneopcion.setAttribute("id", "opcion");
            document.getElementById(this.id).appendChild(cloneopcion);
          });
        }*/
        $event.preventDefault();
      });
    }
    //console.log("Clonado");
    /*const opcion = document.querySelectorAll('.opcion');
    console.log(opcion)
    opcion.addEventListener("click", function() {
        //console.log(opcion);
        //event.preventDefault();
    });
    /*const opcion = document.querySelector('.opcion') as HTMLDivElement;
    //let j = 0;
    //console.log(opcion);
    opcion.click = function() {
      console.log(opcion);
      //this.j++;
      /*const cloneopcion = opcion.cloneNode(true) as HTMLDivElement;
      //cloneopcion.setAttribute("id", "opcion"+this.j);
      document.querySelector(".pregunta").appendChild(cloneopcion);
      const buttonclone = document.querySelectorAll('.clone');
      const buttonremove = document.querySelectorAll('.remove');
      //console.log(buttonclone)
      //console.log(buttonremove)
      buttonclone.forEach(btnC => {
        console.log(btnC);
        btnC.addEventListener('click', function cloneOpcion(){

        })
      });
      buttonremove.forEach(btnR => {
        btnR.addEventListener('click',function remove(){})
      });
      //event.preventDefault();
    }*/
    /*var question =document.querySelectorAll('.opcion')
    //console.log(question)
    for(var i=0;i<question.length;i++)
    {
      question[i].addEventListener("click", function()
      {
        var idquestion= document.getElementById(this.id);
        console.log(idquestion);
        //var first = idquestion[0];
        //console.log(first);
        /*const cloneopcion = first.cloneNode(true) as HTMLDivElement;
        cloneopcion.setAttribute("id", "opcion"+i++);
        document.querySelector(".pregunta").appendChild(cloneopcion);
        //console.log(cloneopcion)
      });
    }*/

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
