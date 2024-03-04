import { Component } from '@angular/core';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent {

  view = 0;
  viewM = 0;
  viewG = 0;
  viewMat = 0;
  viewMatNew = 0;
  viewGrupo = 0;
  viewGrupoNew = 0;
  changeView(view: any, id?: any) {
    switch (view) {
      case 'back':
        this.view = 0;
        this.viewM = 0;
        this.viewG = 0;
        this.viewMat = 0;
        this.viewMatNew = 0;
        this.viewGrupo = 0;
        this.viewGrupoNew = 0;
        break;
      case 'instr':
        this.view = 1;
        break;
      case 'mat':
        this.viewM = 1;
        break;
      case 'grup':
          this.viewG = 1;
          break;
      case 'materia':
        this.viewMat = 1;
        this.viewMatNew = 1;
      break;
      case 'grupo':
        this.viewGrupo = 1;
        this.viewGrupoNew = 1;
      break;
    }
  }
}
