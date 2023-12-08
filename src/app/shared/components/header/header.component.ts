import { Component, OnInit, HostListener} from '@angular/core';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { SessionService } from 'src/app/data/services/session.service';
import { Data, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  url: any;
  constructor(public session: SessionService, public helpers: HelpersService, private route: Router) { }
  public name: string;
  type: string;

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  /*Cambiar color de nav al hacer scroll*/
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let e = document.getElementsByClassName('navbar').item(0).clientHeight;
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > e) {
      element.classList.add('bg-white');
    } else {
      element.classList.remove('bg-white');
    }
  }

 goTo(vista:any){
  switch(vista){
    case 1:
      this.session.curso = false;
      this.route.navigate(['/cmtemplate']);
      break;
    case 2:
      this.session.curso = false;
      this.route.navigate(['/perfil']);
    break;
  }
 }
  getLogo(){
    return localStorage.getItem('logo');
  }
  getImage(){
    return localStorage.getItem('imgHeader');
  }
}
