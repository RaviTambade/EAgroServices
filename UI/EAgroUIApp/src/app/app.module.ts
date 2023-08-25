import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultModule } from './default/default.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddJwtHeaderIntreceptorInterceptor } from './Interceptors/add-jwt-header-intreceptor.interceptor';
import { HomeComponent } from './default/home/home.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import {
  canActivateCollectionCenterRoutes,
  canActivateFarmerRoutes,
  canActivateMerchantRoutes,
  canActivateTransporterRoutes,
} from './Guards/guards';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'membership',
    loadChildren: () =>
      import('./membership/membership.module').then((m) => m.MembershipModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./Shared/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./Shared/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'farmer',
    canMatch: [canActivateFarmerRoutes()],
    canActivate: [canActivateFarmerRoutes()],
    loadChildren: () =>
      import('./farmer/farmer.module').then((m) => m.FarmerModule),
  },
  {
    path: 'merchant',
    canMatch: [canActivateMerchantRoutes()],
    canActivate: [canActivateMerchantRoutes()],
    loadChildren: () =>
      import('./merchant/merchant.module').then((m) => m.MerchantModule),
  },
  {
    path: 'transporter',
    canMatch: [canActivateTransporterRoutes()],
    canActivate: [canActivateTransporterRoutes()],
    loadChildren: () =>
      import('./transporter/transporter.module').then(
        (m) => m.TransporterModule
      ),
  },
  {
    path: 'collectioncenter',
    canMatch: [canActivateCollectionCenterRoutes()],
    canActivate: [canActivateCollectionCenterRoutes()],
    loadChildren: () =>
      import('./collectioncenter/collectioncenter.module').then(
        (m) => m.CollectioncenterModule
      ),
  },
  {
    path: 'collectioncenter/filters',
    canMatch: [canActivateCollectionCenterRoutes()],
    canActivate: [canActivateCollectionCenterRoutes()],
    loadChildren: () =>
      import(
        './collection-center-filters/collection-center-filters.module'
      ).then((m) => m.CollectionCenterFiltersModule),
  },
];

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    DefaultModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddJwtHeaderIntreceptorInterceptor,
      multi: true,
    },
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
  bootstrap: [AppComponent],
})
export class AppModule {}
