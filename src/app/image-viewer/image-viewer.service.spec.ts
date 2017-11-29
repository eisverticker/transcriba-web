import { TestBed, inject } from '@angular/core/testing';

import { ImageViewerService } from './image-viewer.service';

describe('ImageViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageViewerService]
    });
  });

  it('should be created', inject([ImageViewerService], (service: ImageViewerService) => {
    expect(service).toBeTruthy();
  }));
});
