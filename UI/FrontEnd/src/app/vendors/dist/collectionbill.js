"use strict";
exports.__esModule = true;
exports.Collectionbill = void 0;
var Collectionbill = /** @class */ (function () {
    function Collectionbill(billId, collectionId, labourCharges, amount, farmerName, billingDate, collectionDate) {
        this.billId = billId;
        this.collectionId = collectionId;
        this.labourCharges = labourCharges;
        this.amount = amount;
        this.farmerName = farmerName;
        this.billingDate = billingDate;
        this.collectionDate = collectionDate;
    }
    return Collectionbill;
}());
exports.Collectionbill = Collectionbill;
