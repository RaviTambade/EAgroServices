import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultModule } from './default/default.module';
import { AuthenticationModule, authRoutes } from './Shared/authentication/authentication.module';
import { MembershipModule, membershipRoutes } from './membership/membership.module';
import { FarmerModule } from './farmer/farmer.module';


const routes: Routes = [
  { path: 'membership', children: membershipRoutes },
  { path: 'auth', children: authRoutes },
]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DefaultModule,
    RouterModule.forRoot(routes),
    AuthenticationModule,
    MembershipModule,
    FarmerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
