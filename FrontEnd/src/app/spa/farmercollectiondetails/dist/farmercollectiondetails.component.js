"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FarmercollectiondetailsComponent = void 0;
var core_1 = require("@angular/core");
var FarmercollectiondetailsComponent = /** @class */ (function () {
    function FarmercollectiondetailsComponent(svc, route, router) {
        this.svc = svc;
        this.route = route;
        this.router = router;
        this.currentPage = 0;
        this.arrLenght = 0;
    }
    FarmercollectiondetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.farmerId = this.route.snapshot.paramMap.get('id');
        this.svc.getCollectionByFarmer(this.farmerId).subscribe(function (response) {
            _this.collectionViewModels = response;
            console.log(response);
        });
    };
    Object.defineProperty(FarmercollectiondetailsComponent.prototype, "getdetails", {
        get: function () {
            var startindex = this.currentPage * 5;
            var endindex = startindex + 5;
            return this.collectionViewModels.slice(startindex, endindex);
        },
        enumerable: false,
        configurable: true
    });
    FarmercollectiondetailsComponent.prototype.showDetails = function (id) {
        this.router.navigate(['/collections', id], { relativeTo: this.route });
    };
    FarmercollectiondetailsComponent.prototype.next = function () {
        this.currentPage++;
    };
    FarmercollectiondetailsComponent.prototype.hasNextPage = function () {
        var totalpages = Math.trunc(this.arrLenght / 5);
        console.log("🚀 ~ hasnextPage ~ totalpages:", totalpages);
        if (this.arrLenght % 5 == 0) {
            return this.currentPage < totalpages - 1;
        }
        if (this.currentPage < totalpages) {
            return true;
        }
        return false;
    };
    FarmercollectiondetailsComponent.prototype.hasPreviousPage = function () {
        return this.currentPage != 0;
    };
    FarmercollectiondetailsComponent.prototype.previous = function () {
        this.currentPage--;
    };
    FarmercollectiondetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-farmercollectiondetails',
            templateUrl: './farmercollectiondetails.component.html',
            styleUrls: ['./farmercollectiondetails.component.css']
        })
    ], FarmercollectiondetailsComponent);
    return FarmercollectiondetailsComponent;
}());
exports.FarmercollectiondetailsComponent = FarmercollectiondetailsComponent;
