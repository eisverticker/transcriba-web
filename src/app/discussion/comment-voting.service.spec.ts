import { TestBed, inject } from '@angular/core/testing';

import { CommentVotingService } from './comment-voting.service';

describe('CommentVotingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentVotingService]
    });
  });

  it('should be created', inject([CommentVotingService], (service: CommentVotingService) => {
    expect(service).toBeTruthy();
  }));
});
