import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdduserComponent } from './adduser/adduser.component';
import { AlluserComponent } from './alluser/alluser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { GetuserComponent } from './getuser/getuser.component';
import { RemoveuserComponent } from './removeuser/removeuser.component';
import { FormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { UserlogoutComponent } from './userlogout/userlogout.component';
import { HttpClientModule } from '@angular/common/http';


const userRoute:Routes=[
  {path:'userinfo',component:UserprofileComponent},
  {path:'userlogout',component:UserlogoutComponent}
]
@NgModule({
  declarations: [
    AdduserComponent,
    AlluserComponent,
    EdituserComponent,
    GetuserComponent,
    RemoveuserComponent,
    UserprofileComponent,
    UserlogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(userRoute)
    
  ],
  exports:[
    AdduserComponent,
    AlluserComponent,
    EdituserComponent,
    GetuserComponent,
    RemoveuserComponent,
    UserprofileComponent,
    UserlogoutComponent

  ]
})
export class UsersModule { }
