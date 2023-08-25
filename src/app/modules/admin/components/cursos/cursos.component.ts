import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  certificaciones: any;
  email: any;

  constructor(private get: GetService, public helpers: HelpersService) { }

  ngOnInit(): void {
    /*console.log(localStorage.getItem('token'));*/
    this.certifications();
  }


  certifications(){
    this.certificaciones = [];
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        //console.log(this.certificaciones);
      }
    );
  }
}
