import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultModule } from './default/default.module';
import { AuthenticationModule, authRoutes } from './Shared/authentication/authentication.module';
import { MembershipModule, membershipRoutes } from './membership/membership.module';
import { CollectioncenterModule, collectionCenterRoutes } from './collectioncenter/collectioncenter.module';
import { MerchantModule, merchantRoutes } from './merchant/merchant.module';
import { FarmerModule, farmerRoutes } from './farmer/farmer.module';
import { TransporterModule, transporterRoutes } from './transporter/transporter.module';
import { UsersModule } from './Shared/users/users.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CropModule } from './crop/crop.module';
import { collectionCenterFilterRoutes } from './collection-center-filters/collection-center-filters.module';
import { FarmerpiechartComponent } from './farmer/farmerpiechart/farmerpiechart.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddJwtHeaderIntreceptorInterceptor } from './add-jwt-header-intreceptor.interceptor';
import { HomeComponent } from './default/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'membership', children: membershipRoutes },
  { path: 'auth', children: authRoutes },
  { path: 'farmer', children: farmerRoutes },
  { path: 'merchant', children: merchantRoutes },
  { path: 'transporter', children: transporterRoutes },
  { path: 'collectioncenter', children: collectionCenterRoutes },
  { path: 'collectioncenter/filters', children: collectionCenterFilterRoutes },
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // FarmerpiechartComponent,
  ],
  imports: [
    BrowserModule,
    DefaultModule,
    RouterModule.forRoot(routes),
    AuthenticationModule,
    MembershipModule,
    CollectioncenterModule,
    MerchantModule,
    FarmerModule,
    CropModule,
    TransporterModule,
    UsersModule,
    // CollectionCenterFiltersModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddJwtHeaderIntreceptorInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
