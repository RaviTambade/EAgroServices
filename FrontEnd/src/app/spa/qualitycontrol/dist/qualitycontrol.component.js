"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QualitycontrolComponent = void 0;
var core_1 = require("@angular/core");
var QualitycontrolComponent = /** @class */ (function () {
    function QualitycontrolComponent(svc, route) {
        this.svc = svc;
        this.route = route;
    }
    QualitycontrolComponent.prototype.ngOnInit = function () {
        this.collectionId = this.route.snapshot.paramMap.get('id');
    };
    QualitycontrolComponent.prototype.updateCollection = function () {
        console.log("🚀 ", this.collection);
        this.svc.editCollection(this.collectionId, this.collection).subscribe(function (response) {
            console.log(response);
        });
    };
    QualitycontrolComponent.prototype.receiveCollection = function (event) {
        this.collection = event.collection;
        console.log("🚀 ~ receiveCollection ~ this.collection:", this.collection);
    };
    QualitycontrolComponent = __decorate([
        core_1.Component({
            selector: 'app-qualitycontrol',
            templateUrl: './qualitycontrol.component.html',
            styleUrls: ['./qualitycontrol.component.css']
        })
    ], QualitycontrolComponent);
    return QualitycontrolComponent;
}());
exports.QualitycontrolComponent = QualitycontrolComponent;
