"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginationComponent = void 0;
var core_1 = require("@angular/core");
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.items = ["abh", "ay", "yui", "ioi", "yui", "uio", "uio", "opo", "hjh", "yuy", "etrty", "uio", "opo", "hjh", "yuy", "etrty"];
        this.currentPage = 0;
        this.arrLenght = 0;
        this.arrLenght = this.items.length;
    }
    Object.defineProperty(PaginationComponent.prototype, "getItems", {
        get: function () {
            var startindex = this.currentPage * 5;
            var endindex = startindex + 5;
            return this.items.slice(startindex, endindex);
        },
        enumerable: false,
        configurable: true
    });
    PaginationComponent.prototype.next = function () {
        // if(this.currentPage >= this.arrLenght )
        this.currentPage++;
    };
    PaginationComponent.prototype.previous = function () {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    };
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'app-pagination',
            templateUrl: './pagination.component.html',
            styleUrls: ['./pagination.component.css']
        })
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
