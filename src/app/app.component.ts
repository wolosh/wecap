import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private config: {version: string};;
  title = 'wecap_3.0_angular';
  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.config = require("src/assets/config.json");
    console.log(this.config.version);

    const headers = new HttpHeaders().set('Cache-Control', 'no-cache').set('Pragma', 'no-cache');
    this.httpClient
      .get<{ version: string }>("/assets/config.json", {headers})
      .subscribe(config => {
        console.log(config.version);
       if (config.version !== this.config.version) {
          location.reload(); 
        }
      });
  }
}
