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
  filesArray: FileList;
  isEditing: boolean = false;
  /*editorPlaceholder:any = document.querySelector( '#editor' ) as HTMLElement;*/

  constructor(private route: Router, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService) {
    // Exponer el componente para la consola
    (window as any).mailComponent = this;
    this.startForm();
    // Configuración personalizada del editor 
  }
  
  formatCorreos(correos: string): string {
    if (!correos) return '';
    return correos.replace(/,/g, '<br>');
  }

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.pauseTimer(this.helpers.n);
    this.helpers.pauseTimer(this.helpers.interval);
      // Inicializar los formularios aquí
    this.startForm();
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
    if (!this.formNewMail) {
      this.formNewMail = this.formBuilder.group({
        asunto: ['', [Validators.required]],
        cuerpo: ['', [Validators.required]],
      });
    }
  
    if (!this.formMail) {
      this.formMail = this.formBuilder.group({
        asunto: ['', [Validators.required]],
        cuerpo: ['', [Validators.required]],
      });
    }

    this.formSearch = this.formBuilder.group({
      filter: [''],
      search: [''],
      group: [''],
      users: [''],
    });
  }
  get asunto() {
    return this.formNewMail.get('asunto');
  }
  get cuerpo() {
    return this.formNewMail.get('cuerpo');
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
        for (var i = 0; i < data.length; i++) {
          this.correo.push(JSON.parse(data[i].correos));
        }
        this.mail = data;
        this.mailCount = data.length;
        Swal.close();
      }
    );
  }
  files(event) {
    this.filesArray = event.target.files;
  }

  changeViewMail(type: any, kind?: any, id?: any) {
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
            this.isEditing = false;
            break;
            case 1:
              this.viewMail = type;
              this.startForm();
            
              // Vaciar la lista de destinatarios
              this.objUsers = [];
              this.showArr = [];
              
              if (this.searchArray) {
                this.searchArray.forEach(user => {
                  user.checked = false;
                });
              }
            
              if (kind == 'editar') {
                this.isEditing = true;
                this.mail.forEach((element: any) => {
                  if (element.id == id) {
                    this.idMail = element.id;
                    this.formMail.controls['asunto'].setValue(element.asunto);
                    this.formMail.controls['cuerpo'].setValue(element.cuerpo);
                    // No cargar los destinatarios antiguos
                    // const correosLimpios = element.correos.replace(/['"\\]/g, '').trim();
                    // this.objUsers = correosLimpios ? correosLimpios.split(',').map(email => email.trim()) : [];
                  }
                });
                this.users();
              }
              break;
          case 2:
            if (kind == 'crear') {
              this.startForm();
              this.viewMail = type;
              this.isEditing = false;
              Swal.close();
            }
            break;
        }
      }
    });
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
    const userEmail = event.target.value;
    if (event.target.checked) {
      if (!this.objUsers.includes(userEmail)) {
        this.objUsers.push(userEmail);
      }
    } else {
      const index = this.objUsers.indexOf(userEmail);
      if (index > -1) {
        this.objUsers.splice(index, 1);
      }
    }
    console.log('Destinatarios seleccionados:', this.objUsers);
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
        if (type == 'modify') {
          this.users = data.users;
        } else if (type == 'show') {
          // Inicializar la propiedad 'checked' de cada usuario
          this.searchArray = data.users.map(user => {
            return { ...user, checked: false };
          });
          this.length = data.users.length;
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
    mail.append('asunto', this.formMail.value.asunto);
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

    saveCorreo() {
      console.log('Formulario antes de guardar:', this.formNewMail.value); // Este log ayuda a verificar los datos
    
      let mailData = new FormData();
      mailData.append('asunto', this.formNewMail.get('asunto').value || '');
      mailData.append('cuerpo', this.formNewMail.get('cuerpo').value || '');
      mailData.append('correos', this.objUsers.length > 0 ? this.objUsers.join(',') : '');
      mailData.append('fechas', '01/01/2022'); // Envía fechas como un campo vacío
    
      if (this.filesArray && this.filesArray.length > 0) {
        for (let i = 0; i < this.filesArray.length; i++) {
          mailData.append('files[]', this.filesArray[i]);
        }
      }
    
      // Imprimir el contenido de FormData para depuración
      mailData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    
      this.session.newEmail(mailData, localStorage.getItem('token')).subscribe(
        (data: any) => {
          Swal.fire({
            title: '¡Guardado con éxito!',
            text: 'El correo ha sido guardado correctamente.',
            icon: 'success',
            confirmButtonColor: '#015287',
          });
        },
        (error: any) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al guardar el correo.',
            icon: 'error',
            confirmButtonColor: '#015287',
          });
          console.error('Error al guardar el correo:', error);
        }
      );
    }
    editCorreo() {
      console.log('Formulario antes de editar:', this.formMail.value); // Log para verificar datos antes de enviar
    
      let mailData = new FormData();
      mailData.append('asunto', this.formMail.get('asunto').value || '');
      mailData.append('cuerpo', this.formMail.get('cuerpo').value || '');
      mailData.append('correos', this.objUsers.length > 0 ? this.objUsers.join(',') : '');
      mailData.append('fechas', '01/01/2022'); // Envía fechas como un campo vacío
    
      if (this.filesArray && this.filesArray.length > 0) {
        for (let i = 0; i < this.filesArray.length; i++) {
          mailData.append('files[]', this.filesArray[i]);
        }
      }
    
      // Imprimir el contenido de FormData para depuración
      mailData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    
      this.session.editCorreo(this.idMail, mailData, localStorage.getItem('token')).subscribe(
        (data: any) => {
          Swal.fire({
            title: '¡Actualizado con éxito!',
            text: 'El correo ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonColor: '#015287',
          });
        },
        (error: any) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el correo.',
            icon: 'error',
            confirmButtonColor: '#015287',
          });
          console.error('Error al actualizar el correo:', error);
        }
      );
    }

    onChange({ editor }: any) {
      const data = editor.getData();
      this.formNewMail.controls['cuerpo'].setValue(data);
    }
    enviarCorreo() {
      let asunto: string = '';
      let cuerpo: string = '';
    
      // Verificar si estamos en modo de edición y si el formulario está inicializado
      if (this.isEditing && this.formMail) {
        asunto = this.formMail.get('asunto')?.value || '';
        cuerpo = this.formMail.get('cuerpo')?.value || '';
      } 
      // Verificar si estamos creando un nuevo correo y si el formulario está inicializado
      else if (!this.isEditing && this.formNewMail) {
        asunto = this.formNewMail.get('asunto')?.value || '';
        cuerpo = this.formNewMail.get('cuerpo')?.value || '';
      } else {
        console.error("El formulario no está inicializado correctamente.");
        Swal.fire({
          title: 'Error',
          text: 'El formulario no está inicializado correctamente.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
        return;
      }
    
      // Validar que asunto y cuerpo no estén vacíos
      if (!asunto || !cuerpo) {
        Swal.fire({
          title: 'Error',
          text: 'El asunto y el cuerpo del correo son obligatorios.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
        return;
      }
    
      // Eliminar posibles duplicados y correos vacíos
      const correosUnicos = Array.from(new Set(this.objUsers)).filter(email => email);
      
      // Verificar que hay al menos un correo válido
      if (correosUnicos.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'Debes seleccionar al menos un destinatario válido.',
          icon: 'error',
          confirmButtonColor: '#015287',
        });
        return;
      }
    
      // Convertir el arreglo a una cadena separada por comas sin comillas adicionales
      const correosString = correosUnicos.join(',');
    
      console.log('Asunto:', asunto);
      console.log('Cuerpo:', cuerpo);
      console.log('Destinatarios:', correosUnicos);
      console.log('Cadena de correos:', correosString);
    
      let mailData = new FormData();
      mailData.append('asunto', asunto);
      mailData.append('cuerpo', cuerpo);
      mailData.append('correos', correosString);
      mailData.append('fechas', '01/01/2022'); // Si el backend lo requiere
    
      if (this.filesArray && this.filesArray.length > 0) {
        for (let i = 0; i < this.filesArray.length; i++) {
          mailData.append('files[]', this.filesArray[i]);
        }
      }
    
      // Imprimir el contenido de FormData
      mailData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
    
      this.session.enviarCorreoMasivo(mailData, localStorage.getItem('token')).subscribe(
        (data: any) => {
          if (data && data.code === 200 && data.message === 'Enviado') {
            Swal.fire({
              title: '¡Enviado con éxito!',
              text: 'El correo ha sido enviado correctamente.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then(() => {
              this.changeViewMail(0);
              this.mails();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: data.message || 'Hubo un problema al enviar el correo.',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          }
        },
        (error: any) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el correo. Asegúrate de que todos los campos estén completos.',
            icon: 'error',
            confirmButtonColor: '#015287',
          });
          console.error('Error al enviar el correo:', error);
        }
      );
    }
    
  }