import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: "login", component: LoginComponent}
];

@NgModule({
  declarations: [ HeaderComponent, FooterComponent, LoginComponent],
  exports: [HeaderComponent, FooterComponent, LoginComponent, CommonModule, HttpClientModule],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
