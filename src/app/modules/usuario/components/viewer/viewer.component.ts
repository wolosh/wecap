import {
  Component, OnInit, ElementRef,
  HostListener,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

import { Data, Router } from '@angular/router';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  @ViewChild('pdfview') pdfview: ElementRef;

  //id del quid
  pdfContent: any;
  hasFile: number = 0;
  doc = '';
  nameTopic = '';

  constructor(public helpers: HelpersService, private route: Router) { }

  ngOnInit(): void {
    //console.log('viewer');
    //console.log(localStorage.getItem('file'));
    if (localStorage.getItem('type') == '4') {
      this.helpers.loader();
      this.helpers.pauseTimer(this.helpers.n);
      this.helpers.pauseTimer(this.helpers.interval);
      //console.log(localStorage.getItem('hasFile'), localStorage.getItem('doc'));
      this.nameTopic = localStorage.getItem('nameTopic');
      this.hasFile = parseInt(localStorage.getItem('hasFile'));
      //console.log(this.hasFile);
      this.doc = this.helpers.domain + 'media/temas/docs/' + localStorage.getItem('doc');
      //console.log(this.doc);
      setTimeout(() => {
        this.generate();
      }, 2000)

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

  generate() {
    console.log('entro')
    this.pdfContent = this.doc +
      '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    this.pdfview.nativeElement.setAttribute('data', this.pdfContent);
    setTimeout(() => {
      Swal.close();
    }, 3000)
  }

}
