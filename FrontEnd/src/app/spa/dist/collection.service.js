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
var common_1 = require("@angular/common");
var CollectionService = /** @class */ (function () {
    function CollectionService(http) {
        this.http = http;
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
        this.farmerslist = [{
                'Id': 1,
                'firstname': 'Shubham',
                'lastname': 'Teli',
                'location': 'Bhavadi'
            },
            {
                'Id': 2,
                'firstname': 'Abhay',
                'lastname': 'Navale',
                'location': 'Peth'
            },
            {
                'Id': 3,
                'firstname': 'Jayesh',
                'lastname': 'Erande',
                'location': 'Thugaon'
            },
            {
                'Id': 4,
                'firstname': 'Sahil',
                'lastname': 'Mankar',
                'location': 'Pargaon'
            }, {
                'Id': 5,
                'firstname': 'Rohit',
                'lastname': 'Gore',
                'location': 'Satara'
            },
            {
                'Id': 6,
                'firstname': 'Rushikesh',
                'lastname': 'Chikane',
                'location': 'Satara'
            },
            {
                'Id': 7,
                'firstname': 'Akshay',
                'lastname': 'Tanpure',
                'location': 'Wada'
            },
        ];
    }
    CollectionService.prototype.getCollections = function () {
        var datePipe = new common_1.DatePipe('en-US');
        var currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
        console.log(currentDate);
        var date = {
            "date": currentDate
        };
        var url = "http://localhost:5031/api/collections/getall";
        return this.http.post(url, date);
    };
    CollectionService.prototype.getFarmers = function () {
        console.log("service called");
        console.log(this.farmerslist);
        return this.farmerslist;
    };
    CollectionService.prototype.getCollection = function (id) {
        var url = "http://localhost:5031/api/collections/" + id;
        return this.http.get(url);
    };
    CollectionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CollectionService);
    return CollectionService;
}());
exports.CollectionService = CollectionService;
