"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentService = void 0;
var core_1 = require("@angular/core");
var PaymentService = /** @class */ (function () {
    function PaymentService(httpClient) {
        this.httpClient = httpClient;
    }
    PaymentService.prototype.payWithCard = function (creditCardPayment) {
        console.log("service called");
        var url = " http://localhost:5004/api/payments";
        return this.httpClient.post(url, creditCardPayment);
    };
    PaymentService.prototype.checkBill = function (billId) {
        var url = " http://localhost:5004/api/payments/" + billId + "/checkbill";
        return this.httpClient.get(url);
    };
    PaymentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PaymentService);
    return PaymentService;
}());
exports.PaymentService = PaymentService;
