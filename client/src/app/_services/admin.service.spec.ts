import { TestBed, inject } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [AdminService]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
