"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddnewcollectionComponent = void 0;
var core_1 = require("@angular/core");
var AddnewcollectionComponent = /** @class */ (function () {
    function AddnewcollectionComponent(addSvc, collSvc, router) {
        this.addSvc = addSvc;
        this.collSvc = collSvc;
        this.router = router;
        this.address = {
            state: '',
            district: '',
            tahsil: '',
            village: ''
        };
        this.collection = {
            farmerId: 0,
            cropId: 0,
            containerType: '',
            quantity: 0,
            totalWeight: 0,
            tareWeight: 0
        };
    }
    AddnewcollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addSvc.getStates().subscribe(function (response) {
            _this.states = response;
        });
        this.collSvc.getCrops().subscribe(function (response) {
            _this.crops = response;
        });
    };
    AddnewcollectionComponent.prototype.onStateSelected = function () {
        var _this = this;
        this.addSvc.getDistricts(this.address.state).subscribe(function (response) {
            _this.districts = response;
        });
    };
    AddnewcollectionComponent.prototype.onDistrictSelected = function () {
        var _this = this;
        this.addSvc.getTahsils(this.address.district).subscribe(function (response) {
            _this.tahsils = response;
        });
    };
    AddnewcollectionComponent.prototype.onTahsilSelected = function () {
        var _this = this;
        this.addSvc.getVillages(this.address.tahsil).subscribe(function (response) {
            _this.villages = response;
        });
    };
    AddnewcollectionComponent.prototype.loadFarmers = function () {
        var _this = this;
        this.addSvc.getSelectedFarmers(this.address).subscribe(function (response) {
            _this.farmers = response;
            console.log(_this.address);
            console.log(response);
        });
    };
    AddnewcollectionComponent.prototype.addCollection = function () {
        var _this = this;
        this.collSvc.addCollection(this.collection).subscribe(function (response) {
            _this.status = response;
            console.log(response);
            if (response) {
                alert('Collection added successfully');
                _this.router.navigate(['/collections']);
            }
            else {
                alert('Check the form again....');
            }
        });
    };
    AddnewcollectionComponent = __decorate([
        core_1.Component({
            selector: 'app-addnewcollection',
            templateUrl: './addnewcollection.component.html',
            styleUrls: ['./addnewcollection.component.css']
        })
    ], AddnewcollectionComponent);
    return AddnewcollectionComponent;
}());
exports.AddnewcollectionComponent = AddnewcollectionComponent;
