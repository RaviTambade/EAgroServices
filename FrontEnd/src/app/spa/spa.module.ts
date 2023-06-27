import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerlistComponent } from './farmerlist/farmerlist.component';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import { RouterModule, Routes } from '@angular/router';
import { SparouterComponent } from './sparouter/sparouter.component';
import { AddcollectionComponent } from './addcollection/addcollection.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { EditcollectionComponent } from './editcollection/editcollection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FarmercollectiondetailsComponent } from './farmercollectiondetails/farmercollectiondetails.component';
import { FarmerdetailsComponent } from './farmerdetails/farmerdetails.component';
import { FarmerbillingComponent } from './farmerbilling/farmerbilling.component';
import { CollectiontransportationComponent } from './collectiontransportation/collectiontransportation.component';
import { QualitycontrolComponent } from './qualitycontrol/qualitycontrol.component';
import { AddnewcollectionComponent } from './addnewcollection/addnewcollection.component';
import { MatSelectModule } from '@angular/material/select';
import { MerchantlistComponent } from './merchantlist/merchantlist.component';
import { MerchantdetailsComponent } from './merchantdetails/merchantdetails.component';
import { MerchantpurchasesComponent } from './merchantpurchases/merchantpurchases.component';
import { PaymentprocessingModule } from '../paymentprocessing/paymentprocessing.module';
import { PaymentService } from '../paymentprocessing/payment.service';
import { VendorslistComponent } from './vendorslist/vendorslist.component';
import { VendorsdetailsComponent } from './vendorsdetails/vendorsdetails.component';
import { VendorvehiclesComponent } from './vendorvehicles/vendorvehicles.component';
import { DefaultModule } from '../default/default.module';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from '../default/home/home.component';
import { TruckdetailsComponent } from './truckdetails/truckdetails.component';
import { LoginComponent } from '../auth/login/login.component';
import { ListfilterModule } from '../listfilter/listfilter.module';
import { MerchantpurchasedetailsComponent } from './merchantpurchasedetails/merchantpurchasedetails.component';
import { RegisterComponent } from '../auth/register/register.component';


const childRoutes: Routes = [
  { path: '', redirectTo: 'collections', pathMatch: "full" },

]
const routes: Routes =
  [{ path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'farmers', component: FarmerlistComponent },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: 'collections', component: CollectionlistComponent, children: childRoutes },
  // { path: 'collections/addcollection', component: AddcollectionComponent },
  { path: 'collections/addcollection', component: AddnewcollectionComponent },
  { path: 'collections/:id', component: CollectiondetailsComponent },
  { path: 'collections/:id/edit', component: EditcollectionComponent },
  { path: 'farmers', component: FarmerlistComponent },
  { path: 'vendors', component: VendorslistComponent },
  { path: 'merchant', component: MerchantlistComponent},
  { path: 'farmers/:id/profile', component: FarmerdetailsComponent },
  { path: 'vendors/:id/vehicles', component: VendorvehiclesComponent },
  { path: 'vendors/:id/vehicles/:id/details', component: TruckdetailsComponent },
  { path: 'farmers/:id', component: FarmercollectiondetailsComponent },
  { path: 'vendors/:id', component: VendorsdetailsComponent },
  { path: 'farmerbilling/:id', component: FarmerbillingComponent },
  { path: 'collections/:id/transport',component:CollectiontransportationComponent},
  { path: 'collections/:id/qualitycontrol',component:QualitycontrolComponent},
  { path: 'merchant/:id', component: MerchantdetailsComponent },
  { path: 'merchant/:id/merchantpurchases', component: MerchantpurchasesComponent },
  { path: 'merchant/:id/details', component: MerchantpurchasedetailsComponent },





  ]

@NgModule({
  declarations: [
    FarmerlistComponent,
    CollectionlistComponent,
    SparouterComponent,
    AddcollectionComponent,
    CollectiondetailsComponent,
    EditcollectionComponent,
    FarmercollectiondetailsComponent,
    FarmerdetailsComponent,
    FarmerbillingComponent,
    CollectiontransportationComponent,
    QualitycontrolComponent,
    AddnewcollectionComponent,
    MerchantlistComponent,
    MerchantdetailsComponent,
    MerchantpurchasesComponent,
    VendorslistComponent,
    VendorsdetailsComponent,
    VendorvehiclesComponent,
    TruckdetailsComponent,
    MerchantpurchasedetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    PaymentprocessingModule,
    DefaultModule,
    ListfilterModule
  ],
  exports: [
    SparouterComponent
  ],
  providers:[
    PaymentService
  ]
  
})
export class SpaModule { }
