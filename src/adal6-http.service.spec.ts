import { TestBed, inject } from '@angular/core/testing';

import { Adal6HTTPService } from './Adal6-http.service';

describe('Adal6HTTPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Adal6HTTPService]
    });
  });

  it('should ...', inject([Adal6HTTPService], (service: Adal6HTTPService) => {
    expect(service).toBeTruthy();
  }));
});
