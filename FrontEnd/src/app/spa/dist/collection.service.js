"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionService = void 0;
var core_1 = require("@angular/core");
var CollectionService = /** @class */ (function () {
    function CollectionService() {
        this.collections = [{
                'date': '2022-08-09',
                'collectionId': 1,
                'quantity': 20,
                'container': 'bags',
                'crop': 'potato',
                'rateperkg': 20
            },
            {
                'date': '2022-08-09',
                'collectionId': 2,
                'quantity': 30,
                'container': 'bags',
                'crop': 'onion',
                'rateperkg': 30
            },
            {
                'date': '2022-08-09',
                'collectionId': 3,
                'quantity': 24,
                'container': 'bags',
                'crop': 'onion',
                'rateperkg': 40
            },
            {
                'date': '2022-08-09',
                'collectionId': 4,
                'quantity': 25,
                'container': 'bags',
                'crop': 'onion',
                'rateperkg': 50
            },
            {
                'date': '2022-08-09',
                'collectionId': 5,
                'quantity': 35,
                'container': 'bags',
                'crop': 'potato',
                'rateperkg': 50
            },
            {
                'date': '2022-08-09',
                'collectionId': 6,
                'quantity': 40,
                'container': 'bags',
                'crop': 'potato',
                'rateperkg': 70
            },
            {
                'date': '2022-08-09',
                'collectionId': 7,
                'quantity': 20,
                'container': 'bags',
                'crop': 'potato',
                'rateperkg': 60
            }];
    }
    CollectionService.prototype.getCollections = function () {
        console.log("service called");
        return this.collections;
    };
    CollectionService.prototype.getCollection = function (id) {
        return this.collections[id];
    };
    CollectionService.prototype.editCollection = function (id, updateddata) {
        var olddata = this.collections.find(function (c) { return c.id == updateddata.collectionId; });
        for (var o in olddata) {
            if (olddata.hasOwnProperty(o)) {
                for (var u in updateddata) {
                    if (updateddata.hasOwnProperty(u)) {
                        if (o == u) {
                            olddata[o] = updateddata[u];
                        }
                    }
                }
            }
        }
    };
    CollectionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CollectionService);
    return CollectionService;
}());
exports.CollectionService = CollectionService;