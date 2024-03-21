import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable, catchError } from 'rxjs';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private session: SessionService, private http: HttpClient, private helpers:HelpersService) { }

  getProfile(id: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.session.API + 'perfil/' + id, {
      headers
    });
  }

  getCertifications(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'certifications', {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        console.log(err.status)
        if(err.status == 401 || err.status == 0 ) {
          this.helpers.logout();
        }
        return err;
      })
    );
  }


  getUsers(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'users', {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  getMaterias(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'getAllMaterias', {
      headers,
    });
  }

  getGroups(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'grupos', {
      headers,
    });
  }

  getMedia(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'media', {
      headers,
    })
  }

  getMails(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'correos', {
      headers,
    })
  }

  getConferencias(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getConferenciasCurso/' + id, {
      headers
    });
  }
  //llamada para traer modulos de un curso
  getModules(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'modulos/' + id, {
      headers
    });
  }
  //llamada para traer la información de un modulo en especifico
  getinfoModulo(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getModulo/' + id, {
      headers
    });
  }
  //llamada para traer modulos de un curso
  getTemas(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getTemasFromModulo/' + id, {
      headers
    });
  }

 getConferenciasCurso(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getConferenciasCurso/' + id, {
      headers
    });
  }
 

  //trae el diploma de la base de datos
  getDiploma(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'diploma/' + id, {
      headers
    });
  }

  searchUsers(filter, cad, token,) {
    console.log(filter, cad, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}search/${filter}/${cad}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  getTeachers(token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.session.API + 'getAllMaestros', {
      headers
    });
  }

  getUserCourses(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getCursosFromUser/${id}`, {
      headers,
    })
  }

  getDiagnostico(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}diagnostico/${id}`, {
      headers,
    })
  }

  getExamModule(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}examen/${id}`, {
      headers,
    })
  }

  getCursantesModulo(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getCursantesModulo/${id}`, {
      headers,
    })
  }

  getEstadisticas(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}estadisticas`, {
      headers,
    })
  }


  getFiles(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}files/${id}`, {
      headers,
    })
  }

  getConfiguration(token?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}config`, {
      headers,
    })
  }

  getOnlyTema(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getTema/' + id, {
      headers
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  getInfoExamen(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'examen/' + id, {
      headers
    });
  }

  getCalificacion(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}calificacion/${id}`, {
      headers,
    })
  }
  //Estadisticas globales
  getEstadGlobales(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}estadisticasGlobales`, {
      headers,
    })
  }       
  //Estadisticas Curso
  getEstadCurso(id: any,token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'estadisticasCurso/' + id, {
      headers,
    })
  }

  //Estadisticas Modulo
  getEstadModulo(id: any,token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getEstadisticasModulos/' + id, {
      headers,
    })
  }

  //Info perfil
  getPerfil(id: any,token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'perfil/' + id, {
      headers,
    })
  }

  //Info perfil
  getTemaVisto(id: any,token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'isTemaFinalizado/' + id, {
      headers,
    })
  }


  public checkTheme(id, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.session.API}isTemaFinalizado/${id}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public checkModule(id, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.session.API}isModuloFinalizado/${id}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public medallas(id, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.session.API}getMedallasFromModulo/${id}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  validEmail(email: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.session.API}isValidMail/${email}`, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public questionInfo(id, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.session.API}pregunta/${id}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  //llamada para traer size columnas de temas
  getsizeCol(token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'temasSize',{
      headers
    });
  }

  //llamada para traer columnas de tema
  getCols(id,token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getColumnasFromTema/${id}`, {
      headers
    });
  }

  //llamada para traer columna de columnas
  getCol(id,token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getColumna/${id}`, {
      headers
    });
  }

  getComentarios(id,token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getComentarios/${id}`, {
      headers
    });
  }

  //Estadisticas Modulo
  getEstadGenerales(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'estadisticas', {
      headers,
    })
  }

  getUserTime(id, user, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getTiempoTema/${id}/${user}`, {
      headers,
    })
  }

  getUserDiploma(idUser, idCurso, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getDiploma/${idUser}/${idCurso}`, {
      headers,
    })
  }

  getPreguntasPendientes(id, idUser, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getPreguntasPendientesCalificacion/${id}/${idUser}`, {
      headers
    });
  }

}
