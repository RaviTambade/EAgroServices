"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService(httpClient) {
        this.httpClient = httpClient;
    }
    AuthService.prototype.logIn = function (form) {
        var url = "http://localhost:5148/api/auth/authenticate/";
        return this.httpClient.post(url, form);
    };
    AuthService.prototype.registerFarmer = function (insertfarmerrequest) {
        var url = " http://localhost:5141/api/farmers/insert";
        return this.httpClient.post(url, insertfarmerrequest);
    };
    AuthService.prototype.registerMerchant = function (any) {
        var url = " http://localhost:5188/api/merchants/insert";
        return this.httpClient.post(url, form);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
