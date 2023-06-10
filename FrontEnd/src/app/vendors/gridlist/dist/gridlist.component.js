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
        this.collectionviewmodel = [];
        this.updateStatus = false;
        this.deleteStatus = false;
        this.viewStatus = false;
        this.results = [];
        this.currentPage = 0;
        this.arrLength = 0;
        this.isDisabledPrev = false;
        this.isDisabledNext = false;
        this.results = [],
            this.arrLength = this.collectionviewmodel.length;
    }
    GridlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        var startindex = this.currentPage * 5;
        var endindex = startindex + 5;
        this.svc.GetCollections().subscribe(function (collections) {
            _this.collectionviewmodel = collections;
            _this.results = collections.slice(startindex, endindex);
            console.log(_this.results);
            _this.isDisabledPrev = true;
        });
    };
    GridlistComponent.prototype.next = function () {
        this.currentPage++;
        var startindex = this.currentPage * 5;
        var endindex = startindex + 5;
        this.results = this.collectionviewmodel.slice(startindex, endindex);
        this.isDisabledPrev = false;
        if (endindex <= this.arrLength) {
            this.isDisabledNext = true;
        }
    };
    GridlistComponent.prototype.previous = function () {
        this.currentPage--;
        var startindex = this.currentPage * 5;
        var endindex = startindex + 5;
        this.results = this.collectionviewmodel.slice(startindex, endindex);
        this.isDisabledNext = false;
        if (startindex <= 0) {
            this.isDisabledPrev = true;
        }
    };
    // onViewClick(collection:any){
    //   this.selCollection=collection;
    //   this.viewStatus=true
    // }
    GridlistComponent.prototype.onUpdateClick = function (collection) {
        this.selCollection = collection;
        this.updateStatus = true;
    };
    GridlistComponent.prototype.onDeleteClick = function (collection) {
        this.selCollection = collection;
        this.deleteStatus = true;
    };
    GridlistComponent.prototype.onViewDone = function (collectionId) {
        this.viewStatus = true;
        // console.log("hii");
        // if(collectionId){
        // const selCollection=this.collectionviewmodel.find(collection=>collection.collection.id===selCollection.collectionId)
        // }
        // this.svc.GetCollection(selCollection.collection.id).subscribe((response) => {
        //   console.log(collection.id)
        //   console.log(response)
        // })
    };
    GridlistComponent.prototype.onUpdateDone = function (collection) {
        this.svc.UpdateCollection(collection.id, this.collection).subscribe(function (response) {
            console.log(response);
        });
    };
    GridlistComponent.prototype.onDeleteDone = function (collection) {
        this.svc.DeleteCollection(collection.id).subscribe(function (response) {
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
