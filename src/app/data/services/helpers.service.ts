import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  cursos = 0;
  public domain = 'http://35.92.150.230/';
  type:any;

  constructor() { }

  goTop(){
    document.body.scrollTop = 0;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
