"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VendorService = void 0;
var core_1 = require("@angular/core");
var VendorService = /** @class */ (function () {
    function VendorService(httpClient) {
        this.httpClient = httpClient;
    }
    VendorService.prototype.getVendors = function () {
        var url = "http://localhost:5240/api/vendors";
        return this.httpClient.get(url);
    };
    VendorService.prototype.getVendorVehicles = function (id) {
        var url = "http://localhost:5240/api/vendors/" + id + "/vehicles";
        return this.httpClient.get(url, id);
    };
    VendorService.prototype.addVehicle = function (vendorId, vehicle) {
        var url = "http://localhost:5240/api/vehicles/" + vendorId;
        return this.httpClient.post(url, vehicle);
    };
    VendorService.prototype.updateVendor = function (vendorId, vendor) {
        var url = "http://localhost:5240/api/vendors/" + vendorId;
        return this.httpClient.put(url, vendor);
    };
    VendorService.prototype.DeleteVendor = function (vendorId) {
        var url = "http://localhost:5240/api/vendors/" + vendorId;
        return this.httpClient["delete"](url);
    };
    VendorService.prototype.GetCollections = function () {
        var url = "http://localhost:5031/api/collections";
        return this.httpClient.get(url);
    };
    VendorService.prototype.GetCollection = function (collectionId) {
        var url = "http://localhost:5031/api/collections/" + collectionId;
        return this.httpClient.get(url);
    };
    VendorService.prototype.UpdateCollection = function (collectionId, collection) {
        var url = "http://localhost:5031/api/collections/" + collectionId;
        return this.httpClient.put(url, collection);
    };
    VendorService.prototype.DeleteCollection = function (collectionId) {
        var url = "http://localhost:5031/api/collections/" + collectionId;
        return this.httpClient["delete"](url);
    };
    VendorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VendorService);
    return VendorService;
}());
exports.VendorService = VendorService;
