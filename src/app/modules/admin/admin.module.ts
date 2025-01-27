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
import { SharedModule } from '../../shared/shared.module';

import { GridModule, EditService, ToolbarService, SortService, PageService } from '@syncfusion/ej2-angular-grids';
//import { DatePickerAllModule } from '@syncfusion/ej2-calendars/datepicker/all-modules';
/*import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModel } from '@syncfusion/ej2-dropdowns/drop-down-list';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';*/





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
    CursosComponent,
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
    DragDropModule,
    ImageCropperModule,
    SharedModule,
    GridModule
  ],
  providers: [
    EditService,
    ToolbarService,
    SortService,
    PageService
  ],
  exports: [RouterModule, ArchivosComponent, ExamenesComponent, EstadisticasComponent, ConferenciasComponent, MailComponent, UsuariosComponent, ConfiguracionComponent]
})
export class AdminModule { }
