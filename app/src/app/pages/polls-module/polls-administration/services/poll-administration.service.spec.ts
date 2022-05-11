import { TestBed } from '@angular/core/testing';

import { PollAdministrationService } from './poll-administration.service';

describe('PollAdministrationService', () => {
  let service: PollAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
