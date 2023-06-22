"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SpaModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var farmerlist_component_1 = require("./farmerlist/farmerlist.component");
var collectionlist_component_1 = require("./collectionlist/collectionlist.component");
var router_1 = require("@angular/router");
var sparouter_component_1 = require("./sparouter/sparouter.component");
var addcollection_component_1 = require("./addcollection/addcollection.component");
var collectiondetails_component_1 = require("./collectiondetails/collectiondetails.component");
var editcollection_component_1 = require("./editcollection/editcollection.component");
var forms_1 = require("@angular/forms");
var farmercollectiondetails_component_1 = require("./farmercollectiondetails/farmercollectiondetails.component");
var farmerdetails_component_1 = require("./farmerdetails/farmerdetails.component");
var farmerbilling_component_1 = require("./farmerbilling/farmerbilling.component");
var collectiontransportation_component_1 = require("./collectiontransportation/collectiontransportation.component");
var qualitycontrol_component_1 = require("./qualitycontrol/qualitycontrol.component");
var addnewcollection_component_1 = require("./addnewcollection/addnewcollection.component");
var select_1 = require("@angular/material/select");
var merchantlist_component_1 = require("./merchantlist/merchantlist.component");
var merchantdetails_component_1 = require("./merchantdetails/merchantdetails.component");
var merchantpurchases_component_1 = require("./merchantpurchases/merchantpurchases.component");
var paymentprocessing_module_1 = require("../paymentprocessing/paymentprocessing.module");
var payment_service_1 = require("../paymentprocessing/payment.service");
var vendorslist_component_1 = require("./vendorslist/vendorslist.component");
var vendorsdetails_component_1 = require("./vendorsdetails/vendorsdetails.component");
var vendorvehicles_component_1 = require("./vendorvehicles/vendorvehicles.component");
var default_module_1 = require("../default/default.module");
var auth_module_1 = require("../auth/auth.module");
var home_component_1 = require("../default/home/home.component");
var childRoutes = [
    { path: '', redirectTo: 'collections', pathMatch: "full" },
];
var routes = [{ path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'farmers', component: farmerlist_component_1.FarmerlistComponent },
    { path: 'collections', component: collectionlist_component_1.CollectionlistComponent, children: childRoutes },
    // { path: 'collections/addcollection', component: AddcollectionComponent },
    { path: 'collections/addcollection', component: addnewcollection_component_1.AddnewcollectionComponent },
    { path: 'collections/:id', component: collectiondetails_component_1.CollectiondetailsComponent },
    { path: 'collections/:id/edit', component: editcollection_component_1.EditcollectionComponent },
    { path: 'farmers', component: farmerlist_component_1.FarmerlistComponent },
    { path: 'vendors', component: vendorslist_component_1.VendorslistComponent },
    { path: 'merchant', component: merchantlist_component_1.MerchantlistComponent },
    { path: 'farmers/:id/profile', component: farmerdetails_component_1.FarmerdetailsComponent },
    { path: 'vendors/:id/vehicles', component: vendorvehicles_component_1.VendorvehiclesComponent },
    { path: 'farmers/:id', component: farmercollectiondetails_component_1.FarmercollectiondetailsComponent },
    { path: 'vendors/:id', component: vendorsdetails_component_1.VendorsdetailsComponent },
    { path: 'farmerbilling/:id', component: farmerbilling_component_1.FarmerbillingComponent },
    { path: 'collections/:id/transport', component: collectiontransportation_component_1.CollectiontransportationComponent },
    { path: 'collections/:id/qualitycontrol', component: qualitycontrol_component_1.QualitycontrolComponent },
    { path: 'merchant/:id', component: merchantdetails_component_1.MerchantdetailsComponent },
    { path: 'merchant/:id/merchantpurchases', component: merchantpurchases_component_1.MerchantpurchasesComponent },
];
var SpaModule = /** @class */ (function () {
    function SpaModule() {
    }
    SpaModule = __decorate([
        core_1.NgModule({
            declarations: [
                farmerlist_component_1.FarmerlistComponent,
                collectionlist_component_1.CollectionlistComponent,
                sparouter_component_1.SparouterComponent,
                addcollection_component_1.AddcollectionComponent,
                collectiondetails_component_1.CollectiondetailsComponent,
                editcollection_component_1.EditcollectionComponent,
                farmercollectiondetails_component_1.FarmercollectiondetailsComponent,
                farmerdetails_component_1.FarmerdetailsComponent,
                farmerbilling_component_1.FarmerbillingComponent,
                collectiontransportation_component_1.CollectiontransportationComponent,
                qualitycontrol_component_1.QualitycontrolComponent,
                addnewcollection_component_1.AddnewcollectionComponent,
                merchantlist_component_1.MerchantlistComponent,
                merchantdetails_component_1.MerchantdetailsComponent,
                merchantpurchases_component_1.MerchantpurchasesComponent,
                vendorslist_component_1.VendorslistComponent,
                vendorsdetails_component_1.VendorsdetailsComponent,
                vendorvehicles_component_1.VendorvehiclesComponent,
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forRoot(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                paymentprocessing_module_1.PaymentprocessingModule,
                default_module_1.DefaultModule,
                auth_module_1.AuthModule
            ],
            exports: [
                sparouter_component_1.SparouterComponent
            ],
            providers: [
                payment_service_1.PaymentService
            ]
        })
    ], SpaModule);
    return SpaModule;
}());
exports.SpaModule = SpaModule;
