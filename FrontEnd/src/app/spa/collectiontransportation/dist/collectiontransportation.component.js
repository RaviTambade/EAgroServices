"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectiontransportationComponent = void 0;
var core_1 = require("@angular/core");
var CollectiontransportationComponent = /** @class */ (function () {
    function CollectiontransportationComponent(svc, route) {
        this.svc = svc;
        this.route = route;
        this.sellBill = {
            sell: {
                collectionId: 0,
                merchantId: 0,
                vehicleId: 0,
                quantity: 0,
                netWeight: 0,
                ratePerKg: 0
            },
            freightRate: {
                fromDestination: '',
                toDestination: '',
                kilometers: 0,
                ratePerKm: 0
            }
        };
    }
    CollectiontransportationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectionId = this.route.snapshot.paramMap.get('id');
        this.svc.collectiontransportation(this.collectionId).subscribe(function (response) {
            _this.sellview = response;
            console.log(response);
        });
        this.svc.getMerchants().subscribe(function (response) {
            _this.merchants = response;
        });
        this.svc.getVehicles().subscribe(function (response) {
            _this.vehicles = response;
        });
    };
    CollectiontransportationComponent.prototype.insert = function () {
        this.sellBill.sell.collectionId = this.collectionId;
        console.log(this.sellBill);
        this.svc.insertBillDetails(this.sellBill).subscribe(function (response) {
            console.log(response);
        });
    };
    CollectiontransportationComponent.prototype.receiveCollection = function ($event) {
        this.collectionViewModel = $event.collectionViewModel;
    };
    CollectiontransportationComponent = __decorate([
        core_1.Component({
            selector: 'app-collectiontransportation',
            templateUrl: './collectiontransportation.component.html',
            styleUrls: ['./collectiontransportation.component.css']
        })
    ], CollectiontransportationComponent);
    return CollectiontransportationComponent;
}());
exports.CollectiontransportationComponent = CollectiontransportationComponent;
