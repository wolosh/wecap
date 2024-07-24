import {
  Component, OnInit, ElementRef,
  HostListener,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

import { Data, Router } from '@angular/router';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  hasFile: number = 0;
  doc = '';
  nameTopic = '';

  constructor(public helpers: HelpersService, private route: Router) { }

  ngOnInit(): void {
    console.log('viewer');
    console.log(localStorage.getItem('file'));
    if(localStorage.getItem('type') == '4'){
      console.log(localStorage.getItem('hasFile'), localStorage.getItem('doc'));
      this.nameTopic = localStorage.getItem('nameTopic');
    this.hasFile =  parseInt(localStorage.getItem('hasFile'));
    console.log(this.hasFile);
    this.doc = this.helpers.domain + 'media/temas/docs/' + localStorage.getItem('doc');
    console.log(this.doc);
    } else if (localStorage.getItem('type') == '1') {
      this.route.navigate(['/cursos']);
      /*if (localStorage.getItem('type') == '1') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cursos']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }*/
    } else {
      this.route.navigate(['/']);
    }
  }

}
