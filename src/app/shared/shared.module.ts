import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizePipe } from '../pipes/sanitize.pipe';


const routes: Routes = [
  {path: "", component: LoginComponent}
];

@NgModule({
  declarations: [ HeaderComponent, FooterComponent, SanitizePipe, LoginComponent],
  exports: [HeaderComponent, FooterComponent, LoginComponent, CommonModule, SanitizePipe, HttpClientModule],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
