import { TestBed } from '@angular/core/testing';

import { CanDeactivateBookGuard } from './can-deactivate-book.guard';

describe('CanDeactivateBookGuard', () => {
  let guard: CanDeactivateBookGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateBookGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
