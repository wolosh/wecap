import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursosModulosComponent } from './components/cursos-modulos/cursos-modulos.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { TemasComponent } from './components/temas/temas.component';
import { TestComponent } from './components/test/test.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SeccionComponent } from './components/seccion/seccion.component';

const routes: Routes = [
  {path: "cmtemplate", component: CursosModulosComponent}, 
  {path: "perfil", component: PerfilUsuarioComponent},
  {path: "temas", component: TemasComponent},
  {path: "test", component: TestComponent},
  {path: "seccion", component: SeccionComponent}
];

@NgModule({
  declarations: [
    CursosModulosComponent,
    PerfilUsuarioComponent,
    TemasComponent,
    TestComponent,
    SeccionComponent
  ],
  imports: [
    CarouselModule,
    CommonModule, RouterModule.forChild(routes)
  ], exports: [RouterModule, CursosModulosComponent, PerfilUsuarioComponent, TemasComponent, TestComponent]
})
export class UsuarioModule { }
