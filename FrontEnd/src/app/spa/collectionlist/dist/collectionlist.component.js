"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionlistComponent = void 0;
var core_1 = require("@angular/core");
var CollectionlistComponent = /** @class */ (function () {
    function CollectionlistComponent(svc, router, route) {
        this.svc = svc;
        this.router = router;
        this.route = route;
        this.collections = [];
    }
    CollectionlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.getCollections().subscribe(function (res) {
            _this.collections = res;
            console.log(_this.collections);
        });
    };
    CollectionlistComponent.prototype.OnClickCollection = function (id) {
        this.router.navigate(['./', id], { relativeTo: this.route });
    };
    CollectionlistComponent.prototype.transport = function (id) {
        this.router.navigate(['./', id, 'transport'], { relativeTo: this.route });
    };
    CollectionlistComponent.prototype.OnClickQualityControl = function (id) {
        this.router.navigate(['./', id, 'qualitycontrol'], { relativeTo: this.route });
    };
    CollectionlistComponent.prototype.getQuantity = function () {
        var quantity = 0;
        for (var _i = 0, _a = this.collections; _i < _a.length; _i++) {
            var row = _a[_i];
            quantity += row.collection.quantity;
        }
        return quantity;
    };
    CollectionlistComponent.prototype.getQuantityofBags = function () {
        var quantity1 = 0;
        for (var _i = 0, _a = this.collections; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.collection.containerType == 'bags') {
                quantity1 += row.collection.quantity;
            }
        }
        return quantity1;
    };
    CollectionlistComponent.prototype.getQuantityofCrates = function () {
        var quantity2 = 0;
        for (var _i = 0, _a = this.collections; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.collection.containerType == 'crates') {
                quantity2 += row.collection.quantity;
            }
        }
        return quantity2;
    };
    CollectionlistComponent.prototype.getQuantityofLenoBags = function () {
        var quantity3 = 0;
        for (var _i = 0, _a = this.collections; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.collection.containerType == 'lenobags') {
                quantity3 += row.collection.quantity;
            }
        }
        return quantity3;
    };
    CollectionlistComponent = __decorate([
        core_1.Component({
            selector: 'app-collectionlist',
            templateUrl: './collectionlist.component.html',
            styleUrls: ['./collectionlist.component.css']
        })
    ], CollectionlistComponent);
    return CollectionlistComponent;
}());
exports.CollectionlistComponent = CollectionlistComponent;
