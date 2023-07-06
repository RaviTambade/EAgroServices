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
    function AuthService(httpClient, jwtHelper) {
        this.httpClient = httpClient;
        this.jwtHelper = jwtHelper;
    }
    AuthService.prototype.logIn = function (user) {
        console.log("inside request");
        var url = "http://localhost:5148/api/auth";
        return this.httpClient.post(url, user);
    };
    AuthService.prototype.getRoleFromToken = function () {
        var token = localStorage.getItem('jwtToken');
        if (token) {
            var decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.role;
        }
        return '';
    };
    AuthService.prototype.getUserIdFromToken = function () {
        var token = localStorage.getItem('jwtToken');
        var decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.userId;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
