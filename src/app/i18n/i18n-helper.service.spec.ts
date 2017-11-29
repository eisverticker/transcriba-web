import { TestBed, inject } from '@angular/core/testing';

import { I18nHelperService } from './i18n-helper.service';

describe('I18nHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nHelperService]
    });
  });

  it('should be created', inject([I18nHelperService], (service: I18nHelperService) => {
    expect(service).toBeTruthy();
  }));
});
