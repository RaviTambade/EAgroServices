import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdduserComponent } from './adduser/adduser.component';
import { AlluserComponent } from './alluser/alluser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { GetuserComponent } from './getuser/getuser.component';
import { RemoveuserComponent } from './removeuser/removeuser.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdduserComponent,
    AlluserComponent,
    EdituserComponent,
    GetuserComponent,
    RemoveuserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  exports:[
    AdduserComponent,
    AlluserComponent,
    EdituserComponent,
    GetuserComponent,
    RemoveuserComponent
  ]
})
export class UsersModule { }
