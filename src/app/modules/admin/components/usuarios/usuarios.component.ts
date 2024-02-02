import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public text1 = '';
  id: any;
  usuarios: any;
  email: any;
  userObj: any;
  usersView = 0;
  pu: number = 1;
  formUser: FormGroup;
  public genderSelected = '0';
  public typeSelected = '5';
  idOf: any;
  active: any;
  usersCount: number = 0;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router, private session: SessionService) { }

  ngOnInit(): void {
    this.helpers.goTop();
    //console.log(localStorage.getItem('token'));
    if (localStorage.getItem('type') == '1') {
      //console.log(this.searchArray)
      //console.log(localStorage.getItem('token'));
     
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.helpers.type = localStorage.getItem('type');
            this.erase();
            this.users();
            this.helpers.goTop();
          }
        });
    } else {
      if (localStorage.getItem('type') == '4') {
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
      }
    }
  }

  onClickTab() {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        /*this.usersView = 0;
        this.typeSelected = '5';
        this.genderSelected = '0';*/
        this.erase();
        this.users();
        this.pu = 1;
      }
    });
  }

  erase()
  {
    this.usersView = 0;
        this.typeSelected = '5';
        this.genderSelected = '0';
  }

  startForm(): void {
    //Metodo para inicializar el formulario
    this.formUser = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      genero: [''],
      fecha_nacimiento: ['', [Validators.required]],
      puesto: ['', [Validators.required]],
      area: ['', [Validators.required]],
      password: ['', [Validators.required]],
      pais: [''],
      estado: [''],
      ciudad: [''],
      is_admin: ['', [Validators.required]],
      grupo: [''],
    });
  }

  changeOption(kind: any) {
    //console.log(this.genderSelected)
    switch (kind) {
      case 'gender':
        this.formUser.controls['genero'].setValue(this.genderSelected);
        //console.log(this.formUser.controls['genero'].value);
        break;
      case 'type':
        this.formUser.controls['is_admin'].setValue(this.typeSelected);
        //console.log(this.formUser.controls['is_admin']errorvalue);
    }
  }

  changeViewUsers(view: any, id?: any) {
    //console.log(id)
    if (id != undefined) {
      //console.log(id)
      this.idOf = id;
      this.usuarios.forEach(element => {
        if (element.idUser == id) {
          this.userObj = element;
          console.log(this.userObj)
        }
      });
      this.id = id;
      this.startForm();
    }
    switch (view) {
      case 'users':
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.erase();
            this.users();
          }
        });
        break;
      case 'edit':
        this.usersView = 1;
        if (this.userObj.genero != null) this.genderSelected = this.userObj.genero;
        this.typeSelected = this.userObj.is_admin;
        this.active = this.userObj.is_active;
        console.log(this.usuarios)
        this.formUser.patchValue({
          email: this.userObj.email,
          name: this.userObj.full_name,
          puesto: this.userObj.job,
          area: this.userObj.area,
          pais: this.userObj.pais,
          estado: this.userObj.estado,
          ciudad: this.userObj.ciudad,
          grupo: this.userObj.grupo,
          is_admin: this.userObj.is_admin,
        });
        break;
      case 'add':
        this.usersView = 1;
        this.startForm();
        this.id = 0;
        break;
        case 'import':
          this.usersView = 2;
          
          break;
    }
  }

  validarEmail() {
    //console.log(this.formUser.value.email);
    if (this.formUser.value.email != '') {
      this.get.validEmail(this.formUser.value.email, localStorage.getItem('token')).subscribe(
        (data: any) => {
          //console.log(data);
          if (data.valid == false) {
            Swal.fire({
              title: '¡Error!',
              text: 'El correo que utilizaste ya esta registrado o no tiene un formato correcto.',
              icon: 'error',
              confirmButtonColor: '#015287',
            });
          } else {
            this.registerUser();
          }
        }
      );
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Faltan campos por llenar, por favor completa el formulario.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }
  }

  

  registerUser(){
    //console.log(this.formUser.value, this.typeSelected, this.genderSelected);
    
    let form = new FormData();
    if(this.formUser.value.name.length < 10){
      Swal.close();
      Swal.fire({
        title: '¡Error!',
        text: 'El nombre debe contener al menos un apellido.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else if (this.formUser.value.name != '' && this.formUser.value.email != '' && this.formUser.value.fecha_nacimiento != '' && this.formUser.value.puesto != '' && this.formUser.value.area != '' && this.formUser.value.is_admin != ''){
      console.log('esta correcto');
      this.helpers.loader();
      form.set('email', this.formUser.value.email);
      form.set('password', this.formUser.value.password);
      form.set('confirm_password', this.formUser.value.password);
      form.set('full_name', this.formUser.value.name);
      form.set('job', this.formUser.value.puesto);
      form.set('area', this.formUser.value.area);
      if(this.formUser.value.gender != '') form.set('genero', this.genderSelected);
      form.set('fecha_nacimiento', this.formUser.value.fecha_nacimiento);
      if(this.formUser.value.pais != '') form.set('pais', this.formUser.value.pais);
      if(this.formUser.value.estado != '') form.set('estado', this.formUser.value.estado);
      if(this.formUser.value.ciudad != '') form.set('ciudad', this.formUser.value.ciudad);
      form.set('is_admin', this.typeSelected);
      if(this.formUser.value.grupo != '') form.set('grupo', this.formUser.value.grupo);

      this.session.registrarUser(form, localStorage.getItem('token')).subscribe(
        (data: any) => {
          Swal.close();
          //console.log(data);
          
          
          Swal.fire({
            title: '¡Agregado con exito!',
            text: 'El usuario ha sido agregado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeViewUsers('users');
            }
          });
        }
        
      )/*,
      (error: any) => {
        Swal.close();
        console.log(error);
        this.helpers.showError(error);
      };*/
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Faltan campos por llenar, por favor completa el formulario.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    }


  }

  editUser() {
    //console.log(this.formUser.value, this.typeSelected, this.genderSelected);
    
    let form = new URLSearchParams();

    if(this.formUser.value.name.length < 10){
      Swal.close();
      Swal.fire({
        title: '¡Error!',
        text: 'El nombre debe contener al menos un apellido.',
        icon: 'error',
        confirmButtonColor: '#015287',
      });
    } else //if (this.formUser.value.name != '' && this.formUser.value.email != '' && this.formUser.value.fecha_nacimiento != '' && this.formUser.value.puesto != '' && this.formUser.value.area != '' && this.formUser.value.is_admin != '') {
      if (this.formUser.value.name != '' && this.formUser.value.email != '' && this.formUser.value.puesto != '' && this.formUser.value.area != '' && this.formUser.value.is_admin != '') {
        this.helpers.loader();
      form.set('email', this.formUser.value.email);
      form.set('full_name', this.formUser.value.name);
      form.set('job', this.formUser.value.puesto);
      form.set('area', this.formUser.value.area);
      form.set('genero', this.genderSelected);
      form.set('fecha_nacimiento', this.formUser.value.fecha_nacimiento);
      form.set('pais', this.formUser.value.pais);
      form.set('estado', this.formUser.value.estado);
      form.set('ciudad', this.formUser.value.ciudad);
      form.set('is_admin', this.typeSelected);
      form.set('grupo', this.formUser.value.grupo);
      form.set('password', this.formUser.value.password);

      //console.log(form.getAll('email'), form.getAll('password'))

    this.session.editarPerfil(this.idOf, form, localStorage.getItem('token')).subscribe(
        (data: any) => {
          Swal.close();
          //console.log(data);
          Swal.fire({
            title: '¡Agregado con exito!',
            text: 'El usuario ha sido modificado.',
            icon: 'success',
            confirmButtonColor: '#015287',
          }).then((result) => {
            if (result.isConfirmed) {
              this.changeViewUsers('users');
            }
          });
        }
      );
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Faltan campos por llenar, por favor completa el formulario.',
        icon: 'error',
        confirmButtonColor: '#015287',
      })
    }
  }

  users() {
    this.usuarios = [];
    this.get.getUsers(localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        this.usuarios = data.users;
        this.usersCount = data.users.length;
        //console.log(this.usuarios)
        Swal.close();
      },
      (error: any) => {
        this.helpers.logout();
      }
    );
  }

  deleteUser() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.session.deleteUser(this.idOf, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changeViewUsers('users');
              }
            });
          }
        );
      }
    })
  }

  status(status: any) {
    let form = new FormData();
    form.append('is_active', status);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Puedes revertir el cambio mas tarde.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#015287',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.session.changeStatusUser(this.idOf, form, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            Swal.fire({
              title: '¡Cambiado!',
              text: 'El usuario ha sido cambiado de estado.',
              icon: 'success',
              confirmButtonColor: '#015287',
            }).then((result) => {
              if (result.isConfirmed) {
                this.changeViewUsers('users');
              }
            });
          }
        );
      }
    })
  }
}
