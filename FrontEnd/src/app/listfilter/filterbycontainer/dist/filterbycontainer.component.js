"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterbycontainerComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FilterbycontainerComponent = /** @class */ (function () {
    function FilterbycontainerComponent(svc) {
        this.svc = svc;
        this.newCollection = new core_1.EventEmitter();
        this.form = new forms_1.FormGroup({
            containerType: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.collectionViewModel = { collection: { farmerId: 3, containerType: '' } };
        this.farmerId = this.collectionViewModel.collection.farmerId,
            this.container = this.collectionViewModel.collection.containerType;
    }
    Object.defineProperty(FilterbycontainerComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    FilterbycontainerComponent.prototype.submit = function () {
        console.log(this.form.value);
    };
    FilterbycontainerComponent.prototype.changeContainer = function (container) {
        var _this = this;
        console.log(container.target.value);
        // if(e.target.value ==this.container){
        this.svc.getCollectionByContainer(this.farmerId, container.target.value).subscribe(function (response) {
            console.log(response);
            _this.collectionViewModels = response;
            _this.newCollection.emit({ collectionViewModels: _this.collectionViewModels });
            console.log(_this.farmerId);
        });
    };
    __decorate([
        core_1.Output()
    ], FilterbycontainerComponent.prototype, "newCollection");
    FilterbycontainerComponent = __decorate([
        core_1.Component({
            selector: 'app-filterbycontainer',
            templateUrl: './filterbycontainer.component.html',
            styleUrls: ['./filterbycontainer.component.css']
        })
    ], FilterbycontainerComponent);
    return FilterbycontainerComponent;
}());
exports.FilterbycontainerComponent = FilterbycontainerComponent;
// }
