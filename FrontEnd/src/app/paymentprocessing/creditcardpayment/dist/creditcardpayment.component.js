"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreditcardpaymentComponent = void 0;
var core_1 = require("@angular/core");
var CreditcardpaymentComponent = /** @class */ (function () {
    function CreditcardpaymentComponent(svc) {
        this.svc = svc;
        this.payment = {
            billId: 64
        },
            this.cardPayment = {
                accountId: 2,
                cardNumber: "8778565645457878",
                amount: 40000
            };
        this.creditCardPayment =
            {
                payment: this.payment,
                cardPayment: this.cardPayment
            };
    }
    CreditcardpaymentComponent.prototype.ngOnInit = function () {
    };
    CreditcardpaymentComponent.prototype.Pay = function () {
        var _this = this;
        this.svc.checkBill(this.payment.billId).subscribe(function (response) {
            console.log(_this.payment.billId);
            console.log("checked");
            if (response) {
                alert("payment already done...");
            }
            else {
                _this.svc.payWithCard(_this.creditCardPayment).subscribe(function (response) {
                    console.log(_this.creditCardPayment);
                    console.log("---");
                    console.log(response);
                    return _this.status = response;
                });
            }
        });
    };
    CreditcardpaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-creditcardpayment',
            templateUrl: './creditcardpayment.component.html',
            styleUrls: ['./creditcardpayment.component.css']
        })
    ], CreditcardpaymentComponent);
    return CreditcardpaymentComponent;
}());
exports.CreditcardpaymentComponent = CreditcardpaymentComponent;
