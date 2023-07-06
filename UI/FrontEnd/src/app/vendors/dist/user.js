"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, firstName, lastName, contactNumber, aadharId, imageUrl, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.aadharId = aadharId;
        this.imageUrl = imageUrl;
        this.password = password;
    }
    return User;
}());
exports.User = User;
