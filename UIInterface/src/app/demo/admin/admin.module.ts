import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminNavLeftComponent } from './admin-nav-left/admin-nav-left.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { UpdateadminComponent } from './updateadmin/updateadmin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EmployeesModule } from '../employees/employees.module';



@NgModule({
  declarations: [
    AdmindashboardComponent,
    AdminNavLeftComponent,
    AdminprofileComponent,
    UpdateadminComponent,
    UserlistComponent, 
  ],
  imports:[
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgScrollbarModule,
    RouterModule,
    EmployeesModule
  ]
})
export class AdminModule { }
