import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ CustomerService ]
    });
  });

  it('should be created', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();

  }))
  ;
});
