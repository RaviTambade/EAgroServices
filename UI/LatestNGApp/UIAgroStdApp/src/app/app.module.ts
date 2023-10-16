import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { transporterRoutes } from './transporter/transporter.module';
import { farmerRoutes } from './farmer/farmer.module';
import { merchantRoutes } from './merchant/merchant.module';
import { collectionmanagerRoutes } from './collectionmanager/collectionmanager.module';
import { MenubarComponent } from './menubar/menubar.component';
import { userRoutes } from './users/users.module';
import { UpdatepasswordComponent } from './authentication/updatepassword/updatepassword.component';
import { inspectorsRoutes } from './inspector/inspector.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MenubarComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthenticationModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      // { path: 'dashboard', component: DashboardComponent},
      {path:'transporter',children:transporterRoutes},
      {path:'farmer',children:farmerRoutes},
      {path:'merchant',children:merchantRoutes},
      {path:'collectionmanager',children:collectionmanagerRoutes},
      {path:'inspector',children:inspectorsRoutes},
      {path:'user',children:userRoutes},
      {path:'updatepassword',component:UpdatepasswordComponent},

    ])
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => {
          return;
        },
        throwNoTokenError: true,
      },
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
