import { TestBed } from '@angular/core/testing';

import { ApiNewsService } from './api-news.service';

describe('ApiNewsService', () => {
  let service: ApiNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
