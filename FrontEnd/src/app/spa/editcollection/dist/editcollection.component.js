"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditcollectionComponent = void 0;
var core_1 = require("@angular/core");
var EditcollectionComponent = /** @class */ (function () {
    function EditcollectionComponent(route, svc) {
        this.route = route;
        this.svc = svc;
    }
    EditcollectionComponent.prototype.ngOnInit = function () {
        this.collectionId = this.route.snapshot.paramMap.get('id');
    };
    EditcollectionComponent.prototype.edit = function () {
        var _this = this;
        console.log("edit called");
        this.farmer = this.getFarmerByName(this.collectionViewModel.farmerName);
        this.crop = this.getCropByName(this.collectionViewModel.cropName);
        if (this.farmer && this.crop) {
            this.collectionViewModel.collection.farmerId = this.farmer.id;
            this.collectionViewModel.collection.cropId = this.crop.id;
        }
        this.svc.editCollection(this.collectionId, this.collectionViewModel).subscribe(function (response) {
            _this.status = response;
            console.log(response);
        });
    };
    EditcollectionComponent.prototype.getFarmerByName = function (farmerName) {
        var farmer = this.farmers.find(function (f) { return (f.firstName + ' ' + f.lastName) === farmerName; });
        return farmer;
    };
    EditcollectionComponent.prototype.getCropByName = function (cropName) {
        var crop = this.crops.find(function (c) { return c.cropName == cropName; });
        return crop;
    };
    EditcollectionComponent.prototype.receiveCollection = function ($event) {
        this.collectionViewModel = $event.collectionViewModel;
        this.collectionViewModel.collection.farmerId = $event.farmerId;
        this.collectionViewModel.collection.cropId = $event.cropId;
    };
    EditcollectionComponent = __decorate([
        core_1.Component({
            selector: 'app-editcollection',
            templateUrl: './editcollection.component.html',
            styleUrls: ['./editcollection.component.css']
        })
    ], EditcollectionComponent);
    return EditcollectionComponent;
}());
exports.EditcollectionComponent = EditcollectionComponent;
