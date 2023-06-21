"use strict";
exports.__esModule = true;
exports.Payment = void 0;
var Payment = /** @class */ (function () {
    function Payment(id, transactionId, billId, date) {
        this.id = id;
        this.transactionId = transactionId;
        this.billId = billId;
        this.date = date;
    }
    return Payment;
}());
exports.Payment = Payment;
