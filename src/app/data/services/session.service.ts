import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  API: string = 'http://35.92.150.230/api/'

  curso = false;
  userName = '';
  idUser: number;

  constructor(private http: HttpClient) { }

  //login
  public login(email: string, password: string) {
    console.log(email, password);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post(`${this.API}login`, formData
      //email: email,
      //password: password
    );
  }

  //registro
  public register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API}register`, {
      name: name,
      email: email,
      password: password
    });
  }

  /*public newCurso(title: string, description: string,img: File, default_active_days: string,hasExam: string) {
    //console.log(email, password);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('img', img);
    formData.append('default_active_days', default_active_days);
    formData.append('hasExam', hasExam);
    return this.http.post(`${this.API}addCertification`, formData
      //email: email,
      //password: password
    );
  }*/

  //crear nuevo curso
  public newCurso(form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}addCertification`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
  public uploadMedia(form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}uploadMedia`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  //editar curso
  public editCourse(id, form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}editCertification/${id}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  //cambiar estado de curso
  public statusCourse(id, form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}changeStatusCertification/${id}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
}

