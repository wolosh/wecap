import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InstructoresComponent } from './components/instructores/instructores.component';

const routes: Routes = [
  {path: "instructores", component: InstructoresComponent}
];

@NgModule({
  declarations: [
    InstructoresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ], exports: [RouterModule]
})
export class InstructorModule { }
