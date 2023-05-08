import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule,RouterModule,NgModule,NgModel,FormsModule]
})
export class AuthenticationModule {}
