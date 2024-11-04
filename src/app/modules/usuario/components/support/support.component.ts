import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

formHelp: FormGroup;
support:any;
email:any;
userId: any;
allPerfil: any;
emailToSend: string; //envío dependiendo el dominio
supportType: string = ''; //tipo de soporte

  
  constructor(private activeRoute: ActivatedRoute, public session: SessionService, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private router: Router,) {
    this.activeRoute.params.subscribe((params) => {
      //console.log(params);
      this.support = params['type'];
      console.log(this.support)
    });
  }

  ngOnInit(): void {
    this.startForm();
    this.activeRoute.params.subscribe(params => {
      this.supportType = params['type'];  // Capturamos el parámetro 'type'
      this.setEmailToSend();  // Configuramos el correo según el tipo de soporte
    });
    if (localStorage.getItem('type') == '4') {
      this.helpers.goTop();
      Swal.fire({
        title: 'Cargando',
        text: 'Espere un momento por favor',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          //console.log(this.helpers.count, this.helpers.finalizado)
          if(this.helpers.count != 0 && this.helpers.finalizado != 2){
            //console.log('si es diferente');
            this.helpers.endTheme(this.helpers.idTopicBackUp, this.helpers.count, localStorage.getItem('token'), this.helpers.finalizado);
            this.helpers.pauseTimer(this.helpers.n);
          }
         
          this.helpers.type = localStorage.getItem('type');
          this.profile();
          //this.certifications();
          //this.getFiles();

         
          this.helpers.conferencias = false;
          this.helpers.pauseTimer(this.helpers.interval);
        }
      });
    } else if (localStorage.getItem('type') != '4') {
      this.router.navigate(['/cursos']);
    } else {
      this.router.navigate(['/']);
    }
    
  }

  startForm() {
    this.formHelp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['Solicitud de Soporte', [Validators.required]],
      issue: ['', [Validators.required]],
    });
  }

     // Función para establecer el correo según el tipo de soporte
     getNotificationEmail() {
      this.get.getConfiguration(localStorage.getItem('token')).subscribe(
        (data: any) => {
  
          this.emailToSend = data.notificacionEmail || data.notificationEmail;
          if (!this.emailToSend || this.emailToSend.trim() === '') {
            this.emailToSend = 'info@creativesoft.mx';
            console.warn('No hay correo electrónico de notificaciones configurado. Se usará un correo por defecto.');
          }
        },
        (error: any) => {
          console.error('Error al obtener la configuración:', error);
          // Manejo de errores
          this.emailToSend = 'info@creativesoft.mx';
        }
      );
    }

    profile() {
      this.get.getProfile(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
        (data: any) => {
          this.email = data;
          this.formHelp.get('email').setValue(this.email.email);  // Asignamos el valor al control del formulario
          Swal.close();  // Cierra la alerta cuando la carga finaliza con éxito
        },
        (error: any) => {
          console.error('Error al cargar el perfil', error);
          Swal.close();  // También cierra la alerta en caso de error
        }
      );
    }

  setEmailToSend() {
  if (this.supportType === 'tecnico') {
    this.emailToSend = 'info@creativesoft.mx';
  } else if (this.supportType === 'academico') {
    this.getNotificationEmail();
  } else {
    this.emailToSend = 'info@creativesoft.mx';
    console.warn('Tipo de soporte no reconocido. Se usará un correo por defecto.');
  }
}
  getFiles(){
    this.get.getMedia(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
      }
    );
  }
  onSubmit() {
    console.log('El formulario ha sido enviado.');
    if (this.formHelp.valid) {
      // Obtener el mensaje y el correo del usuario
      const userMessage = this.formHelp.get('issue').value;
      const userEmail = this.email.email; // Asegúrate de que este valor está disponible
  
      // Crear el mensaje que se enviará, incluyendo el correo del usuario
      const messageToSend = `${userMessage}\n\nEnviado por el usuario: ${userEmail}`;
  
      // Crear el objeto JSON que se enviará
      const mailData = {
        to: this.emailToSend,
        subject: this.formHelp.get('subject').value,
        message: messageToSend
      };
  
      // Mostrar mensaje de envío
      Swal.fire({
        title: 'Enviando solicitud...',
        text: 'Tu solicitud de soporte está siendo procesada.',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      console.log('Datos a enviar:', mailData);
      // Llamada al servicio que maneja la solicitud de soporte
      this.session.sendSupportRequest(mailData, localStorage.getItem('token')).subscribe(
        (response) => {
          console.log('Solicitud enviada con éxito:', response);
          Swal.fire({
            title: 'Solicitud enviada',
            text: 'Tu solicitud de soporte ha sido enviada con éxito. Nos pondremos en contacto contigo a través del correo proporcionado.',
            icon: 'success',
            confirmButtonColor: '#015287'
          });
          // Restablecer solo el campo 'issue' (mensaje)
          this.formHelp.get('issue').reset();
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos antes de enviar.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  }
  perfil(id: any) {
    //console.log(id)
    this.get.getPerfil(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data, data.idUser);
        this.userId = data.idUser;
        this.allPerfil = data;
        //console.log()
      } 
    );
  }
  
// Función para cambiar el tipo de soporte y navegar a la ruta correspondiente
changeSupportType(type: string) {
  this.router.navigate(['/soporte', type]);
}

}
