import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';


const DefaultRoutes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"contact",component:ContactComponent},
  {path:"privacy",component:PrivacyComponent},
  {path:"about",component:AboutComponent}
]
@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    PrivacyComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DefaultRoutes)
  ],
  exports:[
    HomeComponent
  ]
})
export class DefaultModule { }
