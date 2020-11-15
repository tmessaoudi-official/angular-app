import { TestBed } from '@angular/core/testing';

import { EnvironmentVariableProcessors } from './EnvironmentVariableProcessors';

describe('EnvironmentVariableProcessors', () => {
  let service: EnvironmentVariableProcessors;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentVariableProcessors);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
