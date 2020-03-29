import { TestBed } from '@angular/core/testing';

import { TechService } from './tech.service';

describe('TechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechService = TestBed.get(TechService);
    expect(service).toBeTruthy();
  });
});
