import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { FarmerDashboardComponent } from './demo/farmers/farmerdashboard/farmerdashboard.component';
import { MerchantdashboardComponent } from './demo/merchants/merchantdashboard/merchantdashboard.component';
import { EmployeedashboardComponent } from './demo/employees/employeedashboard/employeedashboard.component';
import { TransportdashboardComponent } from './demo/transports/transportdashboard/transportdashboard.component';
import { FarmerSelllistComponent } from './demo/farmers/farmer-selllist/farmer-selllist.component';
import { ProfileComponent } from './demo/farmers/profile/profile.component';
<<<<<<< HEAD
import { FarmersdetailsComponent } from './demo/employees/farmersdetails/farmersdetails.component';
=======
import { FarmerUpdateComponent } from './demo/farmers/farmer-update/farmer-update.component';
>>>>>>> 8a33b5c6f4f45023648379950006bcb1d5befcb5



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
        loadComponent: () => import('./demo/default/default.component')
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
      {path:'update/:id',component:FarmerUpdateComponent}

           
    ],
   },

   {
    path: 'employees',
    children:[
      { path:'employeedashboard', component:EmployeedashboardComponent  },
      { path:'farmerdetails', component:FarmersdetailsComponent },


      

           
    ],
   },
   {
    path: 'merchants/:id',
    component: MerchantdashboardComponent,
   },
   {
    path: 'employees/:id',
    component: EmployeedashboardComponent,
   },
   {
    path: 'transports/:id',
    component: TransportdashboardComponent,
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
