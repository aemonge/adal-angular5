import { TestBed, inject } from '@angular/core/testing';

import { Adal6Service } from './adal6.service';

describe('Adal6Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Adal6Service]
    });
  });

  it('should ...', inject([Adal6Service], (service: Adal6Service) => {
    expect(service).toBeTruthy();
  }));
});
