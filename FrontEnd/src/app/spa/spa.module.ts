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
import { FormsModule } from '@angular/forms';
import { FarmercollectiondetailsComponent } from './farmercollectiondetails/farmercollectiondetails.component';
import { FarmerdetailsComponent } from './farmerdetails/farmerdetails.component';
import { FarmerbillingComponent } from './farmerbilling/farmerbilling.component';
import { CollectiontransportationComponent } from './collectiontransportation/collectiontransportation.component';
import { QualitycontrolComponent } from './qualitycontrol/qualitycontrol.component';

const childRoutes: Routes = [
  { path: '', redirectTo: 'collections', pathMatch: "full" },
  { path: 'addcollection', component: AddcollectionComponent },

]
const routes: Routes =
  [{ path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'farmers', component: FarmerlistComponent },
  { path: 'vendors', component: VendorlistComponent },
  { path: 'collections', component: CollectionlistComponent, children: childRoutes },
  { path: 'collections/:id', component: CollectiondetailsComponent },
  { path: 'collections/:id/edit', component: EditcollectionComponent },
  { path: 'farmers', component: FarmerlistComponent },
  { path: 'farmers/:id', component: FarmercollectiondetailsComponent },
  { path: 'farmerbilling/:id', component: FarmerbillingComponent },
  { path: 'collections/:id/transport',component:CollectiontransportationComponent},
  { path: 'collections/:id/qualitycontrol',component:QualitycontrolComponent}

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
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [
    HomeComponent,
    SparouterComponent
  ]
})
export class SpaModule { }
