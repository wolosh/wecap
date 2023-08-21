import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';

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
  constructor(private get: GetService) { }

  ngOnInit(): void {
    /*if(localStorage.getItem('token') == null){
      window.location.href = '/login';
    } else if(localStorage.getItem('type') == '0'){
      console.log('Usuario');
    }*/
    this.profile();
  }

 profile(){
  this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
    (data: any) => {
      console.log(data);
    }
  );
  }

}
