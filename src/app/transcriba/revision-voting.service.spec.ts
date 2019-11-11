import { TestBed, inject } from '@angular/core/testing';

import { RevisionVotingService } from './revision-voting.service';

describe('RevisionVotingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevisionVotingService]
    });
  });

  it('should be created', inject([RevisionVotingService], (service: RevisionVotingService) => {
    expect(service).toBeTruthy();
  }));
});
