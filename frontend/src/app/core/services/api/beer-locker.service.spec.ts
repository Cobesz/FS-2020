import { TestBed } from '@angular/core/testing';

import { BeerLockerServiceService } from './beer-locker.service';

describe('BeerLockerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerLockerServiceService = TestBed.get(BeerLockerServiceService);
    expect(service).toBeTruthy();
  });
});
