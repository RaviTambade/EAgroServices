"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListdetailsComponent = void 0;
var core_1 = require("@angular/core");
var ListdetailsComponent = /** @class */ (function () {
    function ListdetailsComponent(svc) {
        this.svc = svc;
        this.farmers = [];
        this.farmer = {
            id: 0,
            firstName: '',
            lastName: '',
            location: '',
            contactNumber: ''
        };
    }
    ListdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.GetFarmers().subscribe(function (farmers) {
            _this.farmers = farmers;
        });
    };
    ListdetailsComponent.prototype.onClick = function (farmerId) {
        var _this = this;
        this.svc.GetFarmer(farmerId).subscribe(function (response) {
            _this.selectedFarmer = response;
            console.log(response);
        });
    };
    ListdetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-listdetails',
            templateUrl: './listdetails.component.html',
            styleUrls: ['./listdetails.component.css']
        })
    ], ListdetailsComponent);
    return ListdetailsComponent;
}());
exports.ListdetailsComponent = ListdetailsComponent;
