import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MembershipModule } from './default/membership/membership.module';
import {  HttpClientModule} from '@angular/common/http';
import { FarmerDashbordComponent } from './Farmer/farmer/farmer-dashbord/farmer-dashbord.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FarmerDashbordComponent
  ],
  imports: [
    BrowserModule,
    MembershipModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
