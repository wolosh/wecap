import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ConferenciasComponent } from './components/conferencias/conferencias.component';
import { MailComponent } from './components/mail/mail.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

const routes: Routes = [
  {path: "archivos", component: ArchivosComponent},
  {path: "examenes", component: ExamenesComponent}, 
  {path: "estadisticas", component: EstadisticasComponent},
  {path: "conferencias", component: ConferenciasComponent},
  {path: "mail", component: MailComponent},
  {path: "usuarios", component: UsuariosComponent},
  {path: "configuracion", component: ConfiguracionComponent}
];

@NgModule({
  declarations: [
    ArchivosComponent,
    ExamenesComponent,
    EstadisticasComponent,
    ConferenciasComponent,
    MailComponent,
    UsuariosComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ], 
  exports: [RouterModule, ArchivosComponent, ExamenesComponent, EstadisticasComponent, ConferenciasComponent, MailComponent, UsuariosComponent, ConfiguracionComponent]
})
export class AdminModule { }
