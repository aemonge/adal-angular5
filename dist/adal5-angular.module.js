"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var adal5_interceptor_1 = require("./adal5-interceptor");
var adal5_user_1 = require("./adal5-user");
var adal5_service_1 = require("./adal5.service");
var adal5_http_service_1 = require("./adal5-http.service");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Adal5AgnularModule = /** @class */ (function () {
    function Adal5AgnularModule() {
    }
    Adal5AgnularModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [
                adal5_user_1.Adal5User, adal5_service_1.Adal5Service, adal5_http_service_1.Adal5HTTPService, adal5_interceptor_1.Adal5Interceptor
            ],
            providers: [,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: adal5_interceptor_1.Adal5Interceptor,
                    multi: true
                },
            ],
        })
    ], Adal5AgnularModule);
    return Adal5AgnularModule;
}());
exports.Adal5AgnularModule = Adal5AgnularModule;
