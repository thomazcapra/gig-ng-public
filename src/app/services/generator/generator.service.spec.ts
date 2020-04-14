/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeneratorService } from './generator.service';

describe('Service: Generator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratorService],
    });
  });

  it('should ...', inject([GeneratorService], (service: GeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
