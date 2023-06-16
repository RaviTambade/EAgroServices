"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddressService = void 0;
var core_1 = require("@angular/core");
var AddressService = /** @class */ (function () {
    function AddressService(httpClient) {
        this.httpClient = httpClient;
        this.districts = [];
    }
    AddressService.prototype.getSelectedFarmers = function (address) {
        var url = "http://localhost:5141/api/farmers/byaddress";
        return this.httpClient.post(url, address);
    };
    AddressService.prototype.getStates = function () {
        var url = " http://localhost:5176/api/addresses/states";
        return this.httpClient.get(url);
    };
    AddressService.prototype.getDistricts = function (state) {
        var url = " http://localhost:5176/api/addresses/getdistricts/" + state;
        return this.httpClient.get(url);
    };
    AddressService.prototype.getTahsils = function (district) {
        var url = " http://localhost:5176/api/addresses/gettahsils/" + district;
        return this.httpClient.get(url);
    };
    AddressService.prototype.getVillages = function (tahsil) {
        var url = " http://localhost:5176/api/addresses/getvillages/" + tahsil;
        return this.httpClient.get(url);
    };
    AddressService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AddressService);
    return AddressService;
}());
exports.AddressService = AddressService;
