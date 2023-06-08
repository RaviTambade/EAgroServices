"use strict";
exports.__esModule = true;
exports.Collection = void 0;
var Collection = /** @class */ (function () {
    function Collection(id, farmerId, cropId, containerType, quantity, grade, totalWeight, tareWeight, netWeight, ratePerKg, amount, date) {
        this.id = id;
        this.farmerId = farmerId;
        this.cropId = cropId;
        this.containerType = containerType;
        this.quantity = quantity;
        this.grade = grade;
        this.totalWeight = totalWeight;
        this.tareWeight = tareWeight;
        this.netWeight = netWeight;
        this.ratePerKg = ratePerKg;
        this.amount = amount;
        this.date = date;
    }
    return Collection;
}());
exports.Collection = Collection;
