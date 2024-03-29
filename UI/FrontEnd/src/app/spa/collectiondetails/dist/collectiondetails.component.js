"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectiondetailsComponent = void 0;
var core_1 = require("@angular/core");
var CollectiondetailsComponent = /** @class */ (function () {
    function CollectiondetailsComponent(route, svc, router) {
        this.route = route;
        this.svc = svc;
        this.router = router;
        this.sendCollection = new core_1.EventEmitter();
    }
    CollectiondetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectionId = this.route.snapshot.paramMap.get('id');
        this.svc.getCollection(this.collectionId).subscribe(function (response) {
            _this.collectionViewModel = response;
            _this.sendCollection.emit({ collection: _this.collectionViewModel.collection });
            console.log(response);
        });
    };
    CollectiondetailsComponent.prototype.showBill = function (id) {
        this.router.navigate(['/farmerbilling', id], { relativeTo: this.route });
    };
    CollectiondetailsComponent.prototype.onClick = function (id) {
        this.router.navigate(['/farmers', id]);
    };
    __decorate([
        core_1.Output()
    ], CollectiondetailsComponent.prototype, "sendCollection");
    __decorate([
        core_1.Input()
    ], CollectiondetailsComponent.prototype, "collectionId");
    CollectiondetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-collectiondetails',
            templateUrl: './collectiondetails.component.html',
            styleUrls: ['./collectiondetails.component.css']
        })
    ], CollectiondetailsComponent);
    return CollectiondetailsComponent;
}());
exports.CollectiondetailsComponent = CollectiondetailsComponent;
