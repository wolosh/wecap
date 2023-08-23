import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { GetService } from 'src/app/data/services/get.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-cursos-modulos',
  templateUrl: './cursos-modulos.component.html',
  styleUrls: ['./cursos-modulos.component.css']
})
export class CursosModulosComponent implements OnInit {
  slides = [
    {image: 'assets/img/carousel1.svg',text: 'Corporativo'},
    {image: 'assets/img/carousel2.svg',text: 'Promocional'},
    {image: 'assets/img/carousel3.svg',text: 'Documental'},
    {image: 'assets/img/carousel4.svg',text: 'Animación'}
  ];
  showIndicator = false;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;
  email: any;
  certificaciones: any;
  cursos: number;
  constructor(private get: GetService, public helpers: HelpersService) { }

  ngOnInit(): void {
    /*if(localStorage.getItem('token') == null){
      window.location.href = '/login';
    } else if(localStorage.getItem('type') == '0'){
      console.log('Usuario');
    }*/
    console.log(localStorage.getItem('token'));
    this.profile();
    this.helpers.cursos = 1;
  }

 profile(){
  this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
    (data: any) => {
      console.log(data);
      this.email = data;
      console.log(this.email);
      this.certifications(data.email);
    }
  );
  }

  certifications(email:any){
    this.get.getCertifications(email, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        console.log(this.certificaciones);
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
