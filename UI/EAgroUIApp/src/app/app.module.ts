import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultModule } from './default/default.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddJwtHeaderIntreceptorInterceptor } from './Interceptor/add-jwt-header-intreceptor.interceptor';
import { HomeComponent } from './default/home/home.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'membership',  loadChildren: () => import('./membership/membership.module').then(m => m.MembershipModule) },
  { path: 'auth',  loadChildren: () => import('./Shared/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'farmer',  loadChildren: () => import('./farmer/farmer.module').then(m => m.FarmerModule) },
  { path: 'merchant',  loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule)},
  { path: 'transporter',  loadChildren: () => import('./transporter/transporter.module').then(m => m.TransporterModule) },
  { path: 'collectioncenter', loadChildren: () => import('./collectioncenter/collectioncenter.module').then(m => m.CollectioncenterModule) },
  { path: 'collectioncenter/filters', loadChildren: () => import('./collection-center-filters/collection-center-filters.module').then(m => m.CollectionCenterFiltersModule) },
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   
  ],
  imports: [
    BrowserModule,
    DefaultModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddJwtHeaderIntreceptorInterceptor,
        multi: true
      },
      { provide: JWT_OPTIONS, useValue: {
        tokenGetter: () => {
          return;
        },
        throwNoTokenError: true,
      } },
      JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
