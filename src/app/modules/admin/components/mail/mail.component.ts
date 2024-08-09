import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { UploadAdapter } from '../mail/my-upload-adapter';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
})
export class MailComponent implements OnInit {
  public Editor: any = ClassicEditor;
  formNewMail: FormGroup;
  formMail: FormGroup;
  mail: any;
  fecha: any = [];
  asunto: any;
  correo: any = [];
  viewMail = 0;
  mailito: any;
  p = 1;
  pedit = 1;
  public searchSelect = '0';
  public text1 = '';
  formSearch: FormGroup;
  length: any;
  searchArray: any;
  objUsers = [] as any;
  showArr = [] as any;
  showLength = 0;
  img: any;
  idMail: any;
  objEmails = [] as any;
  mailCount: number = 0;
  /*editorPlaceholder:any = document.querySelector( '#editor' ) as HTMLElement;*/

  constructor(private route: Router, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService) { }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.pauseTimer(this.helpers.n);
    this.helpers.pauseTimer(this.helpers.interval);
    if (localStorage.getItem('type') == '1') {
      this.helpers.loader();
      this.helpers.type = localStorage.getItem('type');
      this.mails();
      this.helpers.cursos = 1;
    } else if (localStorage.getItem('type') == '4')  {
      this.route.navigate(['/cmtemplate']);
      /*if (localStorage.getItem('type') == '4') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cmtemplate']);
          }
        });
      } else if(localStorage.getItem('token') == null){
        this.route.navigate(['/']);
      }*/
    } else {
      this.route.navigate(['/']);
    }



  }

  /*public ClassicEditor.create( this.editorPlaceholder ).catch( error => {
    console.error( error );
  } );*/

  startForm() {
    this.formNewMail = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      fechas: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]],
    });

    this.formMail = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      fechas: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]],
    });

    this.formSearch = this.formBuilder.group({
      filter: [''],
      search: [''],
      group: [''],
      users: [''],
    });
  }
  get titulo() {
    return this.formNewMail.get('titulo');
  }
  get cuerpo() {
    return this.formNewMail.get('cuerpo');
  }
  get fechas() {
    return this.formNewMail.get('fechas');
  }

  onClickTab() {
    //console.log(this.p, this.pm, this.pg);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.mails();
        this.viewMail = 0;
      }
    });


  }

  mails() {
    this.get.getMails(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
          //console.log(data[i])
          this.fecha.push(JSON.parse(data[i].fechas));
          this.correo.push(JSON.parse(data[i].correos));
        }
        //console.log(this.fecha);
        this.mail = data;
        this.mailCount = data.length;
        Swal.close();
      }
    );
  }
  files(event) {
    this.img = event.target.files[0]
  }

  changeViewMail(type: any, kind?: any, id?: any,) {
    //console.log(type, id, kind);
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        switch (type) {
          case 0:
            this.viewMail = type;
            this.mails();
            break;
          case 1:
            this.viewMail = type;
            this.startForm();
            if (kind == 'editar') {
              this.mail.forEach((element: any) => {
                if (element.id == id) {
                  this.idMail=element.id
                  this.formMail.controls['titulo'].setValue(element.asunto);
                  this.formMail.controls['fechas'].setValue(JSON.parse(element.fechas));
                  this.formMail.controls['cuerpo'].setValue(element.cuerpo);
                }
              });
              this.users();
              //console.log(this.mailito);
            }
            break;
          case 2:
            if (kind == 'crear') {
              this.startForm();
              this.viewMail = type;

                //console.log('nuevo');
              Swal.close();
            }
            break;
        }

      }
    })
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };
  }

  changeOption(type: any, search?: any) {
    //console.log(type, this.teacherSelected, this.groupSelected);
    switch (type) {
      /*case 'teacher':
        this.formNewMat.controls['teacher'].setValue(this.teacherSelected);
        break;*/
      case 'search':
        //console.log(this.searchSelect)
        if (this.searchSelect == '1') {
          this.formSearch.controls['filter'].setValue('nombre');
        } else if (this.searchSelect == '2') {
          this.formSearch.controls['filter'].setValue('area');
        } else if (this.searchSelect == '3') {
          this.formSearch.controls['filter'].setValue('puesto');
        }
        //console.log(this.formSearch.value, this.formSearch.value.filter);
        break;

    }

  }

  didModify() {
    //console.log(this.text1);
    if(this.formSearch.value.filter == ''){
      this.formSearch.controls['filter'].setValue('nombre');
    }
    if (this.text1 != '') {
      if (this.text1.length > 1) {
        this.formSearch.controls['search'].setValue(this.text1);
        //console.log(this.formSearch.value);
        this.searchUsers('search', this.formSearch.value.filter, this.formSearch.value.search);
      } else {
        this.searchArray = [];
        this.length = 0;
      }
    }


  }

  searchUsers(kind: any, filter?: any, param?: any) {
    //console.log(filter, param);
    this.pedit = 1;
    if (kind == 'search') {
      let f = filter;
      let cad = param;
      let token = localStorage.getItem('token');
      //console.log(f, cad);
      this.get.searchUsers(f, cad, token).subscribe(
        (data: any) => {
          //console.log(data);
          this.length = data.usuarios.length;
          this.searchArray = data.usuarios;
          //console.log(this.searchArray)
        }
      );
    } else if (kind == 'show') {
      Swal.fire({
        title: 'Cargando...',
        html: 'Espera un momento por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.length = 0
          this.searchArray = [];
          this.p = 1;
          this.pedit = 1;
          this.text1 = '';
          this.searchSelect = '0'
          this.users(kind);
        }
      });
    }
  }

  changeValue(event: any) {
    //console.log(event.target.value);
    if (event.target.checked) {
      //console.log(event.target.checked);
      //this.objUsers.push(event.target.value);
      this.searchArray.forEach(element => {
        //console.log(this.searchArray)
        if (element.idUser === event.target.value) {
          this.objUsers.push(element.email);
          //console.log(this.objUsers)
        }
      })
    } else {
      ////console.log(event.target.checked);
      this.objUsers.splice(this.objUsers.indexOf(event.target.value), 1);
      //console.log(this.objUsers)
    }
    this.showUsers(event.target.value);
  }

  showUsers(array: any) {
    //console.log(array);
    this.searchArray.forEach(element => {
      if (element.idUser == array) {
        if (this.showArr.includes(element)) {
          //console.log(this.showArr.indexOf(element));
          this.showArr.splice(this.showArr.indexOf(element), 1);
        } else {
          this.showArr.push(element);
        }
      }
    })
    this.showLength = this.showArr.length;
    /*if(this.showArr.includes(array)){
      console.log(this.showArr.indexOf(array));
      this.showArr.splice(this.showArr.indexOf(array), 1);
    } else {
      this.searchArray.forEach(element => {
        if(element.idUser == array){
          this.showArr.push(element);
        }
      });
    }*/
    //console.log(this.showArr);
  }

  //trae los usuarios
  users(type?: any) {
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        if (type == 'modify') {
          this.users = data.users;
        } else if (type == 'show') {
          this.searchArray = data.users;
          this.length = data.users.length;
          //console.log(this.searchArray, this.length)
        }
        Swal.close();
      }
    );
  }


  send() {
    //console.log(this.Editor)
  }

  change(id: any) {
    if (id == 1) {
      this.helpers.cursos = 1;
    } else {
      this.helpers.cursos = 2;
    }
  }


  /*saveCorreo() {
    let mail = new FormData();
    mail.append('id', this.idMail);
    mail.append('asunto', this.formMail.value.titulo);
    mail.append('cuerpo', this.formMail.value.cuerpo);
    mail.append('fechas', this.formMail.value.fechas);
    mail.append('correos', this.objUsers);
    if(this.img != undefined){
      mail.append('files',this.img);
    }else{
      mail.append('files',this.img);
    }
    //console.log(mail.getAll('fechas'))
    console.log(mail.getAll('id'), mail.getAll('asunto'), mail.getAll('cuerpo'), mail.getAll('fechas'), mail.getAll('correos'), mail.getAll('files'));
    this.session.editCorreo(this.idMail, mail, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El módulo ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        //this.modules(this.idCertification);
        /*this.temas(this.idModulo);*/
        //this.searchUsers('editar');
        /*this.changeViewMail(0);
        this.searchArray = [];
        this.showLength = 0;
      }
    );
  }*/

  saveCorreo(){
    let mailNew = new FormData();
    mailNew.append('asunto', this.formNewMail.value.titulo);
    mailNew.append('cuerpo', this.formNewMail.value.cuerpo);
    mailNew.append('fechas', this.formNewMail.value.fechas);
    mailNew.append('correos', this.objUsers);
    if(this.img != undefined){
      mailNew.append('files',this.img);
    }else{
      mailNew.append('files',this.img);
    }
    ////console.log(mail.getAll('fechas'))
    //console.log(mailNew.getAll('asunto'), mailNew.getAll('cuerpo'), mailNew.getAll('fechas'), mailNew.getAll('correos'), mailNew.getAll('files'));
    this.session.newEmail(mailNew, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El módulo ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        this.changeViewMail(0);
        this.mails();
        this.searchArray = [];
        this.showLength = 0;
      }
    );
  }
  editCorreo() {
    let mail = new FormData();
    mail.append('id', this.idMail);
    mail.append('asunto', this.formMail.value.titulo);
    mail.append('cuerpo', this.formMail.value.cuerpo);
    mail.append('fechas', this.formMail.value.fechas);
    mail.append('correos', this.objUsers);
    if(this.img != undefined){
      mail.append('files',this.img);
    }else{
      mail.append('files',this.img);
    }
    ////console.log(mail.getAll('fechas'))
    //console.log(mail.getAll('id'), mail.getAll('asunto'), mail.getAll('cuerpo'), mail.getAll('fechas'), mail.getAll('correos'), mail.getAll('files'));
    this.session.editCorreo(this.idMail, mail, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire({
          title: '¡Actualizado con exito!',
          text: 'El módulo ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#015287',
        });
        //this.modules(this.idCertification);
        /*this.temas(this.idModulo);*/
        //this.searchUsers('editar');
        this.changeViewMail(0);
        this.mails();
        this.searchArray = [];
        this.showLength = 0;
      }
    );
  }
}
