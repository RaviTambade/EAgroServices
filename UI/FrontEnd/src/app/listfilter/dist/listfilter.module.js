"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListfilterModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var filterbycontainer_component_1 = require("./filterbycontainer/filterbycontainer.component");
var forms_1 = require("@angular/forms");
var collection_service_1 = require("../spa/collection.service");
var filterbydate_component_1 = require("./filterbydate/filterbydate.component");
var filterbycrop_component_1 = require("./filterbycrop/filterbycrop.component");
var ListfilterModule = /** @class */ (function () {
    function ListfilterModule() {
    }
    ListfilterModule = __decorate([
        core_1.NgModule({
            declarations: [
                filterbycontainer_component_1.FilterbycontainerComponent,
                filterbydate_component_1.FilterbydateComponent,
                filterbycrop_component_1.FilterbycropComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule
            ],
            exports: [
                filterbycontainer_component_1.FilterbycontainerComponent,
                filterbydate_component_1.FilterbydateComponent,
                filterbycrop_component_1.FilterbycropComponent
            ],
            providers: [
                collection_service_1.CollectionService
            ]
        })
    ], ListfilterModule);
    return ListfilterModule;
}());
exports.ListfilterModule = ListfilterModule;
