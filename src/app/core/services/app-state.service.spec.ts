import { TestBed } from '@angular/core/testing';

import { AppStateService } from './app-state.service';

describe('AppStateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loading$ should emit the loading state that is set', () => {
    let index = 0;
    const results = [false, true, false, false, true, true, false];
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(results[index]);
      index++;
    });
    service.setLoading(true);
    service.setLoading(false);
    service.setLoading(false);
    service.setLoading(true);
    service.setLoading(true);
    service.setLoading(false);
  });
});
