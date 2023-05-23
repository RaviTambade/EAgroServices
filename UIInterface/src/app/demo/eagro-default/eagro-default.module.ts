import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';



@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    AboutusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EAgroDefaultModule { }
