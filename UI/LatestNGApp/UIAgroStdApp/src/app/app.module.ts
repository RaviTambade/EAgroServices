import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { transporterRoutes } from './transporter/transporter.module';
import { farmerRoutes } from './farmer/farmer.module';
import { merchantRoutes } from './merchant/merchant.module';
import { collectionmanagerRoutes } from './collectionmanager/collectionmanager.module';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MenubarComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthenticationModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent},
      {path:'transporter',children:transporterRoutes},
      {path:'farmer',children:farmerRoutes},
      {path:'merchant',children:merchantRoutes},
      {path:'collectionmanager',children:collectionmanagerRoutes},

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
