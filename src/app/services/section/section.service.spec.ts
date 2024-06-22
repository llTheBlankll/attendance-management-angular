import { TestBed } from '@angular/core/testing';

import { SectionService } from './section.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('SectionService', () => {
  let service: SectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
