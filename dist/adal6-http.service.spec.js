"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var Adal6_http_service_1 = require("./Adal6-http.service");
describe('Adal6HTTPService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [Adal6_http_service_1.Adal6HTTPService]
        });
    });
    it('should ...', testing_1.inject([Adal6_http_service_1.Adal6HTTPService], function (service) {
        expect(service).toBeTruthy();
    }));
});
