"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterbycropComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FilterbycropComponent = /** @class */ (function () {
    function FilterbycropComponent(svc, route) {
        this.svc = svc;
        this.route = route;
        this.newCollection = new core_1.EventEmitter();
        this.form = new forms_1.FormGroup({
            crop: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    FilterbycropComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.farmerId = this.route.snapshot.paramMap.get("id");
        this.svc.getCrops().subscribe(function (response) {
            _this.crops = response;
            console.log(response);
        });
    };
    Object.defineProperty(FilterbycropComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    FilterbycropComponent.prototype.submit = function () {
        console.log(this.form.value);
    };
    FilterbycropComponent.prototype.changeCrop = function (crop) {
        var _this = this;
        console.log(crop.target.value);
        this.svc.getFarmerCollectionByCrop(this.farmerId, crop.target.value).subscribe(function (response) {
            console.log(response);
            _this.collectionViewModels = response;
            _this.newCollection.emit({ collectionViewModels: _this.collectionViewModels });
            console.log(_this.farmerId);
        });
    };
    FilterbycropComponent.prototype.resetSelection = function () {
        window.location.reload();
    };
    __decorate([
        core_1.Output()
    ], FilterbycropComponent.prototype, "newCollection");
    FilterbycropComponent = __decorate([
        core_1.Component({
            selector: 'app-filterbycrop',
            templateUrl: './filterbycrop.component.html',
            styleUrls: ['./filterbycrop.component.css']
        })
    ], FilterbycropComponent);
    return FilterbycropComponent;
}());
exports.FilterbycropComponent = FilterbycropComponent;
