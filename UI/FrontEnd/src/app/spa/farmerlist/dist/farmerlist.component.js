"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FarmerlistComponent = void 0;
var core_1 = require("@angular/core");
var FarmerlistComponent = /** @class */ (function () {
    function FarmerlistComponent(svc, router, route) {
        this.svc = svc;
        this.router = router;
        this.route = route;
    }
    FarmerlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.getfarmers().subscribe(function (response) {
            _this.farmers = response;
            console.log(response);
        });
    };
    FarmerlistComponent.prototype.onClick = function (id) {
        this.router.navigate(['./', id], { relativeTo: this.route });
    };
    FarmerlistComponent.prototype.onClickProfile = function (id) {
        this.router.navigate(['farmers/', id, 'profile']);
    };
    FarmerlistComponent = __decorate([
        core_1.Component({
            selector: 'app-farmerlist',
            templateUrl: './farmerlist.component.html',
            styleUrls: ['./farmerlist.component.css']
        })
    ], FarmerlistComponent);
    return FarmerlistComponent;
}());
exports.FarmerlistComponent = FarmerlistComponent;
