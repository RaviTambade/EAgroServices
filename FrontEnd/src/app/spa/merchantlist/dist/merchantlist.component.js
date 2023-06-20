"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MerchantlistComponent = void 0;
var core_1 = require("@angular/core");
var MerchantlistComponent = /** @class */ (function () {
    function MerchantlistComponent(svc, router, route) {
        this.svc = svc;
        this.router = router;
        this.route = route;
    }
    MerchantlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.getMerchants().subscribe(function (response) {
            _this.merchants = response;
            console.log(response);
        });
    };
    // onClick(id: number) {
    //   this.router.navigate(['./', id], { relativeTo: this.route });
    // }
    MerchantlistComponent.prototype.onClickProfile = function (id) {
        this.router.navigate(['./', id], { relativeTo: this.route });
    };
    MerchantlistComponent.prototype.onClick = function (id) {
        this.router.navigate(['./', id, 'merchantpurchases'], { relativeTo: this.route });
    };
    MerchantlistComponent = __decorate([
        core_1.Component({
            selector: 'app-merchantlist',
            templateUrl: './merchantlist.component.html',
            styleUrls: ['./merchantlist.component.css']
        })
    ], MerchantlistComponent);
    return MerchantlistComponent;
}());
exports.MerchantlistComponent = MerchantlistComponent;
