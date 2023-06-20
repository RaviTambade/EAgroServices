import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FarmerlistComponent } from './farmerlist/farmerlist.component';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { HomeComponent } from './home/home.component';
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
const childRoutes: Routes = [
  { path: '', redirectTo: 'collections', pathMatch: "full" },

]
const routes: Routes =
  [{ path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'farmers', component: FarmerlistComponent },
  { path: 'vendors', component: VendorlistComponent },
  { path: 'collections', component: CollectionlistComponent, children: childRoutes },
  // { path: 'collections/addcollection', component: AddcollectionComponent },
  { path: 'collections/addcollection', component: AddnewcollectionComponent },
  { path: 'collections/:id', component: CollectiondetailsComponent },
  { path: 'collections/:id/edit', component: EditcollectionComponent },
  { path: 'farmers', component: FarmerlistComponent },
  { path: 'merchant', component: MerchantlistComponent},
  { path: 'farmers/:id/profile', component: FarmerdetailsComponent },
  { path: 'farmers/:id', component: FarmercollectiondetailsComponent },
  { path: 'farmerbilling/:id', component: FarmerbillingComponent },
  { path: 'collections/:id/transport',component:CollectiontransportationComponent},
  { path: 'collections/:id/qualitycontrol',component:QualitycontrolComponent},
  { path: 'merchant/:id', component: MerchantdetailsComponent },
  { path: 'merchant/:id/merchantpurchases', component: MerchantpurchasesComponent },




  ]

@NgModule({
  declarations: [
    LoginComponent,
    FarmerlistComponent,
    CollectionlistComponent,
    VendorlistComponent,
    HomeComponent,
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
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule

  ],
  exports: [
    HomeComponent,
    SparouterComponent
  ]
})
export class SpaModule { }
