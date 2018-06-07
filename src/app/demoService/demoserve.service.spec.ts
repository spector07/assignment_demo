import { TestBed, inject } from '@angular/core/testing';

import { DemoserveService } from './demoserve.service';

describe('DemoserveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoserveService]
    });
  });

  it('should be created', inject([DemoserveService], (service: DemoserveService) => {
    expect(service).toBeTruthy();
  }));
});
