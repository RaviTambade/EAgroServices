"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VendorsdetailsComponent = void 0;
var core_1 = require("@angular/core");
var VendorsdetailsComponent = /** @class */ (function () {
    function VendorsdetailsComponent(svc, route, ser) {
        this.svc = svc;
        this.route = route;
        this.ser = ser;
    }
    VendorsdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transportId = this.route.snapshot.paramMap.get('id');
        this.svc.getVendor(this.transportId).subscribe(function (response) {
            _this.vendor = response;
            console.log(response);
        });
        this.vendorId = this.route.snapshot.paramMap.get('id');
        this.ser.getUserAddress(this.vendorId).subscribe(function (response) {
            _this.address = response;
            console.log(response);
        });
    };
    __decorate([
        core_1.Input()
    ], VendorsdetailsComponent.prototype, "vendor");
    VendorsdetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-vendorsdetails',
            templateUrl: './vendorsdetails.component.html',
            styleUrls: ['./vendorsdetails.component.css']
        })
    ], VendorsdetailsComponent);
    return VendorsdetailsComponent;
}());
exports.VendorsdetailsComponent = VendorsdetailsComponent;
