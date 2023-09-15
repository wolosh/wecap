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

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private route: Router, private session: SessionService) { }

  ngOnInit(): void {
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
      Swal.fire({
        title: '¡Error!',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonColor: '#015287',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.helpers.type == '4') {
            this.route.navigate(['/cmtemplate']);
          } else if (localStorage.getItem('token') == null) {
            this.route.navigate(['']);
          }
        }
      });
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
        //console.log(this.formUser.controls['is_admin'].value);
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
          //console.log(this.userObj)
        }
      });
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
        //console.log(this.usuarios)
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
    }
  }

  editUser() {
    //console.log(this.formUser.value, this.typeSelected, this.genderSelected);
    let form = new URLSearchParams();

    if (this.formUser.value.name != '' && this.formUser.value.email != '' && this.formUser.value.fecha_nacimiento != '' && this.formUser.value.puesto != '' && this.formUser.value.area != '' && this.formUser.value.is_admin != '') {
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

      //console.log(form.getAll('email'))

      this.session.editarPerfil(this.idOf, form, localStorage.getItem('token')).subscribe(
        (data: any) => {
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
        //console.log(this.usuarios)
        Swal.close();
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
