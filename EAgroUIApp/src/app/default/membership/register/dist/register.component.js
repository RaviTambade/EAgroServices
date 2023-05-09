"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(svc) {
        this.svc = svc;
        this.user = {
            contactNumber: '',
            password: ''
        };
        this.farmer = {
            firstName: '',
            lastName: '',
            location: ''
        };
        this.merchant = {
            firstName: '',
            lastName: '',
            location: '',
            companyName: ''
        };
        this.userRole = {
            roleId: 0
        };
        this.rolename = [{
                role: "Admin", value: "admin"
            },
            {
                role: "Farmer", value: "farmer"
            },
            {
                role: "Employee", value: "employee"
            },
            {
                role: "Merchant", value: "merchant"
            },
        ];
        this.insertFarmer = {
            user: {
                contactNumber: '',
                password: ''
            },
            farmer: {
                firstName: '',
                lastName: '',
                location: ''
            },
            userRole: {
                roleId: 0
            }
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onSubmit = function () {
        switch (this.selectedRole) {
            case 'farmer':
                {
                    this.userRole = { roleId: 2 };
                    this.insertFarmer = {
                        user: this.user,
                        farmer: this.farmer,
                        userRole: this.userRole
                    };
                    this.svc.registerFarmer(this.insertFarmer).subscribe(function (response) {
                        console.log(response);
                        if (response) {
                            alert("register sucessfull");
                            // window.location.reload();
                        }
                        else {
                            alert("register Failed");
                        }
                    });
                }
                break;
            // case 'merchant':
            //   this.svc.registerMerchant(this.insertFarmer).subscribe((response)=>{
            //     console.log(response);
            //     if(response){
            //       alert("register sucessfull")
            //       // window.location.reload();
            //     }
            //     else
            //     {
            //       alert("register Failed")
            //     }
            //   })
            default:
                break;
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
