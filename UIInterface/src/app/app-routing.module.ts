import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { FarmerDashboardComponent } from './demo/farmers/farmerdashboard/farmerdashboard.component';
import { EmployeedashboardComponent } from './demo/employees/employeedashboard/employeedashboard.component';
import { FarmerSelllistComponent } from './demo/farmers/farmer-selllist/farmer-selllist.component';
import { ProfileComponent } from './demo/farmers/profile/profile.component';
import { FarmerUpdateComponent } from './demo/farmers/farmer-update/farmer-update.component';
import { VarietyComponent } from './demo/farmers/variety/variety.component';
import { MerchantDashboardComponent } from './demo/merchants/merchant-dashboard/merchant-dashboard.component';
import { MerchantProfileComponent } from './demo/merchants/merchant-profile/merchant-profile.component';
import { MerchantUpdateComponent } from './demo/merchants/merchant-update/merchant-update.component';
import { MerchantPurchaselistComponent } from './demo/merchants/merchant-purchaselist/merchant-purchaselist.component';
import { TransportdashboardComponent } from './demo/transport/transportdashboard/transportdashboard.component';
import { MerchantLogoutComponent } from './demo/merchants/merchant-logout/merchant-logout.component';
import { FarmerLogoutComponent } from './demo/farmers/farmer-logout/farmer-logout.component';
import { TransportdetailsComponent } from './demo/transport/transportdetails/transportdetails.component';
import { TransportprofileComponent } from './demo/transport/transportprofile/transportprofile.component';
import { TransportupdateComponent } from './demo/transport/transportupdate/transportupdate.component';
import { FarmersListComponent } from './demo/employees/farmers-list/farmers-list.component';
import { FarmerDetailsComponent } from './demo/employees/farmer-details/farmer-details.component';
import { MerchantDetailsComponent } from './demo/employees/merchant-details/merchant-details.component';
import { MerchantsListComponent } from './demo/employees/merchants-list/merchants-list.component';
import { ListComponent } from './demo/employees/list/list.component';
import { TransportlogoutComponent } from './demo/transport/transportlogout/transportlogout.component';






const routes: Routes = [
  {
    path: '',
    
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/pages/authentication/login/login.component')
      },
    ]
  },
  {
    path: '',
    component:AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default/:id',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/pages/authentication/login/login.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
   {
    path: 'farmers',
    children:[
      // { path:':id', component: FarmerDashboardComponent },
      { path:'dashboard/:id', component: FarmerDashboardComponent },
      { path:'selllist/:id', component: FarmerSelllistComponent },
      { path:'profile/:id', component: ProfileComponent },
      {path:'update/:id',component:FarmerUpdateComponent},
      {path:'variety/:id',component:VarietyComponent},    
      {path:'update/:id',component:FarmerUpdateComponent},     
      {path:'logout/:id',component:FarmerLogoutComponent}       

    ],
   },
   {
    path: 'merchants',
    children:[
      // { path:':id', component: FarmerDashboardComponent },
      { path:'dashboard/:id', component: MerchantDashboardComponent },
      { path:'profile/:id', component: MerchantProfileComponent },
      { path:'purchaselist/:id', component: MerchantPurchaselistComponent },
      {path:'update/:id',component:MerchantUpdateComponent},
      {path:'logout/:id',component:MerchantLogoutComponent},       

    ],
   },
   {
    path: 'employees',
    children:[
      { path:'dashboard/:id', component:EmployeedashboardComponent  },
       { path:'farmerlist/:id', component:FarmersListComponent },  
       { path:'farmerdetails/:id',component: FarmerDetailsComponent },   
       { path:'merchantlist/:id',component: MerchantsListComponent },  
       { path:'merchantdetails/:id',component: MerchantDetailsComponent }, 
       { path:'list/:id',component: ListComponent },       




    ],
   },
   {
    path: 'transports',
    children:[
      { path:'dashboard/:id', component: TransportdashboardComponent },
      {path:'update/:id',component:TransportupdateComponent},
      {path:'details/:id',component:TransportdetailsComponent},
      {path:'profile/:id',component:TransportprofileComponent},
      {path:'logout/:id',component:TransportlogoutComponent},
    ],
  }
  //  {
  //   path: 'merchants/:id',
  //   component: MerchantdashboardComponent,
  //  },
  //  {
  //   path: 'employees/:id',
  //   component: EmployeedashboardComponent,
  //  },
  //  {
  //   path: 'transports/:id',
  //   component: TransportdashboardComponent,
  //  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
