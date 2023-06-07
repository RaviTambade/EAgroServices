"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VendorvehiclesComponent = void 0;
var core_1 = require("@angular/core");
var VendorvehiclesComponent = /** @class */ (function () {
    function VendorvehiclesComponent(svc) {
        this.svc = svc;
        this.vehicle = {
            id: 0,
            vendorId: 0,
            vehicleNumber: ''
        };
        this.insertStatus = false;
    }
    VendorvehiclesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.getVendors().subscribe(function (response) {
            _this.vendors = response;
            console.log(_this.vendors);
        });
    };
    VendorvehiclesComponent.prototype.onselect = function (vendor) {
        var _this = this;
        this.selectedVendor = vendor;
        this.svc.getVendorVehicles(vendor.id).subscribe(function (response) {
            _this.vehicles = response;
            console.log(_this.vehicles);
        });
    };
    VendorvehiclesComponent.prototype.onInsertClick = function () {
        this.insertStatus = true;
    };
    VendorvehiclesComponent.prototype.addVehicle = function (vendor) {
        this.svc.addVehicle(vendor.id, this.vehicle).subscribe(function (response) {
            console.log(response);
        });
    };
    VendorvehiclesComponent = __decorate([
        core_1.Component({
            selector: 'app-vendorvehicles',
            templateUrl: './vendorvehicles.component.html',
            styleUrls: ['./vendorvehicles.component.css']
        })
    ], VendorvehiclesComponent);
    return VendorvehiclesComponent;
}());
exports.VendorvehiclesComponent = VendorvehiclesComponent;
