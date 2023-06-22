"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(svc, router) {
        this.svc = svc;
        this.router = router;
        this.user = {
            contactNumber: '',
            password: ''
        };
    }
    LoginComponent.prototype.logIn = function () {
        var _this = this;
        console.log("login clicked");
        console.log(this.user);
        this.svc.logIn(this.user).subscribe(function (response) {
            // // console.log(response);
            // if(response.status==400){
            //   console.log("invalid login")
            // }
            localStorage.setItem('jwtToken', response.token);
            var role = _this.svc.getRoleFromToken();
            console.log(role);
            if (role == "farmer") {
                var userId = _this.svc.getUserIdFromToken();
                console.log(userId);
                // this.router.navigate(['home', userId]);
                window.location.reload();
            }
            if (role == "employee") {
                var userId = _this.svc.getUserIdFromToken();
                console.log(userId);
                // this.router.navigate(['home', userId]);
                window.location.reload();
            }
            if (role == "merchant") {
                var userId = _this.svc.getUserIdFromToken();
                console.log(userId);
                // this.router.navigate(['home', userId]);
                window.location.reload();
            }
            if (role == "transport") {
                var userId = _this.svc.getUserIdFromToken();
                console.log(userId);
                // this.router.navigate(['home', userId]);
                window.location.reload();
            }
            if (role == "admin") {
                var userId = _this.svc.getUserIdFromToken();
                console.log(userId);
                // this.router.navigate(['home', userId]);
                window.location.reload();
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
