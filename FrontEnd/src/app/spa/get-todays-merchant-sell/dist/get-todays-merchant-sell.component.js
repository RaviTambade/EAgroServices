"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetTodaysMerchantSellComponent = void 0;
var core_1 = require("@angular/core");
var GetTodaysMerchantSellComponent = /** @class */ (function () {
    function GetTodaysMerchantSellComponent(svc, route, router) {
        this.svc = svc;
        this.route = route;
        this.router = router;
    }
    GetTodaysMerchantSellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.merchantId = this.route.snapshot.paramMap.get('id');
        this.svc.getTodaysMerchantPurchases(this.merchantId).subscribe(function (response) {
            _this.merchantPurchases = response;
            console.log(response);
        });
    };
    GetTodaysMerchantSellComponent.prototype.onClick = function () {
        this.router.navigate(['/merchant', this.merchantId, 'details']);
    };
    GetTodaysMerchantSellComponent.prototype.purchaseHistory = function () {
        this.router.navigate(['/merchant', this.merchantId, 'merchantpurchases']);
    };
    GetTodaysMerchantSellComponent = __decorate([
        core_1.Component({
            selector: 'app-get-todays-merchant-sell',
            templateUrl: './get-todays-merchant-sell.component.html',
            styleUrls: ['./get-todays-merchant-sell.component.css']
        })
    ], GetTodaysMerchantSellComponent);
    return GetTodaysMerchantSellComponent;
}());
exports.GetTodaysMerchantSellComponent = GetTodaysMerchantSellComponent;
