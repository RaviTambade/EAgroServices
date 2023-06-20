"use strict";
exports.__esModule = true;
exports.MerchantPurchase = void 0;
var MerchantPurchase = /** @class */ (function () {
    function MerchantPurchase(ratePerKg, netWeight, containerType, grade, quantity, vehicleNumber, date, cropName) {
        this.ratePerKg = ratePerKg;
        this.netWeight = netWeight;
        this.containerType = containerType;
        this.grade = grade;
        this.quantity = quantity;
        this.vehicleNumber = vehicleNumber;
        this.date = date;
        this.cropName = cropName;
    }
    return MerchantPurchase;
}());
exports.MerchantPurchase = MerchantPurchase;
