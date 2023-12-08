import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //API: string = 'http://35.92.150.230/api/'
  //API: string = 'https://ci.wecap.mx/api/'
  //API: string = 'https://ci.americargo.wecap.mx/api/'
  //API: string = 'https://ci.alsainacademy.wecap.mx/api/'
  API: string = '';
  public domainPrueba = document.location.origin;


  curso: boolean = false;
  archivos: boolean = false;
  userName = '';
  idUser: number;
  cursos = 0;
  public idCertification: number;
  logo: string;

  constructor(private http: HttpClient, public route: Router) {
    if (this.domainPrueba.includes('americargo')) {
      this.API = 'https://ci.americargo.wecap.mx/api/'
      console.log(this.API)
      } else if (this.domainPrueba.includes('alsainacademy')) {
        this.API = 'https://ci.alsainacademy.wecap.mx/api/'
        console.log(this.API)
      } else {
        this.API = 'https://ci.wecap.mx/api/'
        console.log(this.API)
        this.configuracion();
      }
  }

  public redirect(){
    this.route.navigate(['']);
  }

  configuracion(){
    this.getConfiguration().subscribe(
      (data: any) => {
        localStorage.setItem('logo', data['logo']);
        localStorage.setItem('isComentario', data['isComentario']);
        localStorage.setItem('isLike', data['isLike']);
      }
    );
  }
  getConfiguration(token?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.API}config`, {
      headers,
    })
  }

  //login
  public login(email: string, password: string) {
    //console.log(email, password);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post(`${this.API}login`, formData
      //email: email,
      //password: password
    ).pipe(
      catchError((err) => {
        console.log(err, err.error.error);
        Swal.fire({
          title: 'Error',
          html: err.error.error,
          icon: 'error',
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonColor: '#015287',
          didOpen: () => {
            Swal.hideLoading();
            Swal.getConfirmButton();
          }
        });
        return err;
      })
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
        if(err.status == 401) {
        this.redirect();
        }
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
        //console.log(err);
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
        //console.log(err);
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
        //console.log(err);
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
        //console.log(err);
        return err;
      })
    );
  }

  public asignarGrupo(idGroup, form, token) {
    //console.log(form)
    //console.log(idGroup, form, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}asignaGrupo/${idGroup}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }


  public editarPerfil(idUser, form, token) {
    //console.log(form)
    //console.log(idUser, form, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put(`${this.API}editPerfil/${idUser}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public registrarUser(form, token) {
    //console.log(form)
    //console.log(idUser, form, token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}register`, form, {
      headers,
    });/*.pipe(
      catchError((err) => {
        console.log(err, err.error.message);
        Swal.fire({
          title: 'Error',
          html: err.error.message,
          icon: 'error',
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonColor: '#015287',
          didOpen: () => {
            Swal.hideLoading();
            Swal.getConfirmButton();
          }
        });
        return err;
      })*/

  }

  public deleteUser(idUser, token) {
    //console.log(form)
    //console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(`${this.API}deleteUser/${idUser}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public changeStatusUser(idUser, form, token) {
    //console.log(form)
    //console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}changeStatusUser/${idUser}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public asignarCurso(form, token) {
    //console.log(form)
    //console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}asignaCurso`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public editarExpiracion(form, token) {
    //console.log(form)
    //console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}updateExpiracion`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public quitarCurso(form, token) {
    //console.log(form)
    //console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}quitaAsignacionCurso`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public updateModulo(idUser, form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}editModulo/${idUser}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public addModulo(idUser, form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}addModulo`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  updatePreguntasExamen(data: any, token: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}updatePreguntas`, data, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  updatePreguntasDiagnostico(data: any, token: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}updatePreguntasDiagnostico`, data, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public updateDiagnostico(form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}updateDiagnostico`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public deleteQuestionDiagnostico(idPregunta, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.API}eliminaPreguntaDiagnostico/${idPregunta}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public deleteQuestionExam(idPregunta, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.API}eliminaPreguntaExamen/${idPregunta}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public updateCreateExamen(form, token) {
    //console.log(form)
    //console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}updateExamen`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public updateConfiguration(form, token) {
    //console.log(form)
    //console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}updateConfig`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public updateFiles(id, form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}updateFiles/${id}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }
  public changeStatusTema(idTema, form, token) {
    //console.log(form)
    //console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}changeStatusTema/${idTema}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public addTema(form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}addTema`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public updateTemas(idTema, form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}editTema/${idTema}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public addConferencia(id, form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}addConferencia/${id}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  deleteMedia(data: any, token: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
   return this.http.post(`${this.API}deleteMedia`, data, {
    headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public deleteTema(idTema, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.API}deleteTema/${idTema}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public iniciaExamen( form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}iniciaExamen`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public calificaExamen( form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}calificaExamen`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public statusModulo(id, form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}changeStatusModulo/${id}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }
  //crear nuevo email
  public newEmail(form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}addCorreo`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  //editar curso
  public editCorreo(id, form, token) {
    //console.log(form)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}editCorreo/${id}`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public updateFilesDescription( form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}files/updateDescripcion`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public saveTheme( form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}/finalizaTema`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public uploadFile( form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}files/uploadFile`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public deleteFile( form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}files/deleteFile`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public updatePregunta(form, token) {
    //console.log(form)
    //console.log(form,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}updatePregunta`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public addCol(form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}addColumna`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }
  public updateCol(form, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.API}editColumna`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }
  public deleteCol( id, token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.API}deleteColumna/${id}`, {
      headers,
    }).pipe(
      catchError((err) => {
        //console.log(err);
        return err;
      })
    );
  }

  public orderTopic(form, token) {
    //console.log(form)
    //console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}ordenaTemas`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  public orderModule(form, token) {
    //console.log(form)
    //console.log(idUser,  token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.API}ordenaModulos`, form, {
      headers,
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

}

