import { TestBed, async, inject } from '@angular/core/testing';

import { TrustedGuard } from './trusted.guard';

describe('TrustedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrustedGuard]
    });
  });

  it('should ...', inject([TrustedGuard], (guard: TrustedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
