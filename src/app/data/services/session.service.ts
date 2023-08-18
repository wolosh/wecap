import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  API: string = 'http://35.92.150.230/api/'

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API}login`, {
      email: email,
      password: password
    });
  }

  public register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API}register`, {
      name: name,
      email: email,
      password: password
    });
  }
}
