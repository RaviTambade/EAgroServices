"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FarmerdetailsComponent = void 0;
var core_1 = require("@angular/core");
var FarmerdetailsComponent = /** @class */ (function () {
    function FarmerdetailsComponent(svc, route, ser) {
        this.svc = svc;
        this.route = route;
        this.ser = ser;
    }
    FarmerdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.farmerId = this.route.snapshot.paramMap.get('id');
        this.svc.getfarmer(this.farmerId).subscribe(function (response) {
            _this.farmer = response;
            console.log(response);
        });
    };
    FarmerdetailsComponent.prototype.UserAddress = function () {
        var _this = this;
        this.ser.getUserAddress(this.farmerId).subscribe(function (response) {
            _this.address = response;
            console.log(response);
        });
    };
    FarmerdetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-farmerdetails',
            templateUrl: './farmerdetails.component.html',
            styleUrls: ['./farmerdetails.component.css']
        })
    ], FarmerdetailsComponent);
    return FarmerdetailsComponent;
}());
exports.FarmerdetailsComponent = FarmerdetailsComponent;
