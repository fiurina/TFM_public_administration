import { TestBed } from '@angular/core/testing';

import { SocialConsumerService } from './social-consumer.service';

describe('SocialConsumerService', () => {
  let service: SocialConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
