import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';


@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule,RouterModule,FormsModule,HttpClientModule],
  providers:[
    AuthService
  ]
})
export class AuthenticationModule {}
