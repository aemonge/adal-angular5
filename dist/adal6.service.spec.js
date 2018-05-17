"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var adal6_service_1 = require("./adal6.service");
describe('Adal6Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [adal6_service_1.Adal6Service]
        });
    });
    it('should ...', testing_1.inject([adal6_service_1.Adal6Service], function (service) {
        expect(service).toBeTruthy();
    }));
});
