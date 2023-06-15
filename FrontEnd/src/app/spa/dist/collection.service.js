"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionService = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var CollectionService = /** @class */ (function () {
    function CollectionService(http) {
        this.http = http;
    }
    CollectionService.prototype.getCollections = function () {
        var datePipe = new common_1.DatePipe('en-US');
        var currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
        console.log(currentDate);
        var date = {
            "date": currentDate
        };
        var url = "http://localhost:5031/api/collections/getall";
        return this.http.post(url, date);
    };
    CollectionService.prototype.getCollection = function (id) {
        var url = "http://localhost:5031/api/collections/" + id;
        return this.http.get(url);
    };
    CollectionService.prototype.editCollection = function (id, collection) {
        console.log("service called");
        var url = "http://localhost:5031/api/collections/" + id;
        return this.http.put(url, collection);
    };
    CollectionService.prototype.getfarmers = function () {
        var url = "http://localhost:5141/api/farmers";
        return this.http.get(url);
    };
    CollectionService.prototype.getfarmer = function (farmerId) {
        var url = "http://localhost:5141/api/farmers/" + farmerId;
        return this.http.get(url);
    };
    CollectionService.prototype.getCollectionByFarmer = function (farmerId) {
        var url = "http://localhost:5141/api/farmers/collections/" + farmerId;
        return this.http.get(url);
    };
    CollectionService.prototype.getcollectionBill = function (collectionid) {
        var url = "http://localhost:5031/api/collections/" + collectionid + "/billing";
        return this.http.get(url);
    };
    CollectionService.prototype.collectiontransportation = function (collectionid) {
        var url = "http://localhost:5031/api/collections/" + collectionid + "/sell";
        return this.http.get(url);
    };
    CollectionService.prototype.insertBillDetails = function (sellbill) {
        console.log("fuc called");
        console.log(sellbill);
        var url = "http://localhost:5182/api/sells";
        return this.http.post(url, sellbill);
    };
    CollectionService.prototype.addCollection = function (collection) {
        var url = "http://localhost:5031/api/collections";
        return this.http.post(url, collection);
    };
    CollectionService.prototype.getCrops = function () {
        var url = " http://localhost:5224/api/crops";
        return this.http.get(url);
    };
    CollectionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CollectionService);
    return CollectionService;
}());
exports.CollectionService = CollectionService;
