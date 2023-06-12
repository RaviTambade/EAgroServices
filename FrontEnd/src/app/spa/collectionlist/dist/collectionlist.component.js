"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionlistComponent = void 0;
var core_1 = require("@angular/core");
var CollectionlistComponent = /** @class */ (function () {
    function CollectionlistComponent(svc, router, route) {
        this.svc = svc;
        this.router = router;
        this.route = route;
    }
    CollectionlistComponent.prototype.ngOnInit = function () {
        this.collections = this.svc.getCollections();
    };
    CollectionlistComponent.prototype.OnClickCollection = function (id) {
        this.router.navigate(['./', id], { relativeTo: this.route });
    };
    CollectionlistComponent = __decorate([
        core_1.Component({
            selector: 'app-collectionlist',
            templateUrl: './collectionlist.component.html',
            styleUrls: ['./collectionlist.component.css']
        })
    ], CollectionlistComponent);
    return CollectionlistComponent;
}());
exports.CollectionlistComponent = CollectionlistComponent;
