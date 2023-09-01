import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl,} from '@angular/forms';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.css']
})
export class ConferenciasComponent implements OnInit {
  conferencia: any[];

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder,private session: SessionService) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.cursos = 1;
  }

  change(id:any){
    if(id == 1){
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }

  conferencias(){
    this.conferencia = [];
    this.get.getConferencias(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.conferencia = data;
        //console.log(this.certificaciones);
      }
    );
  }
}
