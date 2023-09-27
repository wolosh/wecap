import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private session: SessionService, private http: HttpClient) { }

  getProfile(id:any, token:any) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get(this.session.API + 'perfil/' + id, {
        headers
    });
  }

  getCertifications(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(this.session.API + 'certifications', {
      headers,
    });
  }

  getUsers(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'users', {
      headers,
    });
  }

  getMaterias(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'getAllMaterias', {
      headers,
    });
  }

  getGroups(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'grupos', {
      headers,
    });
  }

  getMedia(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'media', {
      headers,
    })
  }

  getMails(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'correos', {
      headers,
    })
  }

  getConferencias(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getConferenciasCurso/' + id, {
      headers
    });
  }
  //llamada para traer modulos de un curso
  getModules(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'modulos/' + id, {
      headers
    });
  }
  //llamada para traer modulos de un curso
  getinfoModulo(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getModulo/' + id, {
      headers
    });
  }
  //llamada para traer modulos de un curso
  getTemas(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getTemasFromModulo/' + id, {
      headers
    });
  }

  //trae el diploma de la base de datos
  getDiploma(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'diploma/' + id, {
      headers
  });
  }

  searchUsers(filter, cad, token, ){
    console.log(filter, cad, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}search/${filter}/${cad}`, {
      headers,
    })
  }

  getTeachers(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.session.API + 'getAllMaestros',{
      headers
  });
  }

  getUserCourses(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getCursosFromUser/${id}`, {
      headers,
    })
  }

  getDiagnostico(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}diagnostico/${id}`, {
      headers,
    })
  }

  getExamModule(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}preguntas/${id}`, {
      headers,
    })
  }

  getCursantesModulo(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getCursantesModulo/${id}`, {
      headers,
    })
  }

  getEstadisticas(token:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}estadisticas`, {
      headers,
    })
  }


getFiles(id:any, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}files/${id}`, {
      headers,
    })
  }

  getConfiguration(token:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}config`, {
      headers,
    })
  }
}
