import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ConferenciasComponent } from './components/conferencias/conferencias.component';
import { MailComponent } from './components/mail/mail.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImageCropperModule } from 'ngx-image-cropper';





const routes: Routes = [
  {path: "archivos", component: ArchivosComponent},
  {path: "conferencias", component: ConferenciasComponent},
  {path: "configuracion", component: ConfiguracionComponent},
  {path: "cursos", component:CursosComponent},
  {path: "estadisticas", component: EstadisticasComponent},
  {path: "examenes", component: ExamenesComponent},
  {path: "mail", component: MailComponent},
  {path: "usuarios", component: UsuariosComponent},

];

@NgModule({
  declarations: [
    ArchivosComponent,
    ExamenesComponent,
    EstadisticasComponent,
    ConferenciasComponent,
    MailComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    CursosComponent
  ],
  imports: [
    SortableModule.forRoot(),
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    NgApexchartsModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    DragDropModule,
    ImageCropperModule,
  ],
  exports: [RouterModule, ArchivosComponent, ExamenesComponent, EstadisticasComponent, ConferenciasComponent, MailComponent, UsuariosComponent, ConfiguracionComponent]
})
export class AdminModule { }
