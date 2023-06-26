"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterbydateComponent = void 0;
var core_1 = require("@angular/core");
var FilterbydateComponent = /** @class */ (function () {
    function FilterbydateComponent(route, svc) {
        this.route = route;
        this.svc = svc;
        this.dateFilter = {
            fromDate: '',
            toDate: ''
        };
        this.newCollection = new core_1.EventEmitter();
    }
    FilterbydateComponent.prototype.ngOnInit = function () {
        this.farmerId = this.route.snapshot.paramMap.get("id");
    };
    FilterbydateComponent.prototype.onClick = function () {
        var _this = this;
        this.svc.getFarmerCollectionByDate(this.farmerId, this.dateFilter).subscribe(function (response) {
            _this.collectionViewModels = response;
            _this.newCollection.emit({ collectionViewModels: _this.collectionViewModels });
        });
    };
    __decorate([
        core_1.Output()
    ], FilterbydateComponent.prototype, "newCollection");
    FilterbydateComponent = __decorate([
        core_1.Component({
            selector: 'app-filterbydate',
            templateUrl: './filterbydate.component.html',
            styleUrls: ['./filterbydate.component.css']
        })
    ], FilterbydateComponent);
    return FilterbydateComponent;
}());
exports.FilterbydateComponent = FilterbydateComponent;
