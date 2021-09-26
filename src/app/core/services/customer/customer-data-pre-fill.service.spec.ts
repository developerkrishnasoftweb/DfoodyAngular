import { TestBed } from '@angular/core/testing';

import { CustomerDataPreFillService } from './customer-data-pre-fill.service';

describe('CustomerDataPreFillService', () => {
  let service: CustomerDataPreFillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDataPreFillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
