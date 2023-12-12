import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/data/services/get.service';
import { HelpersService } from 'src/app/data/services/helpers.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  facebook: any;
  instagram: any;
  twitter: any;
  youtube: any;
  tiktok: any;
  logof: number = 0;
  logoi: number = 0;
  logotw: number = 0;
  logot: number = 0;
  logoy: number = 0;

  constructor(private get: GetService,public helpers: HelpersService,) { }

  ngOnInit(): void {
    this.configuration();
  }

  configuration() {
    this.get.getConfiguration(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data)
        this.facebook=data.red_facebook;
        this.instagram=data.red_instagram;
        this.twitter=data.red_twitter;
        this.tiktok=data.red_tiktok;
        this.youtube=data.red_youtube;
        //this.logo=
        console.log(this.tiktok,this.facebook,this.instagram,this.twitter,this.youtube)
        if(this.facebook ===""){
          this.logof = 1
        }else if(this.instagram ===""){
          this.logoi = 1
        }else if( this.twitter ===""){
          this.logotw = 1
        }else if(this.tiktok ==="") {
          this.logot = 1
        }else if(this.youtube ===""){
          this.logoy = 1
        }
        console.log(this.logof,this.logoi,this.logotw,this.logot,this.logoy)
      }
    );
  }
}
