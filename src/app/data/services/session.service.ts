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

  public updateDiploma(form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}editDiploma`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public addMateria(form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}addMateria`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public asignarGrupo(idGroup, form, token) {
    //console.log(form)
    console.log(idGroup, form, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}asignaGrupo/${idGroup}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  
  public editarPerfil(idUser, form, token) {
    //console.log(form)
    console.log(idUser, form, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put(`${this.API}editPerfil/${idUser}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public deleteUser(idUser, token) {
    //console.log(form)
    console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(`${this.API}deleteUser/${idUser}`, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public changeStatusUser(idUser, form, token) {
    //console.log(form)
    console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}changeStatusUser/${idUser}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public asignarCurso(form, token) {
    //console.log(form)
    console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}asignaCurso`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
  
  public editarExpiracion(form, token) {
    //console.log(form)
    console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}updateExpiracion`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public quitarCurso(form, token) {
    //console.log(form)
    console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}quitaAsignacionCurso`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
}

