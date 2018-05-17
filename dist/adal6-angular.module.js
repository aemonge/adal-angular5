"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var adal6_interceptor_1 = require("./adal6-interceptor");
var adal6_user_1 = require("./adal6-user");
var adal6_service_1 = require("./adal6.service");
var adal6_http_service_1 = require("./adal6-http.service");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Adal6AgnularModule = /** @class */ (function () {
    function Adal6AgnularModule() {
    }
    Adal6AgnularModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [
                adal6_user_1.Adal6User, adal6_service_1.Adal6Service, adal6_http_service_1.Adal6HTTPService, adal6_interceptor_1.Adal6Interceptor
            ],
            providers: [,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: adal6_interceptor_1.Adal6Interceptor,
                    multi: true
                },
            ],
        })
    ], Adal6AgnularModule);
    return Adal6AgnularModule;
}());
exports.Adal6AgnularModule = Adal6AgnularModule;
