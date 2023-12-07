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
      }
    );
  }
}
