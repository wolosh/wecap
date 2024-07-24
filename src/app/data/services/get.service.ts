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

  //api profile user
  getProfile(id: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.session.API + 'perfil/' + id, {
      headers
    });
  }

  //api certificaciones
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

  //api para obtener los usuarios
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

  //api para traer materias
  getMaterias(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'getAllMaterias', {
      headers,
    });
  }

  //api para traer los grupos
  getGroups(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'grupos', {
      headers,
    });
  }

  //api para traer materias
  getMedia(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'media', {
      headers,
    })
  }

  //api para traer los mails de un admin
  getMails(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    //console.log(headers)
    return this.http.get(this.session.API + 'correos', {
      headers,
    })
  }

  //api para traer las conferencias de un curso
  getConferencias(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getConferenciasCurso/' + id, {
      headers
    });
  }

  //api para traer modulos de un curso
  getModules(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'modulos/' + id, {
      headers
    });
  }

  //apipara traer la información de un modulo en especifico
  getinfoModulo(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getModulo/' + id, {
      headers
    });
  }

  //api para traer modulos de un curso
  getTemas(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getTemasFromModulo/' + id, {
      headers
    });
  }

  //api para traer las conferencias de un curso
 getConferenciasCurso(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'getConferenciasCurso/' + id, {
      headers
    });
  }


  //api trae el diploma de la base de datos
  getDiploma(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'diploma/' + id, {
      headers
    });
  }

  //api para buscar usuarios en especifico
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

  //api para traer ls maestros
  getTeachers(token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.session.API + 'getAllMaestros', {
      headers
    });
  }


  //api para traer los cursos de un usuario especifico
  getUserCourses(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getCursosFromUser/${id}`, {
      headers,
    })
  }

  //api para traer el examen diagnostico
  getDiagnostico(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}diagnostico/${id}`, {
      headers,
    })
  }

  //api para traer el examen de un modulo en especifico 
  getExamModule(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}examen/${id}`, {
      headers,
    })
  }

  //api para traer los usuarios que cursan un modulo
  getCursantesModulo(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getCursantesModulo/${id}`, {
      headers,
    })
  }

  //api para estadisticas
  getEstadisticas(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}estadisticas`, {
      headers,
    })
  }

  //api para los los archivos 
  getFiles(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}files/${id}`, {
      headers,
    })
  }


  //api para la configuración de un curso
  getConfiguration(token?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}config`, {
      headers,
    })
  }

  //api para temas en especifico
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

  //api para información de examen en especifico 
  getInfoExamen(id: any, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.session.API + 'examen/' + id, {
      headers
    });
  }

  //api para calificacion de un examen de usuario especifico 
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

  //api para checar si un tema esta finalizado 
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

  //api para checar si un módulo esta finalizado
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

  //api trae medallas de modulo
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

  //api para validar si un email es correcto
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

  //api que trae los comentarios de un tema especifico
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

  //api para el tiempo de un usuario en determinado tema
  getUserTime(id, user, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getTiempoTema/${id}/${user}`, {
      headers,
    })
  }

  //api para traer el diploma de un usuario 
  getUserDiploma(idUser, idCurso, token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.session.API}getDiploma/${idUser}/${idCurso}`, {
      headers,
    })
  }

  //api para preguntas pendientes de calificacion
  getPreguntasPendientes(id, idUser, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.session.API}getPreguntasPendientesCalificacion/${id}/${idUser}`, {
      headers
    });
  }

  //api para excel de estadisticas
  getEstadisticasExcel(token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.session.API + 'getEstadisticasExcel',{
      headers,
      responseType: 'text'
    });
  }

}
