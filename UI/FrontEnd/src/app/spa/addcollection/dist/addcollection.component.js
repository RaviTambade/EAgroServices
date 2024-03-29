"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddcollectionComponent = void 0;
var core_1 = require("@angular/core");
var AddcollectionComponent = /** @class */ (function () {
    function AddcollectionComponent(svc, router) {
        this.svc = svc;
        this.router = router;
        this.collection = {
            farmerId: 0,
            cropId: 0,
            containerType: '',
            quantity: 0,
            totalWeight: 0,
            tareWeight: 0
        };
    }
    AddcollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.getfarmers().subscribe(function (response) {
            _this.farmers = response;
            console.log(response);
        });
        this.svc.getCrops().subscribe(function (response) {
            _this.crops = response;
            console.log(response);
        });
    };
    AddcollectionComponent.prototype.addCollection = function () {
        var _this = this;
        this.svc.addCollection(this.collection).subscribe(function (response) {
            _this.status = response;
            console.log(response);
            if (response) {
                alert("Collection added successfully");
                _this.router.navigate(['/collections']);
            }
            else {
                alert("Check the form again ....");
            }
        });
    };
    AddcollectionComponent = __decorate([
        core_1.Component({
            selector: 'app-addcollection',
            templateUrl: './addcollection.component.html',
            styleUrls: ['./addcollection.component.css']
        })
    ], AddcollectionComponent);
    return AddcollectionComponent;
}());
exports.AddcollectionComponent = AddcollectionComponent;
