import { TestBed, inject } from '@angular/core/testing';

import { TranscribaService } from './transcriba.service';

describe('TranscribaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranscribaService]
    });
  });

  it('should be created', inject([TranscribaService], (service: TranscribaService) => {
    expect(service).toBeTruthy();
  }));
});
