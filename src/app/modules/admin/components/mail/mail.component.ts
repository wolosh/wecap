import { Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl,} from '@angular/forms';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],

})
export class MailComponent implements OnInit {

  public Editor:any = ClassicEditor;
  mail:any;
  fecha: any;
  asunto: any;
  correo: any;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder,private session: SessionService) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.mails();
    this.helpers.cursos = 1;
  }

  mails(){
    this.get.getMails(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        for(var i = 0;i<data.length;i++) {
          //console.log(data[i])
          this.fecha = (JSON.parse(data[i].fechas));
          this.correo = (JSON.parse(data[i].correos));
        }
        this.mail = data;
      }
    );
  }

  change(id:any){
    if(id == 1){
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }
}
