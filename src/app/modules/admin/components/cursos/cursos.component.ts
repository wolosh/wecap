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
    console.log(localStorage.getItem('token'));
    this.profile();
  }

  profile(){
    this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.email = data;
        //console.log(this.email);
        this.certifications(data.email);
      }
    );
  }
    
  certifications(email:any){
    this.certificaciones = [];
    this.get.getCertifications(email, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.certificaciones = data;
        console.log(this.certificaciones);
      }
    );
  }
}
