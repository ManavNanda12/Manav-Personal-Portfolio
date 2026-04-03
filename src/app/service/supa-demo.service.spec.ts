import { TestBed } from '@angular/core/testing';

import { SupaDemoService } from './supa-demo.service';

describe('SupaDemoService', () => {
  let service: SupaDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupaDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
