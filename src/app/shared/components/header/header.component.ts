import { Component, OnInit, HostListener } from '@angular/core';
import { SessionService } from 'src/app/data/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public session: SessionService) { }
  name: string;
  type: string;

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    this.type = localStorage.getItem('type');
  }

  /*Cambiar color de nav al hacer scroll*/
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('bg-white');
    } else {
      element.classList.remove('bg-white');
    }
  }
}
