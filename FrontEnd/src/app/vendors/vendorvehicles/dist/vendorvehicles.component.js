"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VendorvehiclesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var VendorvehiclesComponent = /** @class */ (function () {
    function VendorvehiclesComponent(svc) {
        this.svc = svc;
        this.vendors = [];
        this.vehicles = [];
        this.vendor = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.vehicle = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.vendorForm = new forms_1.FormGroup({
            vendor: this.vendor,
            vehicle: this.vehicle
        });
    }
    VendorvehiclesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svc.getVendors().subscribe(function (vendors) {
            _this.vendors = vendors;
            console.log(_this.vendors);
        });
        this.vendor.valueChanges.subscribe(function (selectedVendorId) {
            _this.vehicle.reset();
            // this.vehicle.disable();
            if (selectedVendorId) {
                // const vendorId = Number(selectedVendorId);
                var selectedVendor = _this.vendors.find(function (vendor) { return vendor.companyName === selectedVendorId; });
                if (selectedVendor) {
                    _this.svc.getVendorVehicles(selectedVendor.id).subscribe(function (vehicles) {
                        _this.vehicles = vehicles;
                        console.log(_this.vehicles);
                    });
                }
            }
        });
    };
    VendorvehiclesComponent = __decorate([
        core_1.Component({
            selector: 'app-vendorvehicles',
            templateUrl: './vendorvehicles.component.html',
            styleUrls: ['./vendorvehicles.component.css']
        })
    ], VendorvehiclesComponent);
    return VendorvehiclesComponent;
}());
exports.VendorvehiclesComponent = VendorvehiclesComponent;
// onselect(vendor:any){
//   this.svc.getVendorVehicles(this.vendors.id).subscribe((response)=>{
//     this.vehicles=response
//     console.log(this.vehicles)
//   })
//   }
//       onInsertClick(){
//         this.insertStatus=true;
//       }
//       onUpdateClick(vendor: any) {
//         this.selectedVendor = vendor;
//         this.updateStatus = true;
//       }
// onDeleteClick(vendor: any) {
//   this.selectedVendor = vendor;
//   this.deleteStatus = true;
// }
//       addVehicle(vendor:any){
//         this.svc.addVehicle(vendor.id,this.vehicle).subscribe((response)=>{
//           console.log(response)
//     })
//   }
//   onUpdateDone(vendor:any){
//     this.svc.updateVendor(vendor.id,this.vendor).subscribe((response)=>{
//       console.log(response)
//     })
//   }
//   onDeleteDone(vendor:any){
//     this.svc.DeleteVendor(vendor.id).subscribe((response)=>{
//       console.log(response);
//     })
// }
