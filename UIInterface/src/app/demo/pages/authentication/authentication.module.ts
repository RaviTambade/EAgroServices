import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, NgModel } from '@angular/forms';
import LoginComponent from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule,FormsModule,NgModule,NgModel],
})
export class AuthenticationModule {}
