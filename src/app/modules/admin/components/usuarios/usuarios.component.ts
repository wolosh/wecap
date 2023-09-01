import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any;
  email: any;
  userObj: any;

  constructor(private get: GetService, public helpers: HelpersService) { }

  ngOnInit(): void {
    //console.log(localStorage.getItem('token'));
    this.users();
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

  users(){
    this.usuarios = [];
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        /*Object.entries(data).forEach(([key, value]) => {
          this.usuarios[key] = value;
        });*/
        //console.log(data);
        this.usuarios = data.users;
        //console.log(this.usuarios)

      }
    );
  }

}
