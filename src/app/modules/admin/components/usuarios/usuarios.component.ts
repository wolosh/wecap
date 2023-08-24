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
    console.log(localStorage.getItem('token'));
    this.profile();
  }

  profile(){
    this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.email = data;
        //console.log(this.email);
        this.users(data.email);
      }
    );
  }

  users(email:any){
    this.usuarios = [];
    this.get.getUsers(email, localStorage.getItem('token')).subscribe(
      (data: any) => {
        Object.entries(data).forEach(([key, value]) => {
          this.usuarios[key] = value;
        });
        //console.log(data);
        //this.usuarios = data;
        console.log(this.usuarios)
        
      }
    );
  }

}
