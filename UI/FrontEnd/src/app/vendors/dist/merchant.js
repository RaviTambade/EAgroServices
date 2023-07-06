"use strict";
exports.__esModule = true;
exports.Merchant = void 0;
var Merchant = /** @class */ (function () {
    function Merchant(id, firstName, lastName, contactNumber, aadharId, imageUrl) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.aadharId = aadharId;
        this.imageUrl = imageUrl;
    }
    return Merchant;
}());
exports.Merchant = Merchant;
