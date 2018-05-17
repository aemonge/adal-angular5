"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Adal6Interceptor = /** @class */ (function () {
    function Adal6Interceptor(Adal6Service) {
        this.Adal6Service = Adal6Service;
    }
    Adal6Interceptor.prototype.intercept = function (request, next) {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.Adal6Service.userInfo.token
            }
        });
        return next.handle(request);
    };
    Adal6Interceptor = __decorate([
        core_1.Injectable()
    ], Adal6Interceptor);
    return Adal6Interceptor;
}());
exports.Adal6Interceptor = Adal6Interceptor;
