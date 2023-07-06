"use strict";
exports.__esModule = true;
exports.MerchantPurchase = void 0;
var MerchantPurchase = /** @class */ (function () {
    function MerchantPurchase(ratePerKg, netWeight, containerImage, grade, quantity, vehicleNumber, date, cropImage, collectionId, sellId) {
        this.ratePerKg = ratePerKg;
        this.netWeight = netWeight;
        this.containerImage = containerImage;
        this.grade = grade;
        this.quantity = quantity;
        this.vehicleNumber = vehicleNumber;
        this.date = date;
        this.cropImage = cropImage;
        this.collectionId = collectionId;
        this.sellId = sellId;
    }
    return MerchantPurchase;
}());
exports.MerchantPurchase = MerchantPurchase;
