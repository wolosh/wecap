import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

formHelp: FormGroup;
soporte:any;
email:any;

  constructor(private activeRoute: ActivatedRoute, public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router) {
    this.activeRoute.params.subscribe((params) => {
      //console.log(params);
      this.soporte = params['type'];
      console.log(this.soporte)
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('type') == '4') {
      this.helpers.goTop();
      Swal.fire({
        title: 'Cargando',
        text: 'Espere un momento por favor',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          //console.log(this.helpers.count, this.helpers.finalizado)
          if(this.helpers.count != 0 && this.helpers.finalizado != 2){
            //console.log('si es diferente');
            this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.count, localStorage.getItem('token'), this.helpers.finalizado);
            this.helpers.pauseTimer(this.helpers.n);
          }
         
          this.helpers.type = localStorage.getItem('type');
          this.profile();
          this.startForm();
          //this.certifications();
          //this.getFiles();

         
          this.helpers.conferencias = false;
          this.helpers.pauseTimer(this.helpers.interval);
        }
      });
    } else if (localStorage.getItem('type') != '4') {
      this.route.navigate(['/cursos']);
      
    } else {
      this.route.navigate(['/']);
    }
  }

  startForm(){
    
  }

  profile() {
    this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        ////console.log(data);
        this.email = data;
        ////console.log(this.email);
      }
    );
  }

  getFiles(){
    this.get.getMedia(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
      }
    );
  }
}
