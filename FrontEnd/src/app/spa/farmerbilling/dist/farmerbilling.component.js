"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FarmerbillingComponent = void 0;
var core_1 = require("@angular/core");
var FarmerbillingComponent = /** @class */ (function () {
    function FarmerbillingComponent(svc, route, location) {
        this.svc = svc;
        this.route = route;
        this.location = location;
        this.farmerName = '',
            this.cropName = '',
            this.totalWeight = 0;
    }
    FarmerbillingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectionId = this.route.snapshot.paramMap.get('id');
        this.svc.getcollectionBill(this.collectionId).subscribe(function (response) {
            _this.billing = response;
            console.log(response);
        });
    };
    FarmerbillingComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input()
    ], FarmerbillingComponent.prototype, "farmerName");
    __decorate([
        core_1.Input()
    ], FarmerbillingComponent.prototype, "cropName");
    __decorate([
        core_1.Input()
    ], FarmerbillingComponent.prototype, "totalWeight");
    FarmerbillingComponent = __decorate([
        core_1.Component({
            selector: 'app-farmerbilling',
            templateUrl: './farmerbilling.component.html',
            styleUrls: ['./farmerbilling.component.css']
        })
    ], FarmerbillingComponent);
    return FarmerbillingComponent;
}());
exports.FarmerbillingComponent = FarmerbillingComponent;
