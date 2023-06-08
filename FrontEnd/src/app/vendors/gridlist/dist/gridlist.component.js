"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GridlistComponent = void 0;
var core_1 = require("@angular/core");
var GridlistComponent = /** @class */ (function () {
    function GridlistComponent(svc) {
        this.svc = svc;
        this.collections = [];
    }
    GridlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.GetCollections().subscribe(function (collections) {
            _this.collections = collections.slice(0, 10);
            console.log(collections);
        });
    };
    GridlistComponent.prototype.viewCollection = function () {
        this.svc.GetCollections().subscribe(function (response) {
            console.log(response);
        });
    };
    GridlistComponent = __decorate([
        core_1.Component({
            selector: 'app-gridlist',
            templateUrl: './gridlist.component.html',
            styleUrls: ['./gridlist.component.css']
        })
    ], GridlistComponent);
    return GridlistComponent;
}());
exports.GridlistComponent = GridlistComponent;
