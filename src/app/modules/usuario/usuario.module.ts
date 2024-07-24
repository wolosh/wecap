import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CursosModulosComponent } from './components/cursos-modulos/cursos-modulos.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { TemasComponent } from './components/temas/temas.component';
import { TestComponent } from './components/test/test.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SeccionComponent } from './components/seccion/seccion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SupportComponent } from './components/support/support.component';
import { ViewerComponent } from './components/viewer/viewer.component';


const routes: Routes = [
  {path: "cmtemplate", component: CursosModulosComponent},
  {path: "perfil", component: PerfilUsuarioComponent},
  {path: "temas/:idTopic", component: TemasComponent},
  {path: "test/:idTest", component: TestComponent},
  {path: "seccion/:idModule", component: SeccionComponent},
  {path: "soporte/:type", component: SupportComponent},
  {path: "viewer", component: ViewerComponent}
];

@NgModule({
  declarations: [
    CursosModulosComponent,
    PerfilUsuarioComponent,
    TemasComponent,
    TestComponent,
    SeccionComponent,
    SupportComponent,
    ViewerComponent,
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    NgxDocViewerModule,
    PdfViewerModule,
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule
  ], exports: [RouterModule, CursosModulosComponent, PerfilUsuarioComponent, TemasComponent, TestComponent, ViewerComponent]
})
export class UsuarioModule { }

