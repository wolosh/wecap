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

  getConferencias(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'correos', {
      headers,
    })
  }
}
