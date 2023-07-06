import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RouterModule } from '@angular/router';



@NgModule({
  // schemas:[
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  declarations: [
    HomeComponent,
    ContactComponent,
    AboutusComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class EAgroDefaultModule { }
