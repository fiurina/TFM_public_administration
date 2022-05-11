import { TestBed } from '@angular/core/testing';

import { SocialAdministrationService } from './social-administration.service';

describe('SocialAdministrationService', () => {
  let service: SocialAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
