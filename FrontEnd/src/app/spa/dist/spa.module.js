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
var login_component_1 = require("./login/login.component");
var farmerlist_component_1 = require("./farmerlist/farmerlist.component");
var collectionlist_component_1 = require("./collectionlist/collectionlist.component");
var vendorlist_component_1 = require("./vendorlist/vendorlist.component");
var home_component_1 = require("./home/home.component");
var router_1 = require("@angular/router");
var sparouter_component_1 = require("./sparouter/sparouter.component");
var addcollection_component_1 = require("./addcollection/addcollection.component");
var collectiondetails_component_1 = require("./collectiondetails/collectiondetails.component");
var editcollection_component_1 = require("./editcollection/editcollection.component");
var forms_1 = require("@angular/forms");
var farmercollectiondetails_component_1 = require("./farmercollectiondetails/farmercollectiondetails.component");
var childRoutes = [
    { path: '', redirectTo: 'collections', pathMatch: "full" },
    { path: 'addcollection', component: addcollection_component_1.AddcollectionComponent },
];
var routes = [{ path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'farmers', component: farmerlist_component_1.FarmerlistComponent },
    { path: 'vendors', component: vendorlist_component_1.VendorlistComponent },
    { path: 'collections', component: collectionlist_component_1.CollectionlistComponent, children: childRoutes },
    { path: 'collections/:id', component: collectiondetails_component_1.CollectiondetailsComponent },
    { path: 'collections/:id/edit', component: editcollection_component_1.EditcollectionComponent },
    { path: 'farmers', component: farmerlist_component_1.FarmerlistComponent },
    { path: 'farmers/:id', component: farmercollectiondetails_component_1.FarmercollectiondetailsComponent },
];
var SpaModule = /** @class */ (function () {
    function SpaModule() {
    }
    SpaModule = __decorate([
        core_1.NgModule({
            declarations: [
                login_component_1.LoginComponent,
                farmerlist_component_1.FarmerlistComponent,
                collectionlist_component_1.CollectionlistComponent,
                vendorlist_component_1.VendorlistComponent,
                home_component_1.HomeComponent,
                sparouter_component_1.SparouterComponent,
                addcollection_component_1.AddcollectionComponent,
                collectiondetails_component_1.CollectiondetailsComponent,
                editcollection_component_1.EditcollectionComponent,
                farmercollectiondetails_component_1.FarmercollectiondetailsComponent,
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forRoot(routes),
                forms_1.FormsModule
            ],
            exports: [
                home_component_1.HomeComponent,
                sparouter_component_1.SparouterComponent
            ]
        })
    ], SpaModule);
    return SpaModule;
}());
exports.SpaModule = SpaModule;
